<script lang="ts">
	import PlayerStatbox from '$lib/components/nba/playerStatbox/PlayerStatbox.svelte';
	import {
		PLAYER_AVG_COLUMNS,
		PLAYER_LATEST_COLUMNS,
		type PlayerAvgView
	} from '$lib/constants/nba';
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';

	let { data }: PageProps = $props();

	let info = $derived(data.info);
	let avg = $derived(data.avg);
	let latest = $derived(data.latest);

	let playerName = $derived(`${info.FIRST_NAME} ${info.LAST_NAME}`);

	let avgView: PlayerAvgView = $state('SHORT');
	let avgColumns = $derived(PLAYER_AVG_COLUMNS[avgView]);

	let latestColumns = PLAYER_LATEST_COLUMNS;
</script>

<svelte:head>
	<title>ROPSIT - {playerName}</title>
</svelte:head>

<main>
	<div class="nba-playerpage wrapper">
		<Header {info} />
		<PlayerStatbox {avg} {avgColumns} {playerName} />
		<PlayerStatbox {latest} {latestColumns} {playerName} />
	</div>
</main>

<style>
	.nba-playerpage {
		padding-block: 2rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
</style>
