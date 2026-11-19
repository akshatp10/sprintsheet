import { useMemo } from 'react';
import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';
import db from './db';

type CachedQueryOptions<TData, TSelected> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  'queryKey' | 'queryFn' | 'select' | 'initialData' | 'placeholderData'
> & {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  select?: (data: TData) => TSelected;
};

export type CacheSnapshot = Awaited<ReturnType<typeof snapshotCached>>;

const toKey = (queryKey: QueryKey) => JSON.stringify(queryKey);

// Every row whose key starts with this key's segments, e.g. ['tasks'] matches ['tasks', 'cycle', id]
const rowsByPrefix = (prefix: QueryKey) =>
  db.cache.where('key').startsWith(toKey(prefix).slice(0, -1));

export const getCached = async <T>(queryKey: QueryKey) =>
  (await db.cache.get(toKey(queryKey)))?.data as T | undefined;

export const putCached = (queryKey: QueryKey, data: unknown) =>
  db.cache.put({ key: toKey(queryKey), data, updatedAt: Date.now() });

export const updateCached = async <T>(queryKey: QueryKey, updater: (data: T | undefined) => T) =>
  putCached(queryKey, updater(await getCached<T>(queryKey)));

export const clearCached = (prefix: QueryKey) => rowsByPrefix(prefix).delete();

// Applies `updater` to every cached array under the prefix.
// Returns the rows as they were before, for rollback.
export const patchCacheByPrefix = async <T>(prefix: QueryKey, updater: (data: T) => T) => {
  const rows = await rowsByPrefix(prefix).toArray();

  await db.cache.bulkPut(
    rows.map((row) => ({
      ...row,
      data: Array.isArray(row.data) ? updater(row.data as T) : row.data,
      updatedAt: Date.now(),
    })),
  );

  return rows;
};

// Saves the current rows for these keys, so a failed mutation can restore them.
export const snapshotCached = async (queryKeys: QueryKey[]) =>
  (await db.cache.bulkGet(queryKeys.map(toKey))).filter(
    (row): row is NonNullable<typeof row> => row !== undefined,
  );

export const restoreCached = async (snapshot?: CacheSnapshot) => {
  if (snapshot) await db.cache.bulkPut(snapshot);
};

// First item matching `match` in any cached array under the prefix.
export const findInCached = async <T>(prefix: QueryKey, match: (item: T) => boolean) => {
  const rows = await rowsByPrefix(prefix).toArray();

  for (const { data } of rows) {
    const found = Array.isArray(data) ? (data as T[]).find(match) : undefined;
    if (found) return found;
  }

  return undefined;
};

export const useCachedQuery = <TData, TSelected = TData>({
  queryKey,
  queryFn,
  select,
  ...rest
}: CachedQueryOptions<TData, TSelected>) => {
  const key = toKey(queryKey);

  // undefined = still reading Dexie, null = nothing stored yet
  const cached = useLiveQuery(() => db.cache.get(key).then((row) => row ?? null), [key]);

  // The fetch only writes into Dexie; the UI reads from it.
  const query = useQuery({
    ...rest,
    queryKey,
    queryFn: async () => {
      const data = await queryFn();
      await putCached(queryKey, data);
      return data;
    },
  });

  const raw = cached ? (cached.data as TData) : undefined;

  const data = useMemo(
    () => (raw === undefined ? undefined : select ? select(raw) : (raw as unknown as TSelected)),
    [raw],
  );

  return {
    ...query,
    data,
    isLoading: cached === undefined || (cached === null && query.isLoading),
  };
};
