import { useQuery } from "@tanstack/react-query";
import { getStagesForProject } from "./api";

export const stageQueryKeys = {
	all: ["stages"] as const,
	project: (projectId: string) => [...stageQueryKeys.all, projectId] as const,
};

export const useProjectStages = (projectId: string) => {
	return useQuery({
		queryKey: stageQueryKeys.project(projectId),
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
