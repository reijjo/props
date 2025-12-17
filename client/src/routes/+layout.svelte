<script lang="ts">
	import '$lib/styles/globals.css';
	import '$lib/styles/common.css';
	import Navbar from '$lib/components/layout/Navbar/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<svelte:head>
	<title>Player Props</title>
	<meta
		name="description"
		content="Clean, focused NBA player stats for sports betting and fantasy sports. Only what you need, nothing extra."
	/>
</svelte:head>

{#if $navigating}
	<div class="global-loading" transition:fade={{ duration: 200 }}>
		<div class="spinner"></div>
		<p>Loading...</p>
	</div>
{/if}

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

	.global-loading {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(8px);
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		color: white;
		font-size: 1.125rem;
	}

	.spinner {
		width: 3rem;
		height: 3rem;
		border: 5px solid rgba(255, 255, 255, 0.3);
		border-top: 5px solid var(--secondary-200);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
