#!/usr/bin/env tsx

import { languages } from '../src/lib/data/languages';

console.log('Validating logo URLs in languages array...\n');

const withUrls = languages.filter((l) => l.imgURL);
const withoutUrls = languages.filter((l) => !l.imgURL);

console.log(`Languages with imgURL: ${withUrls.length}`);
console.log(`Languages without imgURL: ${withoutUrls.length}`);
console.log(`Total languages: ${languages.length}\n`);

if (withoutUrls.length > 0) {
	console.log('Languages missing imgURL:');
	withoutUrls.forEach((lang) => console.log(`  - ${lang.name} (${lang.id})`));
	console.log('');
}

// Sample a few URLs to show format
console.log('Sample URLs (first 5):');
withUrls.slice(0, 5).forEach((lang) => {
	console.log(`  ${lang.name}: ${lang.imgURL}`);
});

export {};
