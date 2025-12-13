import type { PageServerLoad } from './$types.ts';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('http://localhost:3001/api/nba/teams');

	if (!res.ok) {
		throw new Error('Failed to fetch NBA teams');
	}

	const data = await res.json();

	return { teams: data.teams };
};
