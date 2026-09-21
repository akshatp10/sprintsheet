import db from "../db";

import type { TaskCycleRow } from "../db";

interface CreateTaskCycleInput {
	taskId: string;
	cycleId: string;
	stageId: string;
}

export const createTaskCycle = async (
	input: CreateTaskCycleInput,
): Promise<TaskCycleRow> => {
	const [task, cycle, projectStage] = await Promise.all([
		db.tasks.get(input.taskId),
		db.cycles.get(input.cycleId),
		db.projectStages.get(input.stageId),
	]);

	if (!task) {
		throw new Error("Task not found");
	}

	if (!cycle) {
		throw new Error("Cycle not found");
	}

	if (!projectStage) {
		throw new Error("Project stage not found");
	}

	if (task.projectId !== cycle.projectId) {
		throw new Error("Task and cycle belong to different projects");
	}

	if (projectStage.projectId !== cycle.projectId) {
		throw new Error("Stage does not belong to cycle project");
	}

	const existing = await db.taskCycles
		.where("[cycleId+taskId]")
		.equals([input.cycleId, input.taskId])
		.first();

	if (existing) {
		return existing;
	}

	const now = Date.now();

	const taskCycle: TaskCycleRow = {
		id: crypto.randomUUID(),
		taskId: input.taskId,
		cycleId: input.cycleId,
		stageId: input.stageId,
		createdAt: now,
		updatedAt: now,
	};

	await db.taskCycles.add(taskCycle);

	return taskCycle;
};

export const updateTaskCycle = async (
	id: string,
	stageId: string,
): Promise<TaskCycleRow | undefined> => {
	const existing = await db.taskCycles.get(id);

	if (!existing) {
		return undefined;
	}

	await db.taskCycles.update(id, {
		stageId,
		updatedAt: Date.now(),
	});

	return db.taskCycles.get(id);
};

export const getTaskCyclesByCycle = async (
	cycleId: string,
): Promise<TaskCycleRow[]> => {
	return db.taskCycles.where("cycleId").equals(cycleId).toArray();
};

export const getTaskCyclesByTask = async (
	taskId: string,
): Promise<TaskCycleRow[]> => {
	return db.taskCycles.where("taskId").equals(taskId).toArray();
};
