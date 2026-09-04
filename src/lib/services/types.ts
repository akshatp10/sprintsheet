export interface ApiResponse<T> {
	status: number;
	success: boolean;
	message: string;
	data: T | null;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	cycleLength: "default" | "custom" | "nocycle";
	startingDay: string;
	autoCycle: boolean;
	isArchived: boolean;
	createdAt: number;
	updatedAt: number;
}

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface ProjectMember {
	id: string;
	projectId: string;
	userId: string;
	name: string;
	email: string;
	role: "member" | "admin";
}

export interface CreateProjectInput {
	name: string;
	description?: string;
	cycleLength: Project["cycleLength"];
	startingDay?: string;
	autoCycle: boolean;
	invitedPeople?: { email: string; role: "member" | "admin" }[];
}

export interface UpdateProjectInput {
	name?: string;
	description?: string;
	cycleLength?: Project["cycleLength"];
	startingDay?: string;
	autoCycle?: boolean;
	isArchived?: boolean;
}
