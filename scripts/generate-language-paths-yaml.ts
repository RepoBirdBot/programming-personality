import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';
import type { LanguageId, MBTIType } from '../src/lib/types/quiz';

// Type definitions for the path info
type AnswerInfo = {
	text: string;
	has_target: boolean;
	languages_count: number;
};

type QuestionInfo = {
	id: string;
	text: string;
	answers: AnswerInfo[];
	best_answer: string;
	target_appears: boolean;
};

type PathInfo = {
	mbti_type: MBTIType;
	total_questions: number;
	questions: QuestionInfo[];
};

// Function to simulate complete quiz and get best answers for a target language
function getCompletePathForLanguage(langId: LanguageId, mbtiType: MBTIType): PathInfo {
	const questions = getAdaptiveQuestions(mbtiType);
	const pathInfo: PathInfo = {
		mbti_type: mbtiType,
		total_questions: questions.length,
		questions: []
	};

	// For each question, find the best answer for this language
	for (const q of questions) {
		const questionInfo: QuestionInfo = {
			id: q.id,
			text: q.text,
			answers: [],
			best_answer: '',
			target_appears: false
		};

		// Check each answer
		for (const answer of q.answers) {
			const hasTargetLang = answer.languages.includes(langId);
			questionInfo.answers.push({
				text: answer.text,
				has_target: hasTargetLang,
				languages_count: answer.languages.length
			});
		}

		// Find best answer (prioritize answers with target language)
		const bestAnswer =
			questionInfo.answers.find((a) => a.has_target) ||
			questionInfo.answers.reduce((best, curr) =>
				curr.languages_count < best.languages_count ? curr : best
			);

		questionInfo.best_answer = bestAnswer.text;
		questionInfo.target_appears = questionInfo.answers.some((a) => a.has_target);

		pathInfo.questions.push(questionInfo);
	}

	return pathInfo;
}

function getMBTIAnswers(mbtiType: string) {
	return {
		q1_ei:
			mbtiType[0] === 'E'
				? 'Feel energized and ready for more interaction'
				: 'Need some quiet time alone to recharge',
		q2_sn1:
			mbtiType[1] === 'S'
				? 'Start with the facts and work step-by-step through details'
				: 'Jump to the big picture and work backwards to specifics',
		q3_sn2:
			mbtiType[1] === 'S'
				? 'Specific examples, step-by-step instructions, and practical applications'
				: 'Overall concepts, underlying principles, and theoretical frameworks',
		q4_tf:
			mbtiType[2] === 'T'
				? 'Logic, efficiency, and objective criteria'
				: 'How it affects people and team dynamics',
		q5_jp:
			mbtiType[3] === 'J'
				? 'Clear plans, deadlines, and defined outcomes'
				: 'Open options, flexibility, and room to explore'
	};
}

// Generate YAML output
console.log('# Programming Language Quiz - COMPLETE Path Guide');
console.log('# Shows ALL questions asked and best answers to get each language');
console.log('# All 42 languages are now reachable with differentiator questions');
console.log('# Generated:', new Date().toISOString());
console.log('');
console.log('languages:');

// Process each language
const sortedLanguages = languages.sort((a, b) => a.id.localeCompare(b.id));

for (const lang of sortedLanguages) {
	console.log(`  ${lang.id}:`);
	console.log(`    name: "${lang.name}"`);
	console.log(`    mbti_types: [${lang.mbti.map((t) => `"${t}"`).join(', ')}]`);
	console.log(`    paths:`);

	// Generate path for each MBTI type this language supports
	for (let i = 0; i < lang.mbti.length; i++) {
		const mbtiType = lang.mbti[i];
		const pathData = getCompletePathForLanguage(lang.id as LanguageId, mbtiType);

		console.log(`      path_${i + 1}:`);
		console.log(`        mbti_type: "${mbtiType}"`);
		console.log(`        mbti_phase_answers:`);

		const mbtiAnswers = getMBTIAnswers(mbtiType);
		Object.entries(mbtiAnswers).forEach(([q, a]) => {
			console.log(`          ${q}: "${a}"`);
		});

		console.log(`        adaptive_phase:`);
		console.log(`          total_questions: ${pathData.total_questions}`);
		console.log(`          all_questions_with_best_answers:`);

		for (const q of pathData.questions) {
			console.log(`            - question_id: "${q.id}"`);
			console.log(`              question: "${q.text}"`);
			console.log(`              best_answer: "${q.best_answer}"`);
			console.log(`              target_appears: ${q.target_appears}`);
			if (!q.target_appears) {
				console.log(`              note: "Choose answer with fewest competing languages"`);
			}
		}
	}
	console.log('');
}

// Summary
console.log('# How to use this guide:');
console.log('# 1. Find your target language');
console.log('# 2. Choose one of its available paths (different MBTI types)');
console.log('# 3. Answer MBTI questions according to mbti_phase_answers');
console.log('# 4. For each adaptive question, choose the best_answer listed');
console.log(
	'# 5. If target_appears is false, the answer minimizes competition from other languages'
);
console.log('#');
console.log(
	'# Usage: npx tsx scripts/generate-language-paths-yaml.ts > ai_docs/language-quiz-paths-complete.yaml'
);
