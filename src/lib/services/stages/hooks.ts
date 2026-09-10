import { useQuery } from "@tanstack/react-query";
import { getStagesForProject } from "./api";

export const useProjectStages = (projectId: string) => {
	return useQuery({
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
};
