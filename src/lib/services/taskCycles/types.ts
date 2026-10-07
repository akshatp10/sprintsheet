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

export interface DeleteTaskCycleVariables {
  taskId: string;
  taskCycleId: string | null;
}

export interface DeleteTaskCycleResult {
  taskId: string;
  taskCycleId: string | null;
  cycleId: string | null;
  projectId: string;
}
