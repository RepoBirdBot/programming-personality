import type { LanguageQuestion } from '$lib/types/quiz';

export const languageQuestions: LanguageQuestion[] = [
	// Domain preferences
	{
		id: 'lang1',
		text: 'What type of project excites you the most?',
		category: 'domain',
		answers: [
			{
				id: 'lang1a',
				text: 'Interactive websites and web applications',
				languages: ['javascript', 'typescript', 'php', 'ruby', 'elm', 'reasonml']
			},
			{
				id: 'lang1b',
				text: 'Data analysis, AI, and machine learning',
				languages: ['python', 'r', 'julia', 'matlab', 'scala', 'octave']
			},
			{
				id: 'lang1c',
				text: 'Mobile apps for phones and tablets',
				languages: ['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp']
			},
			{
				id: 'lang1d',
				text: 'System software and operating systems',
				languages: ['c', 'cpp', 'rust', 'go', 'zig', 'nim', 'd']
			},
			{
				id: 'lang1e',
				text: 'Games and graphics programming',
				languages: ['cpp', 'csharp', 'rust', 'lua', 'gdscript', 'haxe']
			},
			{
				id: 'lang1f',
				text: 'Enterprise and business applications',
				languages: ['java', 'csharp', 'cobol', 'abap', 'apex', 'visualbasic']
			}
		]
	},

	// Frontend vs Backend for web developers
	{
		id: 'lang2',
		text: 'In web development, you prefer working on:',
		category: 'domain',
		answers: [
			{
				id: 'lang2a',
				text: 'User interfaces and user experience',
				languages: ['javascript', 'typescript', 'elm', 'reasonml', 'purescript', 'coffeescript']
			},
			{
				id: 'lang2b',
				text: 'Server logic and APIs',
				languages: ['python', 'ruby', 'java', 'go', 'php', 'nodejs', 'elixir', 'rust']
			},
			{
				id: 'lang2c',
				text: 'Full-stack - both frontend and backend',
				languages: ['javascript', 'typescript', 'python', 'ruby', 'php', 'java']
			},
			{
				id: 'lang2d',
				text: 'Not interested in web development',
				languages: ['c', 'cpp', 'rust', 'swift', 'kotlin', 'matlab', 'r']
			}
		]
	},

	// Syntax style preferences
	{
		id: 'lang3',
		text: 'What syntax style do you find most appealing?',
		category: 'style',
		answers: [
			{
				id: 'lang3a',
				text: 'Clean and minimal with significant whitespace',
				languages: ['python', 'haskell', 'elm', 'nim', 'coffeescript', 'yaml']
			},
			{
				id: 'lang3b',
				text: 'Expressive and flexible with multiple paradigms',
				languages: ['javascript', 'ruby', 'perl', 'scala', 'kotlin', 'swift']
			},
			{
				id: 'lang3c',
				text: 'Verbose but explicit and self-documenting',
				languages: ['java', 'csharp', 'cobol', 'ada', 'pascal', 'visualbasic']
			},
			{
				id: 'lang3d',
				text: 'Concise with powerful operators and symbols',
				languages: ['apl', 'j', 'k', 'perl', 'haskell', 'rust']
			},
			{
				id: 'lang3e',
				text: 'C-like with curly braces and semicolons',
				languages: ['c', 'cpp', 'java', 'csharp', 'javascript', 'go', 'rust', 'swift']
			}
		]
	},

	// Type system preferences
	{
		id: 'lang4',
		text: 'How do you feel about type systems?',
		category: 'style',
		answers: [
			{
				id: 'lang4a',
				text: 'Dynamic typing for maximum flexibility',
				languages: ['python', 'javascript', 'ruby', 'php', 'lua', 'perl', 'lisp']
			},
			{
				id: 'lang4b',
				text: 'Static typing for safety and tooling',
				languages: ['java', 'csharp', 'cpp', 'go', 'rust', 'kotlin', 'swift']
			},
			{
				id: 'lang4c',
				text: 'Optional/gradual typing - best of both worlds',
				languages: ['typescript', 'python', 'dart', 'hack', 'raku']
			},
			{
				id: 'lang4d',
				text: 'Advanced type systems with inference',
				languages: ['haskell', 'rust', 'scala', 'ocaml', 'fsharp', 'elm', 'purescript']
			}
		]
	},

	// Performance requirements
	{
		id: 'lang5',
		text: 'How important is raw performance in your projects?',
		category: 'performance',
		answers: [
			{
				id: 'lang5a',
				text: 'Critical - every microsecond counts',
				languages: ['c', 'cpp', 'rust', 'zig', 'assembly', 'fortran']
			},
			{
				id: 'lang5b',
				text: 'Important but not at the cost of productivity',
				languages: ['go', 'java', 'csharp', 'swift', 'kotlin', 'd', 'nim']
			},
			{
				id: 'lang5c',
				text: 'Moderate - good enough is fine',
				languages: ['javascript', 'typescript', 'python', 'ruby', 'php']
			},
			{
				id: 'lang5d',
				text: 'Not important - correctness and expressiveness matter more',
				languages: ['haskell', 'lisp', 'prolog', 'erlang', 'elixir']
			}
		]
	},

	// Team and ecosystem preferences
	{
		id: 'lang6',
		text: 'What kind of development environment do you prefer?',
		category: 'team',
		answers: [
			{
				id: 'lang6a',
				text: 'Large ecosystem with extensive libraries',
				languages: ['javascript', 'python', 'java', 'csharp', 'ruby', 'php']
			},
			{
				id: 'lang6b',
				text: 'Stable, mature tools with long-term support',
				languages: ['java', 'csharp', 'cpp', 'cobol', 'fortran', 'ada']
			},
			{
				id: 'lang6c',
				text: 'Cutting-edge with rapid innovation',
				languages: ['rust', 'typescript', 'kotlin', 'swift', 'zig', 'nim']
			},
			{
				id: 'lang6d',
				text: 'Minimalist with focus on core language',
				languages: ['go', 'c', 'lua', 'scheme', 'forth']
			}
		]
	},

	// Platform preferences
	{
		id: 'lang7',
		text: 'What platform do you primarily develop for?',
		category: 'domain',
		answers: [
			{
				id: 'lang7a',
				text: 'Cross-platform - write once, run anywhere',
				languages: ['java', 'python', 'javascript', 'go', 'rust', 'kotlin']
			},
			{
				id: 'lang7b',
				text: 'Apple ecosystem (iOS, macOS)',
				languages: ['swift', 'objectivec']
			},
			{
				id: 'lang7c',
				text: 'Microsoft ecosystem (Windows, .NET)',
				languages: ['csharp', 'fsharp', 'visualbasic', 'powershell']
			},
			{
				id: 'lang7d',
				text: 'Linux/Unix systems',
				languages: ['c', 'cpp', 'rust', 'go', 'python', 'bash', 'perl']
			},
			{
				id: 'lang7e',
				text: 'Embedded systems and IoT',
				languages: ['c', 'cpp', 'rust', 'ada', 'forth', 'assembly']
			}
		]
	},

	// Learning curve tolerance
	{
		id: 'lang8',
		text: 'How do you approach learning new languages?',
		category: 'learning',
		answers: [
			{
				id: 'lang8a',
				text: 'I want to be productive immediately',
				languages: ['python', 'javascript', 'ruby', 'go', 'lua', 'visual basic']
			},
			{
				id: 'lang8b',
				text: 'I enjoy moderate challenges with good payoff',
				languages: ['java', 'csharp', 'kotlin', 'swift', 'typescript', 'dart']
			},
			{
				id: 'lang8c',
				text: 'I love deep, complex languages that take years to master',
				languages: ['cpp', 'rust', 'haskell', 'scala', 'lisp', 'erlang']
			},
			{
				id: 'lang8d',
				text: 'I prefer familiar concepts in new forms',
				languages: ['typescript', 'kotlin', 'swift', 'dart', 'coffeescript']
			}
		]
	},

	// Programming paradigm preferences
	{
		id: 'lang9',
		text: 'What programming paradigm appeals to you most?',
		category: 'style',
		answers: [
			{
				id: 'lang9a',
				text: 'Object-oriented with classes and inheritance',
				languages: ['java', 'csharp', 'cpp', 'ruby', 'python', 'smalltalk']
			},
			{
				id: 'lang9b',
				text: 'Functional with immutability and pure functions',
				languages: ['haskell', 'elm', 'clojure', 'fsharp', 'ocaml', 'erlang', 'elixir']
			},
			{
				id: 'lang9c',
				text: 'Procedural and straightforward',
				languages: ['c', 'go', 'pascal', 'fortran', 'cobol']
			},
			{
				id: 'lang9d',
				text: 'Multi-paradigm - use the best tool for each job',
				languages: ['python', 'javascript', 'scala', 'rust', 'swift', 'kotlin']
			},
			{
				id: 'lang9e',
				text: 'Logic and declarative programming',
				languages: ['prolog', 'sql', 'datalog', 'mercury']
			}
		]
	},

	// Project scale preferences
	{
		id: 'lang10',
		text: 'What size projects do you typically work on?',
		category: 'team',
		answers: [
			{
				id: 'lang10a',
				text: 'Small scripts and automation',
				languages: ['python', 'bash', 'perl', 'ruby', 'lua', 'powershell']
			},
			{
				id: 'lang10b',
				text: 'Medium-sized applications',
				languages: ['javascript', 'typescript', 'go', 'kotlin', 'dart']
			},
			{
				id: 'lang10c',
				text: 'Large enterprise systems',
				languages: ['java', 'csharp', 'cpp', 'cobol', 'scala']
			},
			{
				id: 'lang10d',
				text: 'Varies widely depending on the need',
				languages: ['python', 'javascript', 'rust', 'go']
			}
		]
	},

	// Innovation vs Stability
	{
		id: 'lang11',
		text: 'Do you prefer languages that are:',
		category: 'ecosystem',
		answers: [
			{
				id: 'lang11a',
				text: 'Stable and battle-tested over decades',
				languages: ['c', 'cpp', 'java', 'cobol', 'fortran', 'lisp']
			},
			{
				id: 'lang11b',
				text: 'Modern but with proven track records',
				languages: ['python', 'javascript', 'csharp', 'ruby', 'go']
			},
			{
				id: 'lang11c',
				text: 'Cutting-edge with new ideas and features',
				languages: ['rust', 'zig', 'nim', 'crystal', 'mojo', 'carbon']
			},
			{
				id: 'lang11d',
				text: 'Experimental and research-oriented',
				languages: ['idris', 'agda', 'coq', 'lean', 'mercury']
			}
		]
	},

	// Community preferences
	{
		id: 'lang12',
		text: 'What kind of programming community do you prefer?',
		category: 'ecosystem',
		answers: [
			{
				id: 'lang12a',
				text: 'Large, diverse, and beginner-friendly',
				languages: ['python', 'javascript', 'java', 'ruby']
			},
			{
				id: 'lang12b',
				text: 'Professional and enterprise-focused',
				languages: ['java', 'csharp', 'cobol', 'abap', 'apex']
			},
			{
				id: 'lang12c',
				text: 'Small but passionate and innovative',
				languages: ['rust', 'elixir', 'nim', 'zig', 'crystal']
			},
			{
				id: 'lang12d',
				text: 'Academic and research-oriented',
				languages: ['haskell', 'ocaml', 'prolog', 'agda', 'coq']
			}
		]
	}
];