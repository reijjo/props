import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { NbaGame } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.DEV_API_URL;
	const res = await fetch(`${baseUrl}/api/nba/today`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA scoreboard.');
	}

	const data: NbaGame[] = await res.json();

	return { games: data };
};
