<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	import { page } from '$app/state';
</script>

<nav>
	<a href="/" class="nav-logo">
		<h4>Ropsit</h4>
	</a>
	<ul class="nav-links">
		<li>
			<a
				href="/nba"
				class:active={page.url.pathname.toString() === '/nba'}
				aria-current={page.url.pathname.toString() === '/nba' ? 'page' : undefined}>NBA</a
			>
		</li>
	</ul>
	<div class="nav-buttons">
		<Button class="btn-outline">Login</Button>
		<Button class="btn-cta">Sign Up</Button>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		z-index: 10;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		width: 95%;
		max-width: 1366px;
		height: var(--nav-height);

		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.125), rgba(0, 0, 0, 0.125));
		backdrop-filter: blur(1rem);
		border: 1px solid rgba(255, 255, 255, 0.125);
		border-radius: 5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 1.5rem;

		box-shadow:
			0 8px 16px rgba(0, 163, 218, 0.125),
			0 8px 36px rgba(0, 163, 218, 0.075);
	}

	.nav-buttons {
		display: flex;
		gap: 1rem;
		height: 2.5rem;
		/* visibility: hidden; */
		& :global(button) {
			padding: 0.25rem 1.5rem;
		}
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;

		& li {
			list-style: none;

			& a.active {
				font-weight: 600;
			}

			& a:hover:not(.active) {
				color: var(--accent-200);
			}
		}
	}
</style>
