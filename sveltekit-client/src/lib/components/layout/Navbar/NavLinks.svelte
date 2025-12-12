<script lang="ts">
	import { page } from '$app/state';

	const navLinks = [
		{
			label: 'NBA',
			href: '/nba',
			sublinks: [
				{
					label: 'Home',
					href: '/nba'
				},
				{
					label: 'Teams',
					href: '/nba/teams'
				},
				{
					label: 'Leaderboards',
					href: '/nba/leaderboards'
				}
			]
		}
	];
</script>

<ul class="nav-links">
	{#each navLinks as link}
		<li>
			<a
				href={link.href}
				class:active={page.url.pathname.toString() === link.href}
				aria-current={page.url.pathname.toString() === link.href ? 'page' : undefined}
				>{link.label}</a
			>
			{#if link.sublinks}
				<ul class="nav-sub-menu">
					{#each link.sublinks as sublink}
						<li>
							<a href={sublink.href}>{sublink.label}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.nav-links {
		display: flex;
		gap: 1.5rem;
		position: relative;
		height: 100%;
		align-items: center;

		& li {
			list-style: none;

			& a {
				height: 100%;
			}

			& a.active {
				font-weight: 600;
			}

			& a:hover:not(.active) {
				color: var(--accent-200);
			}
		}
	}

	.nav-sub-menu {
		visibility: hidden;
		opacity: 0;
		max-height: 0;
		border: 1px solid rgba(255, 255, 255, 0.125);
		border-radius: 0.5rem;
		position: absolute;
		top: calc(var(--nav-height));
		left: 0;
		width: max-content;
		flex-direction: column;
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.125), rgba(0, 0, 0, 0.125));
		box-shadow:
			0 8px 16px rgba(0, 163, 218, 0.125),
			0 8px 36px rgba(0, 163, 218, 0.075);

		transform: scaleY(0);
		transform-origin: top;

		transition:
			opacity 0.125s ease,
			visibility 0.125s ease,
			max-height 0.25s ease,
			transform 0.25s ease;
		overflow: hidden;

		& li {
			padding-block: 0.5rem;

			&:hover {
				background: var(--primary);
			}

			&:not(:last-child) {
				border-bottom: 1px solid rgba(255, 255, 255, 0.125);
			}

			& a {
				padding-inline: 1rem;
			}
		}
	}

	.nav-links:hover .nav-sub-menu {
		opacity: 1;
		max-height: 600px;
		visibility: visible;
		transform: scaleY(1);
	}
</style>
