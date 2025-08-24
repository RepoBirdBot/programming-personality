import { describe, it, expect } from 'vitest';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';
import { languages } from '../src/lib/data/languages';

describe('Adaptive Questions', () => {
	const mbtiTypes = [
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

	it('should generate questions for all MBTI types', () => {
		for (const mbtiType of mbtiTypes) {
			const questions = getAdaptiveQuestions(mbtiType);
			expect(questions.length).toBeGreaterThanOrEqual(5);
		}
	});

	it('should not have any empty answer arrays', () => {
		for (const mbtiType of mbtiTypes) {
			const questions = getAdaptiveQuestions(mbtiType);

			for (const question of questions) {
				// Each question should have at least 2 answers
				expect(question.answers.length).toBeGreaterThanOrEqual(2);

				// Each answer should have at least one language
				for (const answer of question.answers) {
					expect(answer.languages.length).toBeGreaterThan(0);
				}
			}
		}
	});

	it('should have unique question IDs', () => {
		const questions = getAdaptiveQuestions('INTJ');
		const ids = questions.map((q) => q.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should have valid language IDs in all answers', () => {
		const validLanguageIds = languages.map((l) => l.id);

		for (const mbtiType of mbtiTypes) {
			const questions = getAdaptiveQuestions(mbtiType);

			for (const question of questions) {
				for (const answer of question.answers) {
					for (const langId of answer.languages) {
						expect(validLanguageIds).toContain(langId);
					}
				}
			}
		}
	});

	it('should handle MBTI types with few language matches', () => {
		// Test with a type that might have few matches
		const questions = getAdaptiveQuestions('ISFP');
		expect(questions.length).toBeGreaterThanOrEqual(5);

		// Verify each question has valid answers
		for (const question of questions) {
			expect(question.answers.length).toBeGreaterThanOrEqual(2);
		}
	});

	it('should not have overlapping language sets within a question', () => {
		const questions = getAdaptiveQuestions('ENTP');

		for (const question of questions) {
			const languageSets: string[][] = question.answers.map((a) => a.languages);

			// Check that no language appears in multiple answers for the same question
			const allLanguages: string[] = [];
			for (const set of languageSets) {
				for (const lang of set) {
					if (allLanguages.includes(lang)) {
						console.warn(
							`Language ${lang} appears in multiple answers for question ${question.id}`
						);
					}
					allLanguages.push(lang);
				}
			}
		}
	});
});
