import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				"text-type-display",
				"text-type-h1",
				"text-type-h2",
				"text-type-body",
				"text-type-body-sm",
				"text-type-label",
				"text-type-caption",
				"text-type-micro",
				"text-type-mono",
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
