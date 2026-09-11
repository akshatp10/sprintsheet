import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createNewTask, getAllProjectTasks, updateExistingTask } from "./api";

import type { CreateTaskInput, UpdateTaskVariables } from "./types";

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

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["tasks", variables.projectId],
			});
		},
	});
};
