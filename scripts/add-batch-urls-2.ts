#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Second batch of URLs to add
const urlsToAdd: Record<string, string> = {
	glsl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg',
	hlsl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/DirectX_logo.svg',
	mojo: 'https://docs.modular.com/mojo/assets/mojo-logo.svg',
	carbon: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Carbon_Logo.png',
	actionscript: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Flash_CS3_Icon.png',
	autohotkey: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/AutoHotkey_Logo.svg',
	apl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/APL_keybd2_UC.svg',
	coffeescript: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/CoffeeScript_Logo.svg',
	chapel: 'https://chapel-lang.org/images/chapel-logo-200.png',
	eiffel: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Eiffel_logo.svg'
};

console.log('➕ Adding second batch URLs to languages...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(urlsToAdd)) {
	// Check if this language already has imgURL
	const hasImgUrl = new RegExp(`id:\\s*'${langId}'[\\s\\S]*?imgURL:`).test(content);

	if (hasImgUrl) {
		console.log(`⏭️ Skipped ${langId} - already has imgURL`);
		continue;
	}

	// Find the language by ID and add imgURL after color field
	const langPattern = new RegExp(
		`(id:\\s*'${langId}'[\\s\\S]*?color:\\s*'[^']*',)(\\s*)([\\s\\S]*?)primaryDomain`,
		'g'
	);

	const newContent = content.replace(
		langPattern,
		`$1$2\t\timgURL: '${imgUrl}',\n\t\t$3primaryDomain`
	);

	if (newContent !== content) {
		content = newContent;
		console.log(`✅ Added imgURL to ${langId}: ${imgUrl}`);
		addedCount++;
	} else {
		console.log(`❌ Could not find language ${langId} or pattern not matched`);
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Added ${addedCount} imgURL fields in batch 2`);

export {};
