<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import GamesToday from './components/GamesToday.svelte';

	import { MoveRight } from '@lucide/svelte';
	let { data }: PageProps = $props();
</script>

<main class="nba-page">
	<section class="nba-today wrapper">
		<h1>NBA</h1>
		<h2>NBA Games & Scores</h2>
		<GamesToday data={data.games} />
	</section>
	<section class="nba-page-leaders wrapper">
		<h2>NBA Leaders</h2>
		<!-- <LeadersBox header="Points per game" stat="PTS" /> -->
		<a href="/nba/leaders" class="nba-page-link">
			<Button class="btn-outline btn-with-icon">
				View All Leaderboards
				<MoveRight size={14} class="btn-icon" />
			</Button>
		</a>
	</section>
</main>

<style>
	.nba-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
		padding-bottom: 2rem;

		& h1 {
			align-self: center;
		}

		& h2 {
			font-size: 2rem;
			letter-spacing: 0;
		}
	}

	.nba-today {
		padding-top: 2rem;
	}

	.nba-today,
	.nba-page-leaders {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.nba-page-link {
		width: max-content;
	}
</style>
