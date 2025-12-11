<script lang="ts">
	import './Button.css';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		type?: 'button' | 'submit' | 'reset';
	} & HTMLButtonAttributes;

	let { children, type = 'button', class: className = '', ...rest }: ButtonProps = $props();
</script>

<button {type} class={className} {...rest}>
	{@render children?.()}
</button>
