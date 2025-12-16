<script lang="ts">
	import type { StatType } from '$lib/constants/nba';
	import type { LeaderData } from '$lib/types/nba';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { player, columns }: { player: LeaderData[StatType][number]; columns: readonly string[] } =
		$props();

	const formatValue = (value: number | undefined, columnName: string): string => {
		if (value === undefined || value === null) return '-';

		// Percentage columns (FG_PCT, FT_PCT, FG3_PCT) → .467 style
		if (columnName.includes('_PCT')) {
			return value.toFixed(3).slice(1); // "0.467" → ".467"
		}

		// All other stats (PTS, REB, MIN, FGM, etc.) → always show .0 if whole
		return value.toFixed(1);
	};
</script>

<tr>
	<td>
		<a href={`/nba/player/${player.PLAYER_ID}`}>{player.PLAYER}</a>
	</td>
	<td>
		<a href={`/nba/team/${player.TEAM_ID}`} class="team-logo">
			<img src={getTeamLogoUrl(player.TEAM_ID)} alt={player.TEAM} height={20} width={20} />
			{player.TEAM}
		</a>
	</td>
	<td>{player.GP}</td>
	<td>{formatValue(player.MIN, 'MIN')}</td>
	{#each columns as col}
		<td>{formatValue((player as any)[col], col)}</td>
	{/each}
</tr>
