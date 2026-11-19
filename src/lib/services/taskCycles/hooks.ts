import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createNewTaskCycle,
  deleteTaskCycleById,
  getAllTaskCyclesByProject,
  getCycleTaskById,
  getCycleTaskCycles,
  getTaskTaskCycles,
  moveMultipleTasksToDestination,
  moveTaskToDestination,
  updateExistingTaskCycleStage,
} from './api';

import type {
  CreateTaskCycleRequest,
  DeleteTaskCycleRequest,
  MoveTaskRequest,
  MoveTasksRequest,
  UpdateTaskCycleStageRequest,
} from './types';
import { taskQueryKeys } from '../tasks/hooks';
import { restoreCached, useCachedQuery } from '@/lib/db/queryCache';
import { applyStageChange, applyTaskMove } from './cache';

export const taskCycleQueryKeys = {
  all: ['taskCycles'] as const,

  id: (taskCycleId: string) => [...taskCycleQueryKeys.all, 'id', taskCycleId] as const,

  cycle: (cycleId: string) => [...taskCycleQueryKeys.all, 'cycle', cycleId] as const,

  task: (taskId: string) => [...taskCycleQueryKeys.all, 'task', taskId] as const,

  project: (projectId: string) => [...taskCycleQueryKeys.all, 'project', projectId] as const,
};

export const useGetTaskCyclesById = (id: string) => {
  return useCachedQuery({
    queryKey: taskCycleQueryKeys.id(id),

    queryFn: async () => {
      const response = await getCycleTaskById(id);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? null;
    },

    enabled: !!id,
  });
};

export const useGetTaskCyclesByCycle = (cycleId: string) => {
  return useCachedQuery({
    queryKey: taskCycleQueryKeys.cycle(cycleId),

    queryFn: async () => {
      const response = await getCycleTaskCycles(cycleId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!cycleId,
  });
};

export const useGetTaskCyclesByTask = (taskId: string) => {
  return useCachedQuery({
    queryKey: taskCycleQueryKeys.task(taskId),

    queryFn: async () => {
      const response = await getTaskTaskCycles(taskId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!taskId,
  });
};

export const useGetAllTaskCyclesByProject = (projectId: string) => {
  return useCachedQuery({
    queryKey: taskCycleQueryKeys.project(projectId),

    queryFn: async () => {
      const response = await getAllTaskCyclesByProject(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,
  });
};

export const useCreateTaskCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskCycleRequest) => {
      const response = await createNewTaskCycle(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSuccess: (taskCycle) => {
      if (!taskCycle) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: taskCycleQueryKeys.cycle(taskCycle.cycleId),
      });

      queryClient.invalidateQueries({
        queryKey: taskCycleQueryKeys.task(taskCycle.taskId),
      });
    },
  });
};

export const useUpdateTaskCycleStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateTaskCycleStageRequest) => {
      const response = await updateExistingTaskCycleStage(variables);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.all });

      return { snapshot: await applyStageChange(variables) };
    },

    onError: (_, __, context) => restoreCached(context?.snapshot),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },

    onSuccess: (taskCycle) => {
      if (!taskCycle) return;

      requestAnimationFrame(() => {
        document
          .getElementById(`task-${taskCycle.taskId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    },
  });
};

export const useMoveTaskAcrossCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: MoveTaskRequest) => {
      const response = await moveTaskToDestination(variables);

      if (!response.success) throw new Error(response.message);

      return response.data;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.all });

      return { snapshot: await applyTaskMove(variables) };
    },

    onError: (_, __, context) => restoreCached(context?.snapshot),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
    },
  });
};

export const useMoveTasksAcrossCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: MoveTasksRequest) => {
      const response = await moveMultipleTasksToDestination(variables);

      if (!response.success) throw new Error(response.message);

      return response.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
    },
  });
};

export const useDeleteTaskCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteTaskCycleRequest) => {
      const response = await deleteTaskCycleById(variables);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSettled: (result) => {
      if (!result) {
        return;
      }

      if (result.taskCycleId) {
        queryClient.removeQueries({ queryKey: taskCycleQueryKeys.id(result.taskCycleId) });
      }

      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
