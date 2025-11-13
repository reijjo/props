export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BLT-P1Rt.js",app:"_app/immutable/entry/app.Dk2NoyGM.js",imports:["_app/immutable/entry/start.BLT-P1Rt.js","_app/immutable/chunks/DQgCdvuC.js","_app/immutable/chunks/BZYip4vB.js","_app/immutable/chunks/Cgxfs9Q0.js","_app/immutable/entry/app.Dk2NoyGM.js","_app/immutable/chunks/BZYip4vB.js","_app/immutable/chunks/CIhVivWY.js","_app/immutable/chunks/DIn6DAE4.js","_app/immutable/chunks/Cgxfs9Q0.js","_app/immutable/chunks/Da-o-VMT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";