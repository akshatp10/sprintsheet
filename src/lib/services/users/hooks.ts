import { useQuery } from '@tanstack/react-query';

import { getProjectUsers, getUser, getUsers } from './api';

export const userQueryKeys = {
  all: ['users'] as const,

  detail: (id: string) => [...userQueryKeys.all, 'detail', id] as const,

  byIds: (ids: string[]) => [...userQueryKeys.all, 'by-ids', ...ids] as const,

  project: (projectId: string) => [...userQueryKeys.all, 'project', projectId] as const,
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: userQueryKeys.detail(id),

    queryFn: async () => {
      const response = await getUser(id);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    enabled: !!id,
  });
};

export const useGetUsers = (ids: string[]) => {
  return useQuery({
    queryKey: userQueryKeys.byIds(ids),

    queryFn: async () => {
      const response = await getUsers(ids);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: ids.length > 0,
  });
};

export const useGetProjectUsers = (projectId: string) => {
  return useQuery({
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
