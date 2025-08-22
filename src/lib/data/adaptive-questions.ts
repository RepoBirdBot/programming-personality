import type { LanguageQuestion } from '$lib/types/quiz';
import { languages } from './languages';

// Smart questions that adapt based on MBTI type to distinguish between similar languages
export function getAdaptiveQuestions(mbtiType: string): LanguageQuestion[] {
	// First try to get languages matching the MBTI type
	let candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);

	// If no exact matches, use all languages
	if (candidateLanguages.length === 0) {
		candidateLanguages = languages;
	}

	const questions: LanguageQuestion[] = [];

	// Helper function to add question only if it has multiple valid answers
	const addQuestionIfValid = (
		id: string,
		text: string,
		category: LanguageQuestion['category'],
		potentialAnswers: Array<{ id: string; text: string; languages: string[] }>
	) => {
		const validAnswers = potentialAnswers.filter((answer) => answer.languages.length > 0);
		// Only add question if we have at least 2 valid answers
		if (validAnswers.length >= 2) {
			questions.push({
				id,
				text,
				category,
				answers: validAnswers
			});
		}
	};

	// Question 1: Primary use case - More generic answers
	addQuestionIfValid('use_case', 'What do you want to build?', 'domain', [
		{
			id: 'use_web',
			text: 'Web applications and websites',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.primaryDomain?.includes('web') ||
						[
							'javascript',
							'typescript',
							'python',
							'ruby',
							'php',
							'go',
							'java',
							'csharp',
							'elixir',
							'dart',
							'coffeescript'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_mobile',
			text: 'Mobile applications',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.primaryDomain === 'mobile' ||
						[
							'swift',
							'kotlin',
							'dart',
							'java',
							'objectivec',
							'csharp',
							'actionscript',
							'monkey'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_data',
			text: 'Data science and analysis',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.primaryDomain === 'data_science' ||
						['python', 'r', 'julia', 'matlab', 'scala', 'sql', 'sas', 'plsql', 'apl', 'j'].includes(
							l.id
						)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_systems',
			text: 'System software and tools',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.primaryDomain === 'systems' ||
						['c', 'cpp', 'rust', 'go', 'zig', 'nim', 'd', 'ada', 'odin', 'vale', 'carbon'].includes(
							l.id
						)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_games',
			text: 'Games and graphics',
			languages: candidateLanguages
				.filter((l) =>
					[
						'cpp',
						'csharp',
						'rust',
						'lua',
						'gdscript',
						'haxe',
						'unrealscript',
						'monkey',
						'glsl'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_scripting',
			text: 'Automation and scripting',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.primaryDomain === 'scripting' ||
						['python', 'bash', 'perl', 'ruby', 'lua', 'powershell', 'rexx', 'autohotkey'].includes(
							l.id
						)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_education',
			text: 'Educational or visual programming',
			languages: candidateLanguages
				.filter((l) => ['scratch', 'logo', 'alice', 'scheme', 'racket', 'ring'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_enterprise',
			text: 'Enterprise and business applications',
			languages: candidateLanguages
				.filter((l) =>
					[
						'java',
						'csharp',
						'cobol',
						'visualbasic',
						'delphi',
						'sas',
						'plsql',
						'abap',
						'apex'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_scientific',
			text: 'Scientific and mathematical computing',
			languages: candidateLanguages
				.filter((l) =>
					['matlab', 'julia', 'r', 'fortran', 'apl', 'j', 'mathematica', 'chapel'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_embedded',
			text: 'Embedded systems and IoT',
			languages: candidateLanguages
				.filter((l) => ['c', 'cpp', 'rust', 'ada', 'forth', 'micropython', 'zig'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 2: Programming style preference
	addQuestionIfValid('style', 'What programming style appeals to you?', 'style', [
		{
			id: 'style_functional',
			text: 'Functional programming with immutable data',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.paradigm === 'functional' ||
						[
							'haskell',
							'elm',
							'clojure',
							'fsharp',
							'ocaml',
							'erlang',
							'elixir',
							'scala',
							'purescript',
							'reasonml',
							'standardml',
							'lean',
							'idris',
							'lisp',
							'scheme',
							'racket',
							'commonlisp'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_oop',
			text: 'Object-oriented with classes and inheritance',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.paradigm === 'object_oriented' ||
						[
							'java',
							'csharp',
							'cpp',
							'ruby',
							'python',
							'swift',
							'kotlin',
							'dart',
							'smalltalk',
							'eiffel',
							'simula',
							'visualbasic',
							'objectivec',
							'apex'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_procedural',
			text: 'Simple procedural programming',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.paradigm === 'procedural' ||
						['c', 'go', 'pascal', 'fortran', 'cobol', 'basic', 'ada', 'modula'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_mixed',
			text: 'Multi-paradigm - best of all worlds',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.paradigm === 'multi_paradigm' ||
						[
							'python',
							'javascript',
							'typescript',
							'rust',
							'scala',
							'swift',
							'nim',
							'd',
							'julia'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_logic',
			text: 'Logic and declarative programming',
			languages: candidateLanguages
				.filter((l) => ['prolog', 'datalog', 'mercury'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_stack',
			text: 'Stack-based or concatenative programming',
			languages: candidateLanguages
				.filter((l) => ['forth', 'factor', 'postscript'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 3: Performance vs Productivity
	addQuestionIfValid('performance', 'What matters more to you?', 'performance', [
		{
			id: 'perf_speed',
			text: 'Maximum performance and control',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.performanceNeeds === 'critical' ||
						l.memoryManagement === 'manual' ||
						[
							'c',
							'cpp',
							'rust',
							'zig',
							'fortran',
							'ada',
							'd',
							'carbon',
							'julia',
							'chapel',
							'pony',
							'nim',
							'odin',
							'vale'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'perf_productivity',
			text: 'Developer productivity and ease of use',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.performanceNeeds === 'flexible' ||
						l.learningCurve === 'gentle' ||
						[
							'python',
							'ruby',
							'javascript',
							'go',
							'kotlin',
							'swift',
							'dart',
							'coffeescript',
							'ring',
							'autohotkey',
							'visualbasic'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'perf_balance',
			text: 'Good balance of both',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.performanceNeeds === 'important' ||
						[
							'go',
							'rust',
							'java',
							'csharp',
							'swift',
							'kotlin',
							'nim',
							'crystal',
							'elixir'
						].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 4: Learning curve preference
	addQuestionIfValid('learning', 'How do you feel about learning complexity?', 'ecosystem', [
		{
			id: 'learn_easy',
			text: 'I want something easy to learn and use',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.learningCurve === 'gentle' ||
						['python', 'javascript', 'ruby', 'go', 'lua', 'basic', 'scratch', 'logo'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'learn_moderate',
			text: 'I can handle moderate complexity',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.learningCurve === 'moderate' ||
						['java', 'csharp', 'typescript', 'kotlin', 'swift', 'dart', 'php', 'elixir'].includes(
							l.id
						)
				)
				.map((l) => l.id)
		},
		{
			id: 'learn_complex',
			text: 'I enjoy mastering complex languages',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.learningCurve === 'steep' ||
						[
							'cpp',
							'rust',
							'haskell',
							'scala',
							'clojure',
							'erlang',
							'prolog',
							'fsharp',
							'ocaml',
							'lean',
							'idris',
							'apl',
							'j',
							'agda'
						].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 5: Community and ecosystem
	addQuestionIfValid('community', 'What kind of community do you prefer?', 'ecosystem', [
		{
			id: 'comm_large',
			text: 'Large, established community with tons of resources',
			languages: candidateLanguages
				.filter((l) =>
					[
						'python',
						'javascript',
						'java',
						'cpp',
						'csharp',
						'php',
						'ruby',
						'go',
						'rust',
						'typescript',
						'swift',
						'kotlin'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_specialized',
			text: 'Specialized community focused on specific domains',
			languages: candidateLanguages
				.filter((l) =>
					[
						'r',
						'matlab',
						'julia',
						'haskell',
						'erlang',
						'elixir',
						'clojure',
						'fortran',
						'cobol',
						'lisp',
						'prolog',
						'apl'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_growing',
			text: 'Growing, innovative community',
			languages: candidateLanguages
				.filter((l) =>
					[
						'rust',
						'zig',
						'nim',
						'crystal',
						'elixir',
						'purescript',
						'reasonml',
						'dart',
						'julia',
						'carbon',
						'vale',
						'odin',
						'pony'
					].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 6: Type system preference
	addQuestionIfValid('types', 'How do you prefer to handle types in your code?', 'style', [
		{
			id: 'types_static',
			text: 'Strong static typing - catch errors at compile time',
			languages: candidateLanguages
				.filter((l) =>
					[
						'rust',
						'haskell',
						'typescript',
						'java',
						'csharp',
						'cpp',
						'swift',
						'kotlin',
						'scala',
						'fsharp',
						'ocaml',
						'go',
						'ada'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'types_dynamic',
			text: 'Dynamic typing - flexibility and rapid development',
			languages: candidateLanguages
				.filter((l) =>
					[
						'python',
						'javascript',
						'ruby',
						'php',
						'perl',
						'lua',
						'clojure',
						'lisp',
						'scheme',
						'erlang',
						'elixir',
						'smalltalk'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'types_optional',
			text: 'Optional/gradual typing - best of both worlds',
			languages: candidateLanguages
				.filter((l) => ['typescript', 'python', 'dart', 'crystal', 'nim', 'raku'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 7: Platform preference
	addQuestionIfValid('platform', 'Which platform is most important to you?', 'ecosystem', [
		{
			id: 'plat_web',
			text: 'Web browsers',
			languages: candidateLanguages
				.filter((l) =>
					['javascript', 'typescript', 'elm', 'purescript', 'reasonml', 'dart', 'wasm'].includes(
						l.id
					)
				)
				.map((l) => l.id)
		},
		{
			id: 'plat_server',
			text: 'Servers and cloud',
			languages: candidateLanguages
				.filter((l) =>
					[
						'python',
						'java',
						'go',
						'rust',
						'javascript',
						'ruby',
						'csharp',
						'php',
						'elixir',
						'erlang',
						'scala',
						'kotlin',
						'apex'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'plat_mobile',
			text: 'Mobile devices',
			languages: candidateLanguages
				.filter((l) => ['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'plat_desktop',
			text: 'Desktop applications',
			languages: candidateLanguages
				.filter((l) =>
					[
						'cpp',
						'csharp',
						'java',
						'python',
						'rust',
						'go',
						'swift',
						'delphi',
						'visualbasic',
						'purebasic'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'plat_embedded',
			text: 'Embedded and IoT devices',
			languages: candidateLanguages
				.filter((l) => ['c', 'cpp', 'rust', 'ada', 'forth', 'micropython'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Specialized domain questions - these are more generic now

	// Question 8: Specialized computing needs
	addQuestionIfValid('specialized', 'Do you have specialized computing needs?', 'domain', [
		{
			id: 'spec_gpu',
			text: 'GPU and parallel computing',
			languages: candidateLanguages
				.filter((l) => ['cuda', 'opencl', 'glsl', 'hlsl', 'julia', 'chapel'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_quantum',
			text: 'Quantum computing',
			languages: candidateLanguages
				.filter((l) => ['qsharp', 'qiskit', 'cirq'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_hardware',
			text: 'Hardware design and verification',
			languages: candidateLanguages
				.filter((l) => ['vhdl', 'verilog', 'systemverilog', 'chisel'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_symbolic',
			text: 'Symbolic computation and AI',
			languages: candidateLanguages
				.filter((l) => ['lisp', 'prolog', 'scheme', 'racket', 'commonlisp'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_none',
			text: 'No specialized needs',
			languages: candidateLanguages
				.filter((l) =>
					['python', 'javascript', 'java', 'cpp', 'go', 'rust', 'csharp'].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 9: Mathematical and array programming style
	addQuestionIfValid(
		'mathematical',
		'How do you prefer to work with mathematical concepts?',
		'style',
		[
			{
				id: 'math_symbolic',
				text: 'Symbolic notation and concise operators',
				languages: candidateLanguages
					.filter((l) => ['apl', 'j', 'k', 'mathematica'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'math_traditional',
				text: 'Traditional mathematical syntax',
				languages: candidateLanguages
					.filter((l) => ['matlab', 'julia', 'r', 'fortran', 'octave'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'math_libraries',
				text: 'Through libraries in general-purpose languages',
				languages: candidateLanguages
					.filter((l) => ['python', 'cpp', 'java', 'csharp', 'javascript'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 10: Legacy and specialized platforms
	addQuestionIfValid('legacy', 'Do you work with legacy or specialized platforms?', 'ecosystem', [
		{
			id: 'legacy_salesforce',
			text: 'Salesforce platform and CRM',
			languages: candidateLanguages.filter((l) => ['apex'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'legacy_mainframe',
			text: 'Mainframe and enterprise systems',
			languages: candidateLanguages
				.filter((l) => ['cobol', 'pl1', 'rexx', 'jcl', 'rpg'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_windows',
			text: 'Windows automation and scripting',
			languages: candidateLanguages
				.filter((l) => ['powershell', 'visualbasic', 'batch', 'autohotkey'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_apple',
			text: 'Apple ecosystem (pre-modern)',
			languages: candidateLanguages
				.filter((l) => ['objectivec', 'applescript'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_web',
			text: 'Legacy web technologies',
			languages: candidateLanguages
				.filter((l) => ['actionscript', 'coffeescript', 'vbscript'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_none',
			text: 'Modern platforms only',
			languages: candidateLanguages
				.filter((l) => ['rust', 'go', 'typescript', 'swift', 'kotlin', 'dart'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 11: Development philosophy
	addQuestionIfValid('philosophy', 'What development philosophy resonates with you?', 'style', [
		{
			id: 'phil_simple',
			text: 'Simplicity and minimalism',
			languages: candidateLanguages
				.filter((l) => ['go', 'c', 'lua', 'scheme', 'forth', 'zig'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'phil_expressive',
			text: 'Expressiveness and developer happiness',
			languages: candidateLanguages
				.filter((l) => ['ruby', 'python', 'elixir', 'crystal', 'nim', 'janet'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'phil_safety',
			text: 'Safety and correctness',
			languages: candidateLanguages
				.filter((l) => ['rust', 'ada', 'haskell', 'idris', 'agda', 'lean'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'phil_pragmatic',
			text: 'Pragmatic and practical',
			languages: candidateLanguages
				.filter((l) =>
					['java', 'csharp', 'typescript', 'kotlin', 'swift', 'dart', 'apex'].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 12: Actor model and concurrency
	addQuestionIfValid('concurrency', 'How do you prefer to handle concurrency?', 'style', [
		{
			id: 'conc_actor',
			text: 'Actor model and message passing',
			languages: candidateLanguages
				.filter((l) => ['erlang', 'elixir', 'pony', 'akka'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'conc_async',
			text: 'Async/await and promises',
			languages: candidateLanguages
				.filter((l) =>
					['javascript', 'typescript', 'python', 'csharp', 'rust', 'swift', 'dart'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'conc_channels',
			text: 'Channels and goroutines',
			languages: candidateLanguages
				.filter((l) => ['go', 'rust', 'clojure', 'crystal'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'conc_threads',
			text: 'Traditional threads and locks',
			languages: candidateLanguages
				.filter((l) => ['java', 'cpp', 'c', 'csharp'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 13: Configuration and infrastructure
	addQuestionIfValid('config', 'Do you work with configuration and infrastructure?', 'domain', [
		{
			id: 'config_yes',
			text: 'Yes, configuration as code',
			languages: candidateLanguages
				.filter((l) => ['dhall', 'nix', 'jsonnet', 'cue'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'config_scripting',
			text: 'Yes, through scripting',
			languages: candidateLanguages
				.filter((l) => ['python', 'bash', 'powershell', 'perl', 'ruby'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'config_no',
			text: 'No, application development only',
			languages: candidateLanguages
				.filter((l) => !['dhall', 'nix', 'jsonnet', 'cue'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 14: Teaching and learning
	addQuestionIfValid('teaching', 'Are you teaching or learning programming?', 'ecosystem', [
		{
			id: 'teach_children',
			text: 'Teaching children or absolute beginners',
			languages: candidateLanguages
				.filter((l) => ['scratch', 'logo', 'alice', 'blockly'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'teach_students',
			text: 'Teaching computer science students',
			languages: candidateLanguages
				.filter((l) => ['python', 'java', 'scheme', 'racket', 'c', 'haskell'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'teach_no',
			text: 'Professional development',
			languages: candidateLanguages.map((l) => l.id)
		}
	]);

	// Question 15: Live development environment preference
	addQuestionIfValid(
		'environment',
		'What type of programming environment appeals to you most?',
		'ecosystem',
		[
			{
				id: 'env_live',
				text: 'Live coding with immediate feedback',
				languages: candidateLanguages
					.filter((l) => ['smalltalk', 'lisp', 'clojure', 'swift', 'jupyter'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_compiled',
				text: 'Traditional compile-run cycle',
				languages: candidateLanguages
					.filter((l) => ['c', 'cpp', 'rust', 'go', 'java', 'csharp'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_interpreted',
				text: 'Interactive REPL and scripting',
				languages: candidateLanguages
					.filter((l) => ['python', 'ruby', 'javascript', 'lua', 'perl'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_visual',
				text: 'Visual or block-based programming',
				languages: candidateLanguages
					.filter((l) => ['scratch', 'labview', 'alice', 'blockly'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	return questions;
}
