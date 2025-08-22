#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safer URLs that are more likely to work - using official sites or known stable URLs
const safeUrls: Record<string, string> = {
	// Well-known languages with stable logos
	objectivec:
		'https://developer.apple.com/assets/elements/icons/objective-c/objective-c-96x96_2x.png',
	perl: 'https://www.perl.org/i/camel_head.png',
	d: 'https://upload.wikimedia.org/wikipedia/commons/2/24/D_Programming_Language_logo.svg',
	cobol: 'https://iconape.com/wp-content/png_logo_vector/cobol.png',
	actionscript: 'https://cdn.iconscout.com/icon/free/png-256/actionscript-3-569574.png',
	autohotkey: 'https://www.autohotkey.com/static/ahk_logo_no_text241x78-180.png',
	apl: 'https://tryapl.org/images/apl.svg'
};

console.log('🛡️ Adding safe URLs that are more likely to work...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(safeUrls)) {
	// Check if this language already has imgURL
	const hasImgUrl = new RegExp(`id:\\s*'${langId}'[\\s\\S]*?imgURL:`).test(content);

	if (hasImgUrl) {
		console.log(`⏭️ Skipped ${langId} - already has imgURL`);
		continue;
	}

	// Find the pattern and insert after color field
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

console.log(`\n🎉 Added ${addedCount} safe imgURL fields`);
console.log('Now running validation to check if these URLs work...');

export {};
