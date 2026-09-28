export const getExtractedLetterFromString = (
	value: string,
	padded?: number,
): string => {
	const words = value.trim().split(/\s+/).filter(Boolean);

	if (!words.length) return "";

	const maxLength = padded ?? words.length;

	if (words.length === 1) {
		return words[0].slice(0, maxLength).toUpperCase();
	}

	let result = words.map((word) => word[0]).join("");

	if (result.length < maxLength) {
		for (const word of words) {
			for (let i = 1; i < word.length && result.length < maxLength; i++) {
				result += word[i];
			}

			if (result.length >= maxLength) break;
		}
	}

	return result.slice(0, maxLength).toUpperCase();
};
