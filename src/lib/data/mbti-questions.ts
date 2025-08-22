import type { MBTIQuestion } from '$lib/types/quiz';

export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion
	{
		id: 'mbti1',
		text: 'After a long coding session with your team, you typically:',
		dimension: 'EI',
		answers: [
			{
				id: 'mbti1a',
				text: 'Feel energized and want to discuss ideas more',
				dimension: 'E'
			},
			{
				id: 'mbti1b',
				text: 'Need some quiet time alone to recharge',
				dimension: 'I'
			}
		]
	},
	{
		id: 'mbti2',
		text: 'When joining a new development team, you:',
		dimension: 'EI',
		answers: [
			{
				id: 'mbti2a',
				text: 'Actively introduce yourself and start conversations',
				dimension: 'E'
			},
			{
				id: 'mbti2b',
				text: 'Observe first and let relationships develop naturally',
				dimension: 'I'
			}
		]
	},

	// Sensing vs Intuition
	{
		id: 'mbti3',
		text: 'When learning a new technology, you prefer to:',
		dimension: 'SN',
		answers: [
			{
				id: 'mbti3a',
				text: 'Start with hands-on examples and practical tutorials',
				dimension: 'S'
			},
			{
				id: 'mbti3b',
				text: 'Understand the underlying concepts and theory first',
				dimension: 'N'
			}
		]
	},
	{
		id: 'mbti4',
		text: 'Your code tends to focus more on:',
		dimension: 'SN',
		answers: [
			{
				id: 'mbti4a',
				text: 'Solving the immediate problem with proven solutions',
				dimension: 'S'
			},
			{
				id: 'mbti4b',
				text: 'Creating flexible abstractions for future possibilities',
				dimension: 'N'
			}
		]
	},

	// Thinking vs Feeling
	{
		id: 'mbti5',
		text: 'In code reviews, you prioritize:',
		dimension: 'TF',
		answers: [
			{
				id: 'mbti5a',
				text: 'Logic, efficiency, and objective correctness',
				dimension: 'T'
			},
			{
				id: 'mbti5b',
				text: 'Team harmony and constructive, supportive feedback',
				dimension: 'F'
			}
		]
	},
	{
		id: 'mbti6',
		text: 'When choosing between technical solutions, you value:',
		dimension: 'TF',
		answers: [
			{
				id: 'mbti6a',
				text: 'The most logical and performant approach',
				dimension: 'T'
			},
			{
				id: 'mbti6b',
				text: 'The solution that the team is most comfortable with',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving
	{
		id: 'mbti7',
		text: 'Your ideal development process involves:',
		dimension: 'JP',
		answers: [
			{
				id: 'mbti7a',
				text: 'Clear plans, deadlines, and structured workflows',
				dimension: 'J'
			},
			{
				id: 'mbti7b',
				text: 'Flexibility to explore and adapt as you go',
				dimension: 'P'
			}
		]
	},
	{
		id: 'mbti8',
		text: 'You feel most productive when:',
		dimension: 'JP',
		answers: [
			{
				id: 'mbti8a',
				text: 'Following a well-defined roadmap to completion',
				dimension: 'J'
			},
			{
				id: 'mbti8b',
				text: 'Keeping options open and iterating freely',
				dimension: 'P'
			}
		]
	}
];
