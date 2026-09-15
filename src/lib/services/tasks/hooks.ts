import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createNewTask, getAllProjectTasks, updateExistingTask } from "./api";

import type {
	CreateTaskInput,
	TaskWithUsers,
	UpdateTaskVariables,
} from "./types";
import { getUsers } from "../users/api";
import type { User } from "../users/types";

export const useTasks = (projectId: string) => {
	return useQuery({
		queryKey: ["tasks", projectId],
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

export const useTasksByStage = (projectId: string) => {
	return useQuery({
		queryKey: ["tasks", projectId, "by-stage"],

		queryFn: async () => {
			const taskResponse = await getAllProjectTasks(projectId);

			if (!taskResponse.success) {
				throw new Error(taskResponse.message);
			}

			const tasks = taskResponse.data ?? [];

			const userIds = [
				...new Set(tasks.flatMap((task) => task.assigneeIds)),
			];

			const userResponse = await getUsers(userIds);

			if (!userResponse.success) {
				throw new Error(userResponse.message);
			}

			const users = userResponse.data ?? [];

			const usersById = new Map(users.map((user) => [user.id, user]));

			const tasksWithUsers = tasks.map((task) => ({
				...task,
				assignees: task.assigneeIds
					.map((id) => usersById.get(id))
					.filter((user): user is User => user !== undefined),
			}));

			return tasksWithUsers;
		},

		enabled: !!projectId,

		select: (tasks) =>
			tasks.reduce<Record<string, TaskWithUsers[]>>((acc, task) => {
				(acc[task.stageId] ??= []).push(task);
				return acc;
			}, {}),
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
				queryKey: ["tasks", variables.projectId],
			});
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
			const queryKey = ["tasks", projectId, "by-stage"];

			// Stop an in-flight refetch from overwriting our optimistic update.
			await queryClient.cancelQueries({ queryKey });

			// Save the current cache for rollback.
			const previousTasks =
				queryClient.getQueryData<TaskWithUsers[]>(queryKey);

			// Update the cached task immediately.
			queryClient.setQueryData<TaskWithUsers[]>(queryKey, (tasks) => {
				if (!tasks) return tasks;

				return tasks.map((task) =>
					task.id === id ? { ...task, ...updates } : task,
				);
			});

			return { previousTasks, queryKey };
		},

		onError: (_, __, context) => {
			if (!context) return;

			queryClient.setQueryData(context.queryKey, context.previousTasks);
		},

		onSettled: (_, __, ___, context) => {
			if (!context) return;

			queryClient.invalidateQueries({
				queryKey: context.queryKey,
			});
		},
	});
};
