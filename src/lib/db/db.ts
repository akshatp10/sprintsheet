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
	createdAt: number;
	updatedAt: number;
}

interface ProjectMemberRow {
	id: string;
	projectId: string;
	userId: string;
	role: "member" | "admin";
	createdAt: number;
	updatedAt: number;
}

interface StageRow {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
}

interface ProjectStageRow {
	id: string;
	projectId: string;
	stageId: string;
	order: number;
	name: string;
	createdAt: number;
	updatedAt: number;
}

const db = new Dexie("SprintsheetDB") as Dexie & {
	projects: EntityTable<ProjectRow, "id">;
	users: EntityTable<UserRow, "id">;
	projectMembers: EntityTable<ProjectMemberRow, "id">;
	stages: EntityTable<StageRow, "id">;
	projectStages: EntityTable<ProjectStageRow, "id">;
};

db.version(1).stores({
	projects: "id, name, createdAt",
	users: "id, email",
	projectMembers: "id, projectId, userId, [projectId+userId]",
	stages: "id, &name, createdAt",
	projectStages:
		"id, projectId, stageId, [projectId+stageId], [projectId+order]",
});

export default db;

export type {
	ProjectRow,
	UserRow,
	ProjectMemberRow,
	StageRow,
	ProjectStageRow,
};
