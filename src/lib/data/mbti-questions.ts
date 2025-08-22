import type { MBTIQuestion } from '$lib/types/quiz';

// Minimal, research-based MBTI questions with high discriminatory power
export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion - Energy source is the key indicator
	{
		id: 'ei1',
		text: 'After a day of intense collaboration with your team, you typically:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei1e',
				text: 'Feel energized and want to continue brainstorming',
				dimension: 'E'
			},
			{
				id: 'ei1i',
				text: 'Need quiet time alone to recharge',
				dimension: 'I'
			}
		]
	},

	// Sensing vs Intuition - Concrete vs Abstract information preference
	{
		id: 'sn1',
		text: 'When debugging code, you prefer to:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn1s',
				text: 'Focus on specific error messages and stack traces',
				dimension: 'S'
			},
			{
				id: 'sn1n',
				text: 'Consider the broader patterns and system architecture',
				dimension: 'N'
			}
		]
	},

	// Thinking vs Feeling - Decision criteria
	{
		id: 'tf1',
		text: 'When reviewing code or making technical decisions, you prioritize:',
		dimension: 'TF',
		answers: [
			{
				id: 'tf1t',
				text: 'Objective metrics like performance and correctness',
				dimension: 'T'
			},
			{
				id: 'tf1f',
				text: 'Team consensus and developer experience',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving - Structure preference
	{
		id: 'jp1',
		text: 'Your ideal project workflow is:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp1j',
				text: 'Well-planned sprints with clear deadlines',
				dimension: 'J'
			},
			{
				id: 'jp1p',
				text: 'Flexible iterations that adapt to discoveries',
				dimension: 'P'
			}
		]
	},

	// Second E/I question for reliability
	{
		id: 'ei2',
		text: 'You do your best thinking when:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei2e',
				text: 'Discussing ideas with others',
				dimension: 'E'
			},
			{
				id: 'ei2i',
				text: 'Working through problems alone',
				dimension: 'I'
			}
		]
	},

	// Second S/N question for reliability
	{
		id: 'sn2',
		text: 'You trust solutions that are:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn2s',
				text: 'Proven and tested in production',
				dimension: 'S'
			},
			{
				id: 'sn2n',
				text: 'Innovative and forward-thinking',
				dimension: 'N'
			}
		]
	}
];
