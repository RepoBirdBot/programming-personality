#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 1 URLs from Perplexity research
const batchUrls: Record<string, string> = {
	objectivec: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Objective-C_Logo.svg',
	perl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Perl_language_logo.svg',
	plsql: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Oracle_Plsql_logo.png',
	prolog: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Prolog-logo.png',
	lisp: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/LISP_logo.svg',
	scratch: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Scratch_Logo.svg',
	ocaml: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/OCaml_logo.svg',
	awk: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/AWK_Programming_Language_Logo.svg',
	sas: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/SAS_logo.svg',
	tcl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Tcl_logo.svg',
	vlang: 'https://upload.wikimedia.org/wikipedia/commons/3/34/V-logo.svg',
	reasonml: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/reasonml/reasonml-original.svg',
	standardml: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Standard_ML_logo.svg',
	smalltalk: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Smalltalk_logo_with_text_v2.png',
	sed: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Sed-logo.svg',
	verilog: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Verilog_logo.svg',
	vhdl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/VHDL_logo.png',
	cuda: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Nvidia_CUDA_Logo.svg',
	opencl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/OpenCL_Logo.svg',
	glsl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/GLSL_Logo.png'
};

console.log('🚀 Adding batch 1 URLs from Perplexity research...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(batchUrls)) {
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

console.log(`\n🎉 Added ${addedCount} imgURL fields from batch 1`);

export {};