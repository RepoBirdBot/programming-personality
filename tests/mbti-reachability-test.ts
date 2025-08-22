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

function calculateMBTIType(answers: Record<string, string>): string {
	const dimensions: Record<string, number> = {
		E: 0,
		I: 0,
		S: 0,
		N: 0,
		T: 0,
		F: 0,
		J: 0,
		P: 0
	};

	// Count votes for each dimension
	Object.values(answers).forEach((answerId) => {
		const answer = mbtiQuestions.flatMap((q) => q.answers).find((a) => a.id === answerId);

		if (answer) {
			dimensions[answer.dimension]++;
		}
	});

	// Build MBTI type string
	let mbtiType = '';
	mbtiType += dimensions.E > dimensions.I ? 'E' : 'I';
	mbtiType += dimensions.S > dimensions.N ? 'S' : 'N';
	mbtiType += dimensions.T > dimensions.F ? 'T' : 'F';
	mbtiType += dimensions.J > dimensions.P ? 'J' : 'P';

	return mbtiType;
}

function generateAllAnswerCombinations(): Record<string, string>[] {
	const combinations: Record<string, string>[] = [];

	// For each question, we have 2 choices, so total combinations = 2^6 = 64
	const totalCombinations = Math.pow(2, mbtiQuestions.length);

	for (let i = 0; i < totalCombinations; i++) {
		const answers: Record<string, string> = {};

		mbtiQuestions.forEach((question, index) => {
			// Use bit position to determine which answer to choose
			const chooseFirst = (i & (1 << index)) === 0;
			const chosenAnswer = chooseFirst ? question.answers[0] : question.answers[1];
			answers[question.id] = chosenAnswer.id;
		});

		combinations.push(answers);
	}

	return combinations;
}

function analyzeMBTIReachability() {
	console.log('=== MBTI PHASE REACHABILITY ANALYSIS ===\n');

	// Analyze question structure
	console.log('MBTI Questions Structure:');
	const dimensionCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };

	mbtiQuestions.forEach((question) => {
		dimensionCounts[question.dimension as keyof typeof dimensionCounts]++;
		console.log(`  ${question.id} (${question.dimension}): ${question.text}`);
	});

	console.log(`\nDimension Coverage:`);
	Object.entries(dimensionCounts).forEach(([dim, count]) => {
		console.log(`  ${dim}: ${count} questions`);
	});

	// Test all possible answer combinations
	console.log(`\n=== TESTING ALL ANSWER COMBINATIONS ===`);
	const allCombinations = generateAllAnswerCombinations();
	console.log(`Testing ${allCombinations.length} possible answer combinations...\n`);

	const achievedTypes = new Set<string>();
	const typeExamples: Record<string, Record<string, string>> = {};

	allCombinations.forEach((answerCombo) => {
		const mbtiType = calculateMBTIType(answerCombo);
		achievedTypes.add(mbtiType);

		// Store first example of how to achieve each type
		if (!typeExamples[mbtiType]) {
			typeExamples[mbtiType] = answerCombo;
		}
	});

	// Report results
	console.log(`ACHIEVABLE MBTI TYPES: ${achievedTypes.size}/16`);
	const achievedArray = Array.from(achievedTypes).sort();
	console.log(`Achieved: ${achievedArray.join(', ')}\n`);

	const unachievableTypes = ALL_MBTI_TYPES.filter((type) => !achievedTypes.has(type));
	if (unachievableTypes.length > 0) {
		console.log(`❌ UNACHIEVABLE MBTI TYPES: ${unachievableTypes.join(', ')}`);
		console.log(`This explains why languages assigned to these types are unreachable!\n`);
	} else {
		console.log(`✅ ALL 16 MBTI TYPES ARE ACHIEVABLE!\n`);
	}

	// Show examples of how to achieve each type
	console.log('=== HOW TO ACHIEVE EACH TYPE ===');
	achievedArray.forEach((type) => {
		const example = typeExamples[type];
		console.log(`\n${type}:`);

		// Show which answers lead to this type
		Object.entries(example).forEach(([questionId, answerId]) => {
			const question = mbtiQuestions.find((q) => q.id === questionId);
			const answer = question?.answers.find((a) => a.id === answerId);
			if (answer) {
				console.log(`  ${questionId}: ${answer.dimension} - "${answer.text}"`);
			}
		});
	});

	// Analyze balance
	console.log('\n=== QUESTION BALANCE ANALYSIS ===');
	const balanceAnalysis: Record<string, { total: number; distribution: Record<string, number> }> =
		{};

	['EI', 'SN', 'TF', 'JP'].forEach((dimension) => {
		const questionsForDim = mbtiQuestions.filter((q) => q.dimension === dimension);
		const total = questionsForDim.length;
		const distribution: Record<string, number> = {};

		questionsForDim.forEach((q) => {
			q.answers.forEach((a) => {
				distribution[a.dimension] = (distribution[a.dimension] || 0) + 1;
			});
		});

		balanceAnalysis[dimension] = { total, distribution };

		console.log(`${dimension}: ${total} questions`);
		Object.entries(distribution).forEach(([dim, count]) => {
			console.log(`  ${dim}: ${count} possible answers`);
		});
	});

	return {
		achievableTypes: achievedArray,
		unachievableTypes,
		totalPossible: ALL_MBTI_TYPES.length,
		balanceAnalysis
	};
}

// Run the analysis
const _results = analyzeMBTIReachability();

export {};
