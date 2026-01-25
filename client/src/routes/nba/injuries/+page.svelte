<script lang="ts">
	import NbaInjuries from '$lib/components/nba/injury/NbaInjuries.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="nba-injuries-page">
	<div class="header-row wrapper">
		<h1>Nba injuries</h1>
		<NbaInjuries data={data.injuries} />
	</div>
</main>

<style>
	.header-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-block: 1rem;
		gap: 1rem;
	}
</style>
