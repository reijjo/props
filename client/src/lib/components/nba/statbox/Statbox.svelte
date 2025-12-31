<script lang="ts">
	import './Statbox.css';
	import type { NbaTeamPlayerStatsShort, NbaTeamStatsShort } from '$lib/types/nba';
	import StatboxHeaders from './StatboxHeaders.svelte';
	import StatboxRow from './StatboxRow.svelte';

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

<section class="statbox">
	<div class="table-wrapper">
		<table aria-label={`NBA ${teamShort?.TEAM_NAME} stats for 2025-2026 season`}>
			<StatboxHeaders {columns} />
			<StatboxRow {teamShort} {playersShort} {columns} />
		</table>
	</div>
</section>
