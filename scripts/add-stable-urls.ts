#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Stable URLs from Perplexity research - official sites, CDNs, and stable repositories
const stableUrls: Record<string, string> = {
	objectivec: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/objectivec.svg',
	perl: 'https://raw.githubusercontent.com/Perl/perl-logo/main/camel.svg',
	cobol: 'https://www.svgrepo.com/show/339080/cobol-language.svg',
	d: 'https://raw.githubusercontent.com/dlang/dlang.org/master/images/dlogo.svg',
	scratch:
		'https://cdn.scratch.mit.edu/scratchr2/static/__b8b5c37377edaaddec7b67ca3b9e956c__/images/scratch-logo.svg',
	prolog: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prolog.svg',
	lisp: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/lisp.svg',
	ocaml: 'https://raw.githubusercontent.com/ocaml/ocaml.org/main/site/static/img/logos/ocaml.svg',
	racket: 'https://racket-lang.org/img/racket-logo.svg',
	crystal: 'https://crystal-lang.org/assets/media/crystal-logo.svg'
};

console.log('🔗 Adding stable URLs from official sources and CDNs...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(stableUrls)) {
	// Check if this language already has imgURL - look for it within the language block
	const langBlockStart = content.indexOf(`id: '${langId}'`);
	const nextLangBlockStart = content.indexOf('\t{', langBlockStart + 1);
	const langBlock =
		nextLangBlockStart > -1
			? content.substring(langBlockStart, nextLangBlockStart)
			: content.substring(langBlockStart);
	const hasImgUrl = langBlock.includes('imgURL:');

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

console.log(`\n🎉 Added ${addedCount} stable imgURL fields`);

export {};
