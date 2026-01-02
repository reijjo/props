<script lang="ts">
	import type { PageProps } from './$types';
	import Header from './components/Header.svelte';

	let { data }: PageProps = $props();

	let info = $derived(data.info);
	let avg = $derived(data.avg);
	let latest = $derived(data.latest);
</script>

<svelte:head>
	<title>ROPSIT - {info.FIRST_NAME} {info.LAST_NAME}</title>
</svelte:head>

<main>
	<div class="nba-playerpage wrapper">
		<Header {info} />
	</div>
</main>

<style>
	.nba-playerpage {
		padding-block: 2rem;
	}
</style>
