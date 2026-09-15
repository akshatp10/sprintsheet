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
	typeId: string;
	tags?: string[];
}

export const createTask = async (input: CreateTaskRow): Promise<TaskRow> => {
	return db.transaction(
		"rw",
		db.projects,
		db.projectTypes,
		db.tasks,
		async () => {
			const project = await db.projects.get(input.projectId);

			if (!project) {
				throw new Error("Project not found");
			}

			const projectType = await db.projectTypes
				.where("[projectId+typeId]")
				.equals([input.projectId, input.typeId])
				.first();

			if (!projectType) {
				throw new Error("Type is not available in this project");
			}

			const taskNumber = project.nextTaskNumber;
			const now = Date.now();

			const task: TaskRow = {
				id: crypto.randomUUID(),
				projectId: input.projectId,
				key: `${project.key}-${String(taskNumber).padStart(3, "0")}`,
				stageId: input.stageId,
				name: input.name,
				description: input.description ?? "",
				assigneeIds: input.assigneeIds ?? [],
				dueDate: input.dueDate ?? null,
				typeId: input.typeId,
				tags: input.tags ?? [],
				createdAt: now,
				updatedAt: now,
			};

			await db.tasks.add(task);

			await db.projects.update(project.id, {
				nextTaskNumber: taskNumber + 1,
				updatedAt: now,
			});

			return task;
		},
	);
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
