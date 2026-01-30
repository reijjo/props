<script lang="ts">
	import BestTypes from './components/BestTypes.svelte';
	import GameTypes from './components/GameTypes.svelte';
	import GuideInstructions from './components/GuideInstructions.svelte';
</script>

<main>
	<div class="guide wrapper">
		<h1>Nba betting guide</h1>
		<p>
			This isn't like the bible for betting the player props but it gives you a some kind of
			direction what to bet.
		</p>
		<section class="guide-grid">
			<GameTypes />
			<BestTypes />
		</section>
		<GuideInstructions />
	</div>
</main>

<style>
	.guide {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-block: 1rem;
		gap: 1.5rem;
	}

	.guide-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
		gap: 1rem;
		width: 100%;
	}
</style>
