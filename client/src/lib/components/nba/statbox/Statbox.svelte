<script lang="ts">
	import type { NbaTeamStatsShort } from '$lib/types/nba';
	import { formatColumnName, formatValue } from '$lib/utils/format';
	import { getTeamLogoUrl } from '$lib/utils/nba';

	let { teamShort, columns }: { teamShort: NbaTeamStatsShort; columns: readonly string[] } =
		$props();
</script>

<section class="statbox-table-wrapper">
	<table aria-label={`NBA ${teamShort.TEAM_NAME} stats for 2025-2026 season`}>
		<thead>
			<tr>
				<th scope="col">name</th>
				{#each columns as header (header)}
					<th scope="col">{formatColumnName(header)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<img
						src={getTeamLogoUrl(teamShort.TEAM_ID)}
						alt={teamShort.TEAM_NAME}
						height={20}
						width={20}
					/>
				</td>
				{#each columns as col}
					<td>{formatValue(teamShort[col as keyof NbaTeamStatsShort], col)}</td>
				{/each}
			</tr>
		</tbody>
	</table>
</section>
