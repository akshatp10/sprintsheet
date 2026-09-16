import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createNewTaskCycle,
	getCycleTaskCycles,
	getTaskTaskCycles,
	updateExistingTaskCycle,
} from "./api";

import type { CreateTaskCycleInput } from "./types";

export interface UpdateTaskCycleVariables {
	id: string;
	taskId: string;
	cycleId: string;
	stageId: string;
}

export const taskCycleQueryKeys = {
	all: ["taskCycles"] as const,

	cycle: (cycleId: string) =>
		[...taskCycleQueryKeys.all, "cycle", cycleId] as const,

	task: (taskId: string) =>
		[...taskCycleQueryKeys.all, "task", taskId] as const,
};

export const useTaskCyclesByCycle = (cycleId: string) => {
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

export const useTaskCyclesByTask = (taskId: string) => {
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

export const useUpdateTaskCycle = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, stageId }: UpdateTaskCycleVariables) => {
			const response = await updateExistingTaskCycle(id, stageId);

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
