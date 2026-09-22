export const getPercentage = (cur: number, total: number): number => {
	if (total <= 0) return 0;

	return Math.round((cur / total) * 100);
};
