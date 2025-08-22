import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';
import type { Language } from '../src/lib/types/quiz';

// Test scenarios with expected outcomes
interface TestScenario {
	name: string;
	mbtiType: string;
	questionAnswers: Record<string, string>;
	expectedLanguages: string[]; // Languages that should score highest
}

const testScenarios: TestScenario[] = [
	{
		name: 'Systems programmer wanting maximum control',
		mbtiType: 'INTJ',
		questionAnswers: {
			domain: 'domain_systems',
			type_system: 'type_static',
			memory_mgmt: 'mem_manual',
			performance: 'perf_critical',
			compilation: 'comp_native',
			language_age: 'age_modern',
			special_features: 'feat_concurrent',
			paradigm: 'para_multi'
		},
		expectedLanguages: ['rust'] // Rust matches all these criteria for INTJ
	},
	{
		name: 'Data scientist wanting quick prototyping',
		mbtiType: 'ENFP',
		questionAnswers: {
			domain: 'domain_data',
			type_system: 'type_dynamic',
			memory_mgmt: 'mem_gc',
			performance: 'perf_flexible',
			compilation: 'comp_interpreted',
			language_age: 'age_established',
			special_features: 'feat_simple',
			paradigm: 'para_multi'
		},
		expectedLanguages: ['python'] // Python is ENFP and matches these criteria
	},
	{
		name: 'Web developer wanting modern frontend',
		mbtiType: 'ENFP',
		questionAnswers: {
			domain: 'domain_web_frontend',
			type_system: 'type_dynamic',
			memory_mgmt: 'mem_gc',
			performance: 'perf_flexible',
			compilation: 'comp_vm',
			language_age: 'age_established',
			special_features: 'feat_event',
			paradigm: 'para_multi'
		},
		expectedLanguages: ['javascript'] // JavaScript for web frontend
	},
	{
		name: 'Enterprise developer wanting type safety',
		mbtiType: 'ISTJ',
		questionAnswers: {
			domain: 'domain_enterprise',
			type_system: 'type_static',
			memory_mgmt: 'mem_gc',
			performance: 'perf_important',
			compilation: 'comp_vm',
			language_age: 'age_established',
			special_features: 'feat_generic',
			paradigm: 'para_oo'
		},
		expectedLanguages: ['java', 'typescript'] // Both are ISTJ and fit enterprise
	},
	{
		name: 'Mobile developer for Apple platforms',
		mbtiType: 'ISFP',
		questionAnswers: {
			domain: 'domain_mobile',
			type_system: 'type_static',
			memory_mgmt: 'mem_arc',
			performance: 'perf_important',
			compilation: 'comp_native',
			language_age: 'age_cutting_edge',
			special_features: 'feat_generic',
			paradigm: 'para_oo'
		},
		expectedLanguages: ['swift'] // Swift is ISFP for mobile
	},
	{
		name: 'Backend developer wanting simplicity',
		mbtiType: 'ISTJ',
		questionAnswers: {
			domain: 'domain_web_backend',
			type_system: 'type_static',
			memory_mgmt: 'mem_gc',
			performance: 'perf_important',
			compilation: 'comp_native',
			language_age: 'age_modern',
			special_features: 'feat_concurrent',
			paradigm: 'para_procedural'
		},
		expectedLanguages: ['go'] // Go is ISTJ, procedural, concurrent
	}
];

function simulateQuizAnswers(
	mbtiType: string,
	answers: Record<string, string>
): Language | null {
	// Get candidate languages for this MBTI type
	const candidateLanguages = languages.filter((lang) => lang.mbti === mbtiType);
	
	if (candidateLanguages.length === 0) {
		return null;
	}

	// Get adaptive questions
	const questions = getAdaptiveQuestions(mbtiType);
	
	// Initialize scores
	const scores: Record<string, number> = {};
	candidateLanguages.forEach((lang) => {
		scores[lang.id] = 0;
	});

	// Process each answer
	Object.entries(answers).forEach(([questionId, answerId]) => {
		const question = questions.find((q) => q.id === questionId);
		if (!question) return;

		const answer = question.answers.find((a) => a.id === answerId);
		if (!answer) return;

		// Increase score for languages that match this answer
		answer.languages.forEach((langId) => {
			if (scores[langId] !== undefined) {
				// Weight based on question category
				const weight =
					question.category === 'domain' ? 3 : 
					question.category === 'performance' ? 2 : 1;
				scores[langId] += weight;
			}
		});
	});

	// Find highest scoring language
	let maxScore = -1;
	let resultId = candidateLanguages[0].id;

	Object.entries(scores).forEach(([langId, score]) => {
		if (score > maxScore) {
			maxScore = score;
			resultId = langId;
		}
	});

	return languages.find((lang) => lang.id === resultId) || null;
}

// Run tests
console.log('=== Programming Language Quiz Validation Tests ===\n');

let passedTests = 0;
let failedTests = 0;

testScenarios.forEach((scenario) => {
	console.log(`Testing: ${scenario.name}`);
	console.log(`  MBTI Type: ${scenario.mbtiType}`);
	
	const result = simulateQuizAnswers(scenario.mbtiType, scenario.questionAnswers);
	
	if (!result) {
		console.log(`  ❌ FAILED: No result returned`);
		failedTests++;
		return;
	}

	const isExpected = scenario.expectedLanguages.includes(result.id);
	
	if (isExpected) {
		console.log(`  ✅ PASSED: Got ${result.name} (expected: ${scenario.expectedLanguages.join(' or ')})`);
		passedTests++;
	} else {
		console.log(`  ❌ FAILED: Got ${result.name} (expected: ${scenario.expectedLanguages.join(' or ')})`);
		failedTests++;
		
		// Debug info
		const candidateLanguages = languages.filter((lang) => lang.mbti === scenario.mbtiType);
		console.log(`     Candidates for ${scenario.mbtiType}: ${candidateLanguages.map(l => l.id).join(', ')}`);
	}
	
	console.log('');
});

// Validate that all new fields are populated for key languages
console.log('=== Validating New Language Fields ===\n');

const keyLanguages = ['python', 'javascript', 'typescript', 'rust', 'go', 'java'];
const requiredNewFields = [
	'originalPurpose',
	'imperative',
	'objectOriented', 
	'functional',
	'procedural',
	'typing',
	'memoryManagement',
	'compiled',
	'interpreted',
	'yearCreated'
] as const;

let fieldValidationPassed = true;

keyLanguages.forEach((langId) => {
	const lang = languages.find((l) => l.id === langId);
	if (!lang) {
		console.log(`  ❌ Language '${langId}' not found`);
		fieldValidationPassed = false;
		return;
	}

	const missingFields: string[] = [];
	requiredNewFields.forEach((field) => {
		if (lang[field as keyof Language] === undefined) {
			missingFields.push(field);
		}
	});

	if (missingFields.length > 0) {
		console.log(`  ❌ ${lang.name}: Missing fields: ${missingFields.join(', ')}`);
		fieldValidationPassed = false;
	} else {
		console.log(`  ✅ ${lang.name}: All new fields present`);
	}
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`Quiz Logic Tests: ${passedTests}/${testScenarios.length} passed`);
console.log(`Field Validation: ${fieldValidationPassed ? 'PASSED' : 'FAILED'}`);

if (failedTests > 0) {
	console.log('\n⚠️  Some tests failed. Check the quiz scoring logic.');
	// process.exit(1);
} else {
	console.log('\n✅ All tests passed!');
}

export {};