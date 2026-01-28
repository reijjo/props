import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type {
	NbaPlayerAvg,
	NbaPlayerInfo,
	NbaPlayerLast5,
	NbaPlayerLatestBoth
} from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.API_URL;
	const [playerLatest, playerAvg, playerInfo, playerLast5] = await Promise.all([
		fetch(`${baseUrl}/api/nba/players/${params.id}`),
		fetch(`${baseUrl}/api/nba/players/${params.id}/avg`),
		fetch(`${baseUrl}/api/nba/players/${params.id}/info`),
		fetch(`${baseUrl}/api/nba/players/${params.id}/avg5`)
	]);

	if (!playerLatest.ok || !playerAvg.ok || !playerInfo.ok || !playerLast5.ok) {
		if (!playerLatest.ok) {
			throw error(playerLatest.status, 'Failed to fetch player latest stats');
		}
		if (!playerAvg.ok) {
			throw error(playerAvg.status, 'Failed to fetch player averages');
		}
		if (!playerLast5.ok) {
			throw error(playerLast5.status, 'Failed to fetch player last 5 averages');
		}
		throw error(playerInfo.status, 'Failed to fetch player info');
	}

	const latestData: NbaPlayerLatestBoth = await playerLatest.json();
	const avgData: NbaPlayerAvg = await playerAvg.json();
	const infoData: NbaPlayerInfo = await playerInfo.json();
	const last5Data: NbaPlayerLast5 = await playerLast5.json();

	return { latest: latestData, avg: avgData, info: infoData, last5: last5Data };
};
