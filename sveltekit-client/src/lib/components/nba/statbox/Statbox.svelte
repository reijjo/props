<script lang="ts">
	import './Statbox.css';
	import { STATBOX_COLUMNS, type StatType } from '$lib/constants/nba';
	import type { LeaderData } from '$lib/types/nba';
	import StatboxHeaders from './StatboxHeaders.svelte';
	import StatboxRow from './StatboxRow.svelte';

	let {
		header,
		stat,
		players
	}: { header: string; stat: StatType; players: LeaderData[typeof stat] } = $props();

	const columns = $derived(STATBOX_COLUMNS[stat]);
</script>

<section class="leaders-box wrapper">
	<h3>{header}</h3>
	<div class="table-wrapper">
		<table aria-label={`NBA ${header} leaders for 2025-2026 season`}>
			<StatboxHeaders {columns} />
			<tbody>
				{#if players.length > 0}
					{#each players as player (player.PLAYER_ID)}
						<StatboxRow {player} {columns} />
					{/each}
				{:else}
					<tr>
						<td colspan={columns.length + 4} style="text-align: center; padding: 2rem;">
							No leader data available.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</section>
