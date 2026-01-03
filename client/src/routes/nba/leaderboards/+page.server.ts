import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type {
	AssistLeader,
	BlocksLeader,
	PointsLeader,
	ReboundLeader,
	StealsLeader,
	ThreePointerLeader,
	TurnoversLeader
} from '$lib/types/nba';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;

	const [ptsRes, rebRes, astRes, fg3mRes, blkRes, stlRes, tovRes] = await Promise.all([
		fetch(`${baseUrl}/api/nba/leaders?stat=PTS`),
		fetch(`${baseUrl}/api/nba/leaders?stat=REB`),
		fetch(`${baseUrl}/api/nba/leaders?stat=AST`),
		fetch(`${baseUrl}/api/nba/leaders?stat=FG3M`),
		fetch(`${baseUrl}/api/nba/leaders?stat=BLK`),
		fetch(`${baseUrl}/api/nba/leaders?stat=STL`),
		fetch(`${baseUrl}/api/nba/leaders?stat=TOV`)
	]);

	if (
		!ptsRes.ok ||
		!rebRes.ok ||
		!astRes.ok ||
		!fg3mRes.ok ||
		!blkRes.ok ||
		!stlRes.ok ||
		!tovRes.ok
	) {
		throw error(ptsRes.status, 'Failed to fetch NBA leaders.');
	}

	const points = await ptsRes.json();
	const rebounds = await rebRes.json();
	const assists = await astRes.json();
	const threePointers = await fg3mRes.json();
	const blocks = await blkRes.json();
	const steals = await stlRes.json();
	const turnovers = await tovRes.json();

	return {
		pts: points.data as PointsLeader[],
		reb: rebounds.data as ReboundLeader[],
		ast: assists.data as AssistLeader[],
		fg3m: threePointers.data as ThreePointerLeader[],
		blk: blocks.data as BlocksLeader[],
		stl: steals.data as StealsLeader[],
		tov: turnovers.data as TurnoversLeader[]
	};
};
