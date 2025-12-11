<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Ropsit</title>
</svelte:head>

<main class="error-page">
	<h1>{page.status}</h1>

	{#if page.status === 404}
		<p>Page not found</p>
		<a href="/">← Back to home</a>
	{:else}
		<p>Something went wrong</p>
		<pre>{page.error?.message}</pre>
		<a href="/">← Back to home</a>
	{/if}
</main>

<style>
	.error-page {
		text-align: center;
		font-family: var(--font-outfit);
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
	h1 {
		font-size: 6rem;
		margin: 0;
		color: var(--secondary-100);
	}
	a {
		color: var(--secondary-300);

		&:hover {
			color: var(--secondary-400);
		}
	}
</style>
