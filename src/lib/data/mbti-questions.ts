import type { MBTIQuestion } from '$lib/types/quiz';

// Improved MBTI questions with concrete scenarios and software engineering focus
export const mbtiQuestions: MBTIQuestion[] = [
	// Extraversion vs Introversion - 2 Questions
	{
		id: 'ei1',
		text: "When you encounter a challenging technical problem you've never seen before, your first instinct is to:",
		dimension: 'EI',
		answers: [
			{
				id: 'ei1e',
				text: 'Immediately reach out to colleagues or post in team chat to discuss approaches',
				dimension: 'E'
			},
			{
				id: 'ei1i',
				text: 'Spend significant time researching and thinking through the problem independently first',
				dimension: 'I'
			}
		]
	},
	{
		id: 'ei2',
		text: 'When learning a new framework or technology, you:',
		dimension: 'EI',
		answers: [
			{
				id: 'ei2e',
				text: 'Join community forums, attend meetups, or find study groups to learn with others',
				dimension: 'E'
			},
			{
				id: 'ei2i',
				text: 'Work through documentation, tutorials, and examples on your own pace',
				dimension: 'I'
			}
		]
	},

	// Sensing vs Intuition - 2 Questions
	{
		id: 'sn1',
		text: 'When debugging a complex issue, you prefer to:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn1s',
				text: 'Start with error logs, stack traces, and step through the code line by line',
				dimension: 'S'
			},
			{
				id: 'sn1n',
				text: 'Form hypotheses about root causes and test broad architectural assumptions first',
				dimension: 'N'
			}
		]
	},
	{
		id: 'sn2',
		text: 'When evaluating a new tool or library for your project, you prioritize:',
		dimension: 'SN',
		answers: [
			{
				id: 'sn2s',
				text: 'Proven track record, stability, and detailed documentation with examples',
				dimension: 'S'
			},
			{
				id: 'sn2n',
				text: 'Innovative potential, future roadmap, and how it could transform your architecture',
				dimension: 'N'
			}
		]
	},

	// Thinking vs Feeling - 2 Questions
	{
		id: 'tf1',
		text: 'When choosing between two technically viable solutions, you decide based on:',
		dimension: 'TF',
		answers: [
			{
				id: 'tf1t',
				text: 'Objective metrics like performance benchmarks, maintainability scores, and technical debt',
				dimension: 'T'
			},
			{
				id: 'tf1f',
				text: 'Team preferences, developer experience, and which solution the team feels more confident with',
				dimension: 'F'
			}
		]
	},
	{
		id: 'tf2',
		text: "When you notice a teammate's code has significant issues, you:",
		dimension: 'TF',
		answers: [
			{
				id: 'tf2t',
				text: 'Point out the technical problems directly and suggest specific improvements',
				dimension: 'T'
			},
			{
				id: 'tf2f',
				text: 'Start by acknowledging what works well, then gently suggest areas for improvement',
				dimension: 'F'
			}
		]
	},

	// Judging vs Perceiving - 2 Questions
	{
		id: 'jp1',
		text: 'Your ideal sprint planning approach is:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp1j',
				text: 'Detailed task breakdown with clear acceptance criteria and time estimates upfront',
				dimension: 'J'
			},
			{
				id: 'jp1p',
				text: 'High-level goals with flexibility to adapt tasks and priorities as you learn more',
				dimension: 'P'
			}
		]
	},
	{
		id: 'jp2',
		text: 'When preparing for a release, you prefer to:',
		dimension: 'JP',
		answers: [
			{
				id: 'jp2j',
				text: 'Follow a predetermined checklist and freeze code changes well before the deadline',
				dimension: 'J'
			},
			{
				id: 'jp2p',
				text: 'Continue iterating and improving features right up until the release deadline',
				dimension: 'P'
			}
		]
	}
];
