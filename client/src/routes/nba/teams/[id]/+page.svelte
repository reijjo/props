<script lang="ts">
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';

	let { data }: PageProps = $props();

	let team = $derived(data.team);
	let teamShort = $derived(data.teamShort);
	let players = $derived(data.players);
	let playersShort = $derived(data.playersShort);

	console.log('team', team);
	console.log('team2', teamShort);
</script>

<svelte:head>
	<title>ROPSIT - {team.TEAM_NAME}</title>
</svelte:head>

<main>
	<div class="nba-teampage wrapper">
		<Header {team} />
		<div class="statbox-table-wrapper">
			<table aria-label={`NBA ${team.TEAM_NAME} stats for 2025-2026 season`}>
				<thead>
					<tr>
						<th scope="col">name</th>
						<th scope="col">name</th>
						<th scope="col">name</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</main>

<style>
	.nba-teampage {
		padding-block: 2rem;
	}
</style>
