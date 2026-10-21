import db from '../db';
import type { ProjectStageRow, TaskCycleRow, TaskRow } from '../db';
import type {
  CreateTaskRequest,
  CycleTaskItem,
  Task,
  TaskItem,
  UpdateTaskFields,
} from '@/lib/services/tasks/types';

import { applyTaskPlacement } from './taskCycleFunctions';
import { toUserSummary } from './userFunctions';
import { BACKLOG_STAGE_NAME } from '@/lib/services/stages/type';

// bulkGet results (with undefined for missing rows) → Map by id
const mapById = <T extends { id: string }>(rows: (T | undefined)[]) =>
  new Map(rows.flatMap((row) => (row ? [[row.id, row] as const] : [])));

const findBacklogStage = async (projectId: string): Promise<ProjectStageRow> => {
  const stage = await db.projectStages
    .where('projectId')
    .equals(projectId)
    .filter((projectStage) => projectStage.name === BACKLOG_STAGE_NAME)
    .first();

  if (!stage) {
    throw new Error('Backlog stage not found');
  }

  return stage;
};

// Needs db.users. Assignees are summaries (id + name only).
const attachAssignees = async (tasks: TaskRow[]) => {
  const users = mapById(await db.users.bulkGet([...new Set(tasks.flatMap((t) => t.assigneeIds))]));

  return tasks.map((task) => ({
    ...task,
    assignees: task.assigneeIds.flatMap((id) => {
      const user = users.get(id);
      return user ? [toUserSummary(user)] : [];
    }),
  }));
};

// Needs tasks, projectStages, users. One item per taskCycle row.
const buildCycleTaskItems = async (taskCycles: TaskCycleRow[]): Promise<CycleTaskItem[]> => {
  const [tasks, stages] = await Promise.all([
    db.tasks.bulkGet(taskCycles.map((taskCycle) => taskCycle.taskId)),
    db.projectStages.bulkGet(taskCycles.map((taskCycle) => taskCycle.stageId)),
  ]);

  const tasksById = mapById(await attachAssignees(tasks.flatMap((task) => task ?? [])));
  const stagesById = mapById(stages);

  return taskCycles
    .flatMap((taskCycle) => {
      const task = tasksById.get(taskCycle.taskId);
      const stage = stagesById.get(taskCycle.stageId);

      return task && stage
        ? [{ ...task, stage, taskCycleId: taskCycle.id, cycleId: taskCycle.cycleId }]
        : [];
    })
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
};

export const createTask = (input: CreateTaskRequest): Promise<Task> =>
  db.transaction(
    'rw',
    [db.projects, db.projectTypes, db.tasks, db.cycles, db.projectStages, db.taskCycles],
    async () => {
      const project = await db.projects.get(input.projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      const projectType = await db.projectTypes
        .where('[projectId+typeId]')
        .equals([input.projectId, input.typeId])
        .first();

      if (!projectType) {
        throw new Error('Type is not available in this project');
      }

      const taskNumber = project.nextTaskNumber;
      const now = Date.now();

      const task: TaskRow = {
        id: crypto.randomUUID(),
        projectId: input.projectId,
        key: `${project.key}-${String(taskNumber).padStart(3, '0')}`,
        name: input.name,
        description: input.description ?? '',
        assigneeIds: input.assigneeIds ?? [],
        dueDate: input.dueDate ?? null,
        typeId: input.typeId,
        tags: input.tags ?? [],
        isBacklog: 1,
        createdAt: now,
        updatedAt: now,
      };

      await db.tasks.add(task);

      await db.projects.update(project.id, { nextTaskNumber: taskNumber + 1, updatedAt: now });

      // Cycle placement goes through the same validation as every move.
      if (input.cycle) {
        await applyTaskPlacement(
          task.id,
          null,
          { type: 'cycle', cycleId: input.cycle.id, stageId: input.cycle.stageId },
          now,
        );
      }

      return (await db.tasks.get(task.id))!;
    },
  );

export const updateTask = (id: string, updates: UpdateTaskFields): Promise<Task | undefined> =>
  db.transaction('rw', [db.tasks, db.projectTypes], async () => {
    const task = await db.tasks.get(id);

    if (!task) {
      return undefined;
    }

    if (updates.typeId && updates.typeId !== task.typeId) {
      const projectType = await db.projectTypes
        .where('[projectId+typeId]')
        .equals([task.projectId, updates.typeId])
        .first();

      if (!projectType) {
        throw new Error('Type is not available in this project');
      }
    }

    await db.tasks.update(id, { ...updates, updatedAt: Date.now() });

    return db.tasks.get(id);
  });

// Every task with its current stage. A task can be in several cycles; its current stage comes from its most recently updated taskCycle. Backlog tasks get the Backlog stage.
export const getAllTasksByProject = (projectId: string): Promise<TaskItem[]> =>
  db.transaction('r', [db.tasks, db.projectStages, db.taskCycles, db.users], async () => {
    const tasks = await db.tasks.where('projectId').equals(projectId).sortBy('createdAt');

    if (tasks.length === 0) {
      return [];
    }

    const backlogStage = await findBacklogStage(projectId);

    const placedTaskIds = tasks.filter((task) => !task.isBacklog).map((task) => task.id);
    const taskCycles = await db.taskCycles.where('taskId').anyOf(placedTaskIds).toArray();

    // Sorted oldest → newest, so the latest taskCycle of each task overwrites the earlier ones.
    const latestByTaskId = new Map(
      taskCycles
        .sort((a, b) => a.updatedAt - b.updatedAt || a.createdAt - b.createdAt)
        .map((taskCycle) => [taskCycle.taskId, taskCycle] as const),
    );

    const stagesById = mapById(
      await db.projectStages.bulkGet([...latestByTaskId.values()].map((tc) => tc.stageId)),
    );

    return (await attachAssignees(tasks)).flatMap((task) => {
      if (task.isBacklog) {
        return [{ ...task, stage: backlogStage }];
      }

      const taskCycle = latestByTaskId.get(task.id);
      const stage = taskCycle && stagesById.get(taskCycle.stageId);

      return stage ? [{ ...task, stage }] : [];
    });
  });

export const getBacklogTasksByProject = (projectId: string): Promise<CycleTaskItem[]> =>
  db.transaction('r', [db.tasks, db.projectStages, db.users], async () => {
    const backlogStage = await findBacklogStage(projectId);

    const tasks = await db.tasks
      .where('[projectId+isBacklog]')
      .equals([projectId, 1])
      .sortBy('createdAt');

    return (await attachAssignees(tasks)).map((task) => ({
      ...task,
      stage: backlogStage,
      taskCycleId: '',
      cycleId: '',
    }));
  });

export const getTasksByCycle = (cycleId: string): Promise<CycleTaskItem[]> =>
  db.transaction('r', [db.taskCycles, db.tasks, db.projectStages, db.users], async () => {
    const taskCycles = await db.taskCycles.where('cycleId').equals(cycleId).toArray();

    return buildCycleTaskItems(taskCycles);
  });

// All cycle tasks of a project in one call.
export const getCycleTasksByProject = (projectId: string): Promise<CycleTaskItem[]> =>
  db.transaction(
    'r',
    [db.cycles, db.taskCycles, db.tasks, db.projectStages, db.users],
    async () => {
      const cycleIds = await db.cycles.where('projectId').equals(projectId).primaryKeys();
      const taskCycles = await db.taskCycles.where('cycleId').anyOf(cycleIds).toArray();

      return buildCycleTaskItems(taskCycles);
    },
  );
