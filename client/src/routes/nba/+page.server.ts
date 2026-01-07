import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { NbaGame, NbaInjury, PointsLeader } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;

	const [scoreboardRes, pointLeadersRes, injuryRes] = await Promise.all([
		fetch(`${baseUrl}/api/nba/today`),
		fetch(`${baseUrl}/api/nba/leaders?stat=PTS`),
		fetch(`${baseUrl}/api/nba/injuries`)
	]);

	if (!scoreboardRes.ok) {
		throw error(scoreboardRes.status, 'Failed to fetch NBA scoreboard.');
	}

	if (!pointLeadersRes.ok) {
		throw error(pointLeadersRes.status, 'Failed to fetch NBA point leaders.');
	}

	if (!injuryRes.ok) {
		throw error(injuryRes.status, 'Failed to fetch NBA injury report.');
	}

	const scoreboard: NbaGame[] = await scoreboardRes.json();
	const pointLeaders = await pointLeadersRes.json();
	const injuryReport: NbaInjury[] = await injuryRes.json();

	const filteredReport = injuryReport.filter(
		(injury) => injury.currentStatus !== null && !injury.reason?.includes('G League')
	);

	const groupedInjuries = Object.groupBy(filteredReport, (injury) => injury.team);

	return {
		games: scoreboard,
		leaders: pointLeaders.data as PointsLeader[],
		injuries: groupedInjuries
	};
};
