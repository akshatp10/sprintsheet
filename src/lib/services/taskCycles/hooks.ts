import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createNewTaskCycle,
  getAllTaskCyclesByProject,
  getCycleTaskById,
  getCycleTaskCycles,
  getTaskTaskCycles,
  moveMultipleTasksToDestination,
  moveTaskToDestination,
  updateExistingTaskCycleStage,
} from './api';

import type { CreateTaskCycleInput, MoveTasksVariables, TaskDestination } from './types';
import { taskQueryKeys } from '../tasks/hooks';
import type { CycleTaskWithUsers } from '../tasks/types';

export interface UpdateTaskCycleStageVariables {
  taskCycleId: string;
  cycleId: string; // only for the cache key
  stageId: string;
}

export interface MoveTaskVariables {
  projectId: string;
  taskId: string;
  fromCycleId: string | null; // null = from backlog
  to: TaskDestination;
}

export const taskCycleQueryKeys = {
  all: ['taskCycles'] as const,

  id: (taskCycleId: string) => [...taskCycleQueryKeys.all, 'id', taskCycleId] as const,

  cycle: (cycleId: string) => [...taskCycleQueryKeys.all, 'cycle', cycleId] as const,

  task: (taskId: string) => [...taskCycleQueryKeys.all, 'task', taskId] as const,

  project: (projectId: string) => [...taskCycleQueryKeys.all, 'project', projectId] as const,
};

export const useGetTaskCyclesById = (id: string) => {
  return useQuery({
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
  return useQuery({
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
  return useQuery({
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
  return useQuery({
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
    mutationFn: async (input: CreateTaskCycleInput) => {
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
    mutationFn: async ({ taskCycleId, stageId }: UpdateTaskCycleStageVariables) => {
      const response = await updateExistingTaskCycleStage(taskCycleId, stageId);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    onMutate: async ({ taskCycleId, cycleId, stageId }: UpdateTaskCycleStageVariables) => {
      const queryKey = taskQueryKeys.cycleByStage(cycleId);

      await queryClient.cancelQueries({ queryKey });

      const previousTasks = queryClient.getQueryData<CycleTaskWithUsers[]>(queryKey);

      queryClient.setQueryData<CycleTaskWithUsers[]>(queryKey, (tasks) =>
        tasks?.map((task) =>
          task.taskCycleId === taskCycleId
            ? {
                ...task,
                stage: { ...task.stage, id: stageId, stageId },
              }
            : task,
        ),
      );

      return { previousTasks, queryKey };
    },

    onError: (_, __, context) => {
      if (!context) return;

      queryClient.setQueryData(context.queryKey, context.previousTasks);
    },

    onSettled: (_, __, ___, context) => {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
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
    mutationFn: async ({ taskId, to }: MoveTaskVariables) => {
      const response = await moveTaskToDestination(taskId, to);
      if (!response.success) throw new Error(response.message);
      return response.data;
    },

    onMutate: async ({ taskId, fromCycleId, to }: MoveTaskVariables) => {
      const isSameCycle = to.type === 'cycle' && to.cycleId === fromCycleId;

      if (!fromCycleId || isSameCycle) {
        return { sourceKey: null, previousSource: undefined };
      }

      const sourceKey = taskQueryKeys.cycleByStage(fromCycleId);
      await queryClient.cancelQueries({ queryKey: sourceKey });

      const previousSource = queryClient.getQueryData<CycleTaskWithUsers[]>(sourceKey);

      queryClient.setQueryData<CycleTaskWithUsers[]>(sourceKey, (tasks) =>
        tasks?.filter((t) => t.id !== taskId),
      );

      return { sourceKey, previousSource };
    },

    onError: (_, __, ctx) => {
      if (ctx?.sourceKey) {
        queryClient.setQueryData(ctx.sourceKey, ctx.previousSource);
      }
    },

    onSettled: (_, __, { projectId, fromCycleId, to }) => {
      const cycleIds = [fromCycleId, to.type === 'cycle' ? to.cycleId : null].filter(
        (id): id is string => !!id,
      );

      cycleIds.forEach((id) => {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.cycleByStage(id),
        });
      });

      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.backlog(projectId),
      });
    },
  });
};

export const useMoveTasksAcrossCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tasks, to }: MoveTasksVariables) => {
      const response = await moveMultipleTasksToDestination(
        tasks.map((t) => t.taskId),
        to,
      );
      if (!response.success) throw new Error(response.message);
      return response.data;
    },

    onSettled: (_, __, { projectId, tasks, to }) => {
      const cycleIds = new Set<string>();
      tasks.forEach((t) => t.fromCycleId && cycleIds.add(t.fromCycleId));
      if (to.type === 'cycle') cycleIds.add(to.cycleId);

      cycleIds.forEach((id) => {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.cycleByStage(id),
        });
      });

      queryClient.invalidateQueries({ queryKey: taskCycleQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.backlog(projectId),
      });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
