<script lang="ts">
	import type { NbaTeamStats } from '$lib/types/nba';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { team }: { team: NbaTeamStats } = $props();

	const formatPct = (value: number) => value.toFixed(3).replace(/^0\./, '.');
</script>

<section class="nba-teampage-header">
	<img src={getTeamLogoUrl(team.TEAM_ID)} alt={team.TEAM_NAME} />
	<div class="nba-team-header-wrapper">
		<h1>{team.TEAM_NAME}</h1>
		<div class="nba-team-record">
			<div>
				{team.W} - {team.L}
			</div>
			<div>
				<p>Win %</p>
				<p>{formatPct(team.W_PCT)}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.nba-teampage-header {
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

	.nba-team-record {
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		font-weight: 200;

		& > div {
			display: flex;
			gap: 0.25rem;
			text-align: center;
			justify-content: center;
		}
	}
</style>
