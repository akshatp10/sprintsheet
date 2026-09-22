import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createNewTaskCycle,
	getCycleTaskCycles,
	getTaskTaskCycles,
	updateExistingTaskCycle,
} from "./api";

import type { CreateTaskCycleInput } from "./types";
import { taskQueryKeys } from "../tasks/hooks";
import type { CycleTaskWithUsers } from "../tasks/types";

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

		onMutate: async ({
			taskId,
			cycleId,
			stageId,
		}: UpdateTaskCycleVariables) => {
			const queryKey = taskQueryKeys.cycleByStage(cycleId);

			await queryClient.cancelQueries({
				queryKey,
			});

			const previousTasks =
				queryClient.getQueryData<CycleTaskWithUsers[]>(queryKey);

			queryClient.setQueryData<CycleTaskWithUsers[]>(
				queryKey,
				(tasks) => {
					if (!tasks) {
						return tasks;
					}

					return tasks.map((task) =>
						task.id === taskId
							? {
									...task,
									stage: {
										...task.stage,
										id: stageId,
										stageId,
									},
								}
							: task,
					);
				},
			);

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

		onSettled: (_, __, variables, context) => {
			if (!context) {
				return;
			}

			queryClient.invalidateQueries({
				queryKey: context.queryKey,
			});

			queryClient.invalidateQueries({
				queryKey: taskCycleQueryKeys.cycle(variables.cycleId),
			});

			queryClient.invalidateQueries({
				queryKey: taskCycleQueryKeys.task(variables.taskId),
			});
		},

		onSuccess: (_, variables) => {
			const { taskId } = variables;

			requestAnimationFrame(() => {
				const element = document.getElementById(`task-${taskId}`);

				element?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			});
		},
	});
};
