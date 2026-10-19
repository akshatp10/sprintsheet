import db from '../db';
import type { UserRow } from '../db';
import type { User, UserSummary } from '@/lib/services/users/types';

const CURRENT_USER_EMAIL = import.meta.env.VITE_CURRENT_USER_EMAIL;

const toUser = ({ id, name, email }: UserRow): User => ({ id, name, email });

// Exported so other db functions (e.g. task assignees) can reuse it.
export const toUserSummary = ({ id, name }: UserRow): UserSummary => ({ id, name });

export const findOrCreateUser = async (email: string, name?: string): Promise<UserRow> => {
  const existing = await db.users.where('email').equals(email).first();
  if (existing) return existing;

  const now = Date.now();

  const user: UserRow = {
    id: crypto.randomUUID(),
    email,
    name: name ?? email.split('@')[0],
    createdAt: now,
    updatedAt: now,
  };

  await db.users.add(user);

  return user;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const row = await db.users.get(id);
  return row && toUser(row);
};

// TODO : Placeholder until auth exists; later replaced by the backend's
export const getCurrentUser = async (): Promise<User> => {
  return toUser(await findOrCreateUser(CURRENT_USER_EMAIL));
};

export const getUsersByIds = async (ids: string[]): Promise<UserSummary[]> => {
  if (ids.length === 0) return [];

  const rows = await db.users.bulkGet(ids);
  return rows.filter((row): row is UserRow => row !== undefined).map(toUserSummary);
};

export const getUsersByProject = (projectId: string): Promise<UserSummary[]> =>
  db.transaction('r', [db.projectMembers, db.users], async () => {
    const members = await db.projectMembers.where('projectId').equals(projectId).toArray();
    return getUsersByIds(members.map((member) => member.userId));
  });

export const getProjectMemberRows = (projectId: string) =>
  db.projectMembers.where('projectId').equals(projectId).toArray();
