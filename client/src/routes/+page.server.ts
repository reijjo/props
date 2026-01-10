import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_URL;

	const wakeUp = await fetch(`${baseUrl}/`);

	if (!wakeUp.ok) {
		throw error(wakeUp.status, 'Failed to wake up');
	}

	return {
		status: 200
	};
};
