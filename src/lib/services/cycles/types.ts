export interface Cycle {
	id: string;
	projectId: string;
	name: string;
	startDate: Date;
	endDate: Date;
	createdAt: number;
	updatedAt: number;
}

export interface CreateCycleInput {
	projectId: string;
	name: string;
	startDate: Date;
	endDate: Date;
}

export type UpdateCycleInput = Partial<
	Omit<Cycle, "id" | "projectId" | "createdAt" | "updatedAt">
>;
