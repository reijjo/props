<script lang="ts">
	import { formatColumnName } from '$lib/utils/format';

	let { columns }: { columns: readonly string[] } = $props();
</script>

<thead>
	<tr>
		<th scope="col">name</th>
		{#each columns as header (header)}
			<th scope="col">{formatColumnName(header)}</th>
		{/each}
	</tr>
</thead>
