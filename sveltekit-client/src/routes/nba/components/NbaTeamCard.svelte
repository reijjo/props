<script lang="ts">
	import '$lib/styles/nba/ScoreboardGame.css';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	type Props = {
		team: NbaMatchTeam;
		opponentScore: number | string;
		isAwayTeam?: boolean;
	};

	let { team, opponentScore, isAwayTeam = false }: Props = $props();

	let isWinner = $derived(team.score > Number(opponentScore));
</script>

<div class={`nba-today-${isAwayTeam ? 'away' : 'home'}`}>
	<div class="nba-today-logo-record">
		<p class="home-or-away">{isAwayTeam ? 'away' : 'home'}</p>
		<a href={`/nba/teams/${team.teamId}`} class="nba-today-team-link">
			<img src={getTeamLogoUrl(team.teamId)} alt={team.teamTricode} height={40} width={40} />
		</a>{' '}
		<p class="nba-today-team">
			{team.teamCity} <br />
			{team.teamName}
		</p>
		<p class="nba-today-home-record">
			{' '}
			{team.wins}-{team.losses}
		</p>
	</div>
	<h2 class={isWinner ? `winner-${isAwayTeam ? 'away' : 'home'}` : ''}>
		{team.score}
	</h2>
</div>
