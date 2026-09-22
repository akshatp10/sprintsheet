import db from "../db";
import type { CycleRow } from "../db";

interface CreateCycleInput {
	projectId: string;
	name: string;
	startDate: string;
	endDate: string;
}

type UpdateCycleInput = Partial<
	Omit<CycleRow, "id" | "projectId" | "createdAt" | "updatedAt">
>;

export const createCycle = async (
	input: CreateCycleInput,
): Promise<CycleRow> => {
	const project = await db.projects.get(input.projectId);

	if (!project) {
		throw new Error("Project not found");
	}

	const now = Date.now();

	const cycle: CycleRow = {
		id: crypto.randomUUID(),
		projectId: input.projectId,
		name: input.name,
		startDate: input.startDate,
		endDate: input.endDate,
		createdAt: now,
		updatedAt: now,
	};

	await db.cycles.add(cycle);

	return cycle;
};

export const getCycleById = async (
	id: string,
): Promise<CycleRow | undefined> => {
	return db.cycles.get(id);
};

export const getCyclesByProject = async (
	projectId: string,
): Promise<CycleRow[]> => {
	return db.cycles.where("projectId").equals(projectId).sortBy("startDate");
};

export const updateCycle = async (
	id: string,
	updates: UpdateCycleInput,
): Promise<CycleRow | undefined> => {
	const existing = await db.cycles.get(id);

	if (!existing) {
		return undefined;
	}

	const updatedAt = Date.now();

	await db.cycles.update(id, {
		...updates,
		updatedAt,
	});

	return db.cycles.get(id);
};

export const deleteCycle = async (id: string): Promise<void> => {
	await db.transaction("rw", [db.cycles, db.taskCycles], async () => {
		await db.taskCycles.where("cycleId").equals(id).delete();

		await db.cycles.delete(id);
	});
};
