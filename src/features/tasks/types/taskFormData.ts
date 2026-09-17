import { z } from "zod";

export const taskFormSchema = z.object({
	name: z.string().min(1, "Task name is required"),
	description: z
		.string()
		.min(10, "Description should be more than 10 characters")
		.max(250, "Description should not exceed 250 characters")
		.optional(),
	stage: z.string().min(1, "Stage is required"),
	assigneeIds: z.array(z.string()).optional(),
	dueDate: z.string().nullable().optional(),
	type: z.string().min(1, "Type is required"),
	tags: z.array(z.string()).optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

export const defaultValues: TaskFormData = {
	name: "",
	description: "",
	stage: "",
	assigneeIds: [],
	dueDate: null,
	type: "task",
	tags: [],
};

export const typeOptions = [
	{ label: "Task", value: "task" },
	{ label: "Bug", value: "bug" },
	{ label: "Feature", value: "feature" },
];
