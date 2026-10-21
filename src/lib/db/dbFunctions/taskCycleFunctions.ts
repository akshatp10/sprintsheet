import { BACKLOG_STAGE_NAME } from '@/lib/services/stages/type';
import db from '../db';
import type { TaskCycleRow, TaskRow } from '../db';
import type {
  CreateTaskCycleRequest,
  DeleteTaskCycleResponse,
  MoveTasksRequest,
  TaskCycle,
  TaskDestination,
} from '@/lib/services/taskCycles/types';
import type { Task } from '@/lib/services/tasks/types';

// Applies placement changes. Call inside a transaction covering all four tables.
// Backlog means the task has no taskCycles rows.
export const applyTaskPlacement = async (
  taskId: string,
  fromCycleId: string | null,
  destination: TaskDestination,
  now = Date.now(),
): Promise<{ task: TaskRow; taskCycle: TaskCycleRow | null }> => {
  const task = await db.tasks.get(taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  let target: Extract<TaskDestination, { type: 'cycle' }> | null = null;

  if (destination.type === 'cycle') {
    const stage = await db.projectStages.get(destination.stageId);

    if (!stage) {
      throw new Error('Project stage not found');
    }

    if (stage.projectId !== task.projectId) {
      throw new Error('Stage does not belong to this project');
    }

    // The Backlog stage means actual backlog placement, not a cycle assignment.
    if (stage.name !== BACKLOG_STAGE_NAME) {
      const cycle = await db.cycles.get(destination.cycleId);

      if (!cycle) {
        throw new Error('Cycle not found');
      }

      if (cycle.projectId !== task.projectId) {
        throw new Error('Cycle does not belong to this project');
      }

      target = destination;
    }
  }

  const rows = await db.taskCycles.where('taskId').equals(taskId).toArray();

  const source = fromCycleId ? rows.find((row) => row.cycleId === fromCycleId) : undefined;

  // Backlog: remove every cycle assignment.
  if (!target) {
    await db.taskCycles.where('taskId').equals(taskId).delete();

    await db.tasks.update(taskId, {
      isBacklog: 1,
      updatedAt: now,
    });

    return {
      task: (await db.tasks.get(taskId))!,
      taskCycle: null,
    };
  }

  const { cycleId, stageId } = target;
  const existingTarget = rows.find((row) => row.cycleId === cycleId);

  let taskCycle: TaskCycleRow;

  if (existingTarget) {
    // Reuse the destination assignment.
    await db.taskCycles.update(existingTarget.id, {
      stageId,
      updatedAt: now,
    });

    // Remove the source assignment if it differs from the destination.
    if (source && source.id !== existingTarget.id) {
      await db.taskCycles.delete(source.id);
    }

    taskCycle = (await db.taskCycles.get(existingTarget.id))!;
  } else if (source) {
    // Move the source assignment to the destination cycle.
    await db.taskCycles.update(source.id, {
      cycleId,
      stageId,
      updatedAt: now,
    });

    taskCycle = (await db.taskCycles.get(source.id))!;
  } else {
    // No source assignment: create a new cycle assignment.
    taskCycle = {
      id: crypto.randomUUID(),
      taskId,
      cycleId,
      stageId,
      createdAt: now,
      updatedAt: now,
    };

    await db.taskCycles.add(taskCycle);
  }

  await db.tasks.update(taskId, {
    isBacklog: 0,
    updatedAt: now,
  });

  return {
    task: (await db.tasks.get(taskId))!,
    taskCycle,
  };
};

// Creates a cycle assignment, or places the task in the backlog
// if the requested stage is Backlog.
export const createTaskCycle = (input: CreateTaskCycleRequest): Promise<TaskCycle | null> =>
  db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const { taskCycle } = await applyTaskPlacement(input.taskId, null, {
      type: 'cycle',
      cycleId: input.cycleId,
      stageId: input.stageId,
    });

    return taskCycle;
  });

// Changes the stage within a cycle.
export const updateTaskCycleStage = (taskCycleId: string, stageId: string): Promise<TaskCycle> =>
  db.transaction('rw', [db.taskCycles, db.cycles, db.projectStages], async () => {
    const taskCycle = await db.taskCycles.get(taskCycleId);

    if (!taskCycle) {
      throw new Error('Task cycle not found');
    }

    const [cycle, stage] = await Promise.all([
      db.cycles.get(taskCycle.cycleId),
      db.projectStages.get(stageId),
    ]);

    if (!cycle) {
      throw new Error('Cycle not found');
    }

    if (!stage || stage.projectId !== cycle.projectId) {
      throw new Error('Stage does not belong to this project');
    }

    await db.taskCycles.update(taskCycleId, { stageId, updatedAt: Date.now() });

    return (await db.taskCycles.get(taskCycleId))!;
  });

// Moves a task between cycles or into the backlog.
export const moveTaskAcrossCycle = (
  taskId: string,
  fromCycleId: string | null,
  destination: TaskDestination,
): Promise<Task> =>
  db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const { task } = await applyTaskPlacement(taskId, fromCycleId, destination);

    return task as Task;
  });

// Moves multiple tasks atomically.
export const moveMultipleTasksAcrossCycle = (
  moves: MoveTasksRequest['tasks'],
  destination: TaskDestination,
): Promise<Task[]> =>
  db.transaction('rw', [db.tasks, db.cycles, db.projectStages, db.taskCycles], async () => {
    const now = Date.now();
    const moved: Task[] = [];

    for (const { taskId, fromCycleId } of moves) {
      const { task } = await applyTaskPlacement(taskId, fromCycleId, destination, now);

      moved.push(task as Task);
    }

    return moved;
  });

export const getTaskCycleById = (id: string): Promise<TaskCycle | undefined> =>
  db.taskCycles.get(id);

export const getTaskCyclesByCycle = (cycleId: string): Promise<TaskCycle[]> =>
  db.taskCycles.where('cycleId').equals(cycleId).toArray();

export const getTaskCyclesByTask = (taskId: string): Promise<TaskCycle[]> =>
  db.taskCycles.where('taskId').equals(taskId).toArray();

export const getTaskCyclesByProject = (projectId: string): Promise<TaskCycle[]> =>
  db.transaction('r', [db.cycles, db.taskCycles], async () => {
    const cycleIds = await db.cycles.where('projectId').equals(projectId).primaryKeys();

    if (cycleIds.length === 0) {
      return [];
    }

    return db.taskCycles.where('cycleId').anyOf(cycleIds).toArray();
  });

// taskCycleId null → delete the (backlog) task itself
// taskCycleId given → remove the task from that cycle; backlog only if it was its last cycle
export const deleteTaskCycle = (
  taskId: string,
  taskCycleId: string | null,
): Promise<DeleteTaskCycleResponse> =>
  db.transaction('rw', [db.tasks, db.taskCycles], async () => {
    const task = await db.tasks.get(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (!taskCycleId) {
      await db.taskCycles.where('taskId').equals(taskId).delete(); // never leave stray rows
      await db.tasks.delete(taskId);

      return { taskId, taskCycleId: null, cycleId: null, projectId: task.projectId };
    }

    const taskCycle = await db.taskCycles.get(taskCycleId);

    if (!taskCycle) {
      throw new Error('Task cycle not found');
    }

    if (taskCycle.taskId !== taskId) {
      throw new Error('Task cycle does not belong to this task');
    }

    await db.taskCycles.delete(taskCycleId);

    const remaining = await db.taskCycles.where('taskId').equals(taskId).count();

    if (remaining === 0) {
      await db.tasks.update(taskId, { isBacklog: 1, updatedAt: Date.now() });
    }

    return { taskId, taskCycleId, cycleId: taskCycle.cycleId, projectId: task.projectId };
  });
