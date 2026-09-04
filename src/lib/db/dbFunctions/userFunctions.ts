import db, { type User } from "../db";

export const findOrCreateUser = async (
	email: string,
	name?: string,
): Promise<User> => {
	const existing = await db.users.where("email").equals(email).first();
	if (existing) return existing;

	const user: User = {
		id: crypto.randomUUID(),
		email,
		name: name ?? email.split("@")[0],
	};
	await db.users.add(user);
	return user;
};

export const getAllUsers = () => db.users.toArray();
