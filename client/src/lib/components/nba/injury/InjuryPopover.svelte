<script lang="ts">
	import type { NbaInjury } from '$lib/types/nba';
	import { Info } from '@lucide/svelte';

	let { injury, popId }: { injury: NbaInjury; popId: (injury: NbaInjury) => string } = $props();

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
</script>

<div>
	<button
		class="info-btn"
		popovertarget={popId(injury)}
		aria-label="Show injury details for {injury.playerName}"
	>
		<Info size={16} />
	</button>
	<div class="injury-info" popover id={popId(injury)}>
		<p class="injury-reason">{formatInjuryReason(injury.reason)}</p>
	</div>
</div>

<style>
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

	.injury-reason {
		font-size: 0.825rem;
	}

	[popover] {
		position-area: top right;
		margin: 0.25rem;
	}
</style>
