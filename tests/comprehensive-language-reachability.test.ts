import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';
import { mbtiQuestions } from '../src/lib/data/mbti-questions';

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

function simulateQuizWithAnswers(mbtiType: string, languageAnswers: Record<string, string>) {
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

	let resultId = 'python'; // Default fallback

	if (scoredLanguages.length > 0) {
		resultId = scoredLanguages[0][0];

		const topScore = scoredLanguages[0][1];
		const topScorers = scoredLanguages.filter(([_, score]) => score === topScore);

		const mbtiMatch = topScorers.find(([langId]) => {
			const lang = languages.find((l) => l.id === langId);
			return lang?.mbti === mbtiType;
		});

		if (mbtiMatch) {
			resultId = mbtiMatch[0];
		}
	} else if (candidateLanguages.length > 0) {
		const mbtiMatch = candidateLanguages.find((langId) => {
			const lang = languages.find((l) => l.id === langId.id);
			return lang?.mbti === mbtiType;
		});
		resultId = mbtiMatch?.id || candidateLanguages[0].id;
	}

	return languages.find((lang) => lang.id === resultId);
}

function getAllAnswerCombinations(questions: any[]) {
	if (questions.length === 0) return [{}];
	if (questions.length === 1) {
		return questions[0].answers.map((answer: any) => ({ [questions[0].id]: answer.id }));
	}

	const combinations: Record<string, string>[] = [];
	const firstQuestion = questions[0];
	const restCombinations = getAllAnswerCombinations(questions.slice(1));

	firstQuestion.answers.forEach((answer: any) => {
		restCombinations.forEach((restCombo: any) => {
			combinations.push({
				[firstQuestion.id]: answer.id,
				...restCombo
			});
		});
	});

	return combinations;
}

console.log('=== COMPREHENSIVE LANGUAGE REACHABILITY TEST ===\n');

// Test 1: Static Analysis - Find orphaned languages
console.log('1. STATIC ANALYSIS: Finding languages never mentioned in questions\n');

const allLanguageIds = new Set(languages.map((lang) => lang.id));
const mentionedLanguageIds = new Set<string>();

ALL_MBTI_TYPES.forEach((mbtiType) => {
	const questions = getAdaptiveQuestions(mbtiType);
	questions.forEach((question) => {
		question.answers.forEach((answer) => {
			answer.languages.forEach((langId) => {
				mentionedLanguageIds.add(langId);
			});
		});
	});
});

const orphanedLanguages = Array.from(allLanguageIds).filter((id) => !mentionedLanguageIds.has(id));

console.log(`Total languages: ${allLanguageIds.size}`);
console.log(`Languages mentioned in questions: ${mentionedLanguageIds.size}`);
console.log(`Orphaned languages (never mentioned): ${orphanedLanguages.length}`);

if (orphanedLanguages.length > 0) {
	console.log('❌ ORPHANED LANGUAGES:');
	orphanedLanguages.forEach((langId) => {
		const lang = languages.find((l) => l.id === langId);
		console.log(`  - ${langId} (${lang?.name || 'Unknown'})`);
	});
} else {
	console.log('✅ All languages are mentioned in at least one question');
}

console.log('\n' + '='.repeat(60) + '\n');

// Test 2: Dynamic Analysis - Check reachability for each MBTI type
console.log('2. DYNAMIC ANALYSIS: Testing reachability per MBTI type\n');

const reachableLanguages = new Set<string>();
const detailedResults: Record<string, { reachable: string[]; total: number }> = {};

for (const mbtiType of ALL_MBTI_TYPES) {
	const typeReachable = new Set<string>();
	let candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);

	if (candidateLanguages.length === 0) {
		candidateLanguages = languages;
	}

	const questions = getAdaptiveQuestions(mbtiType);

	if (questions.length === 0) {
		console.log(`⚠️  ${mbtiType}: No questions generated`);
		continue;
	}

	// Test with very limited combinations to avoid memory issues
	const maxCombinations = 200;
	const allCombinations = getAllAnswerCombinations(questions);
	const testCombinations =
		allCombinations.length > maxCombinations
			? allCombinations.slice(0, maxCombinations)
			: allCombinations;

	console.log(`${mbtiType}: Testing ${testCombinations.length} answer combinations`);

	testCombinations.forEach((answerCombo: any) => {
		const result = simulateQuizWithAnswers(mbtiType, answerCombo);
		if (result) {
			typeReachable.add(result.id);
			reachableLanguages.add(result.id);
		}
	});

	detailedResults[mbtiType] = {
		reachable: Array.from(typeReachable),
		total: candidateLanguages.length
	};

	console.log(
		`  ${mbtiType}: ${typeReachable.size}/${candidateLanguages.length} languages reachable`
	);
}

console.log('\n' + '='.repeat(60) + '\n');

// Test 3: Overall Reachability Report
console.log('3. OVERALL REACHABILITY SUMMARY\n');

const totalReachable = reachableLanguages.size;
const totalLanguages = allLanguageIds.size;
const unreachableLanguages = Array.from(allLanguageIds).filter((id) => !reachableLanguages.has(id));

console.log(`Total languages: ${totalLanguages}`);
console.log(`Reachable through quiz: ${totalReachable}`);
console.log(`Unreachable: ${unreachableLanguages.length}`);

if (unreachableLanguages.length > 0) {
	console.log('\n❌ UNREACHABLE LANGUAGES:');
	unreachableLanguages.forEach((langId) => {
		const lang = languages.find((l) => l.id === langId);
		console.log(`  - ${langId} (${lang?.name || 'Unknown'}) - MBTI: ${lang?.mbti || 'Unknown'}`);
	});
} else {
	console.log('\n✅ ALL LANGUAGES ARE REACHABLE!');
}

// Test 4: MBTI Distribution Analysis
console.log('\n' + '='.repeat(60) + '\n');
console.log('4. MBTI DISTRIBUTION ANALYSIS\n');

const mbtiDistribution: Record<string, number> = {};
languages.forEach((lang) => {
	mbtiDistribution[lang.mbti] = (mbtiDistribution[lang.mbti] || 0) + 1;
});

console.log('Languages per MBTI type:');
ALL_MBTI_TYPES.forEach((mbtiType) => {
	const count = mbtiDistribution[mbtiType] || 0;
	const reachableCount = detailedResults[mbtiType]?.reachable.length || 0;
	console.log(`  ${mbtiType}: ${count} total, ${reachableCount} reachable`);
});

// Test 5: Critical Path Analysis
console.log('\n' + '='.repeat(60) + '\n');
console.log('5. CRITICAL PATH ANALYSIS\n');

const languageWinCounts: Record<string, number> = {};
let totalSimulations = 0;

for (const mbtiType of ALL_MBTI_TYPES) {
	const questions = getAdaptiveQuestions(mbtiType);
	if (questions.length === 0) continue;

	const testCombinations = getAllAnswerCombinations(questions).slice(0, 100); // Sample

	testCombinations.forEach((answerCombo: any) => {
		const result = simulateQuizWithAnswers(mbtiType, answerCombo);
		if (result) {
			languageWinCounts[result.id] = (languageWinCounts[result.id] || 0) + 1;
			totalSimulations++;
		}
	});
}

console.log('Languages that never win in simulations:');
const neverWinLanguages = Array.from(allLanguageIds).filter((id) => !languageWinCounts[id]);
if (neverWinLanguages.length > 0) {
	neverWinLanguages.forEach((langId) => {
		const lang = languages.find((l) => l.id === langId);
		console.log(`  ❌ ${langId} (${lang?.name || 'Unknown'})`);
	});
} else {
	console.log('  ✅ All languages can win in at least one scenario');
}

// Final Summary
console.log('\n' + '='.repeat(60) + '\n');
console.log('FINAL VALIDATION SUMMARY\n');

const staticAnalysisPass = orphanedLanguages.length === 0;
const dynamicAnalysisPass = unreachableLanguages.length === 0;
const winAnalysisPass = neverWinLanguages.length === 0;

console.log(`✅ Static Analysis (no orphaned languages): ${staticAnalysisPass ? 'PASS' : 'FAIL'}`);
console.log(
	`✅ Dynamic Analysis (all languages reachable): ${dynamicAnalysisPass ? 'PASS' : 'FAIL'}`
);
console.log(`✅ Win Analysis (all languages can win): ${winAnalysisPass ? 'PASS' : 'FAIL'}`);

const overallPass = staticAnalysisPass && dynamicAnalysisPass && winAnalysisPass;
console.log(
	`\n🎯 OVERALL RESULT: ${overallPass ? '✅ PASS - All languages are reachable!' : '❌ FAIL - Some languages are unreachable'}`
);

if (!overallPass) {
	console.log('\n🔧 RECOMMENDATIONS:');
	if (!staticAnalysisPass) {
		console.log('  - Add orphaned languages to adaptive question answers');
	}
	if (!dynamicAnalysisPass) {
		console.log('  - Review MBTI filtering logic and question coverage');
	}
	if (!winAnalysisPass) {
		console.log('  - Ensure never-winning languages have paths to victory');
	}
}

export {};
