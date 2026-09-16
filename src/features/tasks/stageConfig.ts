import type { Stage } from "@/lib/services/stages/type";

interface StageStyle {
	container: string;
	chip: string;
	dot: string;
}

export const stageConfig: Record<Stage["name"], StageStyle> = {
	Backlog: {
		container:
			"bg-stage-backlog-bg border-stage-backlog-border text-stage-backlog-text",
		chip: "bg-stage-backlog-chip border-stage-backlog-dot text-stage-backlog-text",
		dot: "bg-stage-backlog-dot",
	},
	Todo: {
		container:
			"bg-stage-todo-bg border-stage-todo-border text-stage-todo-text",
		chip: "bg-stage-todo-chip border-stage-todo-dot text-stage-todo-text",
		dot: "bg-stage-todo-dot",
	},
	"In progress": {
		container:
			"bg-stage-progress-bg border-stage-progress-border text-stage-progress-text",
		chip: "bg-stage-progress-chip border-stage-progress-dot text-stage-progress-text",
		dot: "bg-stage-progress-dot",
	},
	"In QA": {
		container: "bg-stage-qa-bg border-stage-qa-border text-stage-qa-text",
		chip: "bg-stage-qa-chip border-stage-qa-dot text-stage-qa-text",
		dot: "bg-stage-qa-dot",
	},
	Done: {
		container:
			"bg-stage-done-bg border-stage-done-border text-stage-done-text",
		chip: "bg-stage-done-chip border-stage-done-dot text-stage-done-text",
		dot: "bg-stage-done-dot",
	},
	Blocked: {
		container:
			"bg-stage-blocked-bg border-stage-blocked-border text-stage-blocked-text",
		chip: "bg-stage-blocked-bg border-stage-blocked-dot text-stage-blocked-text",
		dot: "bg-stage-blocked-dot",
	},
};
