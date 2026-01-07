<script lang="ts">
	import type { NbaInjury } from '$lib/types/nba';
	import { Info } from '@lucide/svelte';

	let { data }: { data: Partial<Record<string, NbaInjury[]>> } = $props();

	const grouped = $derived(
		Object.fromEntries(
			Object.entries(data).map(([team, injuries]) => [team, injuries ?? []])
		) as Record<string, NbaInjury[]>
	);

	const entries = $derived(Object.entries(grouped));

	const formatInjuryReason = (reason: string | undefined) => {
		if (!reason) return '—';

		if (reason?.includes(' - ')) {
			const parts = reason.split(' - ');
			if (parts.length < 2) return reason;

			const injReason = parts[1];
			const [part1, part2] = injReason.split(';');

			// Only format if we have both parts
			if (part2) {
				return `${part1} - ${part2}`;
			}
			return part1;
		}
		return reason;
	};

	const formatInjColor = (status: string | undefined) => {
		if (status === 'Available') {
			return 'available';
		} else if (status === 'Out') {
			return 'out';
		} else {
			return 'questionable';
		}
	};

	const popId = (i: NbaInjury) =>
		`inj-${encodeURIComponent(`${i.team}|${i.playerName}|${i.gameDate}|${i.matchup}`)}`;
</script>

<div class="injuries-container">
	{#if entries.length > 0}
		{#each entries as [team, injuries] (team)}
			<div class="team-injuries">
				<h3 class="team">{team}</h3>
				<div class="injury-wrapper">
					{#each injuries as injury (popId(injury))}
						{@const pid = popId(injury)}
						<div class="one-injury">
							<div class={`injured-player-name ${formatInjColor(injury.currentStatus)} `}>
								<p class="inj-player-name">
									{injury.playerName}
								</p>
								<p>- {injury.currentStatus}</p>
								<button
									class="info-btn"
									popovertarget={pid}
									aria-label="Show injury details for {injury.playerName}"
								>
									<Info size={16} />
								</button>
								<div class="injury-info" popover id={pid}>
									<p class="injury-reason">{formatInjuryReason(injury.reason) ?? '—'}</p>
								</div>
							</div>
						</div>
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

	.one-injury {
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
	}

	.injured-player-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.inj-player-name {
		font-weight: 600;
	}

	.injury-reason {
		font-size: 0.875rem;
	}

	.questionable {
		color: hsl(60, 100%, 90%);
	}

	.out {
		color: hsl(0, 100%, 92%);
	}

	.available {
		color: hsl(120, 100%, 85%);
	}

	.info-btn {
		all: unset;
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.injury-info {
		background-color: transparent;
		backdrop-filter: blur(1rem);
		color: white;
		border: var(--container-border);
		border-radius: 0.5rem;
		box-shadow: var(--container-shadow);
		padding: 0.5rem 1rem;
	}

	[popover] {
		position-area: top right;
		margin: 0.25rem;
	}
</style>
