import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';

// Quick test focused on problematic MBTI types
const PROBLEM_MBTI_TYPES = ['ENFP', 'ISFJ', 'ESFP', 'ISTJ'];

function quickSimulateQuiz(mbtiType: string, languageAnswers: Record<string, string>) {
	let candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);

	if (candidateLanguages.length === 0) {
		candidateLanguages = languages;
	}

	const adaptiveQuestions = getAdaptiveQuestions(mbtiType);
	const scores: Record<string, number> = {};

	candidateLanguages.forEach((lang) => {
		scores[lang.id] = 0;
	});

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

	if (scoredLanguages.length > 0) {
		return languages.find((lang) => lang.id === scoredLanguages[0][0]);
	}
	return null;
}

console.log('=== QUICK REACHABILITY TEST FOR PROBLEM MBTI TYPES ===\n');

// Test specific language paths for ultra-specific answers
const testCases = [
	{
		mbtiType: 'ENFP',
		questionId: 'use_case',
		answerId: 'use_flash_actionscript',
		expectedLang: 'actionscript'
	},
	{
		mbtiType: 'ENFP',
		questionId: 'use_case',
		answerId: 'use_coffeescript_js',
		expectedLang: 'coffeescript'
	},
	{
		mbtiType: 'ENFP',
		questionId: 'use_case',
		answerId: 'use_smalltalk_live',
		expectedLang: 'smalltalk'
	},
	{
		mbtiType: 'ENFP',
		questionId: 'use_case',
		answerId: 'use_cross_platform_games',
		expectedLang: 'monkey'
	},
	{
		mbtiType: 'ENFP',
		questionId: 'use_case',
		answerId: 'use_simple_visual_ring',
		expectedLang: 'ring'
	},
	{ mbtiType: 'ENFP', questionId: 'use_case', answerId: 'use_gui_tcltk', expectedLang: 'tcltk' },
	{
		mbtiType: 'ESFP',
		questionId: 'use_case',
		answerId: 'use_children_blocks',
		expectedLang: 'scratch'
	},
	{
		mbtiType: 'INTP',
		questionId: 'use_case',
		answerId: 'use_pure_lazy_functional',
		expectedLang: 'haskell'
	},
	{
		mbtiType: 'ISTJ',
		questionId: 'use_case',
		answerId: 'use_pre_swift_ios',
		expectedLang: 'objectivec'
	},
	{ mbtiType: 'ISTJ', questionId: 'use_case', answerId: 'use_enterprise_sas', expectedLang: 'sas' },
	{ mbtiType: 'ISFJ', questionId: 'use_case', answerId: 'use_flutter_dart', expectedLang: 'dart' },
	{
		mbtiType: 'ISFJ',
		questionId: 'use_case',
		answerId: 'use_rexx_mainframe',
		expectedLang: 'rexx'
	},
	{ mbtiType: 'ISFJ', questionId: 'use_case', answerId: 'use_dhall_config', expectedLang: 'dhall' }
];

let passed = 0;
let failed = 0;

testCases.forEach((testCase) => {
	const result = quickSimulateQuiz(testCase.mbtiType, { [testCase.questionId]: testCase.answerId });

	if (result && result.id === testCase.expectedLang) {
		console.log(`✅ ${testCase.mbtiType}: ${testCase.answerId} → ${result.name}`);
		passed++;
	} else {
		console.log(
			`❌ ${testCase.mbtiType}: ${testCase.answerId} → ${result?.name || 'No result'} (expected ${testCase.expectedLang})`
		);
		failed++;
	}
});

console.log(`\n=== SUMMARY ===`);
console.log(`✅ Passed: ${passed}/${testCases.length}`);
console.log(`❌ Failed: ${failed}/${testCases.length}`);
console.log(`Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);

// Test question generation for each MBTI type
console.log('\n=== QUESTION GENERATION TEST ===');
PROBLEM_MBTI_TYPES.forEach((mbtiType) => {
	const candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);
	const questions = getAdaptiveQuestions(mbtiType);
	console.log(
		`${mbtiType}: ${candidateLanguages.length} candidates, ${questions.length} questions generated`
	);

	// Show ultra-specific questions
	const ultraSpecific = questions.filter((q) => q.answers.some((a) => a.languages.length === 1));
	console.log(`  Ultra-specific questions: ${ultraSpecific.length}`);
});

export {};
