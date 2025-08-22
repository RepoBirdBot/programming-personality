#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Broken URLs from the latest batch that need to be removed
const newBrokenLanguageIds = ['objectivec', 'perl', 'prolog', 'lisp', 'scratch', 'ocaml'];

console.log('🗑️ Removing newly broken imgURL fields...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let removedCount = 0;
newBrokenLanguageIds.forEach((langId) => {
	const lines = content.split('\n');
	let inLanguage = false;
	let modifiedLines: string[] = [];

	const langStartPattern = new RegExp(`id: '${langId}'`);

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (langStartPattern.test(line)) {
			inLanguage = true;
			modifiedLines.push(line);
		} else if (inLanguage && line.trim().startsWith('}')) {
			inLanguage = false;
			modifiedLines.push(line);
		} else if (inLanguage && line.includes('imgURL:')) {
			console.log(`✅ Removed imgURL from ${langId}`);
			removedCount++;
		} else {
			modifiedLines.push(line);
		}
	}

	content = modifiedLines.join('\n');
});

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Removed ${removedCount} newly broken imgURL fields`);

export {};
