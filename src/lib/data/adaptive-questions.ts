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
						['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp'].includes(l.id)
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
						['python', 'r', 'julia', 'matlab', 'scala', 'sql', 'sas'].includes(l.id)
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
							'reasonml'
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
							'smalltalk'
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
						['c', 'cpp', 'rust', 'zig', 'fortran', 'ada', 'd'].includes(l.id)
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
						['python', 'ruby', 'javascript', 'go', 'kotlin', 'swift', 'dart'].includes(l.id)
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
						['python', 'javascript', 'ruby', 'go', 'lua', 'basic', 'scratch'].includes(l.id)
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
						['cpp', 'rust', 'haskell', 'scala', 'clojure', 'erlang', 'prolog'].includes(l.id)
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
						['rust', 'kotlin', 'swift', 'typescript', 'dart', 'elixir', 'julia'].includes(l.id)
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
						['haskell', 'clojure', 'erlang', 'nim', 'zig', 'crystal', 'racket'].includes(l.id)
				)
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
						['java', 'csharp', 'rust', 'go', 'swift', 'kotlin', 'haskell', 'scala'].includes(l.id)
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
						['python', 'javascript', 'ruby', 'php', 'perl', 'lua', 'clojure'].includes(l.id)
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
		}
	]);

	// Question 7: Application scale
	addQuestionIfValid('scale', 'What scale of applications do you typically build?', 'domain', [
		{
			id: 'scale_small',
			text: 'Small scripts and utilities',
			languages: candidateLanguages
				.filter((l) => ['python', 'bash', 'perl', 'ruby', 'lua', 'javascript'].includes(l.id))
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
				.filter((l) => ['java', 'csharp', 'cpp', 'scala', 'go', 'rust', 'kotlin'].includes(l.id))
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
				.filter((l) => ['swift', 'kotlin', 'dart', 'java', 'objectivec', 'csharp'].includes(l.id))
				.map((l) => l.id)
		},
		{
			id: 'platform_embedded',
			text: 'Embedded systems',
			languages: candidateLanguages
				.filter((l) => ['c', 'cpp', 'rust', 'ada', 'forth', 'assembly'].includes(l.id))
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
