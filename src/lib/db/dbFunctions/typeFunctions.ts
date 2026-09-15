import db from "../db";

import type { TypeRow, ProjectTypeRow } from "../db";

export const DEFAULT_TYPES = [
	"task",
	"bug",
	"feature",
	"improvement",
	"refactor",
	"migration",
	"update",
];

export const findOrCreateType = async (name: string): Promise<TypeRow> => {
	const existing = await db.types.where("name").equals(name).first();

	if (existing) {
		return existing;
	}

	const now = Date.now();

	const type: TypeRow = {
		id: crypto.randomUUID(),
		name,
		createdAt: now,
		updatedAt: now,
	};

	await db.types.add(type);

	return type;
};

export const createProjectType = async (
	projectId: string,
	typeId: string,
): Promise<ProjectTypeRow> => {
	const now = Date.now();

	const projectType: ProjectTypeRow = {
		id: crypto.randomUUID(),
		projectId,
		typeId,
		createdAt: now,
		updatedAt: now,
	};

	await db.projectTypes.add(projectType);

	return projectType;
};
