import { writable } from 'svelte/store';
import type { QuizState, Language } from '$lib/types/quiz';
import { questions } from '$lib/data/questions';
import { languages } from '$lib/data/languages';

const initialState: QuizState = {
	currentQuestionIndex: 0,
	answers: {},
	scores: {},
	completed: false,
	result: null
};

function createQuizStore() {
	const { subscribe, set, update } = writable<QuizState>(initialState);

	return {
		subscribe,
		answerQuestion: (questionId: string, answerId: string) => {
			update((state) => {
				const newState = { ...state };
				newState.answers[questionId] = answerId;

				const question = questions.find((q) => q.id === questionId);
				const answer = question?.answers.find((a) => a.id === answerId);

				if (answer) {
					Object.entries(answer.weights).forEach(([langId, weight]) => {
						newState.scores[langId] = (newState.scores[langId] || 0) + weight;
					});
				}

				if (newState.currentQuestionIndex < questions.length - 1) {
					newState.currentQuestionIndex++;
				} else {
					newState.completed = true;
					newState.result = calculateResult(newState.scores);
				}

				return newState;
			});
		},
		reset: () => set(initialState)
	};
}

function calculateResult(scores: Record<string, number>): Language {
	let maxScore = 0;
	let resultId = 'python';

	Object.entries(scores).forEach(([langId, score]) => {
		if (score > maxScore) {
			maxScore = score;
			resultId = langId;
		}
	});

	return languages.find((lang) => lang.id === resultId) || languages[0];
}

export const quizStore = createQuizStore();
