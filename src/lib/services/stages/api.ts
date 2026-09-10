import { getProjectStages } from "@/lib/db/dbFunctions/stageFunctions";
import type { ApiResponse } from "../types";
import type { ProjectStageRow } from "@/lib/db/db";

export const getStagesForProject = async (
	projectId: string,
): Promise<ApiResponse<ProjectStageRow[]>> => {
	try {
		const stages = await getProjectStages(projectId);

		return {
			status: 200,
			success: true,
			message: "Successfully fetched stages",
			data: stages,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};
