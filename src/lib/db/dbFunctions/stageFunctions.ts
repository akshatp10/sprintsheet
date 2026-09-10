import db from "../db";
import type { ProjectStageRow, StageRow } from "../db";

export const findOrCreateStage = async (name: string): Promise<StageRow> => {
	const existing = await db.stages.where("name").equals(name).first();

	if (existing) {
		return existing;
	}

	const now = Date.now();

	const stage: StageRow = {
		id: crypto.randomUUID(),
		name,
		createdAt: now,
		updatedAt: now,
	};

	await db.stages.add(stage);

	return stage;
};

export const createProjectStage = async (
	projectId: string,
	stage: StageRow,
	order: number,
): Promise<ProjectStageRow> => {
	const now = Date.now();

	const projectStage: ProjectStageRow = {
		id: crypto.randomUUID(),
		projectId,
		stageId: stage.id,
		order,
		name: stage.name,
		createdAt: now,
		updatedAt: now,
	};

	await db.projectStages.add(projectStage);

	return projectStage;
};

export const getProjectStages = async (
	projectId: string,
): Promise<ProjectStageRow[]> => {
	return db.projectStages
		.where("projectId")
		.equals(projectId)
		.sortBy("order");
};
