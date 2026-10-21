import type { Stage } from '../stages/type';
import type { UserSummary } from '../users/types';

export interface Task {
  id: string;
  key: string;
  projectId: string;
  typeId: string;
  name: string;
  description: string;
  assigneeIds: string[];
  dueDate: string | null;
  tags: string[];
  isBacklog: 0 | 1;
  createdAt: number;
  updatedAt: number;
}

export interface TaskItem extends Task {
  stage: Stage;
  assignees: UserSummary[];
}

export interface CycleTaskItem extends TaskItem {
  taskCycleId: string;
  cycleId: string;
}

// Requests
export interface CreateTaskRequest {
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

export type UpdateTaskFields = Partial<
  Pick<Task, 'name' | 'description' | 'assigneeIds' | 'dueDate' | 'tags' | 'typeId'>
>;

export interface UpdateTaskRequest {
  id: string;
  projectId: string;
  updates: UpdateTaskFields;
}

// Responses
export type CreateTaskResponse = Task;
export type UpdateTaskResponse = Task;
export type GetProjectTasksResponse = TaskItem[];
export type GetBacklogTasksResponse = CycleTaskItem[];
export type GetCycleTasksResponse = CycleTaskItem[];
export type GetProjectCycleTasksResponse = CycleTaskItem[];
