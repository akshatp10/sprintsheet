import db from "../db";
import type { UserRow } from "../db";

export const findOrCreateUser = async (
	email: string,
	name?: string,
): Promise<UserRow> => {
	const existing = await db.users.where("email").equals(email).first();

	if (existing) {
		return existing;
	}

	const now = Date.now();

	const user: UserRow = {
		id: crypto.randomUUID(),
		email,
		name: name ?? email.split("@")[0],
		createdAt: now,
		updatedAt: now,
	};

	await db.users.add(user);

	return user;
};

export const getUserById = (id: string) => db.users.get(id);

export const getUsersByIds = async (ids: string[]): Promise<UserRow[]> => {
	if (ids.length === 0) {
		return [];
	}
	const users = await db.users.bulkGet(ids);
	return users.filter((user): user is UserRow => user !== undefined);
};

export const getProjectMemberRows = (projectId: string) =>
	db.projectMembers.where("projectId").equals(projectId).toArray();
