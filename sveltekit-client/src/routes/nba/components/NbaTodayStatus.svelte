<script lang="ts">
	import { NBA_GAME_STATUS } from '$lib/constants/nba';
	import type { NbaGame } from '$lib/types/nba';
	import { formatGameTime } from '$lib/utils/format';

	let { game }: { game: NbaGame } = $props();
</script>

<div class="nba-today-gamestatus">
	{#if game.gameStatus === NBA_GAME_STATUS.NOT_STARTED}
		<p>Starts at:</p>
		<h3>{formatGameTime(game.gameTimeUTC, game.gameStatusText)}</h3>
	{:else}
		<h3>{game.gameStatusText}</h3>
	{/if}
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

		& p {
			font-size: 0.75rem;
			font-weight: 100;
		}

		& h3 {
			font-size: 1rem;
		}
	}
</style>
