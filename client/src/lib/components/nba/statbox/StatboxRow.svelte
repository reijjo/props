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

	const getMaxValue = (col: string) => {
		return Math.max(...playersShort.map((p) => p[col as keyof NbaTeamPlayerStatsShort] as number));
	};

	let maxValues = $derived(Object.fromEntries(columns.map((col) => [col, getMaxValue(col)])));

	const isMaxValue = (player: NbaTeamPlayerStatsShort, col: string) => {
		if (col === 'GP') return false;
		const value = player[col as keyof NbaTeamPlayerStatsShort];
		return value === maxValues[col];
	};

	let showAll = $state(false);
	const visiblePlayers = $derived(showAll ? playersShort : playersShort.slice(0, 6));
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

	{#each visiblePlayers as player (player.PLAYER_ID)}
		<tr>
			<td>
				<a href={`/nba/players/${player.PLAYER_ID}`}>{player.PLAYER_NAME}</a>
			</td>
			{#each columns as col}
				<td class:leader={isMaxValue(player, col)}
					>{formatValue(player[col as keyof NbaTeamPlayerStatsShort], col)}</td
				>
			{/each}
		</tr>
	{/each}

	{#if playersShort.length > 5}
		<tr class="show-more-row">
			<td colspan={columns.length + 1}>
				<button class="show-more-btn" onclick={() => (showAll = !showAll)}>
					{showAll ? 'Show Less' : `Show All ${playersShort.length} Players`}
				</button>
			</td>
		</tr>
	{/if}
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

	.leader {
		color: var(--secondary-300);
	}

	.show-more-row {
		border: none;
	}

	.show-more-row td {
		text-align: center;
		padding: 0.75rem;
	}

	.show-more-btn {
		padding: 0.5rem 1.25rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		color: var(--text-primary, white);
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 150ms ease;
	}

	.show-more-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
	}
</style>
