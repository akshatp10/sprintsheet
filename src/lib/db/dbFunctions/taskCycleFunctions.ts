import type { TaskDestination } from '@/lib/services/taskCycles/types';
import db from '../db';

import type { TaskCycleRow, TaskRow } from '../db';

interface CreateTaskCycleInput {
  taskId: string;
  cycleId: string;
  stageId: string;
}

export const createTaskCycle = async (input: CreateTaskCycleInput): Promise<TaskCycleRow> => {
  return db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const [task, cycle, projectStage] = await Promise.all([
      db.tasks.get(input.taskId),
      db.cycles.get(input.cycleId),
      db.projectStages.get(input.stageId),
    ]);

    if (!task) {
      throw new Error('Task not found');
    }

    if (!cycle) {
      throw new Error('Cycle not found');
    }

    if (!projectStage) {
      throw new Error('Project stage not found');
    }

    if (task.projectId !== cycle.projectId) {
      throw new Error('Task and cycle belong to different projects');
    }

    if (projectStage.projectId !== cycle.projectId) {
      throw new Error('Stage does not belong to cycle project');
    }

    const existing = await db.taskCycles
      .where('[cycleId+taskId]')
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

    await db.tasks.update(task.id, {
      isBacklog: 0,
      updatedAt: now,
    });

    return taskCycle;
  });
};

// Stage change within a cycle (existing function, with a project check added)
export const updateTaskCycleStage = async (
  taskCycleId: string,
  stageId: string,
): Promise<TaskCycleRow> => {
  return db.transaction('rw', [db.taskCycles, db.cycles, db.projectStages], async () => {
    const taskCycle = await db.taskCycles.get(taskCycleId);
    if (!taskCycle) throw new Error('Task cycle not found');

    const [cycle, stage] = await Promise.all([
      db.cycles.get(taskCycle.cycleId),
      db.projectStages.get(stageId),
    ]);
    if (!cycle) throw new Error('Cycle not found');
    if (!stage || stage.projectId !== cycle.projectId) {
      throw new Error('Stage does not belong to this project');
    }

    await db.taskCycles.update(taskCycleId, {
      stageId,
      updatedAt: Date.now(),
    });

    return (await db.taskCycles.get(taskCycleId))!;
  });
};

// Move between cycles / backlog
export const moveTaskAcrossCycle = async (
  taskId: string,
  destination: TaskDestination,
): Promise<TaskRow> => {
  return db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const task = await db.tasks.get(taskId);
    if (!task) throw new Error('Task not found');

    const existing = await db.taskCycles.where('taskId').equals(taskId).first();

    const now = Date.now();

    if (destination.type === 'backlog') {
      if (existing) await db.taskCycles.delete(existing.id);

      await db.tasks.update(taskId, { isBacklog: 1, updatedAt: now });
    } else {
      const [cycle, stage] = await Promise.all([
        db.cycles.get(destination.cycleId),
        db.projectStages.get(destination.stageId),
      ]);
      if (!cycle) throw new Error('Cycle not found');
      if (cycle.projectId !== task.projectId) {
        throw new Error('Cycle belongs to a different project');
      }
      if (!stage || stage.projectId !== task.projectId) {
        throw new Error('Stage does not belong to this project');
      }

      if (existing) {
        // cycle -> cycle: keep the row, repoint it
        await db.taskCycles.update(existing.id, {
          cycleId: destination.cycleId,
          stageId: destination.stageId,
          updatedAt: now,
        });
      } else {
        // backlog -> cycle: new row
        await db.taskCycles.add({
          id: crypto.randomUUID(),
          taskId,
          cycleId: destination.cycleId,
          stageId: destination.stageId,
          createdAt: now,
          updatedAt: now,
        });
      }

      await db.tasks.update(taskId, { isBacklog: 0, updatedAt: now });
    }

    return (await db.tasks.get(taskId))!;
  });
};

export const moveMultipleTasksAcrossCycle = async (
  taskIds: string[],
  destination: TaskDestination,
): Promise<TaskRow[]> => {
  return db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const moved: TaskRow[] = [];

    for (const taskId of taskIds) {
      moved.push(await moveTaskAcrossCycle(taskId, destination));
    }

    return moved;
  });
};

export const getTaskCyclesUsingId = async (id: string): Promise<TaskCycleRow | undefined> => {
  return db.taskCycles.get(id);
};
export const getTaskCyclesByCycle = async (cycleId: string): Promise<TaskCycleRow[]> => {
  return db.taskCycles.where('cycleId').equals(cycleId).toArray();
};

export const getTaskCyclesByTask = async (taskId: string): Promise<TaskCycleRow[]> => {
  return db.taskCycles.where('taskId').equals(taskId).toArray();
};

export const getTaskCyclesByProject = async (projectId: string): Promise<TaskCycleRow[]> => {
  const cycles = await db.cycles.where('projectId').equals(projectId).toArray();

  if (cycles.length === 0) {
    return [];
  }

  const taskCycles = await Promise.all(
    cycles.map((cycle) => db.taskCycles.where('cycleId').equals(cycle.id).toArray()),
  );

  return taskCycles.flat();
};
