import type { PageServerLoad } from './$types.ts';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { NbaTeamCard } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;
	const res = await fetch(`${baseUrl}/api/nba/teams`);

	if (!res.ok) {
		throw error(res.status, 'Failed to fetch NBA teams');
	}

	const data = await res.json();

	const sortedTeams: NbaTeamCard[] = [...data.teams].sort((a, b) =>
		a.full_name.localeCompare(b.full_name)
	);

	return { teams: sortedTeams };
};
