<script lang="ts">
	import NbaTeamCard from './NbaTeamCard.svelte';
	import NbaTodayStatus from './NbaTodayStatus.svelte';

	let { game } = $props();
</script>

<article class="nba-today-game">
	<!-- <NbaTeamCard team={homeTeam} opponentScore={awayTeam.score} {gameStatus} />
	<NbaTodayStatus {game} gameTimeUTC={game.date} />
	<NbaTeamCard team={awayTeam} opponentScore={homeTeam.score} {gameStatus} /> -->
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

		& > :last-child {
			justify-self: end;
		}
	}
</style>
