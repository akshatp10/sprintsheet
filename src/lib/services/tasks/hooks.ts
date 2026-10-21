import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { projectQueryKeys } from '../projects/hooks';
import {
  createNewTask,
  getAllCycleTasks,
  getAllProjectBacklogTasks,
  getAllProjectCycleTasks,
  getAllProjectTasks,
  updateExistingTask,
} from './api';

import type { CreateTaskRequest, CycleTaskItem, UpdateTaskRequest } from './types';

export const taskQueryKeys = {
  all: ['tasks'] as const,
  project: (projectId: string) => [...taskQueryKeys.all, 'project', projectId] as const,
  backlog: (projectId: string) => [...taskQueryKeys.all, 'backlog', projectId] as const,
  cycle: (cycleId: string) => [...taskQueryKeys.all, 'cycle', cycleId] as const,
  projectCycles: (projectId: string) =>
    [...taskQueryKeys.all, 'project-cycles', projectId] as const,
};

const groupBy = <T>(items: T[], getKey: (item: T) => string) =>
  items.reduce<Record<string, T[]>>((groups, item) => {
    (groups[getKey(item)] ??= []).push(item);
    return groups;
  }, {});

const groupByStage = (tasks: CycleTaskItem[]) => groupBy(tasks, (task) => task.stage.id);
const groupByCycle = (tasks: CycleTaskItem[]) => groupBy(tasks, (task) => task.cycleId);

export const useGetAllTasksByProject = (projectId: string) => {
  return useQuery({
    queryKey: taskQueryKeys.project(projectId),

    queryFn: async () => {
      const response = await getAllProjectTasks(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,
  });
};

export const useBacklogTasks = (projectId: string) => {
  return useQuery({
    queryKey: taskQueryKeys.backlog(projectId),

    queryFn: async () => {
      const response = await getAllProjectBacklogTasks(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,
  });
};

const cycleTasksQueryOptions = (cycleId: string) => ({
  queryKey: taskQueryKeys.cycle(cycleId),

  queryFn: async () => {
    const response = await getAllCycleTasks(cycleId);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data ?? [];
  },

  enabled: !!cycleId,
});

export const useTasksByCycle = (cycleId: string) => {
  return useQuery(cycleTasksQueryOptions(cycleId));
};

export const useTasksByStage = (cycleId: string) => {
  return useQuery({ ...cycleTasksQueryOptions(cycleId), select: groupByStage });
};

// Was useGetTasksByCycle(projectId)
export const useTasksGroupedByCycle = (projectId: string) => {
  return useQuery({
    queryKey: taskQueryKeys.projectCycles(projectId),

    queryFn: async () => {
      const response = await getAllProjectCycleTasks(projectId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data ?? [];
    },

    enabled: !!projectId,

    select: groupByCycle,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskRequest) => {
      const response = await createNewTask(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.detail(variables.projectId) });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateTaskRequest) => {
      const response = await updateExistingTask(variables);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
