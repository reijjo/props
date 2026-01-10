import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { NbaInjury, NbaTeamsPage } from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const baseUrl = env.API_URL;
	const [teamRes, injuryRes] = await Promise.all([
		fetch(`${baseUrl}/api/nba/teams/${params.id}`),
		fetch(`${baseUrl}/api/nba/injuries`)
	]);

	if (!teamRes.ok) {
		throw error(teamRes.status, 'Failed to fetch NBA team');
	}

	if (!injuryRes.ok) {
		throw error(injuryRes.status, 'Failed to fetch NBA injuries');
	}

	const teamData: NbaTeamsPage = await teamRes.json();
	const injData: Record<string, NbaInjury[]> = await injuryRes.json();

	const sortedPlayers = [...teamData.players].sort((a, b) => b.MIN - a.MIN);
	const sortedPlayersShort = [...teamData.players_short].sort((a, b) => b.MIN - a.MIN);
	const teamInjuries = injData[teamData.team_stats.TEAM_NAME] ?? [];

	return {
		players: sortedPlayers,
		team: teamData.team_stats,
		playersShort: sortedPlayersShort,
		teamShort: teamData.team_stats_short,
		injuries: teamInjuries
	};
};
