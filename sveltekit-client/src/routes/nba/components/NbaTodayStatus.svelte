<script lang="ts">
	let { game } = $props();
</script>

<div class="nba-today-gamestatus">
	{#if game.gameStatus === 3}
		<h3>{game.gameStatusText}</h3>
	{:else}
		<h3>{formatGameTime(game.gameTimeUTC, game.gameStatusText)}</h3>
	{/if}
	<!-- <GameOdds gameOdds={gameOdds} /> -->
</div>

<style>
	.nba-today-gamestatus {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		text-wrap: balance;
		text-align: center;
		position: relative;
		height: 100%;

		& h3 {
			@media (max-width: 580px) {
				font-size: 1rem;
			}
		}
	}
</style>
