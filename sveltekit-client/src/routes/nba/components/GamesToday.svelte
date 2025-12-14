<script lang="ts">
	import type { NbaGame } from '$lib/types/nba';
	import ScoreboardGame from './ScoreboardGame.svelte';

	let { data }: { data: NbaGame[] } = $props();
</script>

<section class="nba-today-scoreboard">
	{#if data.length > 0}
		{#each data as game (game.gameId)}
			<ScoreboardGame {game} />
		{/each}
	{:else}
		<p>No games today.</p>
	{/if}
</section>

<style>
	.nba-today-scoreboard {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
		gap: 1rem;
	}
</style>
