import { useCachedQuery } from '@/lib/db/queryCache';
import { getCurrent, getProjectUsers } from './api';

export const userQueryKeys = {
  all: ['users'] as const,
  current: () => [...userQueryKeys.all, 'current'] as const,
  detail: (id: string) => [...userQueryKeys.all, 'detail', id] as const,
  byIds: (ids: string[]) => [...userQueryKeys.all, 'by-ids', ...ids] as const,
  project: (projectId: string) => [...userQueryKeys.all, 'project', projectId] as const,
};

export const useGetCurrentUser = (options = {}) => {
  return useCachedQuery({
    queryKey: userQueryKeys.current(),

    queryFn: async () => {
      const response = await getCurrent();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    ...options,
  });
};

export const useGetProjectUsers = (projectId: string) => {
  return useCachedQuery({
    queryKey: userQueryKeys.project(projectId),

    queryFn: async () => {
      const response = await getProjectUsers(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,
  });
};
