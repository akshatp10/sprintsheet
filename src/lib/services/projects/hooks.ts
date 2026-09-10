// lib/services/projects/hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewProject, getAllUserProjects, getProjectMembers } from "./api";
import type { CreateProjectInput } from "./types";

export const useProjects = (includeArchived: boolean = false) => {
	return useQuery({
		queryKey: ["projects", includeArchived],
		queryFn: async () => {
			const response = await getAllUserProjects(includeArchived);
			if (!response.success) throw new Error(response.message);
			return response.data ?? [];
		},
	});
};

export const projectMembersQuery = (projectId: string) => ({
	queryKey: ["projects", "projectMembers", projectId],
	queryFn: async () => {
		const response = await getProjectMembers(projectId);
		if (!response.success) throw new Error(response.message);
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
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
};
