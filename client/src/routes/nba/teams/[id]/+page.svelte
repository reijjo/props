<script lang="ts">
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';

	let { data }: PageProps = $props();

	let team = $derived(data.team);
	let players = $derived(data.players);
</script>

<svelte:head>
	<title>ROPSIT - {team.TEAM_NAME}</title>
</svelte:head>

<main>
	<div class="nba-teampage wrapper">
		<Header {team} />
	</div>
</main>

<style>
	.nba-teampage {
		padding-block: 2rem;
	}
</style>
