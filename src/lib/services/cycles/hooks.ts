import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	createNewCycle,
	deleteExistingCycle,
	getCycle,
	getProjectCycles,
	updateExistingCycle,
} from "./api";

import type { CreateCycleInput, UpdateCycleInput } from "./types";

export interface UpdateCycleVariables {
	id: string;
	projectId: string;
	updates: UpdateCycleInput;
}

export interface DeleteCycleVariables {
	id: string;
	projectId: string;
}

export const cycleQueryKeys = {
	all: ["cycles"] as const,

	project: (projectId: string) =>
		[...cycleQueryKeys.all, "project", projectId] as const,

	detail: (cycleId: string) =>
		[...cycleQueryKeys.all, "detail", cycleId] as const,
};

//Getting all the cycles of projects
export const useCycles = (projectId: string) => {
	return useQuery({
		queryKey: cycleQueryKeys.project(projectId),

		queryFn: async () => {
			const response = await getProjectCycles(projectId);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data ?? [];
		},

		enabled: !!projectId,
	});
};

//Getting single cycle
export const useCycle = (cycleId: string) => {
	return useQuery({
		queryKey: cycleQueryKeys.detail(cycleId),

		queryFn: async () => {
			const response = await getCycle(cycleId);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},

		enabled: !!cycleId,
	});
};

//Creating new cycle
export const useCreateCycle = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateCycleInput) => {
			const response = await createNewCycle(input);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},

		onSuccess: (cycle, variables) => {
			queryClient.invalidateQueries({
				queryKey: cycleQueryKeys.project(variables.projectId),
			});

			return cycle;
		},
	});
};

//Updating a cycle
export const useUpdateCycle = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, updates }: UpdateCycleVariables) => {
			const response = await updateExistingCycle(id, updates);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},

		onSuccess: (cycle, variables) => {
			queryClient.invalidateQueries({
				queryKey: cycleQueryKeys.project(variables.projectId),
			});

			if (cycle) {
				queryClient.setQueryData(
					cycleQueryKeys.detail(cycle.id),
					cycle,
				);
			}
		},
	});
};

//Deleting a cycle
export const useDeleteCycle = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: DeleteCycleVariables) => {
			const response = await deleteExistingCycle(id);

			if (!response.success) {
				throw new Error(response.message);
			}
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: cycleQueryKeys.project(variables.projectId),
			});

			queryClient.removeQueries({
				queryKey: cycleQueryKeys.detail(variables.id),
			});
		},
	});
};
