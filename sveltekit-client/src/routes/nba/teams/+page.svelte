<script lang="ts">
	import { getTeamLogoUrl } from '$lib/utils/nba.js';
	import type { PageProps } from './$types.ts';
	import { fade } from 'svelte/transition';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>NBA Teams</title>
</svelte:head>

<main class="nba-all-teams-page">
	<div class="nba-all-teams wrapper">
		<h1>NBA Teams</h1>
		{#await data.teams}
			<div transition:fade class="loading">
				<p>Loading teams...</p>
			</div>
		{:then teams}
			<div transition:fade={{ duration: 300 }} class="teams-grid">
				{#each teams as team}
					<a href="/nba/teams/{team.id}" class="team-card">
						<img
							src={getTeamLogoUrl(Number(team.id))}
							alt={team.abbreviation}
							width={42}
							height={42}
						/>
						<p>{team.full_name}</p>
					</a>
				{/each}
			</div>
		{/await}
	</div>
</main>

<style>
	.loading {
		text-align: center;
		padding: 4rem;
		font-size: 1.25rem;
	}

	.nba-all-teams {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& h1 {
			text-align: center;
		}
	}

	.teams-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
		gap: 1rem;
		padding-bottom: 2rem;
	}

	.team-card {
		border: var(--container-border);
		border-radius: 0.25rem;
		box-shadow: var(--container-shadow);

		gap: 0.5rem;
		padding: 1rem;
		transform: scale(1);

		display: grid;
		grid-template-columns: 30% 70%;
		align-items: center;

		transition: all 0.2s ease-in-out;

		&:hover {
			transform: scale(1.05);
			border-color: rgb(from var(--secondary) r g b / 0.5);
		}
	}
</style>
