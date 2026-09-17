import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createNewTask,
	getAllProjectBacklogTasks,
	getAllProjectTasks,
	updateExistingTask,
} from "./api";

import type { CreateTaskInput, Task, UpdateTaskVariables } from "./types";

export const taskQueryKeys = {
	all: ["tasks"] as const,

	project: (projectId: string) =>
		[...taskQueryKeys.all, "project", projectId] as const,

	cycle: (cycleId: string) =>
		[...taskQueryKeys.all, "cycle", cycleId] as const,

	backlog: (projectId: string) =>
		[...taskQueryKeys.all, "backlog", projectId] as const,
};

export const useTasks = (projectId: string) => {
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

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateTaskInput) => {
			const response = await createNewTask(input);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: taskQueryKeys.project(variables.projectId),
			});
			queryClient.invalidateQueries({
				queryKey: taskQueryKeys.backlog(variables.projectId),
			});
			if (variables.cycle) {
				queryClient.invalidateQueries({
					queryKey: taskQueryKeys.cycle(variables.cycle.id),
				});
			}
		},
	});
};

export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, updates }: UpdateTaskVariables) => {
			const response = await updateExistingTask(id, updates);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},

		onMutate: async ({ id, projectId, updates }) => {
			const queryKey = taskQueryKeys.project(projectId);

			await queryClient.cancelQueries({
				queryKey,
			});

			const previousTasks = queryClient.getQueryData<Task[]>(queryKey);

			queryClient.setQueryData<Task[]>(queryKey, (tasks) => {
				if (!tasks) {
					return tasks;
				}

				return tasks.map((task) =>
					task.id === id ? { ...task, ...updates } : task,
				);
			});

			return {
				previousTasks,
				queryKey,
			};
		},

		onError: (_, __, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(context.queryKey, context.previousTasks);
		},

		onSettled: (_, __, ___, context) => {
			if (!context) {
				return;
			}

			queryClient.invalidateQueries({
				queryKey: context.queryKey,
			});
		},

		onSuccess: (_, variables) => {
			const { id } = variables;

			requestAnimationFrame(() => {
				const element = document.getElementById(`task-${id}`);

				element?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			});
		},
	});
};
