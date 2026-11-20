import { useMemo } from 'react';
import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';
import db, { TABLE_NAMES, type TableName } from './db';

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

// The first part of a query key is the table name, e.g. ['tasks', ...] is stored in db.tasks
const tableNameOf = (queryKey: QueryKey) => queryKey[0] as TableName;

const tableFor = (queryKey: QueryKey) => {
  const table = db[tableNameOf(queryKey)];
  if (!table) throw new Error(`No table for "${String(queryKey[0])}"`);
  return table;
};

// All rows whose key starts with the given key, e.g. ['tasks'] matches ['tasks', 'cycle', id]
const rowsByPrefix = (prefix: QueryKey) =>
  tableFor(prefix).where('key').startsWith(toKey(prefix).slice(0, -1));

export const getCached = async <T>(queryKey: QueryKey) =>
  (await tableFor(queryKey).get(toKey(queryKey)))?.data as T | undefined;

export const putCached = (queryKey: QueryKey, data: unknown) =>
  tableFor(queryKey).put({ key: toKey(queryKey), data, updatedAt: Date.now() });

export const updateCached = async <T>(queryKey: QueryKey, updater: (data: T | undefined) => T) =>
  putCached(queryKey, updater(await getCached<T>(queryKey)));

export const clearCached = (prefix: QueryKey) => rowsByPrefix(prefix).delete();

// Updates every array stored under the prefix and returns the old rows for rollback
export const patchCacheByPrefix = async <T>(prefix: QueryKey, updater: (data: T) => T) => {
  const rows = await rowsByPrefix(prefix).toArray();

  await tableFor(prefix).bulkPut(
    rows.map((row) => ({
      ...row,
      data: Array.isArray(row.data) ? updater(row.data as T) : row.data,
      updatedAt: Date.now(),
    })),
  );

  return rows.map((row) => ({ table: tableNameOf(prefix), row }));
};

export const snapshotCached = async (queryKeys: QueryKey[]) => {
  const saved = await Promise.all(
    queryKeys.map(async (queryKey) => ({
      table: tableNameOf(queryKey),
      row: await tableFor(queryKey).get(toKey(queryKey)),
    })),
  );

  return saved.flatMap(({ table, row }) => (row ? [{ table, row }] : []));
};

export const restoreCached = async (snapshot: CacheSnapshot = []) => {
  await Promise.all(snapshot.map(({ table, row }) => db[table].put(row)));
};

export const findInCached = async <T>(prefix: QueryKey, match: (item: T) => boolean) => {
  const rows = await rowsByPrefix(prefix).toArray();

  for (const { data } of rows) {
    const found = Array.isArray(data) ? (data as T[]).find(match) : undefined;
    if (found) return found;
  }

  return undefined;
};

// Clears everything, used on logout
export const clearAllTables = async () => {
  await Promise.all(TABLE_NAMES.map((name) => db[name].clear()));
};

export const useCachedQuery = <TData, TSelected = TData>({
  queryKey,
  queryFn,
  select,
  ...rest
}: CachedQueryOptions<TData, TSelected>) => {
  const key = toKey(queryKey);

  // undefined = still reading, null = nothing stored yet
  const live = useLiveQuery(
    async () => ({ key, row: (await tableFor(queryKey).get(key)) ?? null }),
    [key],
  );

  const cached = live?.key === key ? live.row : undefined;

  const query = useQuery({
    ...rest,
    queryKey,
    meta: {
      ...rest.meta,
      syncIndicator: true,
    },
    queryFn: async () => {
      const data = await queryFn();
      const previous = await getCached(queryKey);

      if (JSON.stringify(previous) !== JSON.stringify(data)) {
        await putCached(queryKey, data);
      }

      return data;
    },
  });

  const raw = cached ? (cached.data as TData) : undefined;

  const data = useMemo(
    () => (raw === undefined ? undefined : select ? select(raw) : (raw as unknown as TSelected)),
    [raw, select],
  );

  return {
    ...query,
    data,
    isLoading: cached === undefined || (cached === null && query.isLoading),
  };
};
