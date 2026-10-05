import db from '../db';

import type { ProjectStageRow, TaskCycleRow, TaskRow } from '../db';
type UpdateTaskInput = Partial<Omit<TaskRow, 'id' | 'createdAt' | 'updatedAt'>>;

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

export interface CycleTaskRow extends TaskRow {
  taskCycleId: string;
  stage: ProjectStageRow;
}

export interface TaskWithStageRow extends TaskRow {
  stage: ProjectStageRow;
}

export const createTask = async (input: CreateTaskRow): Promise<TaskRow> => {
  return db.transaction(
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

      // Resolve the stage first, since it decides backlog vs cycle
      let isBacklogStage = false;

      if (input.cycle) {
        const projectStage = await db.projectStages.get(input.cycle.stageId);

        if (!projectStage) {
          throw new Error('Project stage not found');
        }

        if (projectStage.projectId !== input.projectId) {
          throw new Error('Stage does not belong to this project');
        }

        isBacklogStage = projectStage.name === 'Backlog';

        // Cycle only matters when the task actually goes into it
        if (!isBacklogStage) {
          const cycle = await db.cycles.get(input.cycle.id);

          if (!cycle) {
            throw new Error('Cycle not found');
          }

          if (cycle.projectId !== input.projectId) {
            throw new Error('Cycle does not belong to this project');
          }
        }
      }

      const cycleInput = input.cycle && !isBacklogStage ? input.cycle : null;

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
        isBacklog: cycleInput ? 0 : 1,
        createdAt: now,
        updatedAt: now,
      };

      await db.tasks.add(task);

      await db.projects.update(project.id, {
        nextTaskNumber: taskNumber + 1,
        updatedAt: now,
      });

      if (cycleInput) {
        const newTaskCycle: TaskCycleRow = {
          id: crypto.randomUUID(),
          taskId: task.id,
          cycleId: cycleInput.id,
          stageId: cycleInput.stageId,
          createdAt: now,
          updatedAt: now,
        };

        await db.taskCycles.add(newTaskCycle);
      }

      return task;
    },
  );
};

export const getAllTasksByProject = async (projectId: string): Promise<TaskWithStageRow[]> => {
  const tasks = await db.tasks.where('projectId').equals(projectId).sortBy('createdAt');

  if (tasks.length === 0) {
    return [];
  }

  const backlogStage = await db.projectStages
    .where('projectId')
    .equals(projectId)
    .filter((stage) => stage.name === 'Backlog')
    .first();

  if (!backlogStage) {
    throw new Error('Backlog stage not found');
  }

  const nonBacklogTasks = tasks.filter((task) => !task.isBacklog);

  const taskCycles = await db.taskCycles
    .where('taskId')
    .anyOf(nonBacklogTasks.map((task) => task.id))
    .toArray();

  const latestTaskCycleByTaskId = new Map<string, TaskCycleRow>();

  for (const taskCycle of taskCycles) {
    const existing = latestTaskCycleByTaskId.get(taskCycle.taskId);

    if (!existing || taskCycle.updatedAt > existing.updatedAt) {
      latestTaskCycleByTaskId.set(taskCycle.taskId, taskCycle);
    }
  }

  const stageIds = [...new Set(taskCycles.map((taskCycle) => taskCycle.stageId))];

  const stages = await db.projectStages.bulkGet(stageIds);

  const stagesById = new Map(
    stages
      .filter((stage): stage is ProjectStageRow => stage !== undefined)
      .map((stage) => [stage.id, stage]),
  );

  return tasks.flatMap((task) => {
    if (task.isBacklog) {
      return [
        {
          ...task,
          stage: backlogStage,
        },
      ];
    }

    const taskCycle = latestTaskCycleByTaskId.get(task.id);

    if (!taskCycle) {
      return [];
    }

    const stage = stagesById.get(taskCycle.stageId);

    if (!stage) {
      return [];
    }

    return [
      {
        ...task,
        stage,
      },
    ];
  });
};

export const getBacklogTasksByProject = async (projectId: string): Promise<TaskRow[]> => {
  return db.tasks.where('[projectId+isBacklog]').equals([projectId, 1]).sortBy('createdAt');
};

export const getTasksByCycle = async (cycleId: string): Promise<CycleTaskRow[]> => {
  const taskCycles = await db.taskCycles.where('cycleId').equals(cycleId).toArray();

  if (taskCycles.length === 0) {
    return [];
  }

  const taskIds = taskCycles.map((taskCycle) => taskCycle.taskId);

  const stageIds = taskCycles.map((taskCycle) => taskCycle.stageId);

  const [tasks, stages] = await Promise.all([
    db.tasks.bulkGet(taskIds),
    db.projectStages.bulkGet(stageIds),
  ]);

  const tasksById = new Map(
    tasks.filter((task): task is TaskRow => task !== undefined).map((task) => [task.id, task]),
  );

  const stagesById = new Map(
    stages
      .filter((stage): stage is ProjectStageRow => stage !== undefined)
      .map((stage) => [stage.id, stage]),
  );

  return taskCycles
    .flatMap((taskCycle) => {
      const task = tasksById.get(taskCycle.taskId);
      const stage = stagesById.get(taskCycle.stageId);

      if (!task || !stage) {
        return [];
      }

      return [
        {
          ...task,
          taskCycleId: taskCycle.id,
          stage,
        },
      ];
    })
    .sort((a, b) => a.key.localeCompare(b.key));
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
