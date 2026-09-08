import db from "../db";
import type { ProjectRow } from "../db";
import { createProjectStage, findOrCreateStage } from "./stageFunctions";
import { findOrCreateUser } from "./userFunctions";

const CURRENT_USER_EMAIL = "akshat@company.com";

interface CreateProjectRow {
	name: string;
	description?: string;
	cycleLength: ProjectRow["cycleLength"];
	startingDay?: string;
	autoCycle: boolean;

	invitedPeople?: {
		email: string;
		role: "member" | "admin";
	}[];

	stages: {
		name: string;
		order: number;
	}[];
}

export const createProject = async (
	input: CreateProjectRow,
): Promise<ProjectRow> => {
	const now = Date.now();

	const project: ProjectRow = {
		id: crypto.randomUUID(),
		name: input.name,
		description: input.description ?? "",
		cycleLength: input.cycleLength,
		startingDay: input.startingDay ?? "",
		autoCycle: input.autoCycle,
		isArchived: false,
		createdAt: now,
		updatedAt: now,
	};

	await db.transaction(
		"rw",
		db.projects,
		db.users,
		db.projectMembers,
		db.stages,
		db.projectStages,
		async () => {
			// Create project
			await db.projects.add(project);

			// Create/find owner
			const owner = await findOrCreateUser(CURRENT_USER_EMAIL);

			await db.projectMembers.add({
				id: crypto.randomUUID(),
				projectId: project.id,
				userId: owner.id,
				role: "admin",
				createdAt: now,
				updatedAt: now,
			});

			// Add invited members
			for (const person of input.invitedPeople ?? []) {
				const user = await findOrCreateUser(person.email);

				await db.projectMembers.add({
					id: crypto.randomUUID(),
					projectId: project.id,
					userId: user.id,
					role: person.role,
					createdAt: now,
					updatedAt: now,
				});
			}

			// Create/reuse global stages
			for (const stageInput of input.stages) {
				const stage = await findOrCreateStage(stageInput.name);

				await createProjectStage(project.id, stage, stageInput.order);
			}
		},
	);

	return project;
};

export const getProjectById = (id: string) => db.projects.get(id);

export const getAllProjectsByUser = async (
	includeArchived = false,
): Promise<ProjectRow[]> => {
	const all = await db.projects.orderBy("createdAt").reverse().toArray();

	return includeArchived ? all : all.filter((p) => !p.isArchived);
};
