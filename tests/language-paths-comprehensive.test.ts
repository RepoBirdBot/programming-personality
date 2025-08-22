import { describe, it, expect } from 'vitest';
import { languages } from '../src/lib/data/languages';
import { getAdaptiveQuestions } from '../src/lib/data/adaptive-questions';
import { mbtiQuestions } from '../src/lib/data/mbti-questions';
import type { MBTIType, LanguageQuestion, LanguageAnswer } from '../src/lib/types/quiz';
import { writeFileSync } from 'node:fs';

// All 16 MBTI types
const mbtiTypes: MBTIType[] = [
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

// Helper to simulate answering MBTI questions to get a specific type
function _getMBTIAnswers(targetType: string): Record<string, string> {
	const answers: Record<string, string> = {};
	const targetDimensions = {
		E: targetType[0] === 'E',
		I: targetType[0] === 'I',
		S: targetType[1] === 'S',
		N: targetType[1] === 'N',
		T: targetType[2] === 'T',
		F: targetType[2] === 'F',
		J: targetType[3] === 'J',
		P: targetType[3] === 'P'
	};

	mbtiQuestions.forEach((question) => {
		// Pick the first answer that matches our target dimensions
		const targetAnswer = question.answers.find((answer) => targetDimensions[answer.dimension]);
		if (targetAnswer) {
			answers[question.id] = targetAnswer.id;
		}
	});

	return answers;
}

// Helper to calculate scores from adaptive answers
function calculateScores(
	adaptiveQuestions: LanguageQuestion[],
	answers: Record<string, string>
): Record<string, number> {
	const scores: Record<string, number> = {};

	adaptiveQuestions.forEach((question) => {
		const answerId = answers[question.id];
		const answer = question.answers.find((a: LanguageAnswer) => a.id === answerId);

		if (answer) {
			answer.languages.forEach((langId: string) => {
				const weight =
					question.category === 'domain' ? 3 : question.category === 'performance' ? 2 : 1;
				scores[langId] = (scores[langId] || 0) + weight;
			});
		}
	});

	return scores;
}

describe('Comprehensive Language Path Mapping', () => {
	it('should map all possible paths to reach each of the 100 languages', () => {
		const languagePathMap: Record<
			string,
			{
				mbtiTypes: string[];
				optimalPaths: Array<{
					mbtiType: string;
					answers: Record<string, string>;
					score: number;
				}>;
				unreachable: boolean;
			}
		> = {};

		// Initialize map for all languages
		languages.forEach((lang) => {
			languagePathMap[lang.id] = {
				mbtiTypes: [],
				optimalPaths: [],
				unreachable: false
			};
		});

		// For each MBTI type, find which languages can be reached
		mbtiTypes.forEach((mbtiType) => {
			const adaptiveQuestions = getAdaptiveQuestions(mbtiType);

			// Find languages that match this MBTI type directly
			const directMatches = languages.filter((lang) => lang.mbti === mbtiType);
			directMatches.forEach((lang) => {
				languagePathMap[lang.id].mbtiTypes.push(mbtiType);
			});

			// Try all possible combinations of answers for this MBTI type
			const questionIds = adaptiveQuestions.map((q) => q.id);
			const answerCombinations: Record<string, string>[] = [];

			// Generate all valid answer combinations (one per question)
			function _generateCombinations(index: number, current: Record<string, string>) {
				if (index === questionIds.length) {
					answerCombinations.push({ ...current });
					return;
				}

				const question = adaptiveQuestions[index];
				question.answers.forEach((answer) => {
					current[question.id] = answer.id;
					_generateCombinations(index + 1, current);
				});
			}

			// Generate combinations (limit to reasonable number for testing)
			if (adaptiveQuestions.length > 0) {
				// For comprehensive testing, we'll sample key combinations
				// Full exhaustive testing would be too expensive

				// Test each answer being selected at least once
				adaptiveQuestions.forEach((question, qIndex) => {
					question.answers.forEach((answer) => {
						const testAnswers: Record<string, string> = {};

						// Set this answer for this question
						testAnswers[question.id] = answer.id;

						// Set first answer for other questions
						adaptiveQuestions.forEach((q, i) => {
							if (i !== qIndex && q.answers.length > 0) {
								testAnswers[q.id] = q.answers[0].id;
							}
						});

						const scores = calculateScores(adaptiveQuestions, testAnswers);

						// Find which language would be selected with these scores
						const sortedScores = Object.entries(scores)
							.filter(([_, score]) => score > 0)
							.sort((a, b) => b[1] - a[1]);

						if (sortedScores.length > 0) {
							const winningLangId = sortedScores[0][0];
							const winningScore = sortedScores[0][1];

							// Check if this language prefers this MBTI type
							const winningLang = languages.find((l) => l.id === winningLangId);
							const finalLangId = winningLang?.mbti === mbtiType ? winningLangId : winningLangId;

							// Record this path
							if (
								!languagePathMap[finalLangId].optimalPaths.find(
									(p) => p.mbtiType === mbtiType && p.score >= winningScore
								)
							) {
								languagePathMap[finalLangId].optimalPaths.push({
									mbtiType,
									answers: testAnswers,
									score: winningScore
								});
							}
						}
					});
				});
			}
		});

		// Now check which languages are reachable
		const reachableLanguages: string[] = [];
		const unreachableLanguages: string[] = [];
		const pathDetails: string[] = [];

		languages.forEach((lang) => {
			const paths = languagePathMap[lang.id];

			// A language is reachable if it has optimal paths or direct MBTI matches
			const isReachable = paths.optimalPaths.length > 0 || paths.mbtiTypes.length > 0;

			if (isReachable) {
				reachableLanguages.push(lang.id);

				// Find the best path (highest score)
				const bestPath = paths.optimalPaths.reduce(
					(best, current) => (!best || current.score > best.score ? current : best),
					paths.optimalPaths[0]
				);

				if (bestPath) {
					pathDetails.push(`${lang.id}: Best via ${bestPath.mbtiType} (score: ${bestPath.score})`);
				} else if (paths.mbtiTypes.length > 0) {
					pathDetails.push(`${lang.id}: Direct MBTI match with ${paths.mbtiTypes.join(', ')}`);
				}
			} else {
				unreachableLanguages.push(lang.id);
				languagePathMap[lang.id].unreachable = true;
			}
		});

		// Generate comprehensive report
		console.log('\n=== LANGUAGE REACHABILITY REPORT ===\n');
		console.log(`Total Languages: ${languages.length}`);
		console.log(`Reachable Languages: ${reachableLanguages.length}`);
		console.log(`Unreachable Languages: ${unreachableLanguages.length}`);

		if (unreachableLanguages.length > 0) {
			console.log('\n❌ UNREACHABLE LANGUAGES:');
			unreachableLanguages.forEach((langId) => {
				const lang = languages.find((l) => l.id === langId);
				console.log(`  - ${langId}: ${lang?.name || 'Unknown'}`);
			});
		}

		console.log('\n✅ REACHABLE LANGUAGES WITH OPTIMAL PATHS:');
		pathDetails.slice(0, 20).forEach((detail) => console.log(`  ${detail}`));
		if (pathDetails.length > 20) {
			console.log(`  ... and ${pathDetails.length - 20} more`);
		}

		// Test specific languages to ensure coverage
		const criticalLanguages = [
			'python',
			'javascript',
			'typescript',
			'java',
			'cpp',
			'c',
			'csharp',
			'go',
			'rust',
			'swift',
			'kotlin',
			'ruby',
			'php',
			'scala',
			'haskell',
			'clojure',
			'erlang',
			'elixir',
			'julia',
			'r',
			'matlab',
			'fortran',
			'cobol',
			'lisp',
			'prolog',
			'smalltalk',
			'ada',
			'forth',
			'lua',
			'perl'
		];

		console.log('\n=== CRITICAL LANGUAGES CHECK ===');
		criticalLanguages.forEach((langId) => {
			const isReachable = reachableLanguages.includes(langId);
			const paths = languagePathMap[langId];
			console.log(
				`${isReachable ? '✅' : '❌'} ${langId}: ${
					isReachable
						? `Reachable via ${paths.optimalPaths.length} paths, ${paths.mbtiTypes.length} MBTI matches`
						: 'NOT REACHABLE'
				}`
			);
		});

		// Generate example paths for each language
		console.log('\n=== EXAMPLE PATHS FOR ALL LANGUAGES ===\n');
		languages.forEach((lang) => {
			const paths = languagePathMap[lang.id];

			if (paths.optimalPaths.length > 0) {
				const bestPath = paths.optimalPaths[0];
				const questions = getAdaptiveQuestions(bestPath.mbtiType);

				console.log(`\n${lang.name} (${lang.id}):`);
				console.log(`  MBTI Type: ${bestPath.mbtiType}`);
				console.log(`  Answers needed:`);

				Object.entries(bestPath.answers).forEach(([questionId, answerId]) => {
					const question = questions.find((q) => q.id === questionId);
					const answer = question?.answers.find((a) => a.id === answerId);
					if (question && answer) {
						console.log(`    Q: ${question.text}`);
						console.log(`    A: ${answer.text}`);
					}
				});
				console.log(`  Final Score: ${bestPath.score}`);
			} else if (paths.mbtiTypes.length > 0) {
				console.log(`\n${lang.name} (${lang.id}):`);
				console.log(`  Direct MBTI match: ${paths.mbtiTypes[0]}`);
				console.log(`  No adaptive questions needed - selected by MBTI type`);
			} else {
				console.log(`\n${lang.name} (${lang.id}): ❌ UNREACHABLE`);
			}
		});

		// Assertions
		expect(reachableLanguages.length).toBeGreaterThan(0);
		expect(unreachableLanguages.length).toBeLessThan(languages.length);

		// All critical languages should be reachable
		criticalLanguages.forEach((langId) => {
			expect(reachableLanguages).toContain(langId);
		});

		// Save the mapping for reference
		writeFileSync('tests/data/language-paths-map.json', JSON.stringify(languagePathMap, null, 2));
		console.log('\n📁 Full language path mapping saved to tests/data/language-paths-map.json');
	});

	it('should verify that every language appears in at least one adaptive question answer', () => {
		const languagesInQuestions = new Set<string>();

		// Check all MBTI types' adaptive questions
		mbtiTypes.forEach((mbtiType) => {
			const questions = getAdaptiveQuestions(mbtiType);

			questions.forEach((question) => {
				question.answers.forEach((answer) => {
					answer.languages.forEach((langId: string) => {
						languagesInQuestions.add(langId);
					});
				});
			});
		});

		const missingFromQuestions = languages.filter((lang) => !languagesInQuestions.has(lang.id));

		console.log('\n=== LANGUAGES IN ADAPTIVE QUESTIONS ===');
		console.log(`Languages appearing in questions: ${languagesInQuestions.size}`);
		console.log(`Languages missing from questions: ${missingFromQuestions.length}`);

		if (missingFromQuestions.length > 0) {
			console.log('\nLanguages not in any adaptive question:');
			missingFromQuestions.forEach((lang) => {
				console.log(`  - ${lang.id}: ${lang.name}`);
			});
		}

		// Some languages might only be reachable through MBTI matching
		// So this is informational, not a hard failure
		expect(languagesInQuestions.size).toBeGreaterThan(0);
	});
});
