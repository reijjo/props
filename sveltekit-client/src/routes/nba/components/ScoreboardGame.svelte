<script lang="ts">
	import type { NbaGame } from '$lib/types/nba';
	import NbaTeamCard from './NbaTeamCard.svelte';
	import NbaTodayStatus from './NbaTodayStatus.svelte';

	let { game }: { game: NbaGame } = $props();
</script>

<article class="nba-today-game">
	<NbaTeamCard
		team={game.homeTeam}
		opponentScore={game.awayTeam.score}
		gameStatus={game.gameStatus}
	/>
	<NbaTodayStatus {game} />
	<NbaTeamCard
		team={game.awayTeam}
		opponentScore={game.homeTeam.score}
		gameStatus={game.gameStatus}
		isAwayTeam
	/>
</article>

<style>
	.nba-today-game {
		border: var(--container-border);
		box-shadow: var(--container-shadow);
		border-radius: 0.5rem;
		padding: 1rem;
		max-width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;

		@media (max-width: 580px) {
			gap: 0.5rem;
		}
	}
</style>
