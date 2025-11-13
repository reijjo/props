# SvelteKit with Bun

## Creating project

```bash
bunx sv create my-app
```

Use **Bun** to run your project -> modify `package.json` file in the root

```json
{
	...
	"scripts": {
		"dev": "bunx --bun vite dev",
		...
	}
}
```

`bun run dev` to run the project

### To build for production, you’ll need to add the right SvelteKit adapter

Currently we recommend the `bun add -D svelte-adapter-bun`. Now, make the following changes to your `svelte.config.js`.

```js
import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
```
