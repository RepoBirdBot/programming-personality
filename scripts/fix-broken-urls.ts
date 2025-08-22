#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Working URL replacements for the broken ones
const urlFixes: Record<string, string> = {
	// C - tested working
	'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',

	// Kotlin - tested working
	'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.svg':
		'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png',

	// VBA - use Visual Basic logo
	'https://upload.wikimedia.org/wikipedia/commons/4/4f/VBScript_Logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg',

	// Scratch - use official logo
	'https://upload.wikimedia.org/wikipedia/commons/5/5c/Scratch_Logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/6/62/Scratch_Logo.svg',

	// Remove these broken external URLs and use working alternatives
	'https://crystal-lang.org/assets/media/crystal-logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/8/8c/Crystal_language_logo.svg',

	'https://vlang.io/assets/img/v-logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/5/5c/V_programming_language_logo.svg',

	'https://elm-lang.org/assets/logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/f/f3/Elm_logo.svg',

	'https://lean-lang.org/assets/logo.svg':
		'https://upload.wikimedia.org/wikipedia/commons/c/c9/Lean_logo.svg'
};

console.log('🔧 Fixing broken URLs...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let fixedCount = 0;
for (const [oldUrl, newUrl] of Object.entries(urlFixes)) {
	if (content.includes(oldUrl)) {
		content = content.replace(oldUrl, newUrl);
		console.log(`✅ Fixed: ${oldUrl} → ${newUrl}`);
		fixedCount++;
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Fixed ${fixedCount} URLs`);

export {};
