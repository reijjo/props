<script lang="ts">
	import type { NbaPlayerLatestShort } from '$lib/types/nba';

	let {
		latest,
		columns
	}: {
		latest: NbaPlayerLatestShort[];
		columns: readonly string[];
	} = $props();

	// TODO: Format only % values if they're available
	// if (player.FG3_PCT | player.FG_PCT | player.FT_PCT)
</script>

<tbody>
	{#each latest.slice(0, 5) as player (player.Game_ID)}
		<tr>
			{#each columns as col}
				<!-- <td>{formatValue(player[col as keyof NbaPlayerLatestShort], col)}</td> -->
				<td>{player[col as keyof NbaPlayerLatestShort]}</td>
			{/each}
		</tr>
	{/each}
</tbody>
