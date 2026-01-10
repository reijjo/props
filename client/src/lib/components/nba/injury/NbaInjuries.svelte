<script lang="ts">
	import type { NbaInjury } from '$lib/types/nba';
	import InjuredPlayer from './InjuredPlayer.svelte';

	let { data }: { data: Record<string, NbaInjury[]> } = $props();

	const entries = $derived(Object.entries(data));

	const popId = (i: NbaInjury) =>
		`inj-${encodeURIComponent(
			`${i.team ?? 'unknown'}|${i.playerName ?? 'unknown'}|${i.gameDate ?? ''}|${i.matchup ?? ''}`
		)}`;
</script>

<div class="injuries-container">
	{#if entries.length > 0}
		{#each entries as [team, injuries] (team)}
			<div class="team-injuries">
				<h3 class="team">{team}</h3>
				<div class="injury-wrapper">
					{#each injuries as injury (popId(injury))}
						<InjuredPlayer {injury} {popId} />
					{/each}
				</div>
			</div>
		{/each}
	{:else}
		<p>No injuries today.</p>
	{/if}
</div>

<style>
	.injuries-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
		gap: 1rem;
		font-size: 0.925rem;
		width: 100%;
	}

	.team-injuries {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		border: var(--container-border);
		box-shadow: var(--container-shadow);
		border-radius: 0.5rem;
	}

	.injury-wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
