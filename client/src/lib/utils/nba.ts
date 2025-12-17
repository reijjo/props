export const getTeamLogoUrl = (teamId: number, theme: 'L' | 'D' = 'L') => {
	return `https://cdn.nba.com/logos/nba/${teamId}/primary/${theme}/logo.svg`;
};
