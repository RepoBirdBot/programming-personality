#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch of URLs to add for languages that don't have imgURL yet
const urlsToAdd: Record<string, string> = {
	// These are from research and known working URLs
	purescript: 'https://upload.wikimedia.org/wikipedia/commons/6/64/PureScript_Logo.png',
	reasonml: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/ReasonML_Logo.svg',
	commonlisp: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
	standardml: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Standard_ML_logo.png',
	smalltalk: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Smalltalk_logo.svg',
	sed: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sed_icon.svg',
	verilog: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
	vhdl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/VHDL_logo.svg',
	cuda: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg',
	opencl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/OpenCL_Logo.svg'
};

console.log('➕ Adding batch URLs to languages...\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');

let addedCount = 0;
for (const [langId, imgUrl] of Object.entries(urlsToAdd)) {
	// Find the language by ID and add imgURL after color field
	const langPattern = new RegExp(
		`(id:\\s*'${langId}'[\\s\\S]*?color:\\s*'[^']*',)(\\s*)([\\s\\S]*?)primaryDomain`,
		'g'
	);

	const match = langPattern.exec(content);
	if (match && !content.includes(`id: '${langId}'[\\s\\S]*imgURL:`)) {
		content = content.replace(langPattern, `$1$2\t\timgURL: '${imgUrl}',\n\t\t$3primaryDomain`);
		console.log(`✅ Added imgURL to ${langId}: ${imgUrl}`);
		addedCount++;
	} else if (match) {
		console.log(`⏭️ Skipped ${langId} - already has imgURL`);
	} else {
		console.log(`❌ Could not find language ${langId}`);
	}
}

fs.writeFileSync(languagesPath, content, 'utf-8');

console.log(`\n🎉 Added ${addedCount} imgURL fields`);

export {};
