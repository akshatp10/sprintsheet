import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { taskCycleQueryKeys } from '../taskCycles/hooks';
import { taskQueryKeys } from '../tasks/hooks';
import {
  createNewCycle,
  deleteExistingCycle,
  getCycle,
  getProjectCycles,
  updateExistingCycle,
} from './api';

import type { CreateCycleInput, DeleteCycleRequest, UpdateCycleRequest } from './types';

export const cycleQueryKeys = {
  all: ['cycles'] as const,

  project: (projectId: string) => [...cycleQueryKeys.all, 'project', projectId] as const,

  detail: (cycleId: string) => [...cycleQueryKeys.all, 'detail', cycleId] as const,
};

export const useGetAllCyclesByProject = (projectId: string) => {
  return useQuery({
    queryKey: cycleQueryKeys.project(projectId),

    queryFn: async () => {
      const response = await getProjectCycles(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,
  });
};

export const useGetCycle = (cycleId: string) => {
  return useQuery({
    queryKey: cycleQueryKeys.detail(cycleId),

    queryFn: async () => {
      const response = await getCycle(cycleId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    enabled: !!cycleId,
  });
};

export const useCreateCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCycleInput) => {
      const response = await createNewCycle(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cycleQueryKeys.project(variables.projectId) });
    },
  });
};

export const useUpdateCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateCycleRequest) => {
      const response = await updateExistingCycle(variables);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSuccess: (cycle, variables) => {
      queryClient.invalidateQueries({ queryKey: cycleQueryKeys.project(variables.projectId) });

      if (cycle) {
        queryClient.setQueryData(cycleQueryKeys.detail(cycle.id), cycle);
      }
    },
  });
};

export const useDeleteCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteCycleRequest) => {
      const response = await deleteExistingCycle(variables);

      if (!response.success) {
        throw new Error(response.message);
      }
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cycleQueryKeys.project(variables.projectId) });
      queryClient.removeQueries({ queryKey: cycleQueryKeys.detail(variables.id) });

      // Tasks that lost their only cycle went back to the backlog.
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
    },
  });
};
