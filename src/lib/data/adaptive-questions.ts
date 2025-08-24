import type { LanguageQuestion, LanguageId } from '$lib/types/quiz';
import { languages } from './languages';

// Language category constants for better readability
const WEB_LANGUAGES: LanguageId[] = [
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
];

const MOBILE_LANGUAGES: LanguageId[] = ['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp'];

const DATA_SCIENCE_LANGUAGES: LanguageId[] = ['python', 'r', 'julia', 'scala', 'wolfram'];

const SYSTEMS_LANGUAGES: LanguageId[] = ['c', 'cpp', 'rust', 'go', 'zig', 'nim', 'ada', 'odin'];

const GAME_DEV_LANGUAGES: LanguageId[] = ['cpp', 'csharp', 'rust', 'lua'];

const SCRIPTING_LANGUAGES: LanguageId[] = ['python', 'perl', 'ruby', 'lua', 'powershell'];

const ENTERPRISE_LANGUAGES: LanguageId[] = ['java', 'csharp', 'delphi'];

const SCIENTIFIC_LANGUAGES: LanguageId[] = ['julia', 'r', 'fortran'];

const EMBEDDED_LANGUAGES: LanguageId[] = ['c', 'cpp', 'rust', 'ada', 'zig'];

const PROCEDURAL_LANGUAGES: LanguageId[] = ['c', 'go', 'fortran', 'ada'];

const LOGIC_LANGUAGES: LanguageId[] = ['prolog'];

const EASY_LEARN_LANGUAGES: LanguageId[] = ['python', 'javascript', 'ruby', 'go', 'lua'];

const OPTIONAL_TYPE_LANGUAGES: LanguageId[] = ['typescript', 'python', 'dart', 'nim'];

const MINIMAL_PHILOSOPHY_LANGUAGES: LanguageId[] = ['go', 'c', 'lua', 'zig'];

const EXPRESSIVE_LANGUAGES: LanguageId[] = ['ruby', 'python', 'elixir', 'nim'];

const SAFETY_LANGUAGES: LanguageId[] = ['rust', 'ada', 'haskell'];

const PRAGMATIC_LANGUAGES: LanguageId[] = [
	'java',
	'csharp',
	'typescript',
	'kotlin',
	'swift',
	'dart'
];

const ACTOR_MODEL_LANGUAGES: LanguageId[] = ['erlang', 'elixir'];

const ASYNC_LANGUAGES: LanguageId[] = [
	'javascript',
	'typescript',
	'python',
	'csharp',
	'rust',
	'swift',
	'dart'
];

const CHANNEL_LANGUAGES: LanguageId[] = ['go', 'rust', 'clojure'];

const TRADITIONAL_THREAD_LANGUAGES: LanguageId[] = ['java', 'cpp', 'c', 'csharp'];

const SCRIPTING_CONFIG_LANGUAGES: LanguageId[] = ['python', 'powershell', 'perl', 'ruby'];

const TEACHING_CS_LANGUAGES: LanguageId[] = ['python', 'java', 'c', 'haskell'];

const LIVE_CODING_LANGUAGES: LanguageId[] = ['clojure', 'swift'];

const COMPILED_LANGUAGES: LanguageId[] = ['c', 'cpp', 'rust', 'go', 'java', 'csharp'];

const INTERPRETED_LANGUAGES: LanguageId[] = ['python', 'ruby', 'javascript', 'lua', 'perl'];

const MODERN_PLATFORMS_LANGUAGES: LanguageId[] = [
	'rust',
	'go',
	'typescript',
	'swift',
	'kotlin',
	'dart'
];

const MATH_LIBRARY_LANGUAGES: LanguageId[] = ['python', 'cpp', 'java', 'csharp', 'javascript'];

const MATH_TRADITIONAL_LANGUAGES: LanguageId[] = ['julia', 'r', 'fortran'];

const NO_SPECIALIZED_LANGUAGES: LanguageId[] = [
	'python',
	'javascript',
	'java',
	'cpp',
	'go',
	'rust',
	'csharp'
];

const SINGLE_GPU_LANGUAGE: LanguageId[] = ['julia'];

const SINGLE_POWERSHELL: LanguageId[] = ['powershell'];

const SINGLE_OBJECTIVEC: LanguageId[] = ['objectivec'];

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
		potentialAnswers: Array<{ id: string; text: string; languages: LanguageId[] }>
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

	// Question 1: Creative expression style
	addQuestionIfValid('use_case', 'What type of creative work appeals to you most?', 'domain', [
		{
			id: 'use_web',
			text: 'Interactive experiences people can use daily',
			languages: candidateLanguages
				.filter((l) => l.primaryDomain?.includes('web') || WEB_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_mobile',
			text: 'Apps for phones and tablets',
			languages: candidateLanguages
				.filter((l) => l.primaryDomain === 'mobile' || MOBILE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_data',
			text: 'Analyzing and organizing information',
			languages: candidateLanguages
				.filter((l) => l.primaryDomain === 'data_science' || DATA_SCIENCE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_systems',
			text: 'Behind-the-scenes tools and infrastructure',
			languages: candidateLanguages
				.filter((l) => l.primaryDomain === 'systems' || SYSTEMS_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_games',
			text: 'Games and entertainment',
			languages: candidateLanguages
				.filter((l) => GAME_DEV_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_scripting',
			text: 'Automation that makes life easier',
			languages: candidateLanguages
				.filter((l) => l.primaryDomain === 'scripting' || SCRIPTING_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_education',
			text: 'Educational and learning tools',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'use_enterprise',
			text: 'Business and organizational tools',
			languages: candidateLanguages
				.filter((l) => ENTERPRISE_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_scientific',
			text: 'Scientific research and calculations',
			languages: candidateLanguages
				.filter((l) => SCIENTIFIC_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'use_embedded',
			text: 'Physical devices and hardware',
			languages: candidateLanguages
				.filter((l) => EMBEDDED_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 2: Problem-solving approach
	addQuestionIfValid('style', 'How do you prefer to organize your thoughts?', 'style', [
		{
			id: 'style_functional',
			text: 'Breaking complex ideas into simple, reusable pieces',
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
							'purescript'
						].includes(l.id)
				)
				.map((l) => l.id)
		},
		{
			id: 'style_oop',
			text: 'Everything has a clear category and relationship',
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
							'objectivec'
						].includes(l.id)
				)
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
		},
		{
			id: 'style_stack',
			text: 'Building up from simple operations',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
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
							['c', 'cpp', 'rust', 'zig', 'fortran', 'ada', 'julia', 'nim', 'odin'].includes(l.id)
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
			text: 'Deep mastery even if it takes longer',
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
							'ocaml'
						].includes(l.id)
				)
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

	// Question 6: Rules and structure
	addQuestionIfValid('types', 'Your ideal creative process involves:', 'style', [
		{
			id: 'types_static',
			text: 'Clear rules that prevent mistakes',
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
			text: 'Freedom to experiment and adjust',
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
						'erlang',
						'elixir'
					].includes(l.id)
				)
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

	// Specialized domain questions - these are more generic now

	// Question 8: Mathematical thinking
	addQuestionIfValid('specialized', 'When it comes to math and logic:', 'domain', [
		{
			id: 'spec_gpu',
			text: 'I love working with numbers and formulas',
			languages: candidateLanguages
				.filter((l) => SINGLE_GPU_LANGUAGE.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'spec_quantum',
			text: 'I prefer visual and spatial reasoning',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'spec_hardware',
			text: 'I like patterns but not complex calculations',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'spec_symbolic',
			text: 'I enjoy abstract logical puzzles',
			languages: candidateLanguages.filter((l) => LOGIC_LANGUAGES.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'spec_none',
			text: 'I avoid math when possible',
			languages: candidateLanguages
				.filter((l) => NO_SPECIALIZED_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 9: Speed vs Quality
	addQuestionIfValid('mathematical', 'When working on tasks, you prefer to:', 'style', [
		{
			id: 'math_symbolic',
			text: 'Focus on one thing at a time until perfect',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'math_traditional',
			text: 'Juggle multiple things simultaneously',
			languages: candidateLanguages
				.filter((l) => MATH_TRADITIONAL_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'math_libraries',
			text: 'Work in quick iterations and improvements',
			languages: candidateLanguages
				.filter((l) => MATH_LIBRARY_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		}
	]);

	// Question 10: Innovation vs Stability
	addQuestionIfValid('legacy', "You're more excited by:", 'ecosystem', [
		{
			id: 'legacy_salesforce',
			text: 'Cutting-edge technology and new ideas',
			languages: []
		},
		{
			id: 'legacy_mainframe',
			text: 'Well-established methods that work reliably',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'legacy_windows',
			text: 'Specialized tools for specific tasks',
			languages: candidateLanguages.filter((l) => SINGLE_POWERSHELL.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'legacy_apple',
			text: 'Reviving and improving older systems',
			languages: candidateLanguages.filter((l) => SINGLE_OBJECTIVEC.includes(l.id)).map((l) => l.id)
		},
		{
			id: 'legacy_web',
			text: 'Maintaining existing solutions',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'legacy_none',
			text: 'Building something completely new',
			languages: candidateLanguages
				.filter((l) => MODERN_PLATFORMS_LANGUAGES.includes(l.id))
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

	// Question 13: Type of automation
	addQuestionIfValid('config', 'What type of automation interests you?', 'domain', [
		{
			id: 'config_yes',
			text: 'Setting up and managing systems',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'config_scripting',
			text: 'Automating repetitive tasks',
			languages: candidateLanguages
				.filter((l) => SCRIPTING_CONFIG_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'config_no',
			text: 'Building interactive applications',
			languages: candidateLanguages
				.filter(() => true) // All languages support application development
				.map((l) => l.id)
		}
	]);

	// Question 14: Purpose and audience
	addQuestionIfValid('teaching', 'Who would use what you create?', 'ecosystem', [
		{
			id: 'teach_children',
			text: 'Children or people learning',
			languages: candidateLanguages
				.filter(() => false) // No languages defined for this category
				.map((l) => l.id)
		},
		{
			id: 'teach_students',
			text: 'Students and researchers',
			languages: candidateLanguages
				.filter((l) => TEACHING_CS_LANGUAGES.includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'teach_no',
			text: 'Professional users and businesses',
			languages: candidateLanguages.map((l) => l.id)
		}
	]);

	// Question 15: Feedback and iteration style
	addQuestionIfValid(
		'environment',
		'How do you prefer to see your work come to life?',
		'ecosystem',
		[
			{
				id: 'env_live',
				text: 'See changes instantly as you make them',
				languages: candidateLanguages
					.filter((l) => LIVE_CODING_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_compiled',
				text: 'Build everything then see the final result',
				languages: candidateLanguages
					.filter((l) => COMPILED_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_interpreted',
				text: 'Test ideas interactively as you go',
				languages: candidateLanguages
					.filter((l) => INTERPRETED_LANGUAGES.includes(l.id))
					.map((l) => l.id)
			},
			{
				id: 'env_visual',
				text: 'Visual building blocks and diagrams',
				languages: candidateLanguages
					.filter(() => false) // No languages defined for this category
					.map((l) => l.id)
			}
		]
	);

	return questions;
}
