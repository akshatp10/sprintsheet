export interface Task {
	id: string;
	key: string;
	projectId: string;
	stageId: string;
	name: string;
	description: string;
	assigneeIds: string[];
	dueDate: string | null;
	type: string;
	tags: string[];
	createdAt: number;
	updatedAt: number;
}

export interface CreateTaskInput {
	projectId: string;
	stageId: string;
	name: string;
	description?: string;
	assigneeIds?: string[];
	dueDate?: string | null;
	type: string;
	tags?: string[];
}

export type UpdateTaskInput = Partial<
	Omit<Task, "id" | "createdAt" | "updatedAt">
>;

import type { User } from "../users/types";

export interface TaskWithUsers extends Task {
	assignees: User[];
}

export interface UpdateTaskVariables {
	id: string;
	projectId: string;
	updates: UpdateTaskInput;
}
