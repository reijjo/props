<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import NavLinks from './NavLinks.svelte';
</script>

<nav>
	<a href="/" class="nav-logo">
		<h4>Ropsit</h4>
	</a>
	<NavLinks />
	<div class="nav-buttons">
		<Button class="btn-outline">Login</Button>
		<Button class="btn-cta">Sign Up</Button>
	</div>
</nav>

<style>
	.nav-buttons {
		display: flex;
		gap: 1rem;
		height: 2.5rem;

		& :global(button) {
			padding: 0.25rem 1.5rem;
		}
	}
</style>
