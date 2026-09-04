import Dexie, { type EntityTable } from "dexie";

export interface Project {
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

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface ProjectMember {
	id: string;
	projectId: string;
	userId: string;
	role: "member" | "admin";
}

const db = new Dexie("SprintsheetDB") as Dexie & {
	projects: EntityTable<Project, "id">;
	users: EntityTable<User, "id">;
	projectMembers: EntityTable<ProjectMember, "id">;
};

db.version(1).stores({
	projects: "id, name,updatedAt",
	users: "id, email",
	projectMembers: "id, projectId, userId, [projectId+userId]",
});

export default db;
