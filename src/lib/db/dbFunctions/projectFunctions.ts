import db from "../db";
import type { ProjectRow } from "../db";
import { findOrCreateUser } from "./userFunctions";

const CURRENT_USER_EMAIL = "akshat@company.com"; // swap for real auth later

interface CreateProjectRow {
	name: string;
	description?: string;
	cycleLength: ProjectRow["cycleLength"];
	startingDay?: string;
	autoCycle: boolean;
	invitedPeople?: { email: string; role: "member" | "admin" }[];
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
		async () => {
			await db.projects.add(project);

			const owner = await findOrCreateUser(CURRENT_USER_EMAIL);
			await db.projectMembers.add({
				id: crypto.randomUUID(),
				projectId: project.id,
				userId: owner.id,
				role: "admin",
			});

			for (const person of input.invitedPeople ?? []) {
				const user = await findOrCreateUser(person.email);
				await db.projectMembers.add({
					id: crypto.randomUUID(),
					projectId: project.id,
					userId: user.id,
					role: person.role,
				});
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
