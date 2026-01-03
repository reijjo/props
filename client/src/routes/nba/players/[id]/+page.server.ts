import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { NbaPlayerAvg, NbaPlayerInfo, NbaPlayerLatestBoth } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.API_URL;
	const [playerLatest, playerAvg, playerInfo] = await Promise.all([
		fetch(`${baseUrl}/api/nba/players/${params.id}`),
		fetch(`${baseUrl}/api/nba/players/${params.id}/avg`),
		fetch(`${baseUrl}/api/nba/players/${params.id}/info`)
	]);

	if (!playerLatest.ok || !playerAvg.ok || !playerInfo.ok) {
		if (!playerLatest.ok) {
			throw error(playerLatest.status, 'Failed to fetch player latest stats');
		}
		if (!playerAvg.ok) {
			throw error(playerAvg.status, 'Failed to fetch player averages');
		}
		throw error(playerInfo.status, 'Failed to fetch player info');
	}

	const latestData: NbaPlayerLatestBoth = await playerLatest.json();
	const avgData: NbaPlayerAvg = await playerAvg.json();
	const infoData: NbaPlayerInfo = await playerInfo.json();

	return { latest: latestData, avg: avgData, info: infoData };
};
