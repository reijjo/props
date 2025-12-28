<script lang="ts">
	import type { StatType } from '$lib/constants/nba';
	import type { LeaderData } from '$lib/types/nba';
	import { formatValue } from '$lib/utils/format';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { player, columns }: { player: LeaderData[StatType][number]; columns: readonly string[] } =
		$props();
</script>

<tr>
	<td>
		<a href={`/nba/player/${player.PLAYER_ID}`}>{player.PLAYER}</a>
	</td>
	<td>
		<a href={`/nba/team/${player.TEAM_ID}`} class="team-logo">
			<img
				src={getTeamLogoUrl(player.TEAM_ID)}
				alt={`${player.TEAM} logo`}
				height={20}
				width={20}
			/>
			{player.TEAM}
		</a>
	</td>
	<td>{player.GP}</td>
	<td>{formatValue(player.MIN, 'MIN')}</td>
	{#each columns as col}
		<td>{formatValue(player[col as keyof typeof player] as number, col)}</td>
	{/each}
</tr>
