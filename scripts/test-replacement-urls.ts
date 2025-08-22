#!/usr/bin/env tsx

import { execSync } from 'child_process';

// Test URLs for the broken languages
const testUrls: Record<string, string[]> = {
	lisp: [
		'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
		'https://iconduck.com/api/icons/174249/download?format=svg',
		'https://raw.githubusercontent.com/azzamsa/lisp-logo/master/logos/lisp-logo.svg'
	],
	scratch: [
		'https://upload.wikimedia.org/wikipedia/commons/8/82/Scratchlogo.svg',
		'https://seeklogo.com/images/S/scratch-logo-33119FC87C-seeklogo.com.png',
		'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'
	],
	tcl: [
		'https://upload.wikimedia.org/wikipedia/commons/f/f0/Tcl.svg',
		'https://seeklogo.com/images/T/tcl-logo-226A90F66C-seeklogo.com.png',
		'https://www.tcl.tk/about/logo.png'
	],
	crystal: [
		'https://upload.wikimedia.org/wikipedia/commons/1/10/Crystal_language_logo.svg',
		'https://raw.githubusercontent.com/crystal-lang/crystal-website/master/assets/images/icon.svg',
		'https://seeklogo.com/images/C/crystal-logo-B2BDC5D326-seeklogo.com.png'
	],
	vlang: [
		'https://raw.githubusercontent.com/vlang/v-logo/master/dist/v-logo.svg',
		'https://seeklogo.com/images/V/v-programming-language-logo-04F947AAD3-seeklogo.com.png',
		'https://vlang.io/img/v-logo.png'
	]
};

async function testUrl(
	url: string
): Promise<{ url: string; status: number | null; working: boolean }> {
	try {
		const result = execSync(`curl -I -s -w "%{http_code}" -m 10 "${url}"`, {
			encoding: 'utf-8',
			stdio: 'pipe'
		});

		const lines = result.trim().split('\n');
		const statusCode = parseInt(lines[lines.length - 1]);
		const working = statusCode >= 200 && statusCode < 400;

		return { url, status: statusCode, working };
	} catch {
		return { url, status: null, working: false };
	}
}

console.log('🔍 Testing replacement URLs...\n');

for (const [lang, urls] of Object.entries(testUrls)) {
	console.log(`\n📝 Testing ${lang.toUpperCase()}:`);

	for (const url of urls) {
		const result = await testUrl(url);
		const status = result.working ? '✅ WORKING' : '❌ BROKEN';
		console.log(`   ${status} (${result.status}) ${result.url}`);
	}
}

export {};
