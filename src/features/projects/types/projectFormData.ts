export type ProjectPerson = {
	email: string;
	role: "admin" | "member";
};

export type ProjectFormData = {
	name: string;
	key: string;
	description: string;
	cycleLength: string;
	customCycleDays: string;
	startingDay: string;
	autoCycle: boolean;
	defaultView: string;

	stages: {
		name: string;
	}[];

	people: ProjectPerson[];
	startFirstCycle: boolean;
};
