import db from "../db";

import type { TaskRow } from "../db";
type UpdateTaskInput = Partial<Omit<TaskRow, "id" | "createdAt" | "updatedAt">>;

interface CreateTaskRow {
	projectId: string;
	stageId: string;
	name: string;
	description?: string;
	assigneeIds?: string[];
	dueDate?: string | null;
	type: string;
	tags?: string[];
}

export const createTask = async (input: CreateTaskRow): Promise<TaskRow> => {
	const now = Date.now();

	const task: TaskRow = {
		id: crypto.randomUUID(),
		projectId: input.projectId,
		stageId: input.stageId,
		name: input.name,
		description: input.description ?? "",
		assigneeIds: input.assigneeIds ?? [],
		dueDate: input.dueDate ?? null,
		type: input.type,
		tags: input.tags ?? [],
		createdAt: now,
		updatedAt: now,
	};

	await db.tasks.add(task);

	return task;
};

export const getAllTasksByProject = async (
	projectId: string,
): Promise<TaskRow[]> => {
	return db.tasks.where("projectId").equals(projectId).sortBy("createdAt");
};

export const updateTask = async (
	id: string,
	updates: UpdateTaskInput,
): Promise<TaskRow | undefined> => {
	const updatedAt = Date.now();

	await db.tasks.update(id, {
		...updates,
		updatedAt,
	});

	return db.tasks.get(id);
};
