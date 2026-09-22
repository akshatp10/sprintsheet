export interface Cycle {
	id: string;
	projectId: string;
	name: string;
	startDate: string;
	endDate: string;
	createdAt: number;
	updatedAt: number;
}

export interface CreateCycleInput {
	projectId: string;
	name: string;
	startDate: string;
	endDate: string;
}

export type UpdateCycleInput = Partial<
	Omit<Cycle, "id" | "projectId" | "createdAt" | "updatedAt">
>;
