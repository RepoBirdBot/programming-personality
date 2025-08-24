import type { MBTIQuestion } from '$lib/types/quiz';

// General personality questions that map to programming preferences without being technical
export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion - 2 Questions
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
	{
		id: 'ei2',
		text: 'When you need to think through something important, you typically:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei2e',
				text: 'Find it helpful to talk it out as you go',
				dimension: 'E'
			},
			{
				id: 'ei2i',
				text: 'Need quiet time to process internally before discussing',
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

	// Thinking vs Feeling - 2 Questions
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
	{
		id: 'tf2',
		text: 'A good solution is one that:',
		dimension: 'TF',
		answers: [
			{
				id: 'tf2t',
				text: 'Is logically sound and consistent, even if unpopular',
				dimension: 'T'
			},
			{
				id: 'tf2f',
				text: 'Everyone affected can feel good about, even if imperfect',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving - 2 Questions
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
	},
	{
		id: 'jp2',
		text: "You're more comfortable when:",
		dimension: 'JP',
		answers: [
			{
				id: 'jp2j',
				text: 'Things are decided and you can plan accordingly',
				dimension: 'J'
			},
			{
				id: 'jp2p',
				text: 'Options stay open and you can adjust as you go',
				dimension: 'P'
			}
		]
	}
];
