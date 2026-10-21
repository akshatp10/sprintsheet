import type { Task } from '../tasks/types';

export interface TaskCycle {
  id: string;
  taskId: string;
  cycleId: string;
  stageId: string;
  createdAt: number;
  updatedAt: number;
}

export type TaskDestination =
  { type: 'backlog' } | { type: 'cycle'; cycleId: string; stageId: string };

export interface CreateTaskCycleRequest {
  taskId: string;
  cycleId: string;
  stageId: string;
}

export interface UpdateTaskCycleStageRequest {
  taskCycleId: string;
  cycleId: string;
  stageId: string;
}

export interface MoveTaskRequest {
  projectId: string;
  taskId: string;
  fromCycleId: string | null; // null = from backlog
  to: TaskDestination;
}

export interface MoveTasksRequest {
  projectId: string;
  tasks: { taskId: string; fromCycleId: string | null }[];
  to: TaskDestination;
}

export interface DeleteTaskCycleRequest {
  taskId: string;
  taskCycleId: string | null; // null = delete the backlog task itself
}

// Responses
export type GetTaskCycleResponse = TaskCycle;
export type GetTaskCyclesResponse = TaskCycle[];
export type CreateTaskCycleResponse = TaskCycle;
export type UpdateTaskCycleStageResponse = TaskCycle;
export type MoveTaskResponse = Task;
export type MoveTasksResponse = Task[];

export interface DeleteTaskCycleResponse {
  taskId: string;
  taskCycleId: string | null;
  cycleId: string | null;
  projectId: string;
}
