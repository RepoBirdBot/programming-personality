import { writable } from 'svelte/store';
import type { QuizState, Language } from '$lib/types/quiz';
import { mbtiQuestions } from '$lib/data/mbti-questions';
import { languageQuestions } from '$lib/data/language-questions';
import { languages, languageMBTIMapping } from '$lib/data/languages';

const initialState: QuizState = {
	phase: 'mbti',
	currentQuestionIndex: 0,
	mbtiAnswers: {},
	languageAnswers: {},
	mbtiType: '',
	candidateLanguages: [],
	scores: {},
	completed: false,
	result: null
};

function createQuizStore() {
	const { subscribe, set, update } = writable<QuizState>(initialState);

	return {
		subscribe,
		answerMBTIQuestion: (questionId: string, answerId: string) => {
			update((state) => {
				const newState = { ...state };
				newState.mbtiAnswers[questionId] = answerId;

				// Check if all MBTI questions answered
				if (Object.keys(newState.mbtiAnswers).length === mbtiQuestions.length) {
					// Calculate MBTI type
					newState.mbtiType = calculateMBTIType(newState.mbtiAnswers);

					// Get candidate languages for this MBTI type
					newState.candidateLanguages = getCandidateLanguages(newState.mbtiType);

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
				const newState = { ...state };
				newState.languageAnswers[questionId] = answerId;

				// Find the answer and update scores
				const question = languageQuestions.find((q) => q.id === questionId);
				const answer = question?.answers.find((a) => a.id === answerId);

				if (answer) {
					// Increase score for languages mentioned in this answer
					answer.languages.forEach((langId) => {
						// Only score if it's a candidate language
						if (newState.candidateLanguages.includes(langId)) {
							newState.scores[langId] = (newState.scores[langId] || 0) + 1;
						}
					});
				}

				// Check if all language questions answered
				if (Object.keys(newState.languageAnswers).length === languageQuestions.length) {
					newState.completed = true;
					newState.phase = 'completed';
					newState.result = calculateResult(
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
		reset: () => set(initialState)
	};
}

function calculateMBTIType(answers: Record<string, string>): string {
	const dimensions = {
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

function getCandidateLanguages(mbtiType: string): string[] {
	// Find all languages that match this MBTI type
	const candidates: string[] = [];

	Object.entries(languageMBTIMapping).forEach(([langId, langMbti]) => {
		if (langMbti === mbtiType) {
			candidates.push(langId);
		}
	});

	// If we have too few candidates (less than 3), add similar MBTI types
	if (candidates.length < 3) {
		// Find languages with 3 matching letters
		Object.entries(languageMBTIMapping).forEach(([langId, langMbti]) => {
			if (!candidates.includes(langId)) {
				let matches = 0;
				for (let i = 0; i < 4; i++) {
					if (mbtiType[i] === langMbti[i]) matches++;
				}
				if (matches >= 3) {
					candidates.push(langId);
				}
			}
		});
	}

	// If still too few, add languages with 2 matching letters
	if (candidates.length < 5) {
		Object.entries(languageMBTIMapping).forEach(([langId, langMbti]) => {
			if (!candidates.includes(langId)) {
				let matches = 0;
				for (let i = 0; i < 4; i++) {
					if (mbtiType[i] === langMbti[i]) matches++;
				}
				if (matches >= 2) {
					candidates.push(langId);
				}
			}
		});
	}

	// Limit to top 20 candidates
	return candidates.slice(0, 20);
}

function calculateResult(
	scores: Record<string, number>,
	candidates: string[],
	mbtiType: string
): Language {
	// Find the language with the highest score among candidates
	let maxScore = -1;
	let resultId = candidates[0] || 'python';

	candidates.forEach((langId) => {
		const score = scores[langId] || 0;
		if (score > maxScore) {
			maxScore = score;
			resultId = langId;
		}
	});

	// Find the language object
	let result = languages.find((lang) => lang.id === resultId);

	// If not found in our detailed languages, create a basic one
	if (!result) {
		result = {
			id: resultId,
			name: resultId.charAt(0).toUpperCase() + resultId.slice(1),
			description: `A ${mbtiType} language that matches your personality`,
			strengths: ['Matches your MBTI type', 'Suits your preferences'],
			useCases: ['Your preferred domains'],
			personality: `Perfect for ${mbtiType} personality types`,
			mbti: mbtiType,
			icon: '💻',
			color: '#666'
		};
	} else {
		// Add MBTI to existing language
		result = { ...result, mbti: mbtiType };
	}

	return result;
}

export const quizStore = createQuizStore();
