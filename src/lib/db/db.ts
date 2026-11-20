import Dexie, { type EntityTable } from 'dexie';

export const TABLE_NAMES = [
  'cycles',
  'invites',
  'projects',
  'stages',
  'taskCycles',
  'tasks',
  'types',
  'users',
] as const;

export type TableName = (typeof TABLE_NAMES)[number];

// Tables holding one project's data (removed when the project changes)
export const PROJECT_TABLES: TableName[] = ['cycles', 'stages', 'taskCycles', 'tasks', 'types'];

// One stored api response
interface ResponseRow {
  key: string;
  data: unknown;
  updatedAt: number;
}

const db = new Dexie('SprintsheetDB') as Dexie & Record<TableName, EntityTable<ResponseRow, 'key'>>;

/**
 * Version 1
 *
 * Original Sprintsheet database schema.
 */
db.version(1).stores({
  projects: 'id, name, createdAt',
  users: 'id, email',
  projectMembers: 'id, projectId, userId, [projectId+userId]',
  stages: 'id, &name, createdAt',
  projectStages: 'id, projectId, stageId, [projectId+stageId], [projectId+order]',
  types: 'id, &name, createdAt',
  projectTypes: 'id, projectId, typeId, [projectId+typeId]',
  tasks: 'id, projectId, stageId, typeId, createdAt, updatedAt',
});

/**
 * Version 2
 *
 * Tasks are now independent of stages/cycles.
 * Cycle-specific stage information is stored in taskCycles.
 */
db.version(2)
  .stores({
    projects: 'id, name, createdAt',
    users: 'id, email',
    projectMembers: 'id, projectId, userId, [projectId+userId]',
    stages: 'id, &name, createdAt',
    projectStages: 'id, projectId, stageId, [projectId+stageId], [projectId+order]',
    types: 'id, &name, createdAt',
    projectTypes: 'id, projectId, typeId, [projectId+typeId]',
    tasks: 'id, projectId, typeId, isBacklog, [projectId+isBacklog], createdAt, updatedAt',
    cycles: 'id, projectId, startDate, endDate, createdAt',
    taskCycles: 'id, taskId, cycleId, [cycleId+taskId]',
  })
  .upgrade((tx) => {
    return tx
      .table('tasks')
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

db.version(3).stores({
  projects: null,
  users: null,
  projectMembers: null,
  stages: null,
  projectStages: null,
  types: null,
  projectTypes: null,
  tasks: null,
  cycles: null,
  taskCycles: null,
  cache: 'key',
});

db.version(4).stores({
  ...Object.fromEntries(TABLE_NAMES.map((name) => [name, 'key'])),
  cache: null,
});

export default db;

export type { ResponseRow };
