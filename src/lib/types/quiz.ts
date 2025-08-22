export interface MBTIAnswer {
	id: string;
	text: string;
	dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface MBTIQuestion {
	id: string;
	text: string;
	dimension: 'EI' | 'SN' | 'TF' | 'JP';
	answers: MBTIAnswer[];
}

export interface LanguageAnswer {
	id: string;
	text: string;
	languages: string[]; // Language IDs this answer favors
}

export interface LanguageQuestion {
	id: string;
	text: string;
	category: 'domain' | 'style' | 'team' | 'performance' | 'ecosystem' | 'learning';
	answers: LanguageAnswer[];
}

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
	mbti?: string;
	icon: string;
	color: string;
}

export interface QuizState {
	phase: 'mbti' | 'language' | 'completed';
	currentQuestionIndex: number;
	mbtiAnswers: Record<string, string>;
	languageAnswers: Record<string, string>;
	mbtiType: string;
	candidateLanguages: string[];
	scores: Record<string, number>;
	completed: boolean;
	result: Language | null;
}
