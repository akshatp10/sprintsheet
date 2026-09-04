import db from "../db";
import type { UserRow } from "../db";

export const findOrCreateUser = async (
	email: string,
	name?: string,
): Promise<UserRow> => {
	const existing = await db.users.where("email").equals(email).first();
	if (existing) return existing;

	const user: UserRow = {
		id: crypto.randomUUID(),
		email,
		name: name ?? email.split("@")[0],
	};
	await db.users.add(user);
	return user;
};

export const getUserById = (id: string) => db.users.get(id);

export const getUsersByIds = (ids: string[]) => db.users.bulkGet(ids);

export const getProjectMemberRows = (projectId: string) =>
	db.projectMembers.where("projectId").equals(projectId).toArray();
