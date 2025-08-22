#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Final comprehensive batch - focusing on the easier ones first
const urlsToAdd: Record<string, string> = {
	// Programming languages with likely working logos on Wikimedia Commons
	glsl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg',
	hlsl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/DirectX_logo.svg',
	actionscript: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Flash_CS3_Icon.png',
	autohotkey: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/AutoHotkey_Logo.svg',
	apl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/APL_keybd2_UC.svg',
	coffeescript: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/CoffeeScript_Logo.svg',
	eiffel: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Eiffel_logo.svg',
	factor: 'https://factorcode.org/logo.png',
	forth: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Forth_logo.svg',
	j: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/J_logo.svg',
	labview: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/LabVIEW_logo.svg',
	logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_turtle.svg',
	qsharp:
		'https://devblogs.microsoft.com/qsharp/wp-content/uploads/sites/74/2019/05/qsharp_logo_2019.png',
	systemverilog: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
	pony: 'https://www.ponylang.io/images/logo.svg',
	idris: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Idris_logo.svg',
	odin: 'https://odin-lang.org/images/logo-slim.svg',
	janet: 'https://janet-lang.org/logo/janet-w200.png',
	nix: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Nix_snowflake.svg',
	dhall: 'https://dhall-lang.org/img/dhall-logo.svg'
};

console.log('🚀 Adding final comprehensive batch URLs...\n');

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

	// Find the pattern more flexibly - look for the language block and insert after color
	const langBlockPattern = new RegExp(
		`(id:\\s*'${langId}'[\\s\\S]*?)(color:\\s*'[^']*',)(\\s*)([\\s\\S]*?)(primaryDomain|originalPurpose|imperative|yearCreated)`,
		'g'
	);

	const newContent = content.replace(langBlockPattern, `$1$2\n\t\timgURL: '${imgUrl}',$3$4$5`);

	if (newContent !== content) {
		content = newContent;
		console.log(`✅ Added imgURL to ${langId}: ${imgUrl}`);
		addedCount++;
	} else {
		console.log(`❌ Could not find pattern for ${langId}`);
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Added ${addedCount} imgURL fields in final batch`);

export {};
