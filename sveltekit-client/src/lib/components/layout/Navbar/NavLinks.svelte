<script lang="ts">
	import '$lib/styles/navbar.css';
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
		<li class="nav-item" class:has-submenu={!!link.sublinks}>
			<a
				href={link.href}
				class:active={page.url.pathname === link.href}
				aria-current={page.url.pathname === link.href ? 'page' : undefined}>{link.label}</a
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
