<script lang="ts">
	import './Statbox.css';
	import type { NbaTeamPlayerStatsShort, NbaTeamStatsShort } from '$lib/types/nba';
	import { formatColumnName, formatValue } from '$lib/utils/format';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let {
		teamShort,
		playersShort,
		columns,
		teamStatColumn
	}: {
		teamShort?: NbaTeamStatsShort;
		playersShort: NbaTeamPlayerStatsShort[];
		columns: readonly string[];
		teamStatColumn?: boolean;
	} = $props();

	let sortedPlayers = $derived([...playersShort].sort((a, b) => b.MIN - a.MIN));
</script>

<section class="statbox">
	<div class="table-wrapper">
		<table aria-label={`NBA ${teamShort?.TEAM_NAME} stats for 2025-2026 season`}>
			<thead>
				<tr>
					<th scope="col">name</th>
					{#each columns as header (header)}
						<th scope="col">{formatColumnName(header)}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if teamStatColumn && teamShort}
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
				{#each sortedPlayers as player (player.PLAYER_ID)}
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
		</table>
	</div>
</section>

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
