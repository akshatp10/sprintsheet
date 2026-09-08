import { useQuery } from "@tanstack/react-query";
import { getAllUserProjects, getProjectMembers } from "./api";

export const useProjects = (includeArchived: boolean = false) => {
	return useQuery({
		queryKey: ["projects", includeArchived],

		queryFn: async () => {
			const response = await getAllUserProjects(includeArchived);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data ?? [];
		},
	});
};

export const projectMembersQuery = (projectId: string) => ({
	queryKey: ["projects", "projectMembers", projectId],
	queryFn: async () => {
		const response = await getProjectMembers(projectId);

		if (!response.success) {
			throw new Error(response.message);
		}

		return response.data ?? [];
	},
});
