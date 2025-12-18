import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.DEV_API_URL;
	const res = await fetch(`${baseUrl}/api/nba/teams/${params.id}`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA team');
	}

	const data = await res.json();

	return { team: data.team };
};
