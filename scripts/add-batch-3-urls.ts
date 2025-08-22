#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 3 URLs from Perplexity research (Wikimedia Commons + GitHub raw)
const batch3Urls: Record<string, string> = {
	scratch: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch_logo.svg',
	ocaml: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/OCaml_logo.svg',
	awk: 'https://upload.wikimedia.org/wikipedia/commons/9/93/AWK_Logo.svg',
	sas: 'https://upload.wikimedia.org/wikipedia/commons/0/01/SAS_logo.svg',
	tcl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Tcl_logo.png',
	vlang: 'https://raw.githubusercontent.com/vlang/logo/master/v-logo.svg',
	reasonml:
		'https://raw.githubusercontent.com/reasonml/reasonml.github.io/master/static/img/reason_black.svg',
	standardml: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Standard_ML_logo.svg',
	smalltalk: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Smalltalk_logo.svg',
	sed: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sed-logo.svg',
	verilog: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Verilog_logo.svg',
	vhdl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/VHDL_logo.svg',
	cuda: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/CUDA_logo.svg',
	opencl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/OpenCL_Logo.svg',
	glsl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/GLSL_Logo.svg',
	actionscript:
		'https://upload.wikimedia.org/wikipedia/commons/5/56/Adobe_Flash_Professional_CS6_icon.svg',
	autohotkey: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Autohotkey_logo_no_text.svg',
	apl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/APL-logo.svg',
	coffeescript: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/CoffeeScript_logo.png',
	chapel: 'https://upload.wikimedia.org/wikipedia/commons/5/55/ChapelLogo.png'
};

console.log('🚀 Adding batch 3 URLs from Perplexity research (Wikimedia + GitHub)...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
const content = fs.readFileSync(languagesPath, 'utf-8');

// Manual addition approach since automated scripts have issues
let _addedCount = 0;
const languagePatterns: string[] = [];

for (const [langId, imgUrl] of Object.entries(batch3Urls)) {
	// Check if this language already has imgURL
	const hasImgUrl = new RegExp(`id:\\s*'${langId}'[\\s\\S]*?imgURL:`).test(content);

	if (hasImgUrl) {
		console.log(`⏭️ Skipped ${langId} - already has imgURL`);
		continue;
	}

	// Generate manual edit instruction
	languagePatterns.push(`${langId}: ${imgUrl}`);
}

if (languagePatterns.length > 0) {
	console.log('\n📋 Languages to add manually:');
	languagePatterns.forEach((pattern) => console.log(`   - ${pattern}`));
	console.log(
		'\nUse the Edit tool to add these imgURL fields after the color field in each language.'
	);
} else {
	console.log('✅ All languages already have imgURL fields');
}

export {};
