<script lang="ts">
	import '$lib/styles/globals.css';
	import '$lib/styles/common.css';
	import Navbar from '$lib/components/layout/Navbar/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Player Props</title>
	<meta
		name="description"
		content="Clean, focused NBA player stats for sports betting and fantasy sports. Only what you need, nothing extra."
	/>
</svelte:head>

<div class="layout">
	<Navbar />
	<div class="content">
		{@render children()}
		<Footer />
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex-grow: 1;
		position: relative;
	}
</style>
