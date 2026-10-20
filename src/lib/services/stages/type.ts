export const BACKLOG_STAGE_NAME = 'Backlog';

export interface Stage {
  id: string;
  projectId: string;
  stageId: string;
  order: number;
  name: string;
  isTerminal: boolean;
  createdAt: number;
  updatedAt: number;
}

// Responses
export type GetStagesResponse = Stage[];
