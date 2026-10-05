import db from '../db';
import type { ProjectStageRow, StageRow } from '../db';

export const BACKLOG_STAGE_NAME = 'Backlog';

export const findOrCreateStage = async (name: string): Promise<StageRow> => {
  const existing = await db.stages.where('name').equals(name).first();

  if (existing) {
    return existing;
  }

  const now = Date.now();

  const stage: StageRow = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
  };

  await db.stages.add(stage);

  return stage;
};

export const createProjectStage = async (
  projectId: string,
  stage: StageRow,
  order: number,
  isTerminal: boolean,
): Promise<ProjectStageRow> => {
  const now = Date.now();

  const projectStage: ProjectStageRow = {
    id: crypto.randomUUID(),
    projectId,
    stageId: stage.id,
    order,
    name: stage.name,
    isTerminal,
    createdAt: now,
    updatedAt: now,
  };

  await db.projectStages.add(projectStage);

  return projectStage;
};

export const getProjectStages = async (projectId: string): Promise<ProjectStageRow[]> => {
  return db.projectStages.where('projectId').equals(projectId).sortBy('order');
};

export const getBacklogStageId = async (projectId: string): Promise<string | undefined> => {
  const stage = await db.projectStages
    .where('projectId')
    .equals(projectId)
    .and((s) => s.name === BACKLOG_STAGE_NAME)
    .first();

  return stage?.id;
};

export const getTerminalStageId = async (projectId: string): Promise<string | undefined> => {
  const stage = await db.projectStages
    .where('projectId')
    .equals(projectId)
    .and((s) => s.isTerminal)
    .first();

  return stage?.id;
};
