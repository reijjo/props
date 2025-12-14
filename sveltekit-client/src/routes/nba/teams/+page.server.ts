import type { PageServerLoad } from './$types.ts';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.DEV_API_URL;
	const res = await fetch(`${baseUrl}/api/nba/teams`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA teams');
	}

	const data = await res.json();

	return { teams: data.teams };
};
