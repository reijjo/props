<script lang="ts">
	import Statbox from '$lib/components/nba/statbox/Statbox.svelte';
	import { STATBOX_COLUMNS, type StatboxView } from '$lib/constants/nba';
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';
	import TeamInjuries from './components/TeamInjuries.svelte';

	let { data }: PageProps = $props();

	let team = $derived(data.team);
	let teamShort = $derived(data.teamShort);
	let players = $derived(data.players);
	let playersShort = $derived(data.playersShort);
	let injuries = $derived(data.injuries);

	let view: StatboxView = 'SHORT';
	let columns = STATBOX_COLUMNS[view];

	console.log('SHORTT', playersShort);
</script>

<svelte:head>
	<title>ROPSIT - {team.TEAM_NAME}</title>
</svelte:head>

<main>
	<div class="nba-teampage wrapper">
		<Header {team} />
		<Statbox {teamShort} {playersShort} {columns} />
		<TeamInjuries {injuries} />
	</div>
</main>

<style>
	.nba-teampage {
		padding-block: 2rem;
	}
</style>
