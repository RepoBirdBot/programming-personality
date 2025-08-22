#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Logo URL mappings with direct URLs for better performance
const logoUrls: Record<string, string> = {
    'python': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    'javascript': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    'typescript': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    'rust': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
    'go': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',
    'java': 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg',
    'cpp': 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
    'ruby': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg',
    'swift': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg',
    'haskell': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg',
    'csharp': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg',
    'c': 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',
    'php': 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg',
    'kotlin': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png',
    'r': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg',
    'matlab': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png',
    'scala': 'https://upload.wikimedia.org/wikipedia/commons/3/39/Scala-full-color.svg',
    'dart': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Dart_programming_language_logo.svg',
    'objectivec': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Objective-C_Logo.png',
    'perl': 'https://upload.wikimedia.org/wikipedia/en/0/00/Perl-camel-small.png',
    'lua': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg',
    'julia': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Julia_Programming_Language_Logo.svg',
    'elixir': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Official_Elixir_logo.png',
    'clojure': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Clojure_logo.svg',
    'fsharp': 'https://upload.wikimedia.org/wikipedia/commons/6/66/F_Sharp_logo.svg',
    'erlang': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Erlang_logo.svg',
    'visualbasic': 'https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg',
    'delphi': 'https://upload.wikimedia.org/wikipedia/en/3/3c/Delphi_Programming_Language_Logo.png',
    'cobol': 'https://upload.wikimedia.org/wikipedia/commons/3/31/COBOL_logo.svg',
    'sql': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
    'bash': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg',
    'groovy': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Groovy-logo.svg',
    'assembly': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/GNU_Assembler_Logo.svg',
    'fortran': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Fortran_logo.svg',
    'ada': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Ada_Mascot_with_slogan.svg',
    'powershell': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png',
    'vba': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/VB_logo.png',
    'plsql': 'https://upload.wikimedia.org/wikipedia/en/6/69/Oracle_SQL_Developer_Logo.svg',
    'prolog': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/SWI-Prolog_logo.svg',
    'lisp': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
    'd': 'https://upload.wikimedia.org/wikipedia/commons/2/24/D_Programming_Language_logo.svg',
    'scratch': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Scratch_Logo.svg',
    'scheme': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Racket-logo.svg',
    'ocaml': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/OCaml_Logo.svg',
    'solidity': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg',
    'racket': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Racket-logo.svg',
    'awk': 'https://techicons.dev/icons/awk.svg',
    'sas': 'https://upload.wikimedia.org/wikipedia/commons/1/10/SAS_logo_horiz.svg',
    'tcl': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Tcl-powered.svg',
    'vbnet': 'https://upload.wikimedia.org/wikipedia/commons/4/40/VB.NET_Logo.svg',
    'nim': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Nim-logo.svg',
    'crystal': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Crystal_language_logo.svg',
    'zig': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Zig_Programming_Language_logo.svg',
    'vlang': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/V_programming_language_logo.svg',
    'elm': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Elm_logo.svg',
    'purescript': 'https://upload.wikimedia.org/wikipedia/commons/6/64/PureScript_Logo.png',
    'reasonml': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/ReasonML_Logo.svg',
    'commonlisp': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Lisp_logo.svg',
    'standardml': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Standard_ML_logo.png',
    'smalltalk': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Smalltalk_logo.svg',
    'sed': 'https://techicons.dev/icons/sed.svg',
    'verilog': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
    'vhdl': 'https://upload.wikimedia.org/wikipedia/commons/1/12/VHDL_logo.svg',
    'cuda': 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg',
    'opencl': 'https://upload.wikimedia.org/wikipedia/commons/3/30/OpenCL_Logo.svg',
    'glsl': 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Opengl-logo.svg',
    'hlsl': 'https://upload.wikimedia.org/wikipedia/commons/2/20/DirectX_logo.svg',
    'mojo': 'https://docs.modular.com/mojo/assets/mojo-logo.svg',
    'carbon': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Carbon_Logo.png',
    'actionscript': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Flash_CS3_Icon.png',
    'autohotkey': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/AutoHotkey_Logo.svg',
    'apl': 'https://upload.wikimedia.org/wikipedia/commons/a/af/APL_keybd2_UC.svg',
    'coffeescript': 'https://techicons.dev/icons/coffeescript.svg',
    'chapel': 'https://chapel-lang.org/images/chapel-logo-200.png',
    'eiffel': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Eiffel_logo.svg',
    'factor': 'https://factorcode.org/logo.png',
    'forth': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Forth_logo.svg',
    'io': 'https://iolanguage.org/images/io-logo.png',
    'j': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/J_logo.svg',
    'labview': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/LabVIEW_logo.svg',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_turtle.svg',
    'mql4': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/MetaQuotes_Logo.png',
    'monkey': 'https://upload.wikimedia.org/wikipedia/commons/6/69/Monkey_X_Logo.png',
    'purebasic': 'https://upload.wikimedia.org/wikipedia/commons/3/35/PureBasic_Logo.png',
    'rexx': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/REXX_logo.png',
    'ring': 'https://ring-lang.github.io/doc1.17/images/ringlang.png',
    'simula': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Simula_Logo.svg',
    'xslt': 'https://upload.wikimedia.org/wikipedia/commons/6/68/XSLT_Logo.svg',
    'tcltk': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Tcl-powered.svg',
    'qsharp': 'https://devblogs.microsoft.com/qsharp/wp-content/uploads/sites/74/2019/05/qsharp_logo_2019.png',
    'wasm': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/WebAssembly_Logo.svg',
    'systemverilog': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SystemVerilog_Logo.svg',
    'pony': 'https://www.ponylang.io/images/logo.svg',
    'idris': 'https://upload.wikimedia.org/wikipedia/commons/0/02/Idris_logo.svg',
    'vale': 'https://vale.dev/images/logo.svg',
    'odin': 'https://odin-lang.org/images/logo-slim.svg',
    'janet': 'https://janet-lang.org/logo/janet-w200.png',
    'nix': 'https://upload.wikimedia.org/wikipedia/commons/2/28/Nix_snowflake.svg',
    'dhall': 'https://dhall-lang.org/img/dhall-logo.svg',
    'lean': 'https://lean-lang.org/lean_logo.svg'
};

console.log('Adding optimized logo URLs to languages array...\n');

// Read the current languages.ts file
const languagesPath = path.join(__dirname, '../src/lib/data/languages.ts');
let languagesContent = fs.readFileSync(languagesPath, 'utf-8');

// Apply all URL updates
Object.entries(logoUrls).forEach(([langId, logoUrl]) => {
    // Find and update/add imgURL for each language
    const langRegex = new RegExp(
        `(\\{[\\s\\S]*?id:\\s*'${langId}'[\\s\\S]*?)color:\\s*'[^']*'([^}]*?)`,
        'g'
    );
    
    languagesContent = languagesContent.replace(langRegex, (match, p1, p2) => {
        // Remove existing imgURL if present
        const withoutImgUrl = (p1 + "color: '" + match.match(/color:\s*'([^']*)'/)?.[1] + "'" + p2)
            .replace(/,?\s*imgURL:\s*'[^']*'/g, '');
        
        // Add new imgURL after color
        return withoutImgUrl.replace(
            /(color:\s*'[^']*')/,
            `$1,\n\t\timgURL: '${logoUrl}'`
        );
    });
    
    console.log(`✅ Updated ${langId}: ${logoUrl}`);
});

// Write back to file
fs.writeFileSync(languagesPath, languagesContent, 'utf-8');

console.log(`\n✅ All logo URLs have been added to the languages array!`);

export {};