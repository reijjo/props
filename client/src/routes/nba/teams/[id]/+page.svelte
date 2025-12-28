<script lang="ts">
	import type { PageProps } from './$types';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { data }: PageProps = $props();

	let team = $derived(data.team);
	let players = $derived(data.players);
</script>

<svelte:head>
	<title>ROPSIT - {team.TEAM_NAME}</title>
</svelte:head>

<main>
	<div class="nba-teampage wrapper">
		<div class="nba-teampage-header">
			<img src={getTeamLogoUrl(team.TEAM_ID)} alt={team.TEAM_NAME} />
			<h1>{team.TEAM_NAME}</h1>
		</div>
	</div>
</main>

<style>
	.nba-teampage {
		padding-block: 2rem;
	}

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
</style>
