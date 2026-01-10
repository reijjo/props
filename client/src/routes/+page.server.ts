import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5_000);
	let wakeUp: Response;
	try {
		wakeUp = await fetch(baseUrl, { cache: 'no-store', signal: controller.signal });
	} catch {
		throw error(502, 'Failed to reach API for wakeup');
	} finally {
		clearTimeout(timeoutId);
	}

	if (!wakeUp.ok) {
		throw error(wakeUp.status, 'Failed to wake up');
	}

	return {
		status: 200
	};
};
