import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { NbaTeamsPage } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.DEV_API_URL;
	const res = await fetch(`${baseUrl}/api/nba/teams/${params.id}`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA team');
	}

	const data: NbaTeamsPage = await res.json();

	return {
		players: data.players,
		team: data.team_stats,
		playersShort: data.players_short,
		teamShort: data.team_stats_short
	};
};
