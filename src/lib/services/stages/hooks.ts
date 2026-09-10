import { useQuery } from "@tanstack/react-query";
import { getStagesForProject } from "./api";

export const projectStagesQuery = (projectId: string) => ({
	queryKey: ["projects", "projectStages", projectId],
	queryFn: async () => {
		const response = await getStagesForProject(projectId);

		if (!response.success) {
			throw new Error(response.message);
		}

		return response.data ?? [];
	},
	enabled: !!projectId,
});

export const useProjectStages = (projectId: string) => {
	return useQuery(projectStagesQuery(projectId));
};
