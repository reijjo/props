import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using svelte-adapter-bun for Bun runtime deployment
		// See https://github.com/gornostay25/svelte-adapter-bun for more information
		adapter: adapter()
	}
};

export default config;
