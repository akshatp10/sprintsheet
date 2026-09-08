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
	invitedPeople?: {
		email: string;
		role: "member" | "admin";
	}[];
	stages: {
		name: string;
		order: number;
	}[];
}

export interface UpdateProjectInput {
	name?: string;
	description?: string;
	cycleLength?: Project["cycleLength"];
	startingDay?: string;
	autoCycle?: boolean;
	isArchived?: boolean;
}
