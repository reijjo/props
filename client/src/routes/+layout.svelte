<script lang="ts">
	import './app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar, Footer } from '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	<Navbar />
	<main class="content">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	.content {
		flex-grow: 1;
	}
</style>
