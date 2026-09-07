import type { TabsOption } from "@/components/inputs/Tabs";
import { z } from "zod";
const projectPersonSchema = z.object({
	email: z.email("Invalid email"),
	role: z.enum(["member", "admin"]),
});
export const projectFormSchema = z
	.object({
		name: z.string().min(1, "Project name is required"),
		key: z.string().min(1, "Key is required"),
		description: z
			.string()
			.min(10, "Description must be at least 10 characters")
			.max(100, "Description must not exceed 100 characters"),
		cycleLength: z.enum(["default", "custom", "nocycle"]),
		customCycleDays: z.string().optional(),
		startingDay: z.string().optional(),
		autoCycle: z.boolean(),
		defaultView: z.enum(["table", "cards"]),
		stages: z
			.array(
				z.object({ name: z.string().min(1, "Stage name is required") }),
			)
			.min(1, "At least one stage is required"),
		people: z.array(projectPersonSchema),
		startFirstCycle: z.boolean(),
	})
	.refine(
		(data) => {
			if (data.cycleLength !== "custom") {
				return true;
			}
			const days = Number(data.customCycleDays);
			return (
				!!data.customCycleDays &&
				Number.isInteger(days) &&
				days >= 1 &&
				days <= 7
			);
		},
		{
			path: ["customCycleDays"],
			message: "Between 1 and 7",
		},
	);
const defaultValues: ProjectFormData = {
	name: "",
	key: "",
	description: "",
	cycleLength: "default",
	customCycleDays: "5",
	startingDay: "",
	autoCycle: false,
	defaultView: "table",
	stages: [
		{ name: "Backlog" },
		{ name: "Todo" },
		{ name: "In progress" },
		{ name: "In QA" },
		{ name: "Done" },
	],
	people: [],
	startFirstCycle: true,
};

export const cycleTabsOptions: TabsOption<"default" | "custom" | "nocycle">[] =
	[
		{ label: "7 Days", value: "default" },
		{ label: "Custom", value: "custom" },
		{ label: "No Cycle", value: "nocycle" },
	];

export const layoutTabsOptions: TabsOption<"table" | "cards">[] = [
	{ label: "Table", value: "table" },
	{ label: "Cards", value: "cards" },
];

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type ProjectPerson = z.infer<typeof projectPersonSchema>;
export { defaultValues };
