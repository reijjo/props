<script lang="ts">
	import type { NbaInjury } from '$lib/types/nba';
	import InjuryPopover from './InjuryPopover.svelte';

	let { injury, popId }: { injury: NbaInjury; popId: (injury: NbaInjury) => string } = $props();

	const formatInjColor = (status: string | undefined) => {
		if (status === 'Available') {
			return 'available';
		} else if (status === 'Out') {
			return 'out';
		} else {
			return 'questionable';
		}
	};
</script>

<div class="one-injury">
	<div class={`injured-player-name ${formatInjColor(injury.currentStatus)} `}>
		<p class="inj-player-name">
			{injury.playerName}
		</p>
		<p>- {injury.currentStatus}</p>
		<InjuryPopover {injury} {popId} />
	</div>
</div>

<style>
	.one-injury {
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
	}

	.injured-player-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.inj-player-name {
		font-weight: 600;
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
</style>
