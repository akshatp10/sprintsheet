// lib/services/projects/hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createNewProject,
	getAllUserProjects,
	getProject,
	getProjectMembers,
} from "./api";
import type { CreateProjectInput } from "./types";

export const projectQueryKeys = {
	all: ["projects"] as const,

	list: (includeArchived: boolean) =>
		[...projectQueryKeys.all, includeArchived] as const,

	detail: (projectId: string) =>
		[...projectQueryKeys.all, projectId] as const,

	members: (projectId: string) =>
		[...projectQueryKeys.all, "members", projectId] as const,
};

export const useProjects = (includeArchived: boolean = false) => {
	return useQuery({
		queryKey: projectQueryKeys.list(includeArchived),
		queryFn: async () => {
			const response = await getAllUserProjects(includeArchived);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data ?? [];
		},
	});
};

export const useSingleProject = (projectId: string) => {
	return useQuery({
		queryKey: projectQueryKeys.detail(projectId),
		queryFn: async () => {
			const response = await getProject(projectId);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},
	});
};

export const projectMembersQuery = (projectId: string) => ({
	queryKey: projectQueryKeys.members(projectId),
	queryFn: async () => {
		const response = await getProjectMembers(projectId);

		if (!response.success) {
			throw new Error(response.message);
		}

		return response.data ?? [];
	},
	enabled: !!projectId,
});

export const useProjectMembers = (projectId: string) => {
	return useQuery(projectMembersQuery(projectId));
};

export const useCreateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateProjectInput) => {
			const response = await createNewProject(input);
			if (!response.success) throw new Error(response.message);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: projectQueryKeys.all,
			});
		},
	});
};
