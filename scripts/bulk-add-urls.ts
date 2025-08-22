#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 100 programming language logo URLs with corrected Python URL
const edits = [
	// TypeScript
	{
		search: "\t\ticon: '🔷',\n\t\tcolor: '#3776AB',\n\t\tprimaryDomain: 'enterprise',",
		replace:
			"\t\ticon: '🔷',\n\t\tcolor: '#3776AB',\n\t\timgURL: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',\n\t\tprimaryDomain: 'enterprise',"
	},

	// Rust
	{
		search: "\t\ticon: '🦀',\n\t\tcolor: '#3776AB',\n\t\tprimaryDomain: 'systems',",
		replace:
			"\t\ticon: '🦀',\n\t\tcolor: '#3776AB',\n\t\timgURL: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',\n\t\tprimaryDomain: 'systems',"
	},

	// Go
	{
		search: "\t\ticon: '🐹',\n\t\tcolor: '#3776AB',\n\t\tprimaryDomain: 'systems',",
		replace:
			"\t\ticon: '🐹',\n\t\tcolor: '#3776AB',\n\t\timgURL: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',\n\t\tprimaryDomain: 'systems',"
	},

	// Java
	{
		search: "\t\ticon: '☕',\n\t\tcolor: '#3776AB',\n\t\tprimaryDomain: 'enterprise',",
		replace:
			"\t\ticon: '☕',\n\t\tcolor: '#3776AB',\n\t\timgURL: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',\n\t\tprimaryDomain: 'enterprise',"
	},

	// C++
	{
		search: "\t\ticon: '⚡',\n\t\tcolor: '#00599C',\n\t\tprimaryDomain: 'systems',",
		replace:
			"\t\ticon: '⚡',\n\t\tcolor: '#00599C',\n\t\timgURL: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',\n\t\tprimaryDomain: 'systems',"
	}
];

console.log('Adding imgURL fields using targeted edits...\\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let successCount = 0;
let skipCount = 0;

edits.forEach((edit, index) => {
	if (content.includes(edit.search)) {
		content = content.replace(edit.search, edit.replace);
		console.log(`✅ Applied edit ${index + 1}`);
		successCount++;
	} else {
		console.log(`⚠️  Skipped edit ${index + 1} - pattern not found`);
		skipCount++;
	}
});

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\\n=== Results ===`);
console.log(`Successfully applied: ${successCount} edits`);
console.log(`Skipped: ${skipCount} edits`);

export {};
