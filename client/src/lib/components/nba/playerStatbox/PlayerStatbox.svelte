<script lang="ts">
	import './PlayerStatbox.css';
	import type { NbaPlayerAvg, NbaPlayerLast5, NbaPlayerLatestBoth } from '$lib/types/nba';
	import PlayerStatHeaders from './PlayerStatHeaders.svelte';
	import PlayerStatRow from './PlayerStatRow.svelte';
	import PlayerLatestRow from './PlayerLatestRow.svelte';

	let {
		avg,
		latest,
		avgColumns,
		latestColumns,
		playerName,
		last5
	}: {
		avg?: NbaPlayerAvg;
		latest?: NbaPlayerLatestBoth;
		avgColumns?: readonly string[];
		latestColumns?: readonly string[];
		last5?: NbaPlayerLast5;
		playerName: string;
	} = $props();

	let latestGames = $derived(latest?.player_latest_short);
	let last5avg = $derived(last5?.last_5_avg);
</script>

<section class="statbox">
	<div class="table-wrapper">
		{#if avg && avgColumns}
			<h3>Season Average</h3>
			<table aria-label={`${playerName} season average for 2025-2026 season`}>
				<PlayerStatHeaders columns={avgColumns} />
				<PlayerStatRow avg={avg.season_avg} columns={avgColumns} />
			</table>
			{#if last5avg}
				<h3>Last 5 games average</h3>
				<table aria-label={`${playerName} last 5 games average for 2025-2026 season`}>
					<PlayerStatHeaders columns={avgColumns} />
					<PlayerStatRow avg={last5avg} columns={avgColumns} />
				</table>
			{/if}
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
