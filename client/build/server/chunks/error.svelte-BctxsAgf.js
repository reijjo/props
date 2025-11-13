import { noop, writable } from "./utils-CNr5LKwr.js";
import "./clsx-BHMtmmTK.js";
import { escape_html, getContext } from "./context-CzXb0Svd.js";

//#region .svelte-kit/adapter-bun/entries/fallbacks/error.svelte.js
function create_updated_store() {
	const { set, subscribe } = writable(false);
	return {
		subscribe,
		check: async () => false
	};
}
const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) new URL("https://example.com");
const stores = { updated: /* @__PURE__ */ create_updated_store() };
stores.updated.check;
function context() {
	return getContext("__request__");
}
const page$1 = {
	get error() {
		return context().page.error;
	},
	get status() {
		return context().page.status;
	}
};
const page = page$1;
function Error$1($$renderer, $$props) {
	$$renderer.component(($$renderer2) => {
		$$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
	});
}

//#endregion
export { Error$1 as default };
//# sourceMappingURL=error.svelte-BctxsAgf.js.map