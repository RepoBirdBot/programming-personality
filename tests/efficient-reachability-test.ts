import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';

const ALL_MBTI_TYPES = [
	'INTJ',
	'INTP',
	'ENTJ',
	'ENTP',
	'INFJ',
	'INFP',
	'ENFJ',
	'ENFP',
	'ISTJ',
	'ISFJ',
	'ESTJ',
	'ESFJ',
	'ISTP',
	'ISFP',
	'ESTP',
	'ESFP'
];

function analyzeLanguageReachability() {
	console.log('=== EFFICIENT LANGUAGE REACHABILITY ANALYSIS ===\n');

	let totalReachable = 0;
	let totalUnreachable = 0;
	const unreachableByMbti: Record<string, string[]> = {};

	ALL_MBTI_TYPES.forEach((mbtiType) => {
		let candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);

		if (candidateLanguages.length === 0) {
			candidateLanguages = languages;
		}

		const questions = getAdaptiveQuestions(mbtiType);
		const reachableInType: string[] = [];
		const unreachableInType: string[] = [];

		candidateLanguages.forEach((language) => {
			const canWin = canLanguageWin(language.id, candidateLanguages, questions, mbtiType);

			if (canWin) {
				reachableInType.push(language.id);
				totalReachable++;
			} else {
				unreachableInType.push(language.id);
				totalUnreachable++;
			}
		});

		console.log(`${mbtiType}: ${reachableInType.length}/${candidateLanguages.length} reachable`);
		if (unreachableInType.length > 0) {
			unreachableByMbti[mbtiType] = unreachableInType;
		}
	});

	console.log(`\n=== OVERALL SUMMARY ===`);
	console.log(`Total languages: ${totalReachable + totalUnreachable}`);
	console.log(`Reachable: ${totalReachable}`);
	console.log(`Unreachable: ${totalUnreachable}`);
	console.log(
		`Success rate: ${((totalReachable / (totalReachable + totalUnreachable)) * 100).toFixed(1)}%`
	);

	if (totalUnreachable > 0) {
		console.log(`\n❌ UNREACHABLE LANGUAGES BY MBTI:`);
		Object.entries(unreachableByMbti).forEach(([mbti, langIds]) => {
			console.log(
				`  ${mbti}: ${langIds
					.map((id) => {
						const lang = languages.find((l) => l.id === id);
						return `${id} (${lang?.name || 'Unknown'})`;
					})
					.join(', ')}`
			);
		});
	}

	return { totalReachable, totalUnreachable };
}

function _findBestAnswersForLanguage(
	languageId: string,
	questions: { id: string; category: string; answers: { id: string; languages: string[] }[] }[]
): Array<{ questionId: string; answerId: string; weight: number; competition: number }> {
	const bestAnswers: Array<{
		questionId: string;
		answerId: string;
		weight: number;
		competition: number;
	}> = [];

	questions.forEach((question) => {
		const weight = question.category === 'domain' ? 3 : question.category === 'performance' ? 2 : 1;
		const answersWithLang = question.answers.filter((answer) =>
			answer.languages.includes(languageId)
		);

		if (answersWithLang.length > 0) {
			// Find the answer with least competition (fewest other languages)
			const bestAnswer = answersWithLang.reduce((best, current) => {
				const currentCompetition = current.languages.length;
				const bestCompetition = best.languages.length;

				// Prefer answers with less competition
				if (currentCompetition < bestCompetition) return current;
				if (currentCompetition > bestCompetition) return best;

				// If equal competition, both are equally good
				return best;
			});

			bestAnswers.push({
				questionId: question.id,
				answerId: bestAnswer.id,
				weight,
				competition: bestAnswer.languages.length
			});
		}
	});

	return bestAnswers;
}

function simulateQuizForLanguage(
	targetLanguageId: string,
	candidateLanguages: { id: string; mbti?: string }[],
	questions: { id: string; answers: { id: string; languages: string[] }[] }[],
	mbtiType: string
): boolean {
	// Check for exclusive answers first (guaranteed wins)
	const exclusiveAnswers = questions.flatMap((question) =>
		question.answers.filter(
			(answer) => answer.languages.length === 1 && answer.languages[0] === targetLanguageId
		)
	);

	if (exclusiveAnswers.length > 0) {
		return true; // Guaranteed win with exclusive answer
	}

	// Generate a sample of answer combinations to test
	// Use strategic sampling instead of brute force
	const maxCombinations = 50; // Reasonable limit for efficiency
	const answerCombinations = generateStrategicAnswerCombinations(
		questions,
		targetLanguageId,
		maxCombinations
	);

	for (const answerCombo of answerCombinations) {
		const result = simulateQuizWithAnswers(mbtiType, answerCombo, candidateLanguages);
		if (result && result.id === targetLanguageId) {
			return true; // Target language can win with this combination
		}
	}

	return false; // No winning scenario found
}

function generateStrategicAnswerCombinations(
	questions: { id: string; answers: { id: string; languages: string[] }[] }[],
	targetLanguageId: string,
	maxCombinations: number
): Record<string, string>[] {
	const combinations: Record<string, string>[] = [];

	// Strategy 1: Prioritize answers that mention the target language
	const targetFavoringAnswers: Record<string, string[]> = {};
	questions.forEach((question) => {
		const favoringAnswers = question.answers.filter((answer) =>
			answer.languages.includes(targetLanguageId)
		);
		targetFavoringAnswers[question.id] = favoringAnswers.map((a) => a.id);
	});

	// Generate combinations that favor the target language
	const totalCombos = Object.values(targetFavoringAnswers).reduce(
		(acc, answers) => acc * Math.max(1, answers.length),
		1
	);

	if (totalCombos <= maxCombinations) {
		// Generate all favorable combinations
		generateCombinationsRecursive(questions, targetFavoringAnswers, {}, 0, combinations);
	} else {
		// Sample strategic combinations
		for (let i = 0; i < maxCombinations; i++) {
			const combo: Record<string, string> = {};
			questions.forEach((question) => {
				const favoringAnswers = targetFavoringAnswers[question.id];
				if (favoringAnswers.length > 0) {
					// Pick a random favorable answer
					combo[question.id] = favoringAnswers[Math.floor(Math.random() * favoringAnswers.length)];
				} else {
					// Pick any answer if none favor the target
					const randomAnswer =
						question.answers[Math.floor(Math.random() * question.answers.length)];
					combo[question.id] = randomAnswer.id;
				}
			});
			combinations.push(combo);
		}
	}

	return combinations;
}

function generateCombinationsRecursive(
	questions: { id: string; answers: { id: string }[] }[],
	targetFavoringAnswers: Record<string, string[]>,
	currentCombo: Record<string, string>,
	questionIndex: number,
	results: Record<string, string>[]
): void {
	if (questionIndex >= questions.length) {
		results.push({ ...currentCombo });
		return;
	}

	const question = questions[questionIndex];
	const favoringAnswers = targetFavoringAnswers[question.id];

	if (favoringAnswers.length > 0) {
		favoringAnswers.forEach((answerId) => {
			currentCombo[question.id] = answerId;
			generateCombinationsRecursive(
				questions,
				targetFavoringAnswers,
				currentCombo,
				questionIndex + 1,
				results
			);
		});
	} else {
		// Use first answer if none favor the target
		currentCombo[question.id] = question.answers[0].id;
		generateCombinationsRecursive(
			questions,
			targetFavoringAnswers,
			currentCombo,
			questionIndex + 1,
			results
		);
	}
}

function simulateQuizWithAnswers(
	mbtiType: string,
	languageAnswers: Record<string, string>,
	candidateLanguages: { id: string; mbti?: string }[]
): { id: string } | null {
	const scores: Record<string, number> = {};

	candidateLanguages.forEach((lang) => {
		scores[lang.id] = 0;
	});

	// Find questions for this MBTI type
	const adaptiveQuestions = candidateLanguages.length > 0 ? getAdaptiveQuestions(mbtiType) : [];

	Object.entries(languageAnswers).forEach(([questionId, answerId]) => {
		const question = adaptiveQuestions.find((q) => q.id === questionId);
		const answer = question?.answers.find((a) => a.id === answerId);

		if (answer && question) {
			answer.languages.forEach((langId) => {
				const weight =
					question.category === 'domain' ? 3 : question.category === 'performance' ? 2 : 1;
				scores[langId] = (scores[langId] || 0) + weight;
			});
		}
	});

	const scoredLanguages = Object.entries(scores)
		.filter(([_, score]) => score > 0)
		.sort((a, b) => b[1] - a[1]);

	let resultId = 'python'; // Default fallback

	if (scoredLanguages.length > 0) {
		resultId = scoredLanguages[0][0];

		const topScore = scoredLanguages[0][1];
		const topScorers = scoredLanguages.filter(([_, score]) => score === topScore);

		// MBTI tie-breaking preference
		const mbtiMatch = topScorers.find(([langId]) => {
			const lang = candidateLanguages.find((l) => l.id === langId);
			return lang?.mbti === mbtiType;
		});

		if (mbtiMatch) {
			resultId = mbtiMatch[0];
		}
	} else if (candidateLanguages.length > 0) {
		const mbtiMatch = candidateLanguages.find((lang) => lang.mbti === mbtiType);
		resultId = mbtiMatch?.id || candidateLanguages[0].id;
	}

	return candidateLanguages.find((lang) => lang.id === resultId) || null;
}

function canLanguageWin(
	languageId: string,
	candidateLanguages: { id: string; mbti?: string }[],
	questions: { id: string; answers: { id: string; languages: string[] }[] }[],
	mbtiType: string
): boolean {
	return simulateQuizForLanguage(languageId, candidateLanguages, questions, mbtiType);
}

// Test ultra-specific answers directly
function testUltraSpecificAnswers() {
	console.log('\n=== ULTRA-SPECIFIC ANSWER VALIDATION ===');

	const ultraSpecificTests = [
		{
			mbti: 'ENFP',
			questionId: 'use_case',
			answerId: 'use_flash_actionscript',
			expectedLang: 'actionscript'
		},
		{
			mbti: 'ENFP',
			questionId: 'use_case',
			answerId: 'use_coffeescript_js',
			expectedLang: 'coffeescript'
		},
		{
			mbti: 'ENFP',
			questionId: 'use_case',
			answerId: 'use_smalltalk_live',
			expectedLang: 'smalltalk'
		},
		{
			mbti: 'ENFP',
			questionId: 'use_case',
			answerId: 'use_cross_platform_games',
			expectedLang: 'monkey'
		},
		{
			mbti: 'ENFP',
			questionId: 'use_case',
			answerId: 'use_simple_visual_ring',
			expectedLang: 'ring'
		},
		{ mbti: 'ENFP', questionId: 'use_case', answerId: 'use_gui_tcltk', expectedLang: 'tcltk' },
		{
			mbti: 'ESFP',
			questionId: 'use_case',
			answerId: 'use_children_blocks',
			expectedLang: 'scratch'
		},
		{
			mbti: 'INTP',
			questionId: 'use_case',
			answerId: 'use_pure_lazy_functional',
			expectedLang: 'haskell'
		},
		{
			mbti: 'ISTJ',
			questionId: 'use_case',
			answerId: 'use_pre_swift_ios',
			expectedLang: 'objectivec'
		},
		{ mbti: 'ISTJ', questionId: 'use_case', answerId: 'use_enterprise_sas', expectedLang: 'sas' },
		{ mbti: 'ISFJ', questionId: 'use_case', answerId: 'use_flutter_dart', expectedLang: 'dart' },
		{ mbti: 'ISFJ', questionId: 'use_case', answerId: 'use_rexx_mainframe', expectedLang: 'rexx' },
		{ mbti: 'ISFJ', questionId: 'use_case', answerId: 'use_dhall_config', expectedLang: 'dhall' },
		{ mbti: 'INTJ', questionId: 'use_case', answerId: 'use_mathematical_apl', expectedLang: 'apl' },
		{ mbti: 'INTJ', questionId: 'use_case', answerId: 'use_j_array', expectedLang: 'j' },
		{ mbti: 'INTP', questionId: 'use_case', answerId: 'use_lisp_racket', expectedLang: 'racket' },
		{
			mbti: 'INTJ',
			questionId: 'use_case',
			answerId: 'use_purescript_haskell',
			expectedLang: 'purescript'
		},
		{ mbti: 'ENTJ', questionId: 'use_case', answerId: 'use_pony_actor', expectedLang: 'pony' },
		{
			mbti: 'INFJ',
			questionId: 'use_case',
			answerId: 'use_idris_dependent',
			expectedLang: 'idris'
		},
		{
			mbti: 'ESTJ',
			questionId: 'use_case',
			answerId: 'use_windows_automation',
			expectedLang: 'powershell'
		}
	];

	let passed = 0;
	let _failed = 0;

	ultraSpecificTests.forEach((test) => {
		const questions = getAdaptiveQuestions(test.mbti);
		const question = questions.find((q) => q.id === test.questionId);
		const answer = question?.answers.find((a) => a.id === test.answerId);

		if (answer && answer.languages.includes(test.expectedLang)) {
			console.log(`✅ ${test.mbti}: ${test.answerId} → ${test.expectedLang}`);
			passed++;
		} else {
			console.log(`❌ ${test.mbti}: ${test.answerId} → MISSING ${test.expectedLang}`);
			console.log(`     Available languages: ${answer?.languages.join(', ') || 'None'}`);
			_failed++;
		}
	});

	console.log(
		`\nUltra-specific tests: ${passed}/${ultraSpecificTests.length} passed (${((passed / ultraSpecificTests.length) * 100).toFixed(1)}%)`
	);
}

// Run analysis
const _results = analyzeLanguageReachability();
testUltraSpecificAnswers();

export {};
