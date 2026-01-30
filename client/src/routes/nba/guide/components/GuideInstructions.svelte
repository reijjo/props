<script lang="ts">
	const whatToBet = [
		{
			header: 'SMALL SPREAD + HIGH TOTAL',
			subHeader: '(tight + pace = fantasy paradise)',
			ranking: '(⭐⭐⭐⭐⭐)',
			starHeader: '',
			starHeader2: '',
			stars: [
				'✅ Points OVER – excellent',
				'✅ Assists OVER – BEST spot for PGs/playmakers',
				'✅ 3PM OVER – if they shoot 6+ 3PA',
				'⚠️ Rebounds – neutral (fewer misses)'
			],
			stars2: [],
			nonStarHeader: '',
			nonStars: [
				'✅ Points OVER – if 25+ min role',
				'✅ 3PM OVER – shooters on 1.5/2.5 lines',
				'⚠️ Assists – only clear 2nd unit PG',
				'❌ Rebounds – pass'
			]
		},
		{
			header: 'SMALL SPREAD + LOW/NORMAL TOTAL',
			subHeader: '(tight defensive grind)',
			ranking: '(⭐⭐⭐⭐)',
			starHeader: '(32–36 min, clear usage)',
			starHeader2: '',
			stars: [
				'✅ Points OVER – best spot (usage + secure minutes)',
				'✅ Rebounds OVER – very strong (more misses, full minutes)',
				'⚠️ Assists – only if primary handler vs weak defense',
				'❌ 3PM – pass unless high‑volume role'
			],
			stars2: [],
			nonStarHeader: '(18–28 min)',
			nonStars: [
				'✅ Points OVER – if 25+ min role',
				'✅ 3PM OVER – shooters on 1.5/2.5 lines',
				'⚠️ Assists – only clear 2nd unit PG',
				'❌ Rebounds – pass'
			]
		},
		{
			header: 'MEDIUM SPREAD (5.5–8 pts) + HIGH TOTAL',
			subHeader: '(shootout, some blowout risk)',
			ranking: '(⭐⭐⭐)',
			starHeader: '',
			starHeader2: '',
			stars: [
				'✅ Assists OVER – still good (pace advantage)',
				'✅ 3PM OVER – volume shooters',
				'⚠️ Points OVER – good but check blowout history / coach rest patterns',
				'❌ Rebounds OVER – pass (efficiency kills boards)'
			],
			stars2: [],
			nonStarHeader: '',
			nonStars: [
				'✅ 3PM OVER – low lines (1.5/2.5)',
				'✅ Points OVER – if minutes secure',
				'❌ Assists/Rebounds OVER – pass'
			]
		},
		{
			header: 'BIG SPREAD + HIGH TOTAL (≥8 pts)',
			subHeader: '(blowout risk shootout)',
			ranking: '(⭐⭐)',
			starHeader: '(Favorite)',
			starHeader2: '(Underdog)',
			stars: ['❌ All – pass; minutes risk too high'],
			stars2: [
				'✅ Points OVER – usage spike chasing',
				'✅ 3PM OVER – catch‑up threes',
				'⚠️ Assists OVER – only primary handler',
				'❌ Rebounds OVER – pass'
			],
			nonStarHeader: '',
			nonStars: [
				'✅ Points/3PM OVER – dog bench shooters, garbage time',
				'❌ Assists/Rebounds OVER – pass'
			]
		},
		{
			header: 'BIG SPREAD + LOW/NORMAL TOTAL (≥8 pts)',
			subHeader: '(defensive blowout)',
			ranking: '(⭐)',
			starHeader: '(Favorite)',
			starHeader2: '(Underdog)',
			stars: ['❌ All – pass (minutes + scoring both capped)'],
			stars2: [
				'✅ Points OVER – if he’s the entire offense',
				'✅ Rebounds OVER – chasing boards',
				'❌ Assists/3PM OVER – pass'
			],
			nonStarHeader: '',
			nonStars: ['✅ Rebounds OVER – dog bench bigs (garbage time)', '❌ Rest – pass']
		}
	];
</script>

<section class="guide-instructions">
	<h2>Guide</h2>
	{#each whatToBet as rank (rank.header)}
		<div class="game-instructions">
			<div class="guide-header">
				<h3>{rank.header}</h3>
				<p>{rank.subHeader}</p>
				<p>{rank.ranking}</p>
			</div>
			<div class="what-to-bet">
				<div class="star-header">
					<h4>Stars</h4>
					<p>{rank.starHeader}</p>
				</div>
				{#each rank.stars as stars}
					<p>{stars}</p>
				{/each}
				{#if rank.starHeader2}
					<div class="what-to-bet">
						<div class="star-header">
							<h4>Stars</h4>
							<p>{rank.starHeader2}</p>
						</div>
						{#each rank.stars2 as stars2}
							<p>{stars2}</p>
						{/each}
					</div>
				{/if}
			</div>
			<div class="what-to-bet">
				<div class="star-header">
					<h4>Non-Stars</h4>
					<p>{rank.nonStarHeader}</p>
				</div>

				{#each rank.nonStars as nonStar}
					<p>{nonStar}</p>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.guide-instructions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 2rem;
	}

	.game-instructions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: var(--container-border);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 1rem;
		width: 100%;
		max-width: 500px;
	}

	.guide-header {
		display: flex;
		flex-direction: column;
		text-align: center;
		text-wrap: balance;
		gap: 0.5rem;
	}

	.what-to-bet {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		& h4 {
			padding-block: 0.5rem;
		}
	}

	.star-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
