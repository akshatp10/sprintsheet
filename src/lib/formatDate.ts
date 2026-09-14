export const formatDate = (date: string) => {
	const [year, month, day] = date.split("-").map(Number);

	return new Date(year, month - 1, day)
		.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})
		.toUpperCase();
};
