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
