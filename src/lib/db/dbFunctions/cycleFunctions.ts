import db from '../db';
import type { Cycle, CreateCycleInput, UpdateCycleFields } from '@/lib/services/cycles/types';

// validates whether a cycle can be created or not due to date overlapping
const assertValidDates = async (
  projectId: string,
  startDate: string,
  endDate: string,
  excludeCycleId?: string,
) => {
  if (startDate >= endDate) {
    throw new Error('Cycle end date must be after start date');
  }

  const existing = await db.cycles.where('projectId').equals(projectId).toArray();

  const hasOverlap = existing.some(
    (cycle) =>
      cycle.id !== excludeCycleId && startDate < cycle.endDate && endDate > cycle.startDate,
  );

  if (hasOverlap) {
    throw new Error('Cycle dates overlap with an existing cycle');
  }
};

export const createCycle = (input: CreateCycleInput): Promise<Cycle> =>
  db.transaction('rw', [db.projects, db.cycles], async () => {
    const project = await db.projects.get(input.projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    await assertValidDates(input.projectId, input.startDate, input.endDate);

    const now = Date.now();

    const cycle: Cycle = {
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
  });

export const getCycleById = (id: string): Promise<Cycle | undefined> => {
  return db.cycles.get(id);
};

export const getCyclesByProject = (projectId: string): Promise<Cycle[]> => {
  return db.cycles.where('projectId').equals(projectId).sortBy('startDate');
};

export const updateCycle = (id: string, updates: UpdateCycleFields): Promise<Cycle | undefined> =>
  db.transaction('rw', [db.cycles], async () => {
    const existing = await db.cycles.get(id);

    if (!existing) {
      return undefined;
    }

    const startDate = updates.startDate ?? existing.startDate;
    const endDate = updates.endDate ?? existing.endDate;

    if (startDate !== existing.startDate || endDate !== existing.endDate) {
      await assertValidDates(existing.projectId, startDate, endDate, id);
    }

    await db.cycles.update(id, { ...updates, updatedAt: Date.now() });

    return db.cycles.get(id);
  });

// Returns false when the cycle doesn't exist. Tasks that are in no other cycle go to backlog.
export const deleteCycle = (id: string): Promise<boolean> =>
  db.transaction('rw', [db.cycles, db.taskCycles, db.tasks], async () => {
    const cycle = await db.cycles.get(id);

    if (!cycle) {
      throw new Error('Cycle not found');
    }

    const taskCycles = await db.taskCycles.where('cycleId').equals(id).toArray();
    await db.taskCycles.bulkDelete(taskCycles.map((taskCycle) => taskCycle.id));

    const taskIds = [...new Set(taskCycles.map((taskCycle) => taskCycle.taskId))];

    const stillPlaced = new Set(
      (await db.taskCycles.where('taskId').anyOf(taskIds).toArray()).map(
        (taskCycle) => taskCycle.taskId,
      ),
    );

    const orphanIds = taskIds.filter((taskId) => !stillPlaced.has(taskId));

    await db.tasks.where('id').anyOf(orphanIds).modify({ isBacklog: 1, updatedAt: Date.now() });

    await db.cycles.delete(id);

    return true;
  });
