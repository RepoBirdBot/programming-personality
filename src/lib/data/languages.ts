import type { Language } from '$lib/types/quiz';

// MBTI personality mappings for programming languages
export const languageMBTIMapping: Record<string, string> = {
	// Top 50 Most Popular
	python: 'ENFP',
	javascript: 'ENFP',
	java: 'ISFJ',
	typescript: 'ISTJ',
	cpp: 'ISTJ',
	csharp: 'ESTJ',
	c: 'ISTP',
	go: 'ISTJ',
	rust: 'INTJ',
	php: 'ESFP',
	swift: 'ISFP',
	kotlin: 'ENFJ',
	ruby: 'ENFP',
	r: 'INTP',
	matlab: 'INTJ',
	scala: 'INTP',
	dart: 'ISFJ',
	objectivec: 'ISTJ',
	perl: 'INTP',
	lua: 'ISFP',
	julia: 'INTJ',
	haskell: 'INTP',
	elixir: 'ENFJ',
	clojure: 'INTP',
	fsharp: 'INTJ',
	erlang: 'INTJ',
	visualbasic: 'ISFJ',
	delphi: 'ISTJ',
	cobol: 'ISTJ',
	fortran: 'ISTJ',
	ada: 'ISTJ',
	lisp: 'INTP',
	scheme: 'INTP',
	prolog: 'INTP',
	sql: 'ISTJ',
	bash: 'ISTP',
	powershell: 'ESTJ',
	groovy: 'ENFP',
	ocaml: 'INTJ',
	nim: 'INFJ',
	crystal: 'ENFP',
	zig: 'INTJ',
	v: 'INTJ',
	solidity: 'INTJ',
	assembly: 'ISTP',
	webassembly: 'ISTP',
	apex: 'ESTJ',
	abap: 'ISTJ',
	sas: 'ISTJ',
	scratch: 'ESFP',
	
	// Languages 51-100
	d: 'INTJ',
	elm: 'INFJ',
	purescript: 'INTJ',
	reasonml: 'INFJ',
	racket: 'INTP',
	commonlisp: 'INTP',
	standardml: 'INTJ',
	smalltalk: 'ENFP',
	tcl: 'ISTP',
	awk: 'ISTP',
	sed: 'ISTP',
	verilog: 'ISTJ',
	vhdl: 'ISTJ',
	systemverilog: 'ISTJ',
	cuda: 'INTJ',
	opencl: 'INTJ',
	glsl: 'ISFP',
	hlsl: 'ISFP',
	mojo: 'ENTP',
	carbon: 'INTJ',
	vale: 'INTJ',
	pony: 'INFJ',
	idris: 'INTP',
	agda: 'INTP',
	coq: 'INTP',
	lean: 'INTP',
	mercury: 'INTJ',
	chapel: 'INTJ',
	x10: 'INTJ',
	fortress: 'INTJ',
	ceylon: 'ENFJ',
	fantom: 'ENFJ',
	gosu: 'ESTJ',
	hack: 'ENFP',
	ballerina: 'ENFJ',
	red: 'INFJ',
	ring: 'ENFP',
	raku: 'ENTP',
	io: 'INFP',
	j: 'INTP',
	k: 'INTP',
	q: 'INTP',
	apl: 'INTP',
	bqn: 'INTP',
	factor: 'INTP',
	forth: 'ISTP',
	postscript: 'ISTP',
	rebol: 'INFJ',
	icon: 'INFJ',
	snobol: 'INTP'
};

// Complete list of 200+ programming languages
export const allLanguages: string[] = [
	// Top 50
	'Python', 'JavaScript', 'Java', 'TypeScript', 'C++', 'C#', 'C', 'Go', 'Rust', 'PHP',
	'Swift', 'Kotlin', 'Ruby', 'R', 'MATLAB', 'Scala', 'Dart', 'Objective-C', 'Perl', 'Lua',
	'Julia', 'Haskell', 'Elixir', 'Clojure', 'F#', 'Erlang', 'Visual Basic', 'Delphi/Pascal', 'COBOL', 'Fortran',
	'Ada', 'Lisp', 'Scheme', 'Prolog', 'SQL', 'Bash/Shell', 'PowerShell', 'Groovy', 'OCaml', 'Nim',
	'Crystal', 'Zig', 'V', 'Solidity', 'Assembly', 'WebAssembly', 'Apex', 'ABAP', 'SAS', 'Scratch',
	
	// 51-100
	'D', 'Elm', 'PureScript', 'ReasonML', 'Racket', 'Common Lisp', 'Standard ML', 'Smalltalk', 'Tcl', 'Awk',
	'Sed', 'Verilog', 'VHDL', 'SystemVerilog', 'CUDA', 'OpenCL', 'GLSL', 'HLSL', 'Mojo', 'Carbon',
	'Vale', 'Pony', 'Idris', 'Agda', 'Coq', 'Lean', 'Mercury', 'Chapel', 'X10', 'Fortress',
	'Ceylon', 'Fantom', 'Gosu', 'Hack', 'Ballerina', 'Red', 'Ring', 'Raku', 'Io', 'J',
	'K', 'Q', 'APL', 'BQN', 'Factor', 'Forth', 'PostScript', 'Rebol', 'Icon', 'SNOBOL',
	
	// 101-150
	'ActionScript', 'CoffeeScript', 'LiveScript', 'MoonScript', 'Squirrel', 'AngelScript', 'Wren', 'Gravity', 'Lobster', 'Skip',
	'Beef', 'Odin', 'JAI', 'Haxe', 'Vala', 'Genie', 'Boo', 'Nemerle', 'Cobra', 'Eiffel',
	'Modula-2', 'Modula-3', 'Oberon', 'Component Pascal', 'Active Oberon', 'Zonnon', 'Simula', 'BETA', 'Self', 'NewtonScript',
	'Dylan', 'Slate', 'Ioke', 'Fancy', 'Mirah', 'Goby', 'mruby', 'Arturo', 'Red/System', 'Pharo',
	'Squeak', 'GNU Smalltalk', 'Amber Smalltalk', 'PicoLisp', 'Arc', 'Hy', 'Fennel', 'Janet', 'Carp', 'Terra',
	
	// 151-200
	'ATS', 'Whiley', 'Dafny', 'SPARK', 'B', 'BCPL', 'CPL', 'ALGOL', 'ALGOL 68', 'Simula 67',
	'Mesa', 'Cedar', 'Euclid', 'Turing', 'Miranda', 'Hope', 'Clean', 'Curry', 'Cayenne', 'Epigram',
	'Ur', 'Links', 'Opa', 'HOP', 'REXX', 'NetRexx', 'ooRexx', 'Regina', 'AREXX', 'CLIST',
	'TSO/E REXX', 'RPG', 'RPG II', 'RPG III', 'RPG IV', 'ILE RPG', 'Free-Form RPG', 'CL (AS/400)', 'MUMPS', 'Cache ObjectScript',
	'GT.M', 'YottaDB', 'InterSystems IRIS', 'Pick BASIC', 'UniVerse BASIC', 'UniData BASIC', 'Reality BASIC', 'jBASE BASIC', 'OpenQM BASIC', 'Wolfram Language',
	
	// Additional Notable Languages (201+)
	'Maple', 'Maxima', 'GAP', 'Magma', 'PARI/GP', 'Octave', 'Scilab', 'IDL', 'NCL', 'GDL',
	'Yorick', 'Ch', 'ChaiScript', 'Duktape', 'JerryScript', 'QuickJS', 'XS', 'mJS', 'Espruino', 'Kinoma XS',
	'ActionScript 3', 'OpenFL', 'NME', 'Processing', 'p5.js', 'openFrameworks', 'Cinder', 'JUCE', 'Max/MSP', 'Pure Data',
	'SuperCollider', 'ChucK', 'Csound', 'Faust', 'Sonic Pi'
];

export const languages: Language[] = [
	{
		id: 'python',
		name: 'Python',
		description: 'A versatile, beginner-friendly language known for its clean syntax',
		strengths: ['Easy to learn', 'Great libraries', 'Versatile', 'Strong community'],
		useCases: ['Data Science', 'Web Development', 'Automation', 'Machine Learning'],
		personality:
			'You value clarity and simplicity. You prefer getting things done efficiently over complex solutions.',
		mbti: 'ENFP',
		icon: '🐍',
		color: '#3776AB'
	},
	{
		id: 'javascript',
		name: 'JavaScript',
		description: 'The language of the web, flexible and everywhere',
		strengths: ['Runs everywhere', 'Huge ecosystem', 'Flexible', 'Active community'],
		useCases: ['Web Development', 'Mobile Apps', 'Server-side', 'Desktop Apps'],
		personality:
			'You are creative and adaptable. You thrive in dynamic environments and enjoy seeing immediate results.',
		icon: '⚡',
		color: '#F7DF1E'
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		description: 'JavaScript with type safety and better tooling',
		strengths: ['Type safety', 'Better IDE support', 'Scalable', 'JavaScript compatible'],
		useCases: ['Large Applications', 'Enterprise Software', 'Modern Web Apps', 'Libraries'],
		personality:
			'You appreciate structure but still want flexibility. You believe in preventing errors before they happen.',
		icon: '🔷',
		color: '#3178C6'
	},
	{
		id: 'rust',
		name: 'Rust',
		description: 'A systems programming language focused on safety and performance',
		strengths: ['Memory safe', 'Fast', 'Concurrent', 'Zero-cost abstractions'],
		useCases: ['Systems Programming', 'WebAssembly', 'Game Engines', 'Embedded Systems'],
		personality:
			'You are detail-oriented and value correctness. Performance and safety are your top priorities.',
		icon: '🦀',
		color: '#CE4A16'
	},
	{
		id: 'go',
		name: 'Go',
		description: 'Simple, efficient, and built for modern systems',
		strengths: ['Simple syntax', 'Fast compilation', 'Built-in concurrency', 'Great tooling'],
		useCases: ['Cloud Services', 'DevOps Tools', 'Microservices', 'Network Programming'],
		personality:
			'You are pragmatic and efficient. You prefer simple solutions that work well at scale.',
		icon: '🐹',
		color: '#00ADD8'
	},
	{
		id: 'java',
		name: 'Java',
		description: 'Enterprise-ready, platform-independent, and mature',
		strengths: ['Platform independent', 'Mature ecosystem', 'Strong typing', 'Enterprise support'],
		useCases: ['Enterprise Applications', 'Android Development', 'Web Services', 'Big Data'],
		personality:
			'You value stability and proven solutions. You appreciate comprehensive tooling and established patterns.',
		icon: '☕',
		color: '#007396'
	},
	{
		id: 'cpp',
		name: 'C++',
		description: 'Powerful, complex, and gives you complete control',
		strengths: ['High performance', 'Hardware control', 'Large ecosystem', 'Versatile'],
		useCases: [
			'Game Development',
			'System Software',
			'Embedded Systems',
			'High-Performance Computing'
		],
		personality:
			'You want complete control and maximum performance. Complexity does not scare you.',
		icon: '⚙️',
		color: '#00599C'
	},
	{
		id: 'ruby',
		name: 'Ruby',
		description: 'Optimized for developer happiness and productivity',
		strengths: [
			'Expressive syntax',
			'Developer friendly',
			'Great for prototyping',
			'Strong conventions'
		],
		useCases: ['Web Development', 'Scripting', 'Prototyping', 'DevOps'],
		personality:
			'You value developer happiness and elegant code. You believe programming should be enjoyable.',
		icon: '💎',
		color: '#CC342D'
	},
	{
		id: 'swift',
		name: 'Swift',
		description: 'Modern, safe, and designed for Apple platforms',
		strengths: ['Modern syntax', 'Safe', 'Fast', 'Great for iOS'],
		useCases: ['iOS Development', 'macOS Apps', 'Server-side Swift', 'Cross-platform'],
		personality:
			'You appreciate modern design and safety. You likely enjoy working in the Apple ecosystem.',
		icon: '🦉',
		color: '#FA7343'
	},
	{
		id: 'haskell',
		name: 'Haskell',
		description: 'Pure functional programming with strong mathematical foundations',
		strengths: ['Pure functional', 'Strong type system', 'Lazy evaluation', 'Mathematical'],
		useCases: ['Academic Research', 'Financial Systems', 'Compilers', 'Formal Verification'],
		personality:
			'You think mathematically and love elegant abstractions. You believe in correctness through types.',
		icon: '🎓',
		color: '#5D4F85'
	}
];