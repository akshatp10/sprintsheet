export const getExtractedLetterFromString = (
	value: string,
	padded?: number,
): string => {
	const words = value.trim().split(/\s+/).filter(Boolean);
	const maxLength = padded ?? 3;

	const initials = words.map((word) => word[0]).join("");
	const remainders = words.map((word) => word.slice(1)).join("");

	return (initials + remainders).slice(0, maxLength).toUpperCase();
};

export const getPercentage = (cur: number, total: number): number => {
	if (total <= 0) return 0;

	return Math.round((cur / total) * 100);
};

export const isMac =
	typeof navigator !== "undefined" &&
	(navigator.platform.toLowerCase().includes("mac") ||
		navigator.userAgent.toLowerCase().includes("mac"));

export const formatDate = (date: string) => {
	const [year, month, day] = date.split("-").map(Number);

	return new Date(year, month - 1, day)
		.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})
		.toUpperCase();
};

export const formatCycleDate = (date: string) => {
	return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

export const getPercentage = (cur: number, total: number): number => {
	if (total <= 0) return 0;

	return Math.round((cur / total) * 100);
};

export const isMac =
	typeof navigator !== "undefined" &&
	(navigator.platform.toLowerCase().includes("mac") ||
		navigator.userAgent.toLowerCase().includes("mac"));

export const formatDate = (date: string) => {
	const [year, month, day] = date.split("-").map(Number);

	return new Date(year, month - 1, day)
		.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})
		.toUpperCase();
};

export const formatCycleDate = (date: string) => {
	return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};
