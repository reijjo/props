<script lang="ts">
	import type { NbaPlayerLatestShort } from '$lib/types/nba';
	import { formatValue } from '$lib/utils/format';

	let {
		latest,
		columns
	}: {
		latest: NbaPlayerLatestShort[];
		columns: readonly string[];
	} = $props();
</script>

<tbody>
	{#each latest.slice(0, 5) as player (player.Game_ID)}
		<tr>
			{#each columns as col}
				<td>{formatValue(player[col as keyof NbaPlayerLatestShort], col)}</td>
			{/each}
		</tr>
	{/each}
</tbody>
