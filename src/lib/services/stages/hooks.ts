import { useQuery } from '@tanstack/react-query';
import { getStagesForProject } from './api';
import { BACKLOG_STAGE_NAME } from './type';

export const stageQueryKeys = {
  all: ['stages'] as const,

  project: (projectId: string) => [...stageQueryKeys.all, 'project', projectId] as const,
};

const stagesQueryOptions = (projectId: string) => ({
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

export const useGetStagesPerProject = (projectId: string) => {
  return useQuery(stagesQueryOptions(projectId));
};

export const useGetBacklogStagePerProject = (projectId: string) => {
  return useQuery({
    ...stagesQueryOptions(projectId),
    select: (stages) => stages.find((stage) => stage.name === BACKLOG_STAGE_NAME)?.id ?? '',
  });
};

export const useGetTerminalStagePerProject = (projectId: string) => {
  return useQuery({
    ...stagesQueryOptions(projectId),
    select: (stages) => stages.find((stage) => stage.isTerminal)?.id ?? '',
  });
};
