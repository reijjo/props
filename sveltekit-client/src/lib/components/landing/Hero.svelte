<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { MoveRight } from '@lucide/svelte';
</script>

<section class="hero-section">
	<div class="hero-content">
		<h1>Player props done right</h1>
		<div class="hero-desc">
			<p class="tagline">Only what you actually need. Nothing extra.</p>
			<p class="tagline">
				We got all the necessary player stats that you need for fantasy sports or sports betting. We
				are going to add NHL and English Premier League stats soon, but for now check our NBA stats.
			</p>
		</div>
		<div class="hero-action">
			<a href="/nba">
				<Button class="btn-cta btn-with-icon">
					NBA Stats
					<MoveRight size={18} class="btn-icon-cta" />
				</Button>
			</a>
		</div>
	</div>
	<div class="hero-image">
		<img src="/images/lead.png" alt="nba leaders" />
		<div class="hero-overlay"></div>
	</div>
</section>

<style>
	.hero-section {
		display: grid;
		grid-template-columns: 50% 50%;
		height: 100svh;
		overflow: hidden;

		@media (max-width: 1000px) {
			grid-template-columns: 1fr;
		}
	}

	.hero-image {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		transform: perspective(800px) rotateY(-30deg);
		transform-origin: center;
		position: relative;

		& img {
			width: 100%;
			height: 100%;
			object-fit: fill;
			z-index: 0;
		}

		@media (max-width: 1000px) {
			position: absolute;
			top: 0;
			left: 0;
			transform: none;

			& img {
				object-fit: cover;
			}
		}
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
		z-index: 1;
		pointer-events: none;

		@media (max-width: 1000px) {
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.85) 100%);
			backdrop-filter: blur(2px);
		}
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-wrap: balance;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
		padding-inline: 4rem;
		background: radial-gradient(rgba(255, 255, 255, 0.025) 0%, transparent 80%);
		max-width: calc(1366px / 2);
		margin-left: auto;

		@media (max-width: 1000px) {
			max-width: 100%;
		}

		@media (max-width: 580px) {
			padding-inline: 2rem;
		}

		& h1 {
			background: linear-gradient(to right, white 0%, var(--secondary-200) 20%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.hero-desc {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.tagline {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 100;

		&:first-child {
			font-size: 1.25rem;
			line-height: 2rem;
			font-weight: 400;
		}

		@media (max-width: 580px) {
			font-size: 1.125rem;
			line-height: 1.5rem;
		}
	}

	.hero-action {
		height: 3rem;
		width: max-content;

		& :global(button) {
			padding-inline: 2rem;
		}
	}
</style>
