import type { NbaInjury } from '$lib/types/nba';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;
	const res = await fetch(`${baseUrl}/api/nba/injuries`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA injuries');
	}

	const data: Record<string, NbaInjury[]> = await res.json();

	return { injuries: data };
};
