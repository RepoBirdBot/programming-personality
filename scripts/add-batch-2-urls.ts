#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 2 URLs from Perplexity research (jsdelivr CDN)
const batch2Urls: Record<string, string> = {
	actionscript:
		'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/actionscript/actionscript.svg',
	autohotkey:
		'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/autohotkey/autohotkey.svg',
	apl: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/apl/apl.svg',
	coffeescript:
		'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/coffeescript/coffeescript.svg',
	chapel: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/chapel/chapel.svg',
	eiffel: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/eiffel/eiffel.svg',
	factor: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/factor/factor.svg',
	forth: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/forth/forth.svg',
	io: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/io/io.svg',
	j: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/j/j.svg',
	logo: 'https://fmslogo.sourceforge.io/images/fmslogo_logo_only.png',
	purebasic:
		'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/purebasic/purebasic.svg',
	rexx: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/rexx/rexx.svg',
	ring: 'https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/ring/ring.svg'
};

console.log('🚀 Adding batch 2 URLs from Perplexity research (jsdelivr CDN)...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(batch2Urls)) {
	// Find the language by searching for the pattern
	const langPattern = new RegExp(`\\bid:\\s*'${langId}'`, 'g');
	const match = langPattern.exec(content);

	if (!match) {
		console.log(`❌ Could not find language ${langId}`);
		continue;
	}

	// Check if this language already has imgURL
	const hasImgUrl = new RegExp(`id:\\s*'${langId}'[\\s\\S]*?imgURL:`).test(content);

	if (hasImgUrl) {
		console.log(`⏭️ Skipped ${langId} - already has imgURL`);
		continue;
	}

	// Find the color field and insert imgURL after it
	const colorPattern = new RegExp(
		`(id:\\s*'${langId}'[\\s\\S]*?color:\\s*'[^']*',)(\\s*)([\\s\\S]*?)(primaryDomain|originalPurpose|imperative|yearCreated)`
	);

	const newContent = content.replace(colorPattern, `$1\n\t\timgURL: '${imgUrl}',$2$3$4`);

	if (newContent !== content) {
		content = newContent;
		console.log(`✅ Added imgURL to ${langId}: ${imgUrl}`);
		addedCount++;
	} else {
		console.log(`❌ Could not find insertion point for ${langId}`);
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Added ${addedCount} imgURL fields from batch 2`);

export {};
