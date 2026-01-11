<script lang="ts">
	import NbaInjuries from '$lib/components/nba/injury/NbaInjuries.svelte';
	import type { NbaInjury } from '$lib/types/nba';

	let { injuries }: { injuries: NbaInjury[] } = $props();
</script>

{#if injuries.length > 0}
	<div class="team-injury-block">
		<NbaInjuries data={{ injuries }} />
	</div>
{/if}

<style>
	.team-injury-block {
		margin-top: 2rem;
	}
</style>
