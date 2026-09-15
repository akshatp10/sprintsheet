import { useQuery } from "@tanstack/react-query";
import { getProjectTypesById, getTypeById } from "./api";

export const useProjectTypes = (projectId: string) => {
	return useQuery({
		queryKey: ["types", projectId],
		queryFn: async () => {
			const response = await getProjectTypesById(projectId);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data ?? [];
		},
		enabled: !!projectId,
	});
};

export const useTypeById = (typeId: string) => {
	return useQuery({
		queryKey: ["type", typeId],
		queryFn: async () => {
			const response = await getTypeById(typeId);

			if (!response.success) {
				throw new Error(response.message);
			}

			return response.data;
		},
		enabled: !!typeId,
	});
};
