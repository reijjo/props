<script lang="ts">
	import '$lib/styles/nba/ScoreboardGame.css';
	import { getTeamLogoUrl } from '$lib/utils/nba';
	import type { NbaMatchTeam } from '$lib/types/nba';
	import { NBA_GAME_STATUS, type NbaGameStatus } from '$lib/constants/nba';

	type Props = {
		team: NbaMatchTeam;
		opponentScore: number;
		isAwayTeam?: boolean;
		gameStatus: NbaGameStatus;
	};

	let { team, opponentScore, gameStatus, isAwayTeam = false }: Props = $props();

	let isWinner = $derived(team.score > opponentScore);
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
		{gameStatus === NBA_GAME_STATUS.NOT_STARTED ? '-' : team.score}
	</h2>
</div>
