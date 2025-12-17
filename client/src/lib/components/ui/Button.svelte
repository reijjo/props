<script lang="ts">
	import type { Snippet } from 'svelte';
	import './Button.css';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		type?: 'button' | 'submit' | 'reset';
		children?: Snippet;
	} & HTMLButtonAttributes;

	let { children, type = 'button', class: className = '', ...rest }: ButtonProps = $props();
</script>

<button {type} class={className} {...rest}>
	{@render children?.()}
</button>
