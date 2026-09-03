export type ProjectFormData = {
	name: string;
	description: string;
	cycleLength: string;
	startingDay: string;
	autoCycle: boolean;

	stages: {
		name: string;
	}[];
};
