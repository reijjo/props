export function formatGameTime(gameTimeUTC: string, gameStatusText: string): string {
	// If game is over or in progress, show the status text
	if (gameStatusText === 'Final' || !gameTimeUTC) {
		return gameStatusText;
	}

	// Convert UTC to user's local time
	const date = new Date(gameTimeUTC);

	return date.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit',
		hour12: false // Use 24-hour format for Finland/Europe
	});
}

export const formatColumnName = (col: string): string => {
	return col
		.replace('_PCT', '%') // FT_PCT → FT%
		.replace('FG3', '3P') // FG3M → 3PM
		.replace('FG_', 'FG') // FG_PCT → FG%
		.replace('FT_', 'FT'); // FT_PCT → FT%
};

export const formatValue = (value: number | undefined, columnName: string): string => {
	if (value == null || !isFinite(value)) return '-'; // Handle null, undefined, NaN, Infinity

	// Percentage columns (FG_PCT, FT_PCT, FG3_PCT) → .467 style
	if (columnName.includes('_PCT')) {
		const formatted = value.toFixed(3);
		return value > 0 && value < 1 ? formatted.slice(1) : formatted; // Exclude negatives from slice
	}

	// All other stats (PTS, REB, MIN, FGM, etc.) → always show .0 if whole
	return value.toFixed(1);
};
