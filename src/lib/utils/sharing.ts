export interface ShareableResult {
	languageId: string;
	mbtiType: string;
}

export function encodeResult(result: ShareableResult): string {
	const data = `${result.languageId}|${result.mbtiType}`;
	return btoa(encodeURIComponent(data)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decodeResult(encoded: string): ShareableResult | null {
	try {
		const base64 = encoded
			.replace(/-/g, '+')
			.replace(/_/g, '/')
			.padEnd(encoded.length + ((4 - (encoded.length % 4)) % 4), '=');

		const decoded = decodeURIComponent(atob(base64));
		const [languageId, mbtiType] = decoded.split('|');

		if (!languageId || !mbtiType) {
			return null;
		}

		return { languageId, mbtiType };
	} catch {
		return null;
	}
}

export function generateShareUrl(result: ShareableResult): string {
	const encoded = encodeResult(result);
	const baseUrl =
		typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
	return `${baseUrl}?r=${encoded}`;
}

export function getShareText(languageName: string, mbtiType: string): string {
	return `I got ${languageName} (${mbtiType}) on the Programming Language Personality Test! 🚀 Discover your coding personality:`;
}

export const shareLinks = {
	twitter: (url: string, text: string) =>
		`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,

	linkedin: (url: string, _text: string) =>
		`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,

	whatsapp: (url: string, text: string) =>
		`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,

	facebook: (url: string) =>
		`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

	reddit: (url: string, text: string) =>
		`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
};

export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return true;
		} else {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			textArea.style.top = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			const success = document.execCommand('copy');
			document.body.removeChild(textArea);
			return success;
		}
	} catch {
		return false;
	}
}
