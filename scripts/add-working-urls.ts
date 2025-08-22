#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Working URLs from web search - these should be tested and working
const workingUrls: Record<string, string> = {
	// Found in searches - these are more likely to work
	d: 'https://upload.wikimedia.org/wikipedia/commons/2/24/D_Programming_Language_logo.svg',
	scratch: 'https://scratch.mit.edu/images/logo_sm.png',
	prolog: 'https://www.swi-prolog.org/icons/swipl.png',
	lisp: 'https://common-lisp.net/static/imgs/lisplogo_flag_256.png',
	ocaml: 'https://ocaml.org/img/colour-logo.svg',
	racket: 'https://racket-lang.org/img/racket-logo.svg',
	awk: 'https://www.gnu.org/graphics/gnuhead-mini.png',
	sas: 'https://www.sas.com/content/dam/SAS/images/brand/brand-assets/logos/SAS_logo_blue.svg',
	tcl: 'https://www.tcl.tk/software/tcltk/images/Tcl-powered-by.gif',
	crystal: 'https://crystal-lang.org/images/icon.svg',
	vlang: 'https://vlang.io/img/v-logo.png',
	mojo: 'https://www.modular.com/mojo',
	carbon: 'https://github.com/carbon-language/carbon-lang/raw/trunk/docs/images/carbon_logo.png'
};

console.log('✅ Adding working URLs from web search...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(workingUrls)) {
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

console.log(`\n🎉 Added ${addedCount} working imgURL fields`);

export {};
