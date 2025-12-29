<script lang="ts">
	import Statbox from '$lib/components/nba/statbox/Statbox.svelte';
	import { STATBOX_COLUMNS, type StatboxView } from '$lib/constants/nba';
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';

	let { data }: PageProps = $props();

	let team = $derived(data.team);
	let teamShort = $derived(data.teamShort);
	let players = $derived(data.players);
	let playersShort = $derived(data.playersShort);

	console.log('team', team);
	console.log('team2', teamShort);
	let view: StatboxView = 'SHORT';
	let columns = STATBOX_COLUMNS[view];
</script>

<svelte:head>
	<title>ROPSIT - {team.TEAM_NAME}</title>
</svelte:head>

<main>
	<div class="nba-teampage wrapper">
		<Header {team} />
		<div class="statbox-table-wrapper">
			<Statbox {teamShort} {columns} />
			<!-- <table aria-label={`NBA ${team.TEAM_NAME} stats for 2025-2026 season`}>
				<thead>
					<tr>
						<th scope="col">name</th>
						{#each columns as header (header)}
							<th scope="col">{formatColumnName(header)}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<img
								src={getTeamLogoUrl(teamShort.TEAM_ID)}
								alt={teamShort.TEAM_NAME}
								height={20}
								width={20}
							/>
						</td>
						{#each columns as col}
							<td>{formatValue(teamShort[col], col)}</td>
						{/each}
					</tr>
				</tbody>
			</table> -->
		</div>
	</div>
</main>

<style>
	.nba-teampage {
		padding-block: 2rem;
	}
</style>
