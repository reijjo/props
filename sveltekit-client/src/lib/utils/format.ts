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
