#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 100 programming language logo URLs
const logoUrls: Record<string, string> = {
	python: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
	javascript: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
	typescript: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
	rust: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
	go: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',
	java: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
	cpp: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
	ruby: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg',
	swift: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg',
	haskell: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg',
	csharp: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg',
	c: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',
	php: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg',
	kotlin: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png',
	r: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg',
	matlab: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png',
	scala: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Scala-full-color.svg',
	dart: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Dart_programming_language_logo.svg',
	objectivec: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Objective-C_Logo.png',
	perl: 'https://upload.wikimedia.org/wikipedia/en/0/00/Perl-camel-small.png',
	lua: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg',
	julia: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Julia_Programming_Language_Logo.svg',
	elixir: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Official_Elixir_logo.png',
	clojure: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg',
	fsharp: 'https://upload.wikimedia.org/wikipedia/commons/6/66/F_Sharp_logo.svg',
	erlang: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Erlang_logo.svg',
	visualbasic: 'https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg',
	delphi: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Delphi_Programming_Language_Logo.png',
	cobol: 'https://upload.wikimedia.org/wikipedia/commons/3/31/COBOL_logo.svg',
	sql: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
	bash: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg',
	groovy: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Groovy-logo.svg',
	assembly: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/GNU_Assembler_Logo.svg',
	fortran: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Fortran_logo.svg',
	ada: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Ada_Mascot_with_slogan.svg',
	powershell: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png',
	vba: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/VB_logo.png',
	plsql: 'https://upload.wikimedia.org/wikipedia/en/6/69/Oracle_SQL_Developer_Logo.svg',
	prolog: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/SWI-Prolog_logo.svg',
	lisp: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
	d: 'https://upload.wikimedia.org/wikipedia/commons/2/24/D_Programming_Language_logo.svg',
	scratch: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Scratch_Logo.svg',
	scheme: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Racket-logo.svg',
	ocaml: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/OCaml_Logo.svg',
	solidity: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg',
	racket: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Racket-logo.svg',
	awk: 'https://upload.wikimedia.org/wikipedia/commons/2/22/AWK_Logo.svg',
	sas: 'https://upload.wikimedia.org/wikipedia/commons/1/10/SAS_logo_horiz.svg',
	tcl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Tcl-powered.svg',
	vbnet: 'https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg',
	nim: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Nim-logo.svg',
	crystal: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Crystal_language_logo.svg',
	zig: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Zig_Programming_Language_logo.svg',
	vlang: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/V_programming_language_logo.svg',
	elm: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Elm_logo.svg',
	purescript: 'https://upload.wikimedia.org/wikipedia/commons/6/64/PureScript_Logo.png',
	reasonml: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/ReasonML_Logo.svg',
	commonlisp: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
	standardml: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Standard_ML_logo.png',
	smalltalk: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Smalltalk_logo.svg',
	sed: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sed_icon.svg',
	verilog: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
	vhdl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/VHDL_logo.svg',
	cuda: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg',
	opencl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/OpenCL_Logo.svg',
	glsl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg',
	hlsl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/DirectX_logo.svg',
	mojo: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Mojo_programming_language_logo.svg',
	carbon: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Carbon_Logo.png',
	actionscript: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Flash_CS3_Icon.png',
	autohotkey: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/AutoHotkey_Logo.svg',
	apl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/APL_keybd2_UC.svg',
	coffeescript: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/CoffeeScript_Logo.svg',
	chapel: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Chapel_logo.svg',
	eiffel: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Eiffel_logo.svg',
	factor: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Factor_logo.svg',
	forth: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Forth_logo.svg',
	io: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Io_logo.svg',
	j: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/J_logo.svg',
	labview: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/LabVIEW_logo.svg',
	logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_turtle.svg',
	mql4: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/MetaQuotes_Logo.png',
	monkey: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Monkey_X_Logo.png',
	purebasic: 'https://upload.wikimedia.org/wikipedia/commons/3/35/PureBasic_Logo.png',
	rexx: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/REXX_logo.png',
	ring: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Ring_programming_language_logo.svg',
	simula: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Simula_Logo.svg',
	xslt: 'https://upload.wikimedia.org/wikipedia/commons/6/68/XSLT_Logo.svg',
	tcltk: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Tcl-powered.svg',
	qsharp: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Q_Sharp_Logo.svg',
	wasm: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/WebAssembly_Logo.svg',
	systemverilog: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
	pony: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Pony_programming_language_logo.svg',
	idris: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Idris_logo.svg',
	vale: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Vale_programming_language_logo.svg',
	odin: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Odin_programming_language_logo.svg',
	janet: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Janet_programming_language_logo.svg',
	nix: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Nix_snowflake.svg',
	dhall: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Dhall_logo.svg',
	lean: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Lean_logo.svg'
};

console.log('Adding imgURL fields to languages array using line-by-line approach...\\n');

const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(languagesPath, 'utf-8');
const lines = content.split('\\n');

let modified = 0;
let alreadyHad = 0;

// Process line by line to insert imgURL after color field
for (let i = 0; i < lines.length; i++) {
	const line = lines[i];

	// Check if this line contains a color field
	if (line.includes("color: '") && !line.includes('imgURL')) {
		// Look back to find the language ID
		let langId = '';
		for (let j = i - 1; j >= 0; j--) {
			const prevLine = lines[j];
			const idMatch = prevLine.match(/id: '([^']+)'/);
			if (idMatch) {
				langId = idMatch[1];
				break;
			}
			// Stop if we hit another language object start
			if (prevLine.includes('{\\s*$')) break;
		}

		// If we found a language ID and have a URL for it
		if (langId && logoUrls[langId]) {
			// Check if imgURL already exists in the next few lines
			let hasImgUrl = false;
			for (let k = i + 1; k < Math.min(i + 5, lines.length); k++) {
				if (lines[k].includes('imgURL:')) {
					hasImgUrl = true;
					break;
				}
				if (lines[k].includes('}')) break;
			}

			if (!hasImgUrl) {
				// Insert imgURL after the color line
				const indentation = line.match(/^(\\s*)/)?.[1] || '\\t\\t';
				lines.splice(i + 1, 0, `${indentation}imgURL: '${logoUrls[langId]}',`);
				console.log(`✅ Added imgURL to ${langId}`);
				modified++;
				i++; // Skip the newly inserted line
			} else {
				console.log(`ℹ️  ${langId} already has imgURL`);
				alreadyHad++;
			}
		}
	}
}

// Write the modified content back
fs.writeFileSync(languagesPath, lines.join('\\n'), 'utf-8');

console.log(`\\n=== Results ===`);
console.log(`Modified: ${modified} languages`);
console.log(`Already had imgURL: ${alreadyHad} languages`);
console.log(`Total logos: ${Object.keys(logoUrls).length}`);

export {};
