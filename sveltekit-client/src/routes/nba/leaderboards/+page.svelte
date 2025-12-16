<script lang="ts">
	import Statbox from '$lib/components/nba/statbox/Statbox.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="nba-leaders-page">
	<div class="header-row wrapper">
		<h1>NBA Leaders</h1>
		<Button class="btn-pressable active" disabled>2025-2026</Button>
	</div>
	<div class="leader-boxes wrapper">
		<Statbox header="Points per game" stat="PTS" players={data.pts} />
		<Statbox header="Rebounds per game" stat="REB" players={data.reb} />
		<Statbox header="Assists per game" stat="AST" players={data.ast} />
		<Statbox header="3pts made per game" stat="FG3M" players={data.fg3m} />
		<Statbox header="Blocks per game" stat="BLK" players={data.blk} />
		<Statbox header="Steals per game" stat="STL" players={data.stl} />
		<Statbox header="Turnovers per game" stat="TOV" players={data.tov} />
	</div>
</main>

<style>
	.header-row {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 1rem;
		gap: 1rem;

		& :global(button) {
			width: max-content;
		}
	}

	.nba-leaders-page {
		padding-bottom: 2rem;
	}

	.leader-boxes {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
	}
</style>
