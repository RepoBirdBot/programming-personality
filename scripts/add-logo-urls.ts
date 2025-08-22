#!/usr/bin/env tsx

import { languages } from '../src/lib/data/languages';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logo URL mappings from Perplexity research
const logoUrls: Record<string, string> = {
    // First batch (40 languages)
    'python': 'https://commons.wikimedia.org/wiki/File:Python-logo-notext.svg',
    'javascript': 'https://commons.wikimedia.org/wiki/File:Unofficial_JavaScript_logo_2.svg',
    'typescript': 'https://commons.wikimedia.org/wiki/File:Typescript_logo_2020.svg',
    'rust': 'https://commons.wikimedia.org/wiki/File:Rust_programming_language_black_logo.svg',
    'go': 'https://commons.wikimedia.org/wiki/File:Go_Logo_Blue.svg',
    'java': 'https://commons.wikimedia.org/wiki/File:Java_programming_language_logo.svg',
    'cpp': 'https://commons.wikimedia.org/wiki/File:ISO_C%2B%2B_Logo.svg',
    'ruby': 'https://commons.wikimedia.org/wiki/File:Ruby_logo.svg',
    'swift': 'https://commons.wikimedia.org/wiki/File:Swift_logo.svg',
    'haskell': 'https://commons.wikimedia.org/wiki/File:Haskell-Logo.svg',
    'csharp': 'https://commons.wikimedia.org/wiki/File:C_Sharp_wordmark.svg',
    'c': 'https://commons.wikimedia.org/wiki/File:C_Programming_Language.svg',
    'php': 'https://commons.wikimedia.org/wiki/File:PHP-logo.svg',
    'kotlin': 'https://commons.wikimedia.org/wiki/File:Kotlin-logo.svg',
    'r': 'https://commons.wikimedia.org/wiki/File:R_logo.svg',
    'matlab': 'https://commons.wikimedia.org/wiki/File:Matlab_Logo.png',
    'scala': 'https://commons.wikimedia.org/wiki/File:Scala-full-color.svg',
    'dart': 'https://commons.wikimedia.org/wiki/File:Dart_programming_language_logo.svg',
    'objectivec': 'https://commons.wikimedia.org/wiki/File:Objective-C_Logo.png',
    'perl': 'https://commons.wikimedia.org/wiki/File:Perl_Code_Logo.svg',
    'lua': 'https://commons.wikimedia.org/wiki/File:Lua-Logo.svg',
    'julia': 'https://commons.wikimedia.org/wiki/File:Julia_Logo_color.svg',
    'elixir': 'https://commons.wikimedia.org/wiki/File:Elixir_logo.png',
    'clojure': 'https://commons.wikimedia.org/wiki/File:Clojure_logo.svg',
    'fsharp': 'https://commons.wikimedia.org/wiki/File:F_Sharp_logo.svg',
    'erlang': 'https://commons.wikimedia.org/wiki/File:Erlang_logo.svg',
    'visualbasic': 'https://commons.wikimedia.org/wiki/File:VisualBasic_6.0_logo.png',
    'delphi': 'https://commons.wikimedia.org/wiki/File:Delphi_Programming_Language_logo.png',
    'cobol': 'https://commons.wikimedia.org/wiki/File:COBOL_logo.svg',
    'sql': 'https://commons.wikimedia.org/wiki/File:Structured_Query_Language_logo.svg',
    'bash': 'https://commons.wikimedia.org/wiki/File:Bash_Logo_Colored.svg',
    'groovy': 'https://commons.wikimedia.org/wiki/File:Groovy-logo.svg',
    'assembly': 'https://commons.wikimedia.org/wiki/File:Assembly_wikipedia_logo.png',
    'fortran': 'https://commons.wikimedia.org/wiki/File:Fortran_logo.svg',
    'ada': 'https://commons.wikimedia.org/wiki/File:Ada_Mascot_with_slogan.svg',
    'powershell': 'https://commons.wikimedia.org/wiki/File:PowerShell_Logo.svg',
    'vba': 'https://commons.wikimedia.org/wiki/File:VB_logo.png',
    'plsql': 'https://commons.wikimedia.org/wiki/File:PLSQL_logo.png',
    'prolog': 'https://commons.wikimedia.org/wiki/File:Prolog_logo.png',
    'lisp': 'https://commons.wikimedia.org/wiki/File:LISP_logo.svg',
    
    // Second batch (60 languages)
    'd': 'https://commons.wikimedia.org/wiki/File:D_Programming_Language_logo.svg',
    'scratch': 'https://commons.wikimedia.org/wiki/File:Scratch_logo.svg',
    'scheme': 'https://commons.wikimedia.org/wiki/File:Scheme.svg',
    'ocaml': 'https://commons.wikimedia.org/wiki/File:OCaml_logo.svg',
    'solidity': 'https://commons.wikimedia.org/wiki/File:Solidity_logo.svg',
    'racket': 'https://commons.wikimedia.org/wiki/File:Racket-logo.svg',
    'awk': 'https://techicons.dev/icons/awk.svg',
    'sas': 'https://commons.wikimedia.org/wiki/File:SAS_logo.svg',
    'tcl': 'https://commons.wikimedia.org/wiki/File:Tcl_logo.svg',
    'vbnet': 'https://commons.wikimedia.org/wiki/File:VB.NET_Logo.svg',
    'nim': 'https://commons.wikimedia.org/wiki/File:Nim-logo.svg',
    'crystal': 'https://commons.wikimedia.org/wiki/File:Crystal_language_logo.svg',
    'zig': 'https://commons.wikimedia.org/wiki/File:Zig-logo.svg',
    'vlang': 'https://commons.wikimedia.org/wiki/File:V_logo.svg',
    'elm': 'https://commons.wikimedia.org/wiki/File:Elm_logo.svg',
    'purescript': 'https://commons.wikimedia.org/wiki/File:Purescript_logo.svg',
    'reasonml': 'https://commons.wikimedia.org/wiki/File:ReasonML_logo.svg',
    'commonlisp': 'https://commons.wikimedia.org/wiki/File:Common_Lisp_logo.svg',
    'standardml': 'https://commons.wikimedia.org/wiki/File:Standard_ML_Logo.svg',
    'smalltalk': 'https://commons.wikimedia.org/wiki/File:Smalltalk_logo.png',
    'sed': 'https://techicons.dev/icons/sed.svg',
    'verilog': 'https://commons.wikimedia.org/wiki/File:Verilog_logo.svg',
    'vhdl': 'https://commons.wikimedia.org/wiki/File:VHDL-Logo.svg',
    'cuda': 'https://commons.wikimedia.org/wiki/File:Nvidia_cuda_logo.svg',
    'opencl': 'https://commons.wikimedia.org/wiki/File:OpenCL_logo.svg',
    'glsl': 'https://commons.wikimedia.org/wiki/File:OpenGL_Shading_Language_logo.png',
    'hlsl': 'https://commons.wikimedia.org/wiki/File:HLSL_Logo.svg',
    'mojo': 'https://commons.wikimedia.org/wiki/File:Mojo_(programming_language)_logo.svg',
    'carbon': 'https://commons.wikimedia.org/wiki/File:Carbon-language-logo.svg',
    'actionscript': 'https://commons.wikimedia.org/wiki/File:ActionScript_Icon.png',
    'autohotkey': 'https://commons.wikimedia.org/wiki/File:Autohotkey_logo.png',
    'apl': 'https://commons.wikimedia.org/wiki/File:APL_logo.png',
    'coffeescript': 'https://techicons.dev/icons/coffeescript.svg',
    'chapel': 'https://commons.wikimedia.org/wiki/File:Chapel-logo.svg',
    'eiffel': 'https://commons.wikimedia.org/wiki/File:Eiffel_programming_language_logo.png',
    'factor': 'https://commons.wikimedia.org/wiki/File:Factor_(programming_language)_logo.png',
    'forth': 'https://commons.wikimedia.org/wiki/File:Forth_logo.png',
    'io': 'https://commons.wikimedia.org/wiki/File:Io_phoenix_logo.png',
    'j': 'https://commons.wikimedia.org/wiki/File:J_logo.png',
    'labview': 'https://commons.wikimedia.org/wiki/File:Labview_logo.svg',
    'logo': 'https://commons.wikimedia.org/wiki/File:Logo_turtle.svg',
    'mql4': 'https://commons.wikimedia.org/wiki/File:MetaQuotes_Logo.png',
    'monkey': 'https://commons.wikimedia.org/wiki/File:Monkey-X-logo.png',
    'purebasic': 'https://commons.wikimedia.org/wiki/File:PureBasic_logo.png',
    'rexx': 'https://commons.wikimedia.org/wiki/File:Rexx_logo.png',
    'ring': 'https://commons.wikimedia.org/wiki/File:Ring_logo.svg',
    'simula': 'https://commons.wikimedia.org/wiki/File:Simula_logo.png',
    'xslt': 'https://commons.wikimedia.org/wiki/File:XSLT_logo.svg',
    'tcltk': 'https://commons.wikimedia.org/wiki/File:Tcl_Tk_logo.svg',
    'qsharp': 'https://commons.wikimedia.org/wiki/File:Q_Sharp_logo.svg',
    'wasm': 'https://commons.wikimedia.org/wiki/File:WebAssembly_Logo.svg',
    'systemverilog': 'https://commons.wikimedia.org/wiki/File:SystemVerilog_logo.svg',
    'pony': 'https://commons.wikimedia.org/wiki/File:Pony-programming-language-logo.png',
    'idris': 'https://commons.wikimedia.org/wiki/File:Idris_logo.svg',
    'vale': 'https://commons.wikimedia.org/wiki/File:Vale_logo.svg',
    'odin': 'https://commons.wikimedia.org/wiki/File:Odin_logo.png',
    'janet': 'https://commons.wikimedia.org/wiki/File:Janet-language-logo.svg',
    'nix': 'https://commons.wikimedia.org/wiki/File:Nix_logo.svg',
    'dhall': 'https://commons.wikimedia.org/wiki/File:Dhall_logo.svg',
    'lean': 'https://commons.wikimedia.org/wiki/File:Lean_logo.svg'
};

console.log('Adding logo URLs to languages array...\n');

// Read the current languages.ts file
const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let languagesContent = fs.readFileSync(languagesPath, 'utf-8');

// Track which languages we update
let updated = 0;
let missing = 0;

languages.forEach((lang) => {
    const logoUrl = logoUrls[lang.id];
    
    if (logoUrl) {
        // Find the language object in the file content and add imgURL
        const langRegex = new RegExp(
            `(\\{\\s*id:\\s*'${lang.id}'[\\s\\S]*?)color:\\s*'[^']*'`,
            'g'
        );
        
        languagesContent = languagesContent.replace(langRegex, (match) => {
            // Check if imgURL already exists
            if (match.includes('imgURL:')) {
                return match;
            }
            // Add imgURL after color
            return match + `,\n\t\timgURL: '${logoUrl}'`;
        });
        
        console.log(`✅ ${lang.name}: ${logoUrl}`);
        updated++;
    } else {
        console.log(`❌ ${lang.name}: No URL found`);
        missing++;
    }
});

// Write back to file
fs.writeFileSync(languagesPath, languagesContent, 'utf-8');

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updated} languages`);
console.log(`Missing: ${missing} languages`);
console.log(`Total: ${languages.length} languages`);

export {};