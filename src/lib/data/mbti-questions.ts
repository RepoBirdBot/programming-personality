import type { MBTIQuestion } from '$lib/types/quiz';

// General personality questions that map to programming preferences without being technical
export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion - 2 Questions
	{
		id: 'ei1',
		text: 'When faced with a complex puzzle or challenge, you prefer to:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei1e',
				text: 'Talk it through with others to generate ideas',
				dimension: 'E'
			},
			{
				id: 'ei1i',
				text: 'Work through it quietly in your own head first',
				dimension: 'I'
			}
		]
	},
	{
		id: 'ei2',
		text: "When learning something completely new, you're most comfortable:",
		dimension: 'EI',
		answers: [
			{
				id: 'ei2e',
				text: 'In a group class or workshop setting',
				dimension: 'E'
			},
			{
				id: 'ei2i',
				text: 'With self-paced materials you can explore alone',
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
		text: 'When choosing between options, you value:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn2s',
				text: 'Proven track record and concrete examples of success',
				dimension: 'S'
			},
			{
				id: 'sn2n',
				text: 'Innovative potential and future possibilities',
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
		text: "When giving feedback on someone's work, you:",
		dimension: 'TF',
		answers: [
			{
				id: 'tf2t',
				text: 'Focus on what needs improvement directly',
				dimension: 'T'
			},
			{
				id: 'tf2f',
				text: 'Start with positives before suggesting changes',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving - 2 Questions
	{
		id: 'jp1',
		text: 'When working on projects, you prefer:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp1j',
				text: 'Detailed plans with clear milestones set in advance',
				dimension: 'J'
			},
			{
				id: 'jp1p',
				text: 'Flexible goals that can adapt as you learn more',
				dimension: 'P'
			}
		]
	},
	{
		id: 'jp2',
		text: 'As deadlines approach, you tend to:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp2j',
				text: 'Have everything completed well in advance',
				dimension: 'J'
			},
			{
				id: 'jp2p',
				text: 'Use the pressure to fuel last-minute creativity',
				dimension: 'P'
			}
		]
	}
];
