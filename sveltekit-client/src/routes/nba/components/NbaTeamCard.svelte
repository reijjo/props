<script lang="ts">
	let { isAwayTeam, team, gameStatus, isWinner } = $props();
</script>

<div class={`nba-today-${isAwayTeam}`}>
	<div class="nba-today-logo-record">
		<p class="home-or-away">{isAwayTeam}</p>
		<a href={`/nba/teams/${team.id}`} class="nba-today-team-link">
			<img src={team.team.logo} alt={team.team.abbreviation} height={40} width={40} />
		</a>{' '}
		<p class="nba-today-team">
			{team.team.location} <br />
			{team.team.name}
		</p>
		<p class="nba-today-home-record">
			{' '}
			{team.records && team.records.length > 0 ? team.records[0].summary : 'N/A'}
		</p>
	</div>
	<h2 class={isWinner ? `winner-${isAwayTeam}` : ''}>
		{gameStatus.type.state === 'pre' ? '-' : team.score}
	</h2>
</div>

<style>
</style>
