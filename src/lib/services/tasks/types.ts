export interface Task {
	id: string;
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
