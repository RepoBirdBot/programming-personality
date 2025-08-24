import type { LanguageQuestion, LanguageId, MBTIType, Language } from '$lib/types/quiz';
import { languages } from './languages';

// Language category constants - improved categorization
const WEB_FRONTEND_LANGUAGES: LanguageId[] = ['javascript', 'typescript', 'elm', 'purescript'];

const WEB_BACKEND_LANGUAGES: LanguageId[] = [
	'python',
	'javascript',
	'typescript',
	'ruby',
	'php',
	'go',
	'java',
	'csharp',
	'elixir',
	'rust',
	'kotlin',
	'scala'
];

const MOBILE_LANGUAGES: LanguageId[] = ['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp'];

const DATA_SCIENCE_LANGUAGES: LanguageId[] = ['python', 'r', 'julia', 'scala', 'wolfram'];

const SYSTEMS_LANGUAGES: LanguageId[] = [
	'c',
	'cpp',
	'rust',
	'go',
	'zig',
	'nim',
	'ada',
	'odin',
	'assembly'
];

const GAME_DEV_LANGUAGES: LanguageId[] = ['cpp', 'csharp', 'rust', 'lua'];

const SCRIPTING_LANGUAGES: LanguageId[] = ['python', 'perl', 'ruby', 'lua', 'powershell'];

const ENTERPRISE_LANGUAGES: LanguageId[] = ['java', 'csharp', 'delphi', 'vbnet'];

const SCIENTIFIC_COMPUTING_LANGUAGES: LanguageId[] = ['julia', 'r', 'fortran', 'python', 'wolfram'];

const EMBEDDED_LANGUAGES: LanguageId[] = ['c', 'cpp', 'rust', 'ada', 'zig', 'assembly'];

const HIGH_PERFORMANCE_LANGUAGES: LanguageId[] = [
	'c',
	'cpp',
	'rust',
	'fortran',
	'julia',
	'zig',
	'assembly'
];

const CLOUD_NATIVE_LANGUAGES: LanguageId[] = [
	'go',
	'rust',
	'javascript',
	'python',
	'java',
	'kotlin'
];

const FUNCTIONAL_LANGUAGES: LanguageId[] = [
	'haskell',
	'elm',
	'clojure',
	'fsharp',
	'ocaml',
	'erlang',
	'elixir',
	'scala',
	'purescript'
];

const OOP_LANGUAGES: LanguageId[] = [
	'java',
	'csharp',
	'cpp',
	'ruby',
	'python',
	'swift',
	'kotlin',
	'dart',
	'objectivec'
];

const PROCEDURAL_LANGUAGES: LanguageId[] = ['c', 'go', 'fortran', 'ada'];

const LOGIC_LANGUAGES: LanguageId[] = ['prolog'];

const EASY_LEARN_LANGUAGES: LanguageId[] = ['python', 'javascript', 'ruby', 'go', 'lua'];

const MODERATE_LEARN_LANGUAGES: LanguageId[] = [
	'java',
	'csharp',
	'typescript',
	'kotlin',
	'swift',
	'dart',
	'php',
	'elixir'
];

const STEEP_LEARN_LANGUAGES: LanguageId[] = [
	'cpp',
	'rust',
	'haskell',
	'scala',
	'clojure',
	'erlang',
	'prolog',
	'fsharp',
	'ocaml'
];

const STATIC_TYPE_LANGUAGES: LanguageId[] = [
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
];

const DYNAMIC_TYPE_LANGUAGES: LanguageId[] = [
	'python',
	'javascript',
	'ruby',
	'php',
	'perl',
	'lua',
	'clojure',
	'erlang',
	'elixir'
];

const OPTIONAL_TYPE_LANGUAGES: LanguageId[] = ['typescript', 'python', 'dart', 'nim'];

const MINIMAL_PHILOSOPHY_LANGUAGES: LanguageId[] = ['go', 'c', 'lua', 'zig', 'assembly'];

const EXPRESSIVE_LANGUAGES: LanguageId[] = ['ruby', 'python', 'elixir', 'nim', 'kotlin'];

const SAFETY_LANGUAGES: LanguageId[] = ['rust', 'ada', 'haskell', 'elm'];

const PRAGMATIC_LANGUAGES: LanguageId[] = [
	'java',
	'csharp',
	'typescript',
	'kotlin',
	'swift',
	'dart',
	'go'
];

const ACTOR_MODEL_LANGUAGES: LanguageId[] = ['erlang', 'elixir'];

const ASYNC_LANGUAGES: LanguageId[] = [
	'javascript',
	'typescript',
	'python',
	'csharp',
	'rust',
	'swift',
	'dart',
	'kotlin'
];

const CHANNEL_LANGUAGES: LanguageId[] = ['go', 'rust', 'clojure'];

const TRADITIONAL_THREAD_LANGUAGES: LanguageId[] = ['java', 'cpp', 'c', 'csharp'];

const COMPILED_LANGUAGES: LanguageId[] = [
	'c',
	'cpp',
	'rust',
	'go',
	'zig',
	'nim',
	'ada',
	'assembly'
];

const VM_LANGUAGES: LanguageId[] = ['java', 'csharp', 'kotlin', 'scala', 'erlang', 'elixir'];

const INTERPRETED_LANGUAGES: LanguageId[] = ['python', 'ruby', 'javascript', 'lua', 'perl', 'php'];

const MODERN_LANGUAGES: LanguageId[] = [
	'rust',
	'go',
	'typescript',
	'swift',
	'kotlin',
	'dart',
	'zig'
];

const GENERAL_PURPOSE_LANGUAGES: LanguageId[] = [
	'python',
	'javascript',
	'java',
	'cpp',
	'go',
	'rust',
	'csharp',
	'typescript'
];

// Helper function to get similar MBTI types for expansion
function getSimilarMBTITypes(mbtiType: string, maxDifference: number = 2): string[] {
	const type = mbtiType as MBTIType;
	const similar: string[] = [type];

	const letters = type.split('');
	const alternatives = {
		E: 'I',
		I: 'E',
		S: 'N',
		N: 'S',
		T: 'F',
		F: 'T',
		J: 'P',
		P: 'J'
	};

	// Add types that differ by 1 letter
	if (maxDifference >= 1) {
		for (let i = 0; i < 4; i++) {
			const newType = [...letters];
			newType[i] = alternatives[letters[i] as keyof typeof alternatives];
			similar.push(newType.join(''));
		}
	}

	// Add types that differ by 2 letters (same cognitive stack)
	if (maxDifference >= 2) {
		// Same dominant function pairs (NT, NF, ST, SF)
		const middleLetters = type.substring(1, 3);
		const allTypes = [
			'I' + middleLetters + 'J',
			'I' + middleLetters + 'P',
			'E' + middleLetters + 'J',
			'E' + middleLetters + 'P'
		];
		allTypes.forEach((t) => {
			if (!similar.includes(t)) similar.push(t);
		});
	}

	return similar;
}

// Calculate question quality score
function scoreQuestion(question: LanguageQuestion, candidateLanguages: Language[]): number {
	let score = 0;
	const candidateIds = new Set(candidateLanguages.map((l) => l.id));

	// Check how many candidate languages are covered
	const coveredLanguages = new Set(
		question.answers.flatMap((a) => a.languages.filter((l) => candidateIds.has(l)))
	);
	const coverageRatio = coveredLanguages.size / candidateIds.size;

	// Prefer questions that cover most candidates (60-90% is ideal)
	if (coverageRatio >= 0.6 && coverageRatio <= 0.9) {
		score += 30;
	} else if (coverageRatio >= 0.5) {
		score += 20;
	} else if (coverageRatio >= 0.3) {
		score += 10;
	}

	// Prefer questions with 2-4 answers (better differentiation)
	const validAnswers = question.answers.filter((a) =>
		a.languages.some((l) => candidateIds.has(l))
	).length;

	if (validAnswers === 2) score += 25;
	else if (validAnswers === 3) score += 30;
	else if (validAnswers === 4) score += 20;
	else if (validAnswers >= 5) score += 10;

	// Check answer balance (prefer equal distribution)
	const answerSizes = question.answers
		.filter((a) => a.languages.some((l) => candidateIds.has(l)))
		.map((a) => a.languages.filter((l) => candidateIds.has(l)).length);

	if (answerSizes.length > 0) {
		const avgSize = answerSizes.reduce((a, b) => a + b, 0) / answerSizes.length;
		const variance =
			answerSizes.reduce((sum, size) => sum + Math.pow(size - avgSize, 2), 0) / answerSizes.length;

		// Lower variance is better (more balanced)
		if (variance < 2) score += 20;
		else if (variance < 5) score += 10;
	}

	return score;
}

// Smart questions that adapt based on MBTI type to distinguish between similar languages
export function getAdaptiveQuestions(mbtiType: string): LanguageQuestion[] {
	// First try to get languages matching the MBTI type (primary or secondary)
	let candidateLanguages = languages.filter((lang) => lang.mbti.includes(mbtiType as MBTIType));

	// If too few matches, progressively expand
	if (candidateLanguages.length < 6) {
		// Expand to 1-letter different types
		const similar1 = getSimilarMBTITypes(mbtiType, 1);
		candidateLanguages = languages.filter((lang) =>
			lang.mbti.some((type) => type && similar1.includes(type))
		);
	}

	if (candidateLanguages.length < 6) {
		// Expand to 2-letter different types (same cognitive functions)
		const similar2 = getSimilarMBTITypes(mbtiType, 2);
		candidateLanguages = languages.filter((lang) =>
			lang.mbti.some((type) => type && similar2.includes(type))
		);
	}

	// Never fall back to ALL - maintain MBTI relevance
	// Minimum of 6 languages is enough for differentiation

	const questions: LanguageQuestion[] = [];
	const candidateIds = new Set(candidateLanguages.map((l) => l.id));

	// Helper function to add question only if it provides good differentiation
	const addQuestionIfValid = (
		id: string,
		text: string,
		category: LanguageQuestion['category'],
		potentialAnswers: Array<{ id: string; text: string; languages: LanguageId[] }>
	) => {
		// Filter answers to only include relevant languages
		const validAnswers = potentialAnswers
			.map((answer) => ({
				...answer,
				languages: answer.languages.filter((l) => candidateIds.has(l))
			}))
			.filter((answer) => answer.languages.length > 0);

		// Only add if we have 2+ valid answers AND good coverage
		if (validAnswers.length >= 2) {
			const coveredLangs = new Set(validAnswers.flatMap((a) => a.languages));
			const coverage = coveredLangs.size / candidateIds.size;

			// Only add if question covers at least 30% of candidates
			if (coverage >= 0.3) {
				questions.push({
					id,
					text,
					category,
					answers: validAnswers
				});
			}
		}
	};

	// Question 1: Primary development domain
	addQuestionIfValid(
		'primary_domain',
		'What type of software development interests you most?',
		'domain',
		[
			{
				id: 'web_frontend',
				text: 'Interactive web applications and user interfaces',
				languages: candidateLanguages
					.filter((l) => WEB_FRONTEND_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'backend_services',
				text: 'Server applications and APIs',
				languages: candidateLanguages
					.filter((l) => WEB_BACKEND_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'mobile_apps',
				text: 'Mobile applications',
				languages: candidateLanguages
					.filter((l) => l.primaryDomain === 'mobile' || MOBILE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'data_ml',
				text: 'Data analysis and machine learning',
				languages: candidateLanguages
					.filter(
						(l) => l.primaryDomain === 'data_science' || DATA_SCIENCE_LANGUAGES.includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'systems_embedded',
				text: 'Systems programming and embedded devices',
				languages: candidateLanguages
					.filter(
						(l) =>
							l.primaryDomain === 'systems' ||
							SYSTEMS_LANGUAGES.includes(l.id) ||
							EMBEDDED_LANGUAGES.includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'game_dev',
				text: 'Game development',
				languages: candidateLanguages
					.filter((l) => GAME_DEV_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'enterprise_business',
				text: 'Enterprise and business systems',
				languages: candidateLanguages
					.filter((l) => ENTERPRISE_LANGUAGES.includes(l.id) || l.id === 'xpp')
					.map((l) => l.id)
			},
			{
				id: 'scientific_computing',
				text: 'Scientific computing and research',
				languages: candidateLanguages
					.filter((l) => SCIENTIFIC_COMPUTING_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'automation_scripting',
				text: 'Automation and scripting',
				languages: candidateLanguages
					.filter(
						(l) =>
							l.primaryDomain === 'scripting' ||
							SCRIPTING_LANGUAGES.includes(l.id) ||
							l.id === 'powershell'
					)
					.map((l) => l.id)
			}
		]
	);

	// Question 2: Programming paradigm preference
	addQuestionIfValid('paradigm', 'How do you prefer to organize your code?', 'style', [
		{
			id: 'style_functional',
			text: 'Breaking complex ideas into simple, reusable functions',
			languages: candidateLanguages
				.filter((l) => l.paradigm === 'functional' || FUNCTIONAL_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_oop',
			text: 'Everything has a clear category and relationship',
			languages: candidateLanguages
				.filter((l) => l.paradigm === 'object_oriented' || OOP_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_procedural',
			text: 'Step-by-step instructions in order',
			languages: candidateLanguages
				.filter((l) => l.paradigm === 'procedural' || PROCEDURAL_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'style_mixed',
			text: 'Mixing different approaches as needed',
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
							'julia'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_logic',
			text: 'Following logical rules and patterns',
			languages: candidateLanguages.filter((l) => LOGIC_LANGUAGES.includes(l.id)).map((l) => l.id)
		}
	]);

	// Question 3: Control vs Convenience
	addQuestionIfValid(
		'performance',
		"In your ideal work environment, you'd rather have:",
		'performance',
		[
			{
				id: 'perf_speed',
				text: 'Complete control over every detail',
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
								'julia',
								'nim',
								'odin',
								'assembly'
							].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'perf_productivity',
				text: 'Tools that handle details for you',
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
								'visualbasic'
							].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'perf_balance',
				text: 'A balance of control and convenience',
				languages: candidateLanguages
					.filter(
						(l) =>
							l.performanceNeeds === 'important' ||
							['go', 'rust', 'java', 'csharp', 'swift', 'kotlin', 'nim', 'elixir'].includes(l.id)
					)
					.map((l) => l.id)
			}
		]
	);

	// Question 4: Learning preference
	addQuestionIfValid('learning', 'When learning new skills, you prefer:', 'ecosystem', [
		{
			id: 'learn_easy',
			text: 'Quick wins and immediate results',
			languages: candidateLanguages
				.filter((l) => l.learningCurve === 'gentle' || EASY_LEARN_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'learn_moderate',
			text: 'Gradual progression with clear structure',
			languages: candidateLanguages
				.filter((l) => l.learningCurve === 'moderate' || MODERATE_LEARN_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'learn_complex',
			text: 'Deep mastery even if it takes longer',
			languages: candidateLanguages
				.filter((l) => l.learningCurve === 'steep' || STEEP_LEARN_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 5: Community style
	addQuestionIfValid('community', 'You thrive in groups that are:', 'ecosystem', [
		{
			id: 'comm_large',
			text: 'Large and diverse with many perspectives',
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
			text: 'Focused on specific shared interests',
			languages: candidateLanguages
				.filter((l) =>
					['r', 'julia', 'haskell', 'erlang', 'elixir', 'clojure', 'fortran', 'prolog'].includes(
						l.id
					)
				)
				.map((l) => l.id)
		},
		{
			id: 'comm_growing',
			text: 'Small but passionate and innovative',
			languages: candidateLanguages
				.filter((l) =>
					['rust', 'zig', 'nim', 'elixir', 'purescript', 'dart', 'julia', 'odin'].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 6: Type system preference
	addQuestionIfValid('types', 'Your ideal creative process involves:', 'style', [
		{
			id: 'types_static',
			text: 'Clear rules that prevent mistakes',
			languages: candidateLanguages
				.filter((l) => STATIC_TYPE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'types_dynamic',
			text: 'Freedom to experiment and adjust',
			languages: candidateLanguages
				.filter((l) => DYNAMIC_TYPE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'types_optional',
			text: 'Guidelines you can choose to follow',
			languages: candidateLanguages
				.filter((l) => OPTIONAL_TYPE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 7: Work environment
	addQuestionIfValid('platform', "You're most interested in creating things for:", 'ecosystem', [
		{
			id: 'plat_web',
			text: 'The internet and online experiences',
			languages: candidateLanguages
				.filter((l) => ['javascript', 'typescript', 'elm', 'purescript', 'dart'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'plat_server',
			text: 'Behind-the-scenes systems',
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
						'kotlin'
					].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'plat_mobile',
			text: 'Mobile apps and portable devices',
			languages: candidateLanguages.filter((l) => MOBILE_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'plat_desktop',
			text: 'Desktop software and productivity tools',
			languages: candidateLanguages
				.filter((l) =>
					['cpp', 'csharp', 'java', 'python', 'rust', 'go', 'swift', 'delphi'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'plat_embedded',
			text: 'Physical devices and hardware',
			languages: candidateLanguages
				.filter((l) => EMBEDDED_LANGUAGES.includes(l.id) && l.id !== 'zig')
				.map((l) => l.id)
		}
	]);

	// Question 8: Specialized domain interest
	addQuestionIfValid(
		'special_interest',
		'Do you have interest in any specialized domains?',
		'domain',
		[
			{
				id: 'scientific_computing',
				text: 'Scientific computing and research',
				languages: candidateLanguages
					.filter((l) => SCIENTIFIC_COMPUTING_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'statistical_analysis',
				text: 'Statistical analysis and data science',
				languages: candidateLanguages
					.filter((l) => ['r', 'julia', 'python', 'matlab'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'symbolic_computation',
				text: 'Symbolic computation and mathematics',
				languages: candidateLanguages
					.filter((l) => ['wolfram', 'maple', 'sage'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'game_development',
				text: 'Game development and graphics',
				languages: candidateLanguages
					.filter((l) => GAME_DEV_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'enterprise_systems',
				text: 'Enterprise and business systems',
				languages: candidateLanguages
					.filter((l) => ENTERPRISE_LANGUAGES.includes(l.id) || l.id === 'xpp')
					.map((l) => l.id)
			},
			{
				id: 'blockchain_smart_contracts',
				text: 'Blockchain and smart contracts',
				languages: candidateLanguages
					.filter((l) => ['solidity', 'vyper', 'move'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'high_performance',
				text: 'High-performance computing',
				languages: candidateLanguages
					.filter((l) => HIGH_PERFORMANCE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'numerical_computing',
				text: 'Numerical and scientific simulations',
				languages: candidateLanguages
					.filter((l) => ['fortran', 'julia', 'matlab', 'octave'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'cloud_native',
				text: 'Cloud and distributed systems',
				languages: candidateLanguages
					.filter((l) => CLOUD_NATIVE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'general_purpose',
				text: 'No specific specialization',
				languages: candidateLanguages
					.filter((l) => GENERAL_PURPOSE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 9: Technology adoption preference
	addQuestionIfValid('tech_adoption', "You're more excited by:", 'ecosystem', [
		{
			id: 'cutting_edge',
			text: 'Cutting-edge technology and new ideas',
			languages: candidateLanguages.filter((l) => MODERN_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'established',
			text: 'Well-established methods that work reliably',
			languages: candidateLanguages
				.filter((l) => ['java', 'csharp', 'python', 'javascript', 'cpp', 'c'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'balanced',
			text: 'A balance of innovation and stability',
			languages: candidateLanguages
				.filter((l) => ['typescript', 'kotlin', 'go', 'swift', 'rust'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 10: Project scale preference
	addQuestionIfValid('project_scale', 'What scale of projects do you prefer?', 'ecosystem', [
		{
			id: 'small_scripts',
			text: 'Quick scripts and automation',
			languages: candidateLanguages
				.filter((l) => SCRIPTING_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'medium_apps',
			text: 'Medium-sized applications',
			languages: candidateLanguages
				.filter((l) =>
					['javascript', 'typescript', 'python', 'go', 'dart', 'ruby', 'php'].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'large_systems',
			text: 'Large-scale enterprise systems',
			languages: candidateLanguages
				.filter((l) => ['java', 'csharp', 'cpp', 'scala', 'kotlin'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'any_scale',
			text: 'Flexible across all scales',
			languages: candidateLanguages
				.filter((l) => ['python', 'rust', 'go', 'typescript', 'java'].includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 11: Work style philosophy
	addQuestionIfValid('philosophy', 'What approach resonates with you most?', 'style', [
		{
			id: 'phil_simple',
			text: 'Keep it simple and minimal',
			languages: candidateLanguages
				.filter((l) => MINIMAL_PHILOSOPHY_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'phil_expressive',
			text: 'Make it enjoyable and expressive',
			languages: candidateLanguages
				.filter((l) => EXPRESSIVE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'phil_safety',
			text: 'Ensure safety and correctness',
			languages: candidateLanguages.filter((l) => SAFETY_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'phil_pragmatic',
			text: 'Be pragmatic and practical',
			languages: candidateLanguages
				.filter((l) => PRAGMATIC_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 12: Managing multiple tasks
	addQuestionIfValid('concurrency', 'When managing multiple tasks, you prefer to:', 'style', [
		{
			id: 'conc_actor',
			text: 'Delegate tasks that communicate through messages',
			languages: candidateLanguages
				.filter((l) => ACTOR_MODEL_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'conc_async',
			text: "Start tasks and check back when they're done",
			languages: candidateLanguages.filter((l) => ASYNC_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'conc_channels',
			text: 'Create pipelines where tasks flow naturally',
			languages: candidateLanguages.filter((l) => CHANNEL_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'conc_threads',
			text: 'Maintain direct control over each task',
			languages: candidateLanguages
				.filter((l) => TRADITIONAL_THREAD_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 13: Deployment preference
	addQuestionIfValid(
		'deployment_style',
		'How do you prefer to deploy and distribute your code?',
		'ecosystem',
		[
			{
				id: 'compiled_binary',
				text: 'Compiled executables',
				languages: candidateLanguages
					.filter((l) => COMPILED_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'interpreted_scripts',
				text: 'Scripts and interpreted code',
				languages: candidateLanguages
					.filter((l) => INTERPRETED_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'managed_runtime',
				text: 'Managed runtime environments',
				languages: candidateLanguages.filter((l) => VM_LANGUAGES.includes(l.id)).map((l) => l.id)
			},
			{
				id: 'containerized',
				text: 'Containers and cloud services',
				languages: candidateLanguages
					.filter((l) => CLOUD_NATIVE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 14: Development environment preference
	addQuestionIfValid(
		'dev_environment',
		'Your ideal development experience includes:',
		'ecosystem',
		[
			{
				id: 'interactive_repl',
				text: 'Interactive experimentation and immediate feedback',
				languages: candidateLanguages
					.filter((l) =>
						['python', 'javascript', 'ruby', 'clojure', 'elixir', 'julia', 'haskell'].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'ide_tooling',
				text: 'Rich IDE support with refactoring and analysis',
				languages: candidateLanguages
					.filter((l) => ['java', 'csharp', 'typescript', 'kotlin', 'swift', 'rust'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'minimal_editor',
				text: 'Minimal setup with text editor and command line',
				languages: candidateLanguages
					.filter((l) => ['c', 'go', 'lua', 'perl', 'powershell', 'assembly'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'visual_tools',
				text: 'Visual development tools and designers',
				languages: candidateLanguages
					.filter((l) => ['visualbasic', 'delphi', 'swift'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 15: Error handling preference
	addQuestionIfValid(
		'error_handling',
		'How do you prefer to handle errors and problems?',
		'style',
		[
			{
				id: 'compile_time',
				text: 'Catch errors at compile time before running',
				languages: candidateLanguages
					.filter((l) => STATIC_TYPE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'runtime_flexible',
				text: 'Handle errors flexibly at runtime',
				languages: candidateLanguages
					.filter((l) => DYNAMIC_TYPE_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'safety_first',
				text: 'Prevent errors through strict safety guarantees',
				languages: candidateLanguages
					.filter((l) => SAFETY_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'pragmatic_errors',
				text: 'Balance safety with practical development',
				languages: candidateLanguages
					.filter((l) => PRAGMATIC_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 16: System level preference (helps differentiate Ada, Assembly, etc.)
	addQuestionIfValid('system_level', 'What level of system control do you prefer?', 'performance', [
		{
			id: 'safety_critical',
			text: 'Safety-critical systems with formal verification',
			languages: candidateLanguages
				.filter((l) => ['ada', 'rust', 'spark'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'bare_metal',
			text: 'Bare metal and direct hardware control',
			languages: candidateLanguages
				.filter((l) => ['assembly', 'c', 'zig'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'system_programming',
			text: 'System programming with some abstractions',
			languages: candidateLanguages
				.filter((l) => ['cpp', 'rust', 'nim', 'odin'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'application_level',
			text: 'Application-level development',
			languages: candidateLanguages
				.filter(
					(l) => !['ada', 'assembly', 'c', 'cpp', 'rust', 'zig', 'nim', 'odin'].includes(l.id)
				)
				.map((l) => l.id)
		}
	]);

	// Question 17: Programming paradigm preference (helps differentiate functional languages)
	addQuestionIfValid(
		'paradigm_preference',
		'Which programming style appeals to you most?',
		'style',
		[
			{
				id: 'pure_functional',
				text: 'Pure functional with immutability',
				languages: candidateLanguages
					.filter((l) =>
						['haskell', 'elm', 'purescript', 'ocaml', 'fsharp', 'clojure'].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'logic_programming',
				text: 'Logic and constraint-based programming',
				languages: candidateLanguages
					.filter((l) => ['prolog', 'mercury', 'datalog'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'object_oriented_pure',
				text: 'Pure object-oriented design',
				languages: candidateLanguages
					.filter((l) => ['smalltalk', 'ruby', 'objectivec'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'multi_paradigm',
				text: 'Mix of paradigms as needed',
				languages: candidateLanguages
					.filter(
						(l) =>
							![
								'haskell',
								'elm',
								'prolog',
								'smalltalk',
								'ocaml',
								'fsharp',
								'clojure',
								'objectivec'
							].includes(l.id)
					)
					.map((l) => l.id)
			}
		]
	);

	// Question 18: Legacy and specialized systems (helps differentiate legacy languages)
	addQuestionIfValid(
		'legacy_systems',
		'What type of software systems interest you most?',
		'domain',
		[
			{
				id: 'legacy_maintenance',
				text: 'Maintaining and modernizing legacy enterprise systems',
				languages: candidateLanguages
					.filter((l) => ['fortran', 'objectivec', 'visualbasic', 'xpp'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'statistical_research',
				text: 'Statistical analysis and research computing',
				languages: candidateLanguages.filter((l) => ['r'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'modern_systems',
				text: 'Building new systems with modern tools',
				languages: candidateLanguages
					.filter(
						(l) =>
							!['fortran', 'objectivec', 'visualbasic', 'xpp', 'r', 'powershell'].includes(l.id)
					)
					.map((l) => l.id)
			},
			{
				id: 'windows_automation',
				text: 'Windows system administration and automation',
				languages: candidateLanguages.filter((l) => ['powershell'].includes(l.id)).map((l) => l.id)
			}
		]
	);

	// Question 19: Hardware control level (helps differentiate assembly, zig, odin)
	addQuestionIfValid(
		'hardware_control',
		'How close to the hardware do you want to work?',
		'performance',
		[
			{
				id: 'register_level',
				text: 'Direct register manipulation and inline assembly',
				languages: candidateLanguages
					.filter((l) => ['assembly', 'zig', 'odin'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'system_abstractions',
				text: 'System programming with helpful abstractions',
				languages: candidateLanguages
					.filter((l) => ['c', 'cpp', 'rust'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'high_level',
				text: 'High-level abstractions away from hardware',
				languages: candidateLanguages
					.filter((l) => !['assembly', 'zig', 'odin', 'c', 'cpp', 'rust'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 20: Specialized computation domains (helps differentiate niche languages)
	addQuestionIfValid(
		'specialized_computation',
		'Do you have interest in specialized computation domains?',
		'domain',
		[
			{
				id: 'symbolic_math',
				text: 'Symbolic mathematics and computer algebra',
				languages: candidateLanguages.filter((l) => ['wolfram'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'formal_verification',
				text: 'Formal verification and proof systems',
				languages: candidateLanguages
					.filter((l) => ['prolog', 'ocaml'].includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'blockchain_contracts',
				text: 'Blockchain and decentralized applications',
				languages: candidateLanguages.filter((l) => ['solidity'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'general_computation',
				text: 'General-purpose programming',
				languages: candidateLanguages
					.filter((l) => !['wolfram', 'prolog', 'ocaml', 'solidity'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Question 21: Platform specialization (helps differentiate fsharp, xpp, odin, solidity)
	addQuestionIfValid(
		'platform_specialization',
		'Which development platform appeals to you most?',
		'domain',
		[
			{
				id: 'dotnet_ml',
				text: '.NET ecosystem with functional programming',
				languages: candidateLanguages.filter((l) => ['fsharp'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'erp_systems',
				text: 'Microsoft Dynamics and ERP systems',
				languages: candidateLanguages.filter((l) => ['xpp'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'game_systems',
				text: 'Game engines and real-time systems',
				languages: candidateLanguages.filter((l) => ['odin'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'ethereum_blockchain',
				text: 'Ethereum and smart contract platforms',
				languages: candidateLanguages.filter((l) => ['solidity'].includes(l.id)).map((l) => l.id)
			},
			{
				id: 'general_platforms',
				text: 'Cross-platform development',
				languages: candidateLanguages
					.filter((l) => !['fsharp', 'xpp', 'odin', 'solidity'].includes(l.id))
					.map((l) => l.id)
			}
		]
	);

	// Score and rank questions by quality
	const scoredQuestions = questions.map((q) => ({
		question: q,
		score: scoreQuestion(q, candidateLanguages)
	}));

	// Sort by score (highest first)
	scoredQuestions.sort((a, b) => b.score - a.score);

	// Take top questions based on score, aim for 8-10 core questions
	const selectedQuestions = scoredQuestions
		.filter((sq) => sq.score >= 20) // Minimum quality threshold
		.slice(0, 10) // Allow up to 10 questions to include differentiators
		.map((sq) => sq.question);

	// If we have too few questions, add the best remaining ones
	if (selectedQuestions.length < 6) {
		const remaining = scoredQuestions
			.filter((sq) => !selectedQuestions.includes(sq.question))
			.slice(0, 6 - selectedQuestions.length)
			.map((sq) => sq.question);
		selectedQuestions.push(...remaining);
	}

	// Force include critical differentiator questions if we have ties
	const needsDifferentiators = candidateLanguages.some((l) =>
		[
			'ada',
			'assembly',
			'r',
			'objectivec',
			'clojure',
			'fsharp',
			'fortran',
			'wolfram',
			'prolog',
			'ocaml',
			'solidity',
			'zig',
			'xpp',
			'odin',
			'visualbasic'
		].includes(l.id)
	);

	if (needsDifferentiators) {
		// Add system level question if dealing with low-level languages
		if (
			candidateLanguages.some((l) =>
				['ada', 'assembly', 'c', 'cpp', 'rust', 'zig', 'odin'].includes(l.id)
			)
		) {
			const systemQ = questions.find((q) => q.id === 'system_level');
			if (systemQ && !selectedQuestions.includes(systemQ)) {
				selectedQuestions.push(systemQ);
			}
		}

		// Add hardware control question for assembly/zig/odin
		if (candidateLanguages.some((l) => ['assembly', 'zig', 'odin'].includes(l.id))) {
			const hardwareQ = questions.find((q) => q.id === 'hardware_control');
			if (hardwareQ && !selectedQuestions.includes(hardwareQ)) {
				selectedQuestions.push(hardwareQ);
			}
		}

		// Add paradigm question if dealing with functional/logic languages
		if (
			candidateLanguages.some((l) =>
				['haskell', 'ocaml', 'fsharp', 'clojure', 'prolog', 'objectivec'].includes(l.id)
			)
		) {
			const paradigmQ = questions.find((q) => q.id === 'paradigm_preference');
			if (paradigmQ && !selectedQuestions.includes(paradigmQ)) {
				selectedQuestions.push(paradigmQ);
			}
		}

		// Add legacy systems question for legacy languages
		if (
			candidateLanguages.some((l) =>
				['fortran', 'objectivec', 'visualbasic', 'xpp', 'r'].includes(l.id)
			)
		) {
			const legacyQ = questions.find((q) => q.id === 'legacy_systems');
			if (legacyQ && !selectedQuestions.includes(legacyQ)) {
				selectedQuestions.push(legacyQ);
			}
		}

		// Add specialized computation question for niche languages
		if (candidateLanguages.some((l) => ['wolfram', 'prolog', 'ocaml', 'solidity'].includes(l.id))) {
			const specializedQ = questions.find((q) => q.id === 'specialized_computation');
			if (specializedQ && !selectedQuestions.includes(specializedQ)) {
				selectedQuestions.push(specializedQ);
			}
		}

		// Add platform specialization question for platform-specific languages
		if (candidateLanguages.some((l) => ['fsharp', 'xpp', 'odin', 'solidity'].includes(l.id))) {
			const platformQ = questions.find((q) => q.id === 'platform_specialization');
			if (platformQ && !selectedQuestions.includes(platformQ)) {
				selectedQuestions.push(platformQ);
			}
		}
	}

	// Add dynamic follow-up questions based on candidate count
	// If we have many candidates (broad MBTI match), add more specific questions
	if (candidateLanguages.length > 15 && selectedQuestions.length < 10) {
		// Add highly specific questions that weren't selected
		const specificQuestions = scoredQuestions
			.filter((sq) => !selectedQuestions.some((q) => q.id === sq.question.id))
			.filter((sq) => {
				// Find questions with good differentiation (2-3 answers)
				const validAnswers = sq.question.answers.filter((a) =>
					a.languages.some((l) => candidateIds.has(l))
				);
				return validAnswers.length >= 2 && validAnswers.length <= 3;
			})
			.slice(0, 2) // Add up to 2 follow-up questions
			.map((sq) => sq.question);

		selectedQuestions.push(...specificQuestions);
	}

	// If we're dealing with a very narrow set, add broader questions
	if (candidateLanguages.length <= 6 && selectedQuestions.length < 8) {
		// Create a "preference" question for final differentiation
		const preferenceQuestion: LanguageQuestion = {
			id: 'final_preference',
			text: 'Which aspect matters most to you?',
			category: 'style',
			answers: []
		};

		// Build answers based on the specific candidates
		if (candidateLanguages.some((l) => l.learningCurve === 'gentle')) {
			preferenceQuestion.answers.push({
				id: 'ease_of_learning',
				text: 'Easy to learn and get started',
				languages: candidateLanguages.filter((l) => l.learningCurve === 'gentle').map((l) => l.id)
			});
		}

		if (candidateLanguages.some((l) => l.performanceNeeds === 'critical')) {
			preferenceQuestion.answers.push({
				id: 'max_performance',
				text: 'Maximum performance and control',
				languages: candidateLanguages
					.filter((l) => l.performanceNeeds === 'critical')
					.map((l) => l.id)
			});
		}

		if (candidateLanguages.some((l) => l.ecosystemMaturity === 'mature')) {
			preferenceQuestion.answers.push({
				id: 'rich_ecosystem',
				text: 'Large community and libraries',
				languages: candidateLanguages
					.filter((l) => l.ecosystemMaturity === 'mature')
					.map((l) => l.id)
			});
		}

		// Only add if we have at least 2 valid answers
		if (preferenceQuestion.answers.length >= 2) {
			selectedQuestions.push(preferenceQuestion);
		}
	}

	return selectedQuestions;
}
