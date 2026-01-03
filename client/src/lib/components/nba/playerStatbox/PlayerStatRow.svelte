<script lang="ts">
	import type { NbaPlayerAvgStats, NbaPlayerLatestBoth } from '$lib/types/nba';
	import { formatValue } from '$lib/utils/format';

	let {
		avg,
		columns
	}: {
		avg: NbaPlayerAvgStats;
		columns: readonly string[];
	} = $props();
</script>

<tbody>
	<tr>
		{#each columns as col}
			<td>{formatValue(avg[col as keyof NbaPlayerAvgStats], col)}</td>
		{/each}
	</tr>
</tbody>
