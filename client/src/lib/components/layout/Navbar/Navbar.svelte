<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import NavLinks from './NavLinks.svelte';
	import { Menu } from '@lucide/svelte';
</script>

<nav>
	<a href="/" class="nav-logo">
		<h4>Ropsit</h4>
	</a>
	<NavLinks />
	<div class="nav-buttons">
		<!-- Work in progress -->
		<Button class="btn-outline" disabled>Login</Button>
		<Button class="btn-cta" disabled>Sign Up</Button>
	</div>
	<div class="mobile-button">
		<Menu size={24} />
	</div>
</nav>

<style>
	.nav-buttons {
		display: flex;
		gap: 1rem;
		height: 2.5rem;

		@media (max-width: 580px) {
			display: none;
		}

		& :global(button) {
			padding: 0.25rem 1.5rem;
		}
	}

	.mobile-button {
		@media (min-width: 581px) {
			display: none;
		}
	}
</style>
