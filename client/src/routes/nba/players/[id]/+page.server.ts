import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.DEV_API_URL;
	const res = await fetch(`${baseUrl}/api/nba/players/${params.id}`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA player');
	}

	const data = await res.json();

	console.log('data', data);

	return { player: data };
};
