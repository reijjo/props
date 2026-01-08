<script lang="ts">
	import type { NbaInjury } from '$lib/types/nba';
	import InjuredPlayer from './InjuredPlayer.svelte';

	let { data }: { data: Partial<Record<string, NbaInjury[]>> } = $props();

	const grouped = $derived(
		Object.fromEntries(
			Object.entries(data).map(([team, injuries]) => [team, injuries ?? []])
		) as Record<string, NbaInjury[]>
	);

	const entries = $derived(Object.entries(grouped));

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
		grid-template-columns: auto;
		gap: 1rem;
		font-size: 0.925rem;
	}

	.team-injuries {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: var(--container-border);
		box-shadow: var(--container-shadow);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.injury-wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
