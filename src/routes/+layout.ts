import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';

export const prerender = true;
export const ssr = false;

export const load = async () => {
	if (browser && PUBLIC_POSTHOG_KEY) {
		// Initialize PostHog with settings to avoid CORS and cookie issues
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
			person_profiles: 'identified_only',
			autocapture: false, // Disable autocapture to reduce requests
			capture_pageview: false, // Manually control pageviews
			capture_pageleave: false, // Manually control pageleave
			disable_cookie: true, // Disable cookies to avoid domain issues
			persistence: 'memory', // Use memory instead of localStorage/cookies
			bootstrap: {
				distinctID: 'anonymous-' + Math.random().toString(36).substring(7)
			}
		});

		// Manually capture pageview after init
		setTimeout(() => {
			posthog.capture('$pageview');
		}, 100);
	}
	return {};
};
