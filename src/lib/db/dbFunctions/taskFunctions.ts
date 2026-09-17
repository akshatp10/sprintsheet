import db from "../db";

import type { TaskCycleRow, TaskRow } from "../db";
type UpdateTaskInput = Partial<Omit<TaskRow, "id" | "createdAt" | "updatedAt">>;

interface CreateTaskRow {
	projectId: string;
	name: string;
	description?: string;
	assigneeIds?: string[];
	dueDate?: string | null;
	typeId: string;
	tags?: string[];
	cycle?: {
		id: string;
		stageId: string;
	};
}

export const createTask = async (input: CreateTaskRow): Promise<TaskRow> => {
	return db.transaction(
		"rw",
		[
			db.projects,
			db.projectTypes,
			db.tasks,
			db.cycles,
			db.projectStages,
			db.taskCycles,
		],
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
				name: input.name,
				description: input.description ?? "",
				assigneeIds: input.assigneeIds ?? [],
				dueDate: input.dueDate ?? null,
				typeId: input.typeId,
				tags: input.tags ?? [],
				isBacklog: input.cycle?.id ? 0 : 1,
				createdAt: now,
				updatedAt: now,
			};

			await db.tasks.add(task);

			await db.projects.update(project.id, {
				nextTaskNumber: taskNumber + 1,
				updatedAt: now,
			});

			if (input.cycle) {
				const cycle = await db.cycles.get(input.cycle.id);

				if (!cycle) {
					throw new Error("Cycle not found");
				}

				if (cycle.projectId !== input.projectId) {
					throw new Error("Cycle does not belong to this project");
				}

				const projectStage = await db.projectStages.get(
					input.cycle.stageId,
				);

				if (!projectStage) {
					throw new Error("Project stage not found");
				}

				if (projectStage.projectId !== input.projectId) {
					throw new Error("Stage does not belong to this project");
				}

				const newTaskCycle: TaskCycleRow = {
					id: crypto.randomUUID(),
					taskId: task.id,
					cycleId: input.cycle.id,
					stageId: input.cycle.stageId,
					createdAt: now,
					updatedAt: now,
				};

				await db.taskCycles.add(newTaskCycle);
			}
			return task;
		},
	);
};

export const getAllTasksByProject = async (
	projectId: string,
): Promise<TaskRow[]> => {
	return db.tasks.where("projectId").equals(projectId).sortBy("createdAt");
};

export const getBacklogTasksByProject = async (
	projectId: string,
): Promise<TaskRow[]> => {
	return db.tasks
		.where("[projectId+isBacklog]")
		.equals([projectId, 1])
		.sortBy("createdAt");
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
