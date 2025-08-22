export interface Answer {
	id: string;
	text: string;
	weights: Record<string, number>;
}

export interface Question {
	id: string;
	text: string;
	answers: Answer[];
}

export interface Language {
	id: string;
	name: string;
	description: string;
	strengths: string[];
	useCases: string[];
	personality: string;
	icon: string;
	color: string;
}

export interface QuizState {
	currentQuestionIndex: number;
	answers: Record<string, string>;
	scores: Record<string, number>;
	completed: boolean;
	result: Language | null;
}