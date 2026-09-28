interface StageStyle {
	container: string;
	chip: string;
	dot: string;
	gradient: string;
	border?: string;
}

export enum StageName {
	BACKLOG = "Backlog",
	TODO = "Todo",
	IN_PROGRESS = "In progress",
	IN_QA = "In QA",
	DONE = "Done",
	BLOCKED = "Blocked",
}

const gradient = (color: string) =>
	`bg-gradient-to-b from-${color} from-0% to-surface/50 to-9%`;

export const stageConfig: Record<StageName, StageStyle> = {
	[StageName.BACKLOG]: {
		container:
			"bg-stage-backlog-bg border-stage-backlog-border text-stage-backlog-text",
		chip: "bg-stage-backlog-chip border-stage-backlog-dot text-stage-backlog-text",
		dot: "bg-stage-backlog-dot",
		gradient: gradient("stage-backlog-bg"),
		border: "border border-stage-backlog-border",
	},

	[StageName.TODO]: {
		container:
			"bg-stage-todo-bg border-stage-todo-border text-stage-todo-text",
		chip: "bg-stage-todo-chip border-stage-todo-dot text-stage-todo-text",
		dot: "bg-stage-todo-dot",
		gradient: gradient("stage-todo-bg"),
		border: "before:from-stage-todo-border before:to-transparent",
	},

	[StageName.IN_PROGRESS]: {
		container:
			"bg-stage-progress-bg border-stage-progress-border text-stage-progress-text",
		chip: "bg-stage-progress-chip border-stage-progress-dot text-stage-progress-text",
		dot: "bg-stage-progress-dot",
		gradient: gradient("stage-progress-bg"),
		border: "border border-stage-progress-border",
	},

	[StageName.IN_QA]: {
		container: "bg-stage-qa-bg border-stage-qa-border text-stage-qa-text",
		chip: "bg-stage-qa-chip border-stage-qa-dot text-stage-qa-text",
		dot: "bg-stage-qa-dot",
		gradient: gradient("stage-qa-bg"),
		border: "border border-stage-qa-border",
	},

	[StageName.DONE]: {
		container:
			"bg-stage-done-bg border-stage-done-border text-stage-done-text",
		chip: "bg-stage-done-chip border-stage-done-dot text-stage-done-text",
		dot: "bg-stage-done-dot",
		gradient: gradient("stage-done-bg"),
		border: "border border-stage-done-border",
	},

	[StageName.BLOCKED]: {
		container:
			"bg-stage-blocked-bg border-stage-blocked-border text-stage-blocked-text",
		chip: "bg-stage-blocked-bg border-stage-blocked-dot text-stage-blocked-text",
		dot: "bg-stage-blocked-dot",
		gradient: gradient("stage-blocked-bg"),
		border: "border border-stage-blocked-border",
	},
};
