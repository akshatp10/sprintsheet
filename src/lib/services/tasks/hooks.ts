import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createNewTask,
	getAllCycleTasks,
	getAllProjectBacklogTasks,
	getAllProjectTasks,
	updateExistingTask,
} from "./api";

import type {
	CreateTaskInput,
	CycleTaskWithUsers,
	UpdateTaskVariables,
} from "./types";
import { getUsers } from "../users/api";
import type { User } from "../users/types";

export const taskQueryKeys = {
	all: ["tasks"] as const,

	project: (projectId: string) =>
		[...taskQueryKeys.all, "project", projectId] as const,

	cycle: (cycleId: string) =>
		[...taskQueryKeys.all, "cycle", cycleId] as const,

	backlog: (projectId: string) =>
		[...taskQueryKeys.all, "backlog", projectId] as const,

	cycleByStage: (cycleId: string) =>
		[...taskQueryKeys.cycle(cycleId), "by-stage"] as const,
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

export const useTasksByStage = (cycleId: string) => {
	return useQuery({
		queryKey: taskQueryKeys.cycleByStage(cycleId),

		queryFn: async () => {
			const response = await getAllCycleTasks(cycleId);

			if (!response.success) {
				throw new Error(response.message);
			}

			const tasks = response.data ?? [];

			const userIds = [
				...new Set(tasks.flatMap((task) => task.assigneeIds)),
			];

			const userResponse = await getUsers(userIds);

			if (!userResponse.success) {
				throw new Error(userResponse.message);
			}

			const users = userResponse.data ?? [];

			const usersById = new Map(users.map((user) => [user.id, user]));

			return tasks.map((task) => ({
				...task,

				assignees: task.assigneeIds
					.map((id) => usersById.get(id))
					.filter((user): user is User => user !== undefined),
			}));
		},

		enabled: !!cycleId,

		select: (tasks) =>
			tasks.reduce<Record<string, CycleTaskWithUsers[]>>((acc, task) => {
				const stageId = task.stage.id;

				(acc[stageId] ??= []).push(task);
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

		onSuccess: (_, variables) => {
			const { projectId } = variables;

			queryClient.invalidateQueries({
				queryKey: taskQueryKeys.project(projectId),
			});
		},
	});
};
