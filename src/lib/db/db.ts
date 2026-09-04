import Dexie, { type EntityTable } from "dexie";

interface ProjectRow {
	id: string;
	name: string;
	description: string;
	cycleLength: "default" | "custom" | "nocycle";
	startingDay: string;
	autoCycle: boolean;
	isArchived: boolean;
	createdAt: number;
	updatedAt: number;
}

interface UserRow {
	id: string;
	name: string;
	email: string;
}

interface ProjectMemberRow {
	id: string;
	projectId: string;
	userId: string;
	role: "member" | "admin";
}

const db = new Dexie("SprintsheetDB") as Dexie & {
	projects: EntityTable<ProjectRow, "id">;
	users: EntityTable<UserRow, "id">;
	projectMembers: EntityTable<ProjectMemberRow, "id">;
};

db.version(1).stores({
	projects: "id, name, createdAt",
	users: "id, email",
	projectMembers: "id, projectId, userId, [projectId+userId]",
});

export default db;
export type { ProjectRow, UserRow, ProjectMemberRow };
