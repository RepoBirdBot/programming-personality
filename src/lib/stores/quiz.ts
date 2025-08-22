import { writable } from 'svelte/store';
import type { QuizState, Language, MBTIType } from '$lib/types/quiz';
import { mbtiQuestions } from '$lib/data/mbti-questions';
import { getAdaptiveQuestions } from '$lib/data/adaptive-questions';
import { languages } from '$lib/data/languages';

function createInitialState(): QuizState {
	return {
		phase: 'mbti',
		currentQuestionIndex: 0,
		mbtiAnswers: {},
		languageAnswers: {},
		mbtiType: '',
		candidateLanguages: [],
		scores: {},
		completed: false,
		result: null,
		adaptiveQuestions: []
	};
}


function createQuizStore() {
	const { subscribe, set, update } = writable<QuizState>(createInitialState());

	return {
		subscribe,
		answerMBTIQuestion: (questionId: string, answerId: string) => {
			update((state) => {
				const newState = { 
					...state,
					mbtiAnswers: { ...state.mbtiAnswers, [questionId]: answerId },
					scores: { ...state.scores }
				};

				// Check if all MBTI questions answered
				if (Object.keys(newState.mbtiAnswers).length === mbtiQuestions.length) {
					// Calculate MBTI type
					newState.mbtiType = calculateMBTIType(newState.mbtiAnswers);

					// Get candidate languages for this MBTI type from languages array
					// If no exact matches, use all languages as candidates
					const exactMatches = languages.filter((lang) => lang.mbti === newState.mbtiType);
					if (exactMatches.length > 0) {
						newState.candidateLanguages = exactMatches.map((lang) => lang.id);
					} else {
						// Fallback: use all languages as candidates
						newState.candidateLanguages = languages.map((lang) => lang.id);
					}

					// Generate adaptive questions based on MBTI type
					newState.adaptiveQuestions = getAdaptiveQuestions(newState.mbtiType);

					// Initialize scores for candidate languages
					newState.candidateLanguages.forEach((lang) => {
						newState.scores[lang] = 0;
					});

					// Move to language phase
					newState.phase = 'language';
					newState.currentQuestionIndex = 0;
				} else {
					newState.currentQuestionIndex++;
				}

				return newState;
			});
		},
		answerLanguageQuestion: (questionId: string, answerId: string) => {
			update((state) => {
				const newState = { 
					...state,
					languageAnswers: { ...state.languageAnswers, [questionId]: answerId },
					scores: { ...state.scores }
				};

				// Find the answer and update scores
				const question = state.adaptiveQuestions?.find((q) => q.id === questionId);
				const answer = question?.answers.find((a) => a.id === answerId);

				if (answer && question) {
					// Increase score for ALL languages mentioned in this answer
					// Not just candidates - this allows better differentiation
					answer.languages.forEach((langId) => {
						// Give higher weight to specific trait matches
						const weight =
							question.category === 'domain' ? 3 : question.category === 'performance' ? 2 : 1;
						newState.scores = { 
							...newState.scores, 
							[langId]: (newState.scores[langId] || 0) + weight 
						};
					});
				}

				// Check if all adaptive questions answered
				if (newState.adaptiveQuestions && Object.keys(newState.languageAnswers).length === newState.adaptiveQuestions.length) {
					newState.completed = true;
					newState.phase = 'completed';
					newState.result = calculateEnhancedResult(
						newState.scores,
						newState.candidateLanguages,
						newState.mbtiType
					);
				} else {
					newState.currentQuestionIndex++;
				}

				return newState;
			});
		},
		reset: () => {
			set(createInitialState());
		},
		loadSharedResult: (languageId: string, mbtiType: string) => {
			// Get the full Language object from languages, not just the profile
			const language = languages.find((lang) => lang.id === languageId);
			if (language) {
				set({
					...createInitialState(),
					phase: 'completed',
					completed: true,
					mbtiType: mbtiType,
					result: language
				});
			}
		},
	};
}

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

function calculateEnhancedResult(
	scores: Record<string, number>,
	candidates: string[],
	mbtiType: string
): Language {
	// Get all languages that have scores
	const scoredLanguages = Object.entries(scores)
		.filter(([_, score]) => score > 0)
		.sort((a, b) => b[1] - a[1]);
	
	let resultId = 'python'; // Default fallback
	
	if (scoredLanguages.length > 0) {
		// Pick the highest scoring language
		resultId = scoredLanguages[0][0];
		
		// If there are MBTI matches in the top scorers, prefer those
		const topScore = scoredLanguages[0][1];
		const topScorers = scoredLanguages.filter(([_, score]) => score === topScore);
		
		// Check if any top scorer matches the MBTI type
		const mbtiMatch = topScorers.find(([langId]) => {
			const lang = languages.find(l => l.id === langId);
			return lang?.mbti === mbtiType;
		});
		
		if (mbtiMatch) {
			resultId = mbtiMatch[0];
		}
	} else if (candidates.length > 0) {
		// No scores, pick from candidates
		// Prefer MBTI matches if available
		const mbtiMatch = candidates.find(langId => {
			const lang = languages.find(l => l.id === langId);
			return lang?.mbti === mbtiType;
		});
		resultId = mbtiMatch || candidates[0];
	}

	// Find the language object
	let result = languages.find((lang) => lang.id === resultId);

	// If not found in our detailed languages, fallback
	if (!result) {
		// Fallback for languages not yet fully defined
		result = {
			id: resultId,
			name: resultId.charAt(0).toUpperCase() + resultId.slice(1),
			description: `A ${mbtiType} language that matches your personality`,
			strengths: ['Matches your MBTI type', 'Suits your preferences'],
			useCases: ['Your preferred domains'],
			personality: `Perfect for ${mbtiType} personality types`,
			mbti: mbtiType as MBTIType,
			icon: '💻',
			color: '#666'
		};
	} else {
		// Add MBTI to existing language
		result = { ...result, mbti: mbtiType as MBTIType };
	}

	return result!;
}

export const quizStore = createQuizStore();
