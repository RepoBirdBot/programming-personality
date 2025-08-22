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

// All 16 MBTI personality types
export const MBTI_TYPES = [
	'ISTJ',
	'ISFJ',
	'INFJ',
	'INTJ',
	'ISTP',
	'ISFP',
	'INFP',
	'INTP',
	'ESTP',
	'ESFP',
	'ENFP',
	'ENTP',
	'ESTJ',
	'ESFJ',
	'ENFJ',
	'ENTJ'
] as const;

export type MBTIType = (typeof MBTI_TYPES)[number];

export type PrimaryDomain =
	| 'web_frontend'
	| 'web_backend'
	| 'mobile'
	| 'data_science'
	| 'systems'
	| 'embedded'
	| 'enterprise'
	| 'scripting'
	| 'academic';
export type PerformanceNeeds = 'critical' | 'important' | 'moderate' | 'flexible';
export type EcosystemMaturity = 'bleeding_edge' | 'modern' | 'mature' | 'legacy';
export type SyntaxStyle = 'minimal' | 'expressive' | 'verbose' | 'symbolic';
export type LearningCurve = 'gentle' | 'moderate' | 'steep' | 'extreme';
export type Paradigm = 'procedural' | 'object_oriented' | 'functional' | 'multi_paradigm';

export interface Language {
	id: string;
	name: string;
	description: string;
	strengths: string[];
	useCases: string[];
	personality: string;
	mbti: MBTIType;
	icon: string;
	color: string;
	imgURL?: string;
	primaryDomain?: PrimaryDomain;
	performanceNeeds?: PerformanceNeeds;
	ecosystemMaturity?: EcosystemMaturity;
	syntaxStyle?: SyntaxStyle;
	learningCurve?: LearningCurve;
	paradigm?: Paradigm;
	// New fields from Wikipedia comparison
	originalPurpose?: string;
	imperative?: boolean;
	objectOriented?: boolean;
	functional?: boolean;
	procedural?: boolean;
	generic?: boolean;
	reflective?: boolean;
	eventDriven?: boolean;
	concurrent?: boolean;
	standardized?: boolean;
	yearCreated?: number;
	typing?: 'static' | 'dynamic' | 'gradual' | 'duck';
	memoryManagement?: 'manual' | 'garbage_collected' | 'reference_counting' | 'automatic';
	compiled?: boolean;
	interpreted?: boolean;
	vm?: boolean; // Virtual Machine based
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
	adaptiveQuestions?: LanguageQuestion[];
}
