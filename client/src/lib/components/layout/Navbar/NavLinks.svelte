<script lang="ts">
	import '$lib/styles/navbar.css';
	import { page } from '$app/state';

	let openSubmenuIndex: number | null = null;

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
				},
				{
					label: 'Injuries',
					href: '/nba/injuries'
				},
				{
					label: 'Guide',
					href: '/nba/guide'
				}
			]
		}
	];

	function toggleSubmenu(index: number, event: MouseEvent) {
		event.preventDefault();
		openSubmenuIndex = openSubmenuIndex === index ? null : index;
	}

	function closeSubmenu() {
		openSubmenuIndex = null;
	}

	// Close submenu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.nav-item')) {
			openSubmenuIndex = null;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<ul class="nav-links">
	{#each navLinks as link, index}
		<li
			class="nav-item"
			class:has-submenu={!!link.sublinks}
			class:open={openSubmenuIndex === index}
		>
			{#if link.sublinks}
				<button
					type="button"
					class="nav-toggle"
					class:active={page.url.pathname === link.href}
					onclick={(e) => toggleSubmenu(index, e)}
					aria-expanded={openSubmenuIndex === index}
					aria-haspopup="true"
				>
					{link.label}
				</button>
			{:else}
				<a
					href={link.href}
					class:active={page.url.pathname === link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/if}

			{#if link.sublinks}
				<ul class="nav-sub-menu">
					{#each link.sublinks as sublink}
						<li>
							<a href={sublink.href} onclick={closeSubmenu}>{sublink.label}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>
