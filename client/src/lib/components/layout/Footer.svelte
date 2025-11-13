<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="wrapper footer-content">
		{currentYear} &copy; Reijjo - All rights reserved.
	</div>
</footer>

<style>
	footer {
		background-color: lightblue;
		width: 100%;
		min-height: var(--footer-height);
		display: flex;
		align-items: center;
	}

	.footer-content {
		height: 100%;
		display: flex;
	}
</style>
