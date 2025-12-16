<script lang="ts">
	import { formatColumnName } from '$lib/utils/format';
	let { columns }: { columns: readonly string[] } = $props();
</script>

<thead>
	<tr>
		<th scope="col">name</th>
		<th scope="col">team</th>
		<th scope="col">gp</th>
		<th scope="col">min</th>
		{#each columns as stat (stat)}
			<th scope="col">
				{formatColumnName(stat)}
			</th>
		{/each}
	</tr>
</thead>
