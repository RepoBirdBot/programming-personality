import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';

export const prerender = true;
export const ssr = false;

export const load = async () => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
			person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
			capture_pageview: true,
			capture_pageleave: true
		});
	}
	return {};
};
