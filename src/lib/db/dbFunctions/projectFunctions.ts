import db, { type Project } from "../db";
import { findOrCreateUser } from "./userFunctions";

type NewProjectInput = {
	name: string;
	description?: string;
	cycleLength: Project["cycleLength"];
	startingDay?: string;
	autoCycle: boolean;
};

type InvitedPerson = {
	email: string;
	role: "member" | "admin";
};

export const createProject = async (
	data: NewProjectInput,
	ownerEmail: string,
	invitedPeople: InvitedPerson[] = [],
): Promise<Project> => {
	const now = Date.now();

	const project: Project = {
		id: crypto.randomUUID(),
		name: data.name,
		description: data.description ?? "",
		cycleLength: data.cycleLength,
		startingDay: data.startingDay ?? "",
		autoCycle: data.autoCycle,
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

			const owner = await findOrCreateUser(ownerEmail);
			await db.projectMembers.add({
				id: crypto.randomUUID(),
				projectId: project.id,
				userId: owner.id,
				role: "admin",
			});

			for (const person of invitedPeople) {
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

export const getProject = (id: string) => db.projects.get(id);

export const getAllProjects = async (
	includeArchived = false,
): Promise<Project[]> => {
	const all = await db.projects.orderBy("createdAt").reverse().toArray();
	return includeArchived ? all : all.filter((p) => !p.isArchived);
};
