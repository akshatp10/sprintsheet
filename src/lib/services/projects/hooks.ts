import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createNewProject, getProjectDetails, getProjectMembers, getProjects } from './api';

import type { CreateProjectRequest } from './types';

export const projectQueryKeys = {
  all: ['projects'] as const,

  list: (includeArchived: boolean) => [...projectQueryKeys.all, 'list', includeArchived] as const,

  detail: (projectId: string) => [...projectQueryKeys.all, 'detail', projectId] as const,

  members: (projectId: string) => [...projectQueryKeys.all, 'members', projectId] as const,
};

export const useGetAllProjects = (includeArchived: boolean = false) => {
  return useQuery({
    queryKey: projectQueryKeys.list(includeArchived),
    queryFn: async () => {
      const response = await getProjects(includeArchived);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },
  });
};

export const useGetProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: projectQueryKeys.detail(projectId),
    queryFn: async () => {
      const response = await getProjectDetails(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
    enabled: !!projectId,
  });
};

export const projectMembersQuery = (projectId: string) => ({
  queryKey: projectQueryKeys.members(projectId),
  queryFn: async () => {
    const response = await getProjectMembers(projectId);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data ?? [];
  },
  enabled: !!projectId,
});

export const useGetProjectMembers = (projectId: string) => {
  return useQuery(projectMembersQuery(projectId));
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProjectRequest) => {
      const response = await createNewProject(input);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.all,
      });
    },
  });
};
