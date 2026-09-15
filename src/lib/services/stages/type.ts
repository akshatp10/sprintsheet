export interface Stage {
	id: string;
	projectId: string;
	stageId: string;
	order: number;
	name: string;
	isTerminal: boolean;
	createdAt: number;
	updatedAt: number;
}
