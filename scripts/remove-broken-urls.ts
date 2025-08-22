#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Languages with broken URLs that should have imgURL removed
const brokenLanguageIds = [
	'vba',
	'plsql',
	'prolog',
	'lisp',
	'd',
	'scratch',
	'ocaml',
	'racket',
	'awk',
	'sas',
	'tcl',
	'crystal',
	'vlang',
	'elm',
	'lean'
];

console.log('🗑️ Removing broken imgURL fields...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let removedCount = 0;
for (const langId of brokenLanguageIds) {
	// Find the pattern for this language and remove its imgURL line
	const langPattern = new RegExp(
		`(\\s*{[\\s\\S]*?id:\\s*'${langId}'[\\s\\S]*?)\\s*imgURL:\\s*'[^']*',?\\s*([\\s\\S]*?})`,
		'g'
	);

	if (langPattern.test(content)) {
		content = content.replace(langPattern, '$1$2');
		console.log(`✅ Removed imgURL from ${langId}`);
		removedCount++;
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Removed imgURL from ${removedCount} languages with broken URLs`);
console.log(`These languages will now fall back to their emoji icons.`);

export {};
