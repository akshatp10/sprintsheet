import Dexie, { type EntityTable } from "dexie";

interface ProjectRow {
	id: string;
	key: string;
	nextTaskNumber: number;
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
	isTerminal: boolean;
}

interface TypeRow {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
}

interface ProjectTypeRow {
	id: string;
	projectId: string;
	typeId: string;
	createdAt: number;
	updatedAt: number;
}

interface TaskRow {
	id: string;
	projectId: string;
	key: string;
	typeId: string;
	name: string;
	description: string;
	assigneeIds: string[];
	dueDate: string | null;
	tags: string[];
	isBacklog: 0 | 1;
	createdAt: number;
	updatedAt: number;
}

interface CycleRow {
	id: string;
	projectId: string;
	name: string;
	startDate: string;
	endDate: string;
	createdAt: number;
	updatedAt: number;
}

interface TaskCycleRow {
	id: string;
	taskId: string;
	cycleId: string;
	stageId: string;
	createdAt: number;
	updatedAt: number;
}

const db = new Dexie("SprintsheetDB") as Dexie & {
	projects: EntityTable<ProjectRow, "id">;
	users: EntityTable<UserRow, "id">;
	projectMembers: EntityTable<ProjectMemberRow, "id">;
	stages: EntityTable<StageRow, "id">;
	projectStages: EntityTable<ProjectStageRow, "id">;
	types: EntityTable<TypeRow, "id">;
	projectTypes: EntityTable<ProjectTypeRow, "id">;
	tasks: EntityTable<TaskRow, "id">;
	cycles: EntityTable<CycleRow, "id">;
	taskCycles: EntityTable<TaskCycleRow, "id">;
};

/**
 * Version 1
 *
 * Original Sprintsheet database schema.
 */
db.version(1).stores({
	projects: "id, name, createdAt",
	users: "id, email",
	projectMembers: "id, projectId, userId, [projectId+userId]",
	stages: "id, &name, createdAt",
	projectStages:
		"id, projectId, stageId, [projectId+stageId], [projectId+order]",
	types: "id, &name, createdAt",
	projectTypes: "id, projectId, typeId, [projectId+typeId]",
	tasks: "id, projectId, stageId, typeId, createdAt, updatedAt",
});

/**
 * Version 2
 *
 * Tasks are now independent of stages/cycles.
 * Cycle-specific stage information is stored in taskCycles.
 */
db.version(2)
	.stores({
		projects: "id, name, createdAt",
		users: "id, email",
		projectMembers: "id, projectId, userId, [projectId+userId]",
		stages: "id, &name, createdAt",
		projectStages:
			"id, projectId, stageId, [projectId+stageId], [projectId+order]",
		types: "id, &name, createdAt",
		projectTypes: "id, projectId, typeId, [projectId+typeId]",
		tasks: "id, projectId, typeId, isBacklog, [projectId+isBacklog], createdAt, updatedAt",
		cycles: "id, projectId, startDate, endDate, createdAt",
		taskCycles: "id, taskId, cycleId, [cycleId+taskId]",
	})
	.upgrade((tx) => {
		return tx
			.table("tasks")
			.toCollection()
			.modify((task) => {
				// Existing v1 tasks were not associated with cycles.
				// Under the v2 model, those tasks belong to backlog.
				task.isBacklog = 1;

				// Stage is now cycle-specific and therefore belongs
				// to TaskCycleRow instead of TaskRow.
				delete task.stageId;
			});
	});

export default db;

export type {
	ProjectRow,
	UserRow,
	ProjectMemberRow,
	StageRow,
	ProjectStageRow,
	TypeRow,
	ProjectTypeRow,
	TaskRow,
	CycleRow,
	TaskCycleRow,
};
