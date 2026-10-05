export interface TaskCycle {
  id: string;
  taskId: string;
  cycleId: string;
  stageId: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateTaskCycleInput {
  taskId: string;
  cycleId: string;
  stageId: string;
}

export interface UpdateTaskCycleInput {
  stageId?: string;
}

export type TaskDestination =
  { type: 'backlog' } | { type: 'cycle'; cycleId: string; stageId: string };

export interface MoveTasksVariables {
  projectId: string;
  tasks: { taskId: string; fromCycleId: string | null }[];
  to: TaskDestination;
}
