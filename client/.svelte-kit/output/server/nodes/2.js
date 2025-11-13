

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.5k5FX_-i.js","_app/immutable/chunks/DIn6DAE4.js","_app/immutable/chunks/BZYip4vB.js","_app/immutable/chunks/DdP17-ek.js"];
export const stylesheets = [];
export const fonts = [];
