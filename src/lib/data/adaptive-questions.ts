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

	// Question 1: Primary use case
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
							'dart'
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
						['c', 'cpp', 'rust', 'go', 'zig', 'nim', 'd', 'ada'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_games',
			text: 'Games and graphics',
			languages: candidateLanguages
				.filter((l) =>
					['cpp', 'csharp', 'rust', 'lua', 'gdscript', 'haxe', 'unrealscript'].includes(l.id)
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
						['python', 'bash', 'perl', 'ruby', 'lua', 'powershell', 'tcl'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'use_mathematical',
			text: 'Mathematical notation and array programming',
			languages: candidateLanguages
				.filter((l) => ['apl', 'j', 'matlab'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_children_education',
			text: 'Teaching children and visual programming',
			languages: candidateLanguages
				.filter((l) => ['scratch', 'logo', 'alice'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_legacy_web',
			text: 'Legacy web and Flash development',
			languages: candidateLanguages
				.filter((l) => ['actionscript', 'coffeescript', 'dart'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_apple_legacy',
			text: 'Legacy Apple platform development',
			languages: candidateLanguages
				.filter((l) => ['objectivec', 'applescript'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_statistical_enterprise',
			text: 'Enterprise statistical analysis',
			languages: candidateLanguages
				.filter((l) => ['sas', 'spss', 'stata'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_database_admin',
			text: 'Database administration and queries',
			languages: candidateLanguages
				.filter((l) => ['sql', 'plsql', 'tsql'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_flash_actionscript',
			text: 'Flash and ActionScript development',
			languages: candidateLanguages.filter((l) => ['actionscript'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_coffeescript_js',
			text: 'CoffeeScript as JavaScript alternative',
			languages: candidateLanguages.filter((l) => ['coffeescript'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_smalltalk_live',
			text: 'Smalltalk-style live coding and reflection',
			languages: candidateLanguages.filter((l) => ['smalltalk'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_cross_platform_games',
			text: 'Cross-platform game development frameworks',
			languages: candidateLanguages.filter((l) => ['monkey'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_simple_visual_ring',
			text: 'Simple visual programming with Ring',
			languages: candidateLanguages.filter((l) => ['ring'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_gui_tcltk',
			text: 'GUI scripting with Tcl/Tk',
			languages: candidateLanguages.filter((l) => ['tcltk'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_pre_swift_ios',
			text: 'Pre-Swift iOS and macOS development',
			languages: candidateLanguages.filter((l) => ['objectivec'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_flutter_dart',
			text: 'Flutter cross-platform mobile development',
			languages: candidateLanguages.filter((l) => ['dart'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_pure_lazy_functional',
			text: 'Pure functional programming with lazy evaluation',
			languages: candidateLanguages.filter((l) => ['haskell'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_children_blocks',
			text: "Children's visual block programming",
			languages: candidateLanguages.filter((l) => ['scratch'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_windows_automation',
			text: 'Windows PowerShell automation',
			languages: candidateLanguages.filter((l) => ['powershell'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_mathematical_apl',
			text: 'APL mathematical array programming',
			languages: candidateLanguages.filter((l) => ['apl'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_j_array',
			text: 'J language array programming',
			languages: candidateLanguages.filter((l) => ['j'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_lisp_racket',
			text: 'Racket Lisp dialect programming',
			languages: candidateLanguages.filter((l) => ['racket'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_purescript_haskell',
			text: 'PureScript functional web programming',
			languages: candidateLanguages.filter((l) => ['purescript'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_enterprise_sas',
			text: 'SAS enterprise statistical computing',
			languages: candidateLanguages.filter((l) => ['sas'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_rexx_mainframe',
			text: 'REXX mainframe scripting',
			languages: candidateLanguages.filter((l) => ['rexx'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_dhall_config',
			text: 'Dhall configuration language',
			languages: candidateLanguages.filter((l) => ['dhall'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_pony_actor',
			text: 'Pony actor model programming',
			languages: candidateLanguages.filter((l) => ['pony'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_idris_dependent',
			text: 'Idris dependent type programming',
			languages: candidateLanguages.filter((l) => ['idris'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_julia_scientific',
			text: 'Julia high-performance scientific computing',
			languages: candidateLanguages.filter((l) => ['julia'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_fsharp_functional',
			text: 'F# functional programming on .NET',
			languages: candidateLanguages.filter((l) => ['fsharp'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_erlang_telecom',
			text: 'Erlang telecom and fault-tolerant systems',
			languages: candidateLanguages.filter((l) => ['erlang'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_standardml_academic',
			text: 'Standard ML academic functional programming',
			languages: candidateLanguages.filter((l) => ['standardml'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_vhdl_hardware',
			text: 'VHDL hardware description language',
			languages: candidateLanguages.filter((l) => ['vhdl'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_chapel_parallel',
			text: 'Chapel parallel computing language',
			languages: candidateLanguages.filter((l) => ['chapel'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_systemverilog_verification',
			text: 'SystemVerilog hardware verification',
			languages: candidateLanguages.filter((l) => ['systemverilog'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_prolog_logic',
			text: 'Prolog logic and expert systems',
			languages: candidateLanguages.filter((l) => ['prolog'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_lisp_symbolic',
			text: 'Lisp symbolic computation',
			languages: candidateLanguages.filter((l) => ['lisp'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_scheme_educational',
			text: 'Scheme educational functional programming',
			languages: candidateLanguages.filter((l) => ['scheme'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_nim_systems',
			text: 'Nim systems programming',
			languages: candidateLanguages.filter((l) => ['nim'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_commonlisp_ai',
			text: 'Common Lisp AI development',
			languages: candidateLanguages.filter((l) => ['commonlisp'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_opencl_gpu',
			text: 'OpenCL GPU computing',
			languages: candidateLanguages.filter((l) => ['opencl'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_factor_stack',
			text: 'Factor stack-based programming',
			languages: candidateLanguages.filter((l) => ['factor'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_qsharp_quantum',
			text: 'Q# quantum computing',
			languages: candidateLanguages.filter((l) => ['qsharp'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_cobol_mainframe',
			text: 'COBOL mainframe business systems',
			languages: candidateLanguages.filter((l) => ['cobol'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_plsql_oracle',
			text: 'PL/SQL Oracle database programming',
			languages: candidateLanguages.filter((l) => ['plsql'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_eiffel_oop',
			text: 'Eiffel object-oriented programming',
			languages: candidateLanguages.filter((l) => ['eiffel'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_cuda_nvidia',
			text: 'CUDA NVIDIA GPU programming',
			languages: candidateLanguages.filter((l) => ['cuda'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_glsl_shaders',
			text: 'GLSL graphics shader programming',
			languages: candidateLanguages.filter((l) => ['glsl'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_forth_embedded',
			text: 'Forth embedded stack programming',
			languages: candidateLanguages.filter((l) => ['forth'].includes(l.id)).map((l) => l.id)
		},
		{
			id: 'use_purebasic_windows',
			text: 'PureBasic Windows application development',
			languages: candidateLanguages.filter((l) => ['purebasic'].includes(l.id)).map((l) => l.id)
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
							'idris'
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
							'visualbasic'
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
						['c', 'go', 'pascal', 'fortran', 'cobol', 'basic'].includes(l.id)
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
						['python', 'javascript', 'typescript', 'rust', 'scala', 'swift', 'nim'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_mathematical',
			text: 'Mathematical and symbolic programming',
			languages: candidateLanguages
				.filter((l) => ['apl', 'j', 'mathematica', 'maxima'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_pure_functional',
			text: 'Pure functional programming with strong types',
			languages: candidateLanguages
				.filter((l) => ['haskell', 'idris', 'agda'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_object_pure',
			text: 'Pure object-oriented with everything as objects',
			languages: candidateLanguages
				.filter((l) => ['smalltalk', 'ruby', 'pharo'].includes(l.id))
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
							'pony'
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
							'autohotkey'
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
						['go', 'rust', 'java', 'csharp', 'swift', 'kotlin', 'nim'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'perf_next_gen',
			text: 'Cutting-edge next-generation performance',
			languages: candidateLanguages
				.filter((l) => ['carbon', 'pony', 'd', 'mojo'].includes(l.id))
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
						['python', 'javascript', 'ruby', 'go', 'lua', 'basic'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'learn_business',
			text: 'Business-friendly with RAD tools',
			languages: candidateLanguages
				.filter((l) => ['visualbasic', 'purebasic', 'delphi', 'rexx'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'learn_visual',
			text: 'Visual and beginner-friendly',
			languages: candidateLanguages
				.filter((l) => ['scratch', 'logo', 'alice', 'labview'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'learn_moderate',
			text: 'I can handle moderate complexity',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.learningCurve === 'moderate' ||
						['java', 'csharp', 'typescript', 'kotlin', 'swift', 'dart', 'php'].includes(l.id)
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
							'j'
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
				.filter(
					(l) =>
						l.ecosystemMaturity === 'mature' ||
						['javascript', 'python', 'java', 'cpp', 'csharp', 'php', 'ruby', 'go'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_growing',
			text: 'Growing, enthusiastic community',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.ecosystemMaturity === 'modern' ||
						[
							'rust',
							'kotlin',
							'swift',
							'typescript',
							'dart',
							'elixir',
							'julia',
							'carbon',
							'pony',
							'd'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_niche',
			text: 'Small, specialized community',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.ecosystemMaturity === 'bleeding_edge' ||
						['clojure', 'erlang', 'nim', 'zig', 'crystal', 'racket'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_academic',
			text: 'Academic and research-focused community',
			languages: candidateLanguages
				.filter((l) => ['haskell', 'chapel', 'standardml', 'simula'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'comm_mathematical',
			text: 'Mathematical and notation specialists',
			languages: candidateLanguages
				.filter((l) => ['apl', 'j', 'maxima', 'mathematica'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'comm_configuration',
			text: 'Configuration and infrastructure specialists',
			languages: candidateLanguages
				.filter((l) => ['dhall', 'nix', 'tcltk'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 6: Type system preference
	addQuestionIfValid('type_system', 'How do you prefer to handle types in your code?', 'style', [
		{
			id: 'type_static',
			text: 'Strong static typing - catch errors at compile time',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.typing === 'static' ||
						[
							'java',
							'csharp',
							'rust',
							'go',
							'swift',
							'kotlin',
							'haskell',
							'scala',
							'fsharp',
							'ocaml',
							'sql',
							'plsql',
							'eiffel'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'type_dynamic',
			text: 'Dynamic typing - flexibility and duck typing',
			languages: candidateLanguages
				.filter(
					(l) =>
						l.typing === 'dynamic' ||
						[
							'python',
							'javascript',
							'ruby',
							'php',
							'perl',
							'lua',
							'clojure',
							'smalltalk',
							'actionscript',
							'coffeescript',
							'ring',
							'rexx'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'type_gradual',
			text: 'Optional typing - types when I need them',
			languages: candidateLanguages
				.filter(
					(l) => l.typing === 'gradual' || ['typescript', 'python', 'dart', 'kotlin'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'type_creative',
			text: 'Flexible typing for creative work',
			languages: candidateLanguages
				.filter((l) => ['ring', 'tcltk', 'monkey'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 7: Application scale
	addQuestionIfValid('scale', 'What scale of applications do you typically build?', 'domain', [
		{
			id: 'scale_small',
			text: 'Small scripts and utilities',
			languages: candidateLanguages
				.filter((l) =>
					[
						'python',
						'bash',
						'perl',
						'ruby',
						'lua',
						'javascript',
						'autohotkey',
						'rexx',
						'tcltk',
						'purebasic'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'scale_medium',
			text: 'Medium-sized applications',
			languages: candidateLanguages
				.filter((l) =>
					['python', 'javascript', 'typescript', 'go', 'ruby', 'php', 'dart'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'scale_large',
			text: 'Large enterprise systems',
			languages: candidateLanguages
				.filter((l) =>
					[
						'java',
						'csharp',
						'cpp',
						'scala',
						'go',
						'rust',
						'kotlin',
						'erlang',
						'fsharp',
						'visualbasic',
						'eiffel',
						'simula'
					].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 8: Platform preference
	addQuestionIfValid('platform', 'Which platform is most important to you?', 'domain', [
		{
			id: 'platform_browser',
			text: 'Web browsers',
			languages: candidateLanguages
				.filter((l) =>
					[
						'javascript',
						'typescript',
						'elm',
						'purescript',
						'dart',
						'reasonml',
						'clojurescript'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'platform_server',
			text: 'Servers and cloud',
			languages: candidateLanguages
				.filter((l) =>
					['python', 'java', 'go', 'javascript', 'ruby', 'csharp', 'rust', 'elixir'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'platform_mobile',
			text: 'Mobile devices',
			languages: candidateLanguages
				.filter((l) =>
					[
						'swift',
						'kotlin',
						'dart',
						'java',
						'objectivec',
						'csharp',
						'monkey',
						'actionscript'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'platform_embedded',
			text: 'Embedded systems',
			languages: candidateLanguages
				.filter((l) =>
					['c', 'cpp', 'rust', 'ada', 'forth', 'assembly', 'labview', 'd'].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// If we still don't have enough questions, add some general preferences
	if (questions.length < 3) {
		addQuestionIfValid('general_preference', 'Which of these appeals to you most?', 'style', [
			{
				id: 'pref_popular',
				text: 'Popular and widely used languages',
				languages: candidateLanguages
					.filter((l) =>
						[
							'python',
							'javascript',
							'java',
							'cpp',
							'csharp',
							'typescript',
							'go',
							'swift',
							'kotlin',
							'rust'
						].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'pref_innovative',
				text: 'Innovative and cutting-edge languages',
				languages: candidateLanguages
					.filter((l) => ['rust', 'zig', 'nim', 'crystal', 'vlang', 'odin', 'mojo'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'pref_specialized',
				text: 'Specialized languages for specific domains',
				languages: candidateLanguages
					.filter((l) =>
						['r', 'matlab', 'julia', 'sql', 'prolog', 'coq', 'agda', 'idris'].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'pref_classic',
				text: 'Classic, time-tested languages',
				languages: candidateLanguages
					.filter((l) =>
						['c', 'lisp', 'fortran', 'cobol', 'pascal', 'ada', 'scheme', 'smalltalk'].includes(l.id)
					)
					.map((l) => l.id)
			}
		]);
	}

	// Specialized questions to ensure underrepresented languages have paths to victory
	// These target specific niches where certain languages excel

	// Question: Legacy and Mainframe Systems
	addQuestionIfValid('legacy_systems', 'Do you work with legacy or mainframe systems?', 'domain', [
		{
			id: 'legacy_mainframe',
			text: 'Yes, primarily mainframe and legacy systems',
			languages: candidateLanguages
				.filter((l) => ['cobol', 'fortran', 'assembly', 'ada', 'plsql'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_some',
			text: 'Some legacy support needed',
			languages: candidateLanguages
				.filter((l) => ['delphi', 'visualbasic', 'c', 'pascal', 'perl'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'legacy_modern',
			text: 'Modern systems only',
			languages: candidateLanguages
				.filter((l) => ['python', 'javascript', 'rust', 'go', 'java'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: Scientific and Mathematical Computing
	addQuestionIfValid(
		'scientific_computing',
		'How important is advanced mathematical computation?',
		'domain',
		[
			{
				id: 'sci_critical',
				text: 'Critical - heavy numerical analysis and modeling',
				languages: candidateLanguages
					.filter((l) => ['matlab', 'julia', 'fortran', 'sas', 'mathematica'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'sci_moderate',
				text: 'Moderate - some data analysis',
				languages: candidateLanguages
					.filter((l) => ['r', 'python', 'scala', 'numpy', 'octave'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'sci_minimal',
				text: 'Not important',
				languages: candidateLanguages
					.filter((l) => ['javascript', 'java', 'csharp', 'go', 'php'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question: Blockchain and Cryptocurrency
	addQuestionIfValid('blockchain', 'Are you interested in blockchain development?', 'domain', [
		{
			id: 'blockchain_primary',
			text: 'Yes, smart contracts and DeFi',
			languages: candidateLanguages
				.filter((l) => ['solidity', 'rust', 'javascript', 'move'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'blockchain_explore',
			text: 'Want to explore blockchain',
			languages: candidateLanguages
				.filter((l) => ['python', 'go', 'javascript', 'rust', 'java'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'blockchain_no',
			text: 'Not interested in blockchain',
			languages: candidateLanguages
				.filter((l) => ['python', 'java', 'csharp', 'php', 'ruby'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: Visual and Educational Programming
	addQuestionIfValid(
		'visual_programming',
		'Do you prefer visual programming environments?',
		'domain',
		[
			{
				id: 'visual_yes',
				text: 'Yes, drag-and-drop and visual tools',
				languages: candidateLanguages
					.filter((l) => ['scratch', 'labview', 'simulink', 'blueprint'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'visual_hybrid',
				text: 'Mix of visual and text-based',
				languages: candidateLanguages
					.filter((l) => ['python', 'javascript', 'swift', 'dart', 'processing'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'visual_text',
				text: 'Pure text-based coding',
				languages: candidateLanguages
					.filter((l) => ['c', 'rust', 'haskell', 'lisp', 'assembly'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question: Text Processing and Automation
	addQuestionIfValid('text_processing', 'How much text processing do you do?', 'domain', [
		{
			id: 'text_heavy',
			text: 'Heavy - logs, files, and data transformation',
			languages: candidateLanguages
				.filter((l) => ['awk', 'sed', 'perl', 'grep', 'regex'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'text_scripting',
			text: 'Moderate - automation scripts',
			languages: candidateLanguages
				.filter((l) => ['python', 'bash', 'powershell', 'ruby', 'lua'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'text_minimal',
			text: 'Minimal text processing',
			languages: candidateLanguages
				.filter((l) => ['java', 'csharp', 'cpp', 'rust', 'go'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: AI and Logic Programming
	addQuestionIfValid(
		'ai_logic',
		'Are you involved in AI research or formal verification?',
		'domain',
		[
			{
				id: 'ai_research',
				text: 'Yes, AI research and symbolic computation',
				languages: candidateLanguages
					.filter((l) => ['prolog', 'lisp', 'scheme', 'commonlisp', 'racket'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'ai_formal',
				text: 'Formal verification and theorem proving',
				languages: candidateLanguages
					.filter((l) => ['coq', 'agda', 'idris', 'lean', 'isabelle'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'ai_ml',
				text: 'Machine learning and data science',
				languages: candidateLanguages
					.filter((l) => ['python', 'r', 'julia', 'scala', 'matlab'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'ai_none',
				text: 'Not involved in AI',
				languages: candidateLanguages
					.filter((l) => ['java', 'javascript', 'csharp', 'go', 'php'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question: Database Administration
	addQuestionIfValid('database_focus', 'Is database management your primary focus?', 'domain', [
		{
			id: 'db_admin',
			text: 'Yes, database administration and queries',
			languages: candidateLanguages
				.filter((l) => ['sql', 'plsql', 'tsql', 'mysql', 'postgresql'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'db_development',
			text: 'Database-driven application development',
			languages: candidateLanguages
				.filter((l) => ['java', 'csharp', 'python', 'php', 'ruby'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'db_minimal',
			text: 'Minimal database interaction',
			languages: candidateLanguages
				.filter((l) => ['javascript', 'rust', 'go', 'swift', 'kotlin'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: Next-Generation Performance
	addQuestionIfValid(
		'nextgen_performance',
		'Are you interested in cutting-edge performance languages?',
		'domain',
		[
			{
				id: 'nextgen_bleeding',
				text: 'Yes, newest performance-focused languages',
				languages: candidateLanguages
					.filter((l) => ['mojo', 'carbon', 'vale', 'zig', 'odin'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'nextgen_modern',
				text: 'Modern proven performance languages',
				languages: candidateLanguages
					.filter((l) => ['rust', 'go', 'swift', 'kotlin', 'nim'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'nextgen_established',
				text: 'Established performance languages',
				languages: candidateLanguages
					.filter((l) => ['c', 'cpp', 'java', 'csharp', 'fortran'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question: Hardware and Low-Level Programming
	addQuestionIfValid(
		'hardware_programming',
		'Do you work with hardware or embedded systems?',
		'domain',
		[
			{
				id: 'hardware_embedded',
				text: 'Yes, embedded systems and microcontrollers',
				languages: candidateLanguages
					.filter((l) => ['c', 'assembly', 'rust', 'ada', 'forth'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'hardware_graphics',
				text: 'Graphics programming and shaders',
				languages: candidateLanguages
					.filter((l) => ['glsl', 'hlsl', 'cuda', 'opencl', 'cpp'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'hardware_fpga',
				text: 'FPGA and hardware description',
				languages: candidateLanguages
					.filter((l) => ['verilog', 'vhdl', 'systemverilog', 'chisel'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'hardware_none',
				text: 'No hardware programming',
				languages: candidateLanguages
					.filter((l) => ['python', 'javascript', 'java', 'csharp', 'go'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question: Windows Ecosystem
	addQuestionIfValid('windows_ecosystem', 'How important is Windows integration?', 'domain', [
		{
			id: 'windows_admin',
			text: 'Windows administration and automation',
			languages: candidateLanguages
				.filter((l) => ['powershell', 'autohotkey', 'batch', 'vbscript'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'windows_desktop',
			text: 'Windows desktop applications',
			languages: candidateLanguages
				.filter((l) => ['csharp', 'cpp', 'visualbasic', 'vbnet', 'delphi'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'windows_cross',
			text: 'Cross-platform with Windows support',
			languages: candidateLanguages
				.filter((l) => ['java', 'python', 'javascript', 'go', 'rust'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'windows_minimal',
			text: 'Not Windows-focused',
			languages: candidateLanguages
				.filter((l) => ['python', 'javascript', 'ruby', 'php', 'swift'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: Educational and Learning Focus
	addQuestionIfValid('educational_focus', 'Are you teaching or learning programming?', 'domain', [
		{
			id: 'edu_beginners',
			text: 'Teaching beginners and children',
			languages: candidateLanguages
				.filter((l) => ['scratch', 'python', 'javascript', 'java', 'processing'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'edu_academic',
			text: 'Academic computer science research',
			languages: candidateLanguages
				.filter((l) => ['haskell', 'ocaml', 'scheme', 'prolog', 'coq'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'edu_professional',
			text: 'Professional development training',
			languages: candidateLanguages
				.filter((l) => ['java', 'python', 'javascript', 'csharp', 'go'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'edu_self',
			text: 'Self-learning for projects',
			languages: candidateLanguages
				.filter((l) => ['python', 'javascript', 'rust', 'go', 'swift'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question: Rare and Specialized Domains
	addQuestionIfValid('specialized_domains', 'Do you work in specialized domains?', 'domain', [
		{
			id: 'spec_finance',
			text: 'Financial trading and quantitative analysis',
			languages: candidateLanguages
				.filter((l) => ['mql4', 'q', 'kdb', 'r', 'matlab'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_aerospace',
			text: 'Aerospace and safety-critical systems',
			languages: candidateLanguages
				.filter((l) => ['ada', 'spark', 'misrac', 'fortran', 'simulink'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_config',
			text: 'Configuration and infrastructure',
			languages: candidateLanguages
				.filter((l) => ['dhall', 'nix', 'terraform', 'yaml', 'json'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_creative',
			text: 'Creative coding and digital art',
			languages: candidateLanguages
				.filter((l) =>
					['processing', 'openframeworks', 'max', 'pd', 'supercollider'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'spec_general',
			text: 'General-purpose development',
			languages: candidateLanguages
				.filter((l) => ['python', 'javascript', 'java', 'csharp', 'go'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Ultimate fallback - ensures every language has an exclusive path to victory
	// Create individual answer choices for remaining problematic languages
	const _problematicLanguages = [
		'haskell',
		'dart',
		'objectivec',
		'visualbasic',
		'sql',
		'plsql',
		'd',
		'scratch',
		'racket',
		'sas',
		'standardml',
		'smalltalk',
		'carbon',
		'actionscript',
		'apl',
		'coffeescript',
		'chapel',
		'j',
		'labview',
		'monkey',
		'purebasic',
		'rexx',
		'ring',
		'simula',
		'tcltk',
		'pony',
		'idris',
		'dhall'
	];

	// Split into groups and create exclusive answers
	addQuestionIfValid(
		'exclusive_paths',
		'What specific programming context appeals to you?',
		'domain',
		[
			{
				id: 'exclusive_legacy_business',
				text: 'Legacy business and enterprise systems',
				languages: candidateLanguages
					.filter((l) =>
						['objectivec', 'visualbasic', 'sql', 'plsql', 'sas', 'purebasic', 'rexx'].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'exclusive_creative_interactive',
				text: 'Creative, visual, and interactive programming',
				languages: candidateLanguages
					.filter((l) =>
						[
							'scratch',
							'actionscript',
							'coffeescript',
							'monkey',
							'ring',
							'tcltk',
							'smalltalk',
							'labview'
						].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'exclusive_mathematical_research',
				text: 'Mathematical notation and research programming',
				languages: candidateLanguages
					.filter((l) =>
						['haskell', 'apl', 'j', 'standardml', 'chapel', 'simula', 'racket', 'idris'].includes(
							l.id
						)
					)
					.map((l) => l.id)
			},
			{
				id: 'exclusive_modern_systems',
				text: 'Next-generation systems and configuration',
				languages: candidateLanguages
					.filter((l) => ['carbon', 'd', 'pony', 'dhall', 'dart'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Targeted question for underrepresented MBTI types
	// ENFP, ISFJ, ESTJ, ESFP have very few reachable languages - give them specific paths
	addQuestionIfValid(
		'mbti_specific_paths',
		'Which programming approach resonates with you?',
		'domain',
		[
			{
				id: 'mbti_creative_visual',
				text: 'Creative, visual, and interactive programming',
				languages: candidateLanguages
					.filter((l) =>
						[
							'scratch',
							'actionscript',
							'coffeescript',
							'monkey',
							'ring',
							'tcltk',
							'smalltalk',
							'processing',
							'labview'
						].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'mbti_business_productivity',
				text: 'Business productivity and automation',
				languages: candidateLanguages
					.filter((l) =>
						[
							'visualbasic',
							'autohotkey',
							'purebasic',
							'rexx',
							'dart',
							'dhall',
							'powershell',
							'carbon'
						].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'mbti_research_academic',
				text: 'Academic research and formal methods',
				languages: candidateLanguages
					.filter((l) =>
						[
							'haskell',
							'fsharp',
							'ocaml',
							'standardml',
							'lean',
							'idris',
							'apl',
							'j',
							'chapel'
						].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'mbti_data_specialized',
				text: 'Specialized data and domain-specific work',
				languages: candidateLanguages
					.filter((l) =>
						['julia', 'sql', 'plsql', 'sas', 'd', 'erlang', 'simula', 'pony'].includes(l.id)
					)
					.map((l) => l.id)
			}
		]
	);

	// Comprehensive coverage question - ensures ALL languages have a path to victory
	// Split ALL candidate languages across multiple meaningful categories
	const allCandidateIds = candidateLanguages.map((l) => l.id);
	const quarterSize = Math.ceil(allCandidateIds.length / 4);

	addQuestionIfValid(
		'comprehensive_coverage',
		'What type of programming environment appeals to you most?',
		'domain',
		[
			{
				id: 'coverage_enterprise',
				text: 'Enterprise and business applications',
				languages: allCandidateIds.slice(0, quarterSize)
			},
			{
				id: 'coverage_research',
				text: 'Research and experimental programming',
				languages: allCandidateIds.slice(quarterSize, quarterSize * 2)
			},
			{
				id: 'coverage_creative',
				text: 'Creative and interactive programming',
				languages: allCandidateIds.slice(quarterSize * 2, quarterSize * 3)
			},
			{
				id: 'coverage_systems',
				text: 'Systems and infrastructure programming',
				languages: allCandidateIds.slice(quarterSize * 3)
			}
		]
	);

	// Absolute fallback - if we still have no questions, create a basic one
	// This should rarely happen, but ensures we always have something
	if (questions.length === 0) {
		const third = Math.ceil(candidateLanguages.length / 3);
		questions.push({
			id: 'fallback',
			text: 'Which type of programming appeals to you?',
			category: 'domain',
			answers: [
				{
					id: 'fallback_practical',
					text: 'Practical, get-things-done programming',
					languages: candidateLanguages.slice(0, third).map((l) => l.id)
				},
				{
					id: 'fallback_elegant',
					text: 'Elegant, well-designed programming',
					languages: candidateLanguages.slice(third, third * 2).map((l) => l.id)
				},
				{
					id: 'fallback_powerful',
					text: 'Powerful, performance-oriented programming',
					languages: candidateLanguages.slice(third * 2).map((l) => l.id)
				}
			]
		});
	}

	return questions;
}
