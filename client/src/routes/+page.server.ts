import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;

	fetch(baseUrl, {
		cache: 'no-store',
		signal: AbortSignal.timeout(3000)
	}).catch(() => {});

	return {};
};
