<script lang="ts">
	import type { NbaPlayerInfo } from '$lib/types/nba';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { info }: { info: NbaPlayerInfo } = $props();
	let imageError = $state(false);

	let foot = $derived(parseInt(info.HEIGHT.split('-')[0]));
	let inches = $derived(parseInt(info.HEIGHT.split('-')[1]));

	let heightCm = $derived(Math.round(foot * 30.48 + inches * 2.54));

	let weightLbs = $derived(parseInt(info.WEIGHT));
	let weightKg = $derived(Math.round(weightLbs * 0.453592));
</script>

<section class="nba-playerpage-header">
	<img
		src={getTeamLogoUrl(info.TEAM_ID)}
		alt={info.TEAM_NAME}
		onerror={() => (imageError = true)}
		style:display={imageError ? 'none' : 'block'}
	/>
	<div class="nba-player-header-wrapper">
		<h1>{info.FIRST_NAME} {info.LAST_NAME}</h1>
		<div class="nba-player-info">
			<div>
				# {info.JERSEY}
			</div>
			<div>
				{info.POSITION}
			</div>
			<div>{heightCm} cm</div>
			<div>
				{weightKg} kg
			</div>
		</div>
	</div>
</section>

<style>
	.nba-playerpage-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-wrap: balance;

		& img {
			width: 10rem;
			height: 10rem;

			@media (max-width: 580px) {
				width: 5rem;
				height: 5rem;
			}
		}
	}

	.nba-player-info {
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		font-weight: 200;

		@media (max-width: 580px) {
			font-size: 0.75rem;
			gap: 0.5rem;
		}

		& > div {
			display: flex;
			gap: 0.25rem;
			text-align: center;
			justify-content: center;
			white-space: nowrap;
		}
	}
</style>
