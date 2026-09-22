import { z } from "zod";

export const cycleFormSchema = z
	.object({
		name: z.string().optional(),
		startDate: z.string().min(1, "Start date is required"),
		endDate: z.string().min(1, "End date is required"),
		startWith: z.enum(["empty", "backlog", "unfinished"]),
		makeActive: z.boolean(),
	})
	.refine(
		(data) => {
			if (!data.startDate || !data.endDate) return true;
			return data.endDate >= data.startDate;
		},
		{
			message: "End date must be on or after start date",
			path: ["endDate"],
		},
	);

export type CycleFormData = z.infer<typeof cycleFormSchema>;

export const defaultValues: CycleFormData = {
	name: "",
	startDate: "",
	endDate: "",
	startWith: "empty",
	makeActive: false,
};
