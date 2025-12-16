import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { LeaderData, NbaGame } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.DEV_API_URL;

	const [scoreboardRes, pointLeadersRes] = await Promise.all([
		fetch(`${baseUrl}/api/nba/today`),
		fetch(`${baseUrl}/api/nba/leaders?stat=PTS`)
	]);

	if (!scoreboardRes.ok) {
		throw error(scoreboardRes.status, 'Failed to fetch NBA scoreboard.');
	}

	if (!pointLeadersRes.ok) {
		throw error(pointLeadersRes.status, 'Failed to fetch NBA point leaders.');
	}

	const scoreboard: NbaGame[] = await scoreboardRes.json();
	const pointLeaders = await pointLeadersRes.json();

	return { games: scoreboard, leaders: pointLeaders.data as LeaderData[] };
};
