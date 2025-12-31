<script lang="ts">
	import type { NbaTeamPlayerStatsShort, NbaTeamStatsShort } from '$lib/types/nba';
	import { formatValue } from '$lib/utils/format';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let {
		teamShort,
		playersShort,
		columns
	}: {
		teamShort?: NbaTeamStatsShort;
		playersShort: NbaTeamPlayerStatsShort[];
		columns: readonly string[];
	} = $props();
</script>

<tbody>
	{#if teamShort}
		<tr class="team-stat-column">
			<td class="team-name-column">
				<img
					src={getTeamLogoUrl(teamShort.TEAM_ID)}
					alt={teamShort.TEAM_NAME}
					height={28}
					width={28}
				/>
				{teamShort.TEAM_NAME}
			</td>
			{#each columns as col}
				<td>{formatValue(teamShort[col as keyof NbaTeamStatsShort], col)}</td>
			{/each}
		</tr>
	{/if}
	{#each playersShort as player (player.PLAYER_ID)}
		<tr>
			<td>
				<a href={`/nba/player/${player.PLAYER_ID}`}>{player.PLAYER_NAME}</a>
			</td>
			{#each columns as col}
				<td>{formatValue(player[col as keyof NbaTeamPlayerStatsShort], col)}</td>
			{/each}
		</tr>
	{/each}
</tbody>

<style>
	.team-stat-column {
		border-bottom: 1px solid rgb(from var(--accent) r g b / 0.25);
		font-weight: 600;
	}

	.team-name-column {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
