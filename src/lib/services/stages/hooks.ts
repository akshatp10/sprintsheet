import { useQuery } from '@tanstack/react-query';
import { getProjectBacklogStageId, getProjectTerminalStageId, getStagesForProject } from './api';

export const stageQueryKeys = {
  all: ['stages'] as const,

  project: (projectId: string) => [...stageQueryKeys.all, 'project', projectId] as const,

  backlog: (projectId: string) => [...stageQueryKeys.all, 'backlog', projectId] as const,

  terminal: (projectId: string) => [...stageQueryKeys.all, 'terminal', projectId] as const,
};

export const useGetStagesPerProject = (projectId: string) => {
  return useQuery({
    queryKey: stageQueryKeys.project(projectId),
    queryFn: async () => {
      const response = await getStagesForProject(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },
    enabled: !!projectId,
  });
};

export const useGetBacklogStagePerProject = (projectId: string) => {
  return useQuery({
    queryKey: stageQueryKeys.backlog(projectId),
    queryFn: async () => {
      const response = await getProjectBacklogStageId(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? '';
    },
    enabled: !!projectId,
  });
};

export const useGetTerminalStagePerProject = (projectId: string) => {
  return useQuery({
    queryKey: stageQueryKeys.terminal(projectId),
    queryFn: async () => {
      const response = await getProjectTerminalStageId(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? '';
    },
    enabled: !!projectId,
  });
};
