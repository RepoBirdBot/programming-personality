import type { MBTIQuestion } from '$lib/types/quiz';

// General personality questions that map to programming preferences without being technical
export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion - 1 Question
	{
		id: 'ei1',
		text: 'After a busy social event or meeting, you usually:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei1e',
				text: 'Feel energized and ready for more interaction',
				dimension: 'E'
			},
			{
				id: 'ei1i',
				text: 'Need some quiet time alone to recharge',
				dimension: 'I'
			}
		]
	},

	// Sensing vs Intuition - 2 Questions
	{
		id: 'sn1',
		text: 'When solving a problem, you tend to:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn1s',
				text: 'Start with the facts and work step-by-step through details',
				dimension: 'S'
			},
			{
				id: 'sn1n',
				text: 'Jump to the big picture and work backwards to specifics',
				dimension: 'N'
			}
		]
	},
	{
		id: 'sn2',
		text: 'When learning something new, you prefer explanations with:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn2s',
				text: 'Specific examples, step-by-step instructions, and practical applications',
				dimension: 'S'
			},
			{
				id: 'sn2n',
				text: 'Overall concepts, underlying principles, and theoretical frameworks',
				dimension: 'N'
			}
		]
	},

	// Thinking vs Feeling - 1 Question
	{
		id: 'tf1',
		text: 'When making important decisions, you prioritize:',
		dimension: 'TF',
		answers: [
			{
				id: 'tf1t',
				text: 'Logic, efficiency, and objective criteria',
				dimension: 'T'
			},
			{
				id: 'tf1f',
				text: 'How it affects people and team dynamics',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving - 1 Question
	{
		id: 'jp1',
		text: 'You work best with:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp1j',
				text: 'Clear plans, deadlines, and defined outcomes',
				dimension: 'J'
			},
			{
				id: 'jp1p',
				text: 'Open options, flexibility, and room to explore',
				dimension: 'P'
			}
		]
	}
];
