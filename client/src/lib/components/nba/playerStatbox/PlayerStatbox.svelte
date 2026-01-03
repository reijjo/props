<script lang="ts">
	import './PlayerStatbox.css';
	import type { NbaPlayerAvg, NbaPlayerLatestBoth } from '$lib/types/nba';
	import PlayerStatHeaders from './PlayerStatHeaders.svelte';
	import PlayerStatRow from './PlayerStatRow.svelte';
	import PlayerLatestRow from './PlayerLatestRow.svelte';

	let {
		avg,
		latest,
		avgColumns,
		latestColumns,
		playerName
	}: {
		avg?: NbaPlayerAvg;
		latest?: NbaPlayerLatestBoth;
		avgColumns?: readonly string[];
		latestColumns?: readonly string[];
		playerName: string;
	} = $props();

	let latestGames = $derived(latest?.player_latest_short);
</script>

<section class="statbox">
	<div class="table-wrapper">
		{#if avg && avgColumns}
			<h3>Season Average</h3>
			<table aria-label={`${playerName} season average for 2025-2026 season`}>
				<PlayerStatHeaders columns={avgColumns} />
				<PlayerStatRow avg={avg.season_avg} columns={avgColumns} />
			</table>
			<h3>Last 5 games average</h3>
			<table aria-label={`${playerName} lsat 5 games average for 2025-2026 season`}>
				<PlayerStatHeaders columns={avgColumns} />
				<PlayerStatRow avg={avg.last_5_avg} columns={avgColumns} />
			</table>
		{/if}
		{#if latest && latestColumns && latestGames}
			<h3>Last 5 games</h3>
			<table aria-label={`${playerName} last 5 games`}>
				<PlayerStatHeaders columns={latestColumns} />
				<PlayerLatestRow latest={latestGames} columns={latestColumns} />
			</table>
		{/if}
	</div>
</section>
