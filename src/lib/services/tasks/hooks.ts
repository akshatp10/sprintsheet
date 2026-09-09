import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewTask, getAllProjectTasks } from "./api";
import type { CreateTaskInput } from "./types";

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
		onSuccess: (_, variable) => {
			queryClient.invalidateQueries({
				queryKey: ["tasks", variable.projectId],
			});
		},
	});
};
