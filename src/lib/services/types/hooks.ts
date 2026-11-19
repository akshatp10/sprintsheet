import { useCachedQuery } from '@/lib/db/queryCache';
import { getProjectTypesById, getTypeById } from './api';

export const typeQueryKeys = {
  all: ['types'] as const,
  project: (projectId: string) => [...typeQueryKeys.all, projectId] as const,
  detail: (typeId: string) => [...typeQueryKeys.all, typeId] as const,
};

export const useProjectTypes = (projectId: string) => {
  return useCachedQuery({
    queryKey: typeQueryKeys.project(projectId),
    queryFn: async () => {
      const response = await getProjectTypesById(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },
    enabled: !!projectId,
  });
};

export const useTypeById = (typeId: string) => {
  return useCachedQuery({
    queryKey: typeQueryKeys.detail(typeId),
    queryFn: async () => {
      const response = await getTypeById(typeId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    enabled: !!typeId,
  });
};
