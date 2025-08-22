import type { Question } from '$lib/types/quiz';

export const questions: Question[] = [
	{
		id: 'q1',
		text: 'How do you prefer to solve problems?',
		answers: [
			{
				id: 'a1',
				text: 'Start coding immediately and figure it out as I go',
				weights: { javascript: 3, ruby: 2, python: 1 }
			},
			{
				id: 'a2',
				text: 'Plan everything carefully before writing any code',
				weights: { java: 3, cpp: 2, rust: 2, haskell: 1 }
			},
			{
				id: 'a3',
				text: 'Find a working solution quickly, then refine it',
				weights: { python: 3, go: 2, javascript: 1 }
			},
			{
				id: 'a4',
				text: 'Research the most elegant and efficient approach',
				weights: { haskell: 3, rust: 2, cpp: 1 }
			}
		]
	},
	{
		id: 'q2',
		text: 'What kind of projects excite you the most?',
		answers: [
			{
				id: 'a5',
				text: 'Interactive web applications with dynamic UIs',
				weights: { javascript: 3, typescript: 2, ruby: 1 }
			},
			{
				id: 'a6',
				text: 'Data analysis and machine learning models',
				weights: { python: 3, java: 1, haskell: 1 }
			},
			{
				id: 'a7',
				text: 'System utilities and performance-critical software',
				weights: { rust: 3, cpp: 3, go: 2 }
			},
			{
				id: 'a8',
				text: 'Mobile apps with great user experiences',
				weights: { swift: 3, java: 2, javascript: 1 }
			}
		]
	},
	{
		id: 'q3',
		text: 'How do you feel about type systems?',
		answers: [
			{
				id: 'a9',
				text: 'Types slow me down; I prefer dynamic flexibility',
				weights: { javascript: 3, python: 2, ruby: 2 }
			},
			{
				id: 'a10',
				text: 'I like optional types that I can add when needed',
				weights: { typescript: 3, python: 1, javascript: 1 }
			},
			{
				id: 'a11',
				text: 'Strong typing prevents bugs and helps me think clearly',
				weights: { java: 2, rust: 3, haskell: 2, go: 1 }
			},
			{
				id: 'a12',
				text: 'Types should be inferred when possible, explicit when necessary',
				weights: { swift: 3, rust: 2, haskell: 2, typescript: 1 }
			}
		]
	},
	{
		id: 'q4',
		text: 'What is your approach to error handling?',
		answers: [
			{
				id: 'a13',
				text: 'Exceptions are fine; try-catch works well',
				weights: { java: 3, python: 2, javascript: 1, cpp: 1 }
			},
			{
				id: 'a14',
				text: 'Errors should be explicit return values',
				weights: { go: 3, rust: 3, swift: 1 }
			},
			{
				id: 'a15',
				text: 'I prefer functional approaches like Maybe/Option types',
				weights: { haskell: 3, rust: 2, swift: 1 }
			},
			{
				id: 'a16',
				text: 'Keep it simple with basic error checking',
				weights: { python: 2, javascript: 2, ruby: 1 }
			}
		]
	},
	{
		id: 'q5',
		text: 'How important is performance to you?',
		answers: [
			{
				id: 'a17',
				text: 'Critical - every millisecond counts',
				weights: { rust: 3, cpp: 3, go: 1 }
			},
			{
				id: 'a18',
				text: 'Important, but not at the cost of readability',
				weights: { go: 3, java: 2, swift: 1 }
			},
			{
				id: 'a19',
				text: 'Developer productivity matters more than raw speed',
				weights: { python: 3, ruby: 3, javascript: 1 }
			},
			{
				id: 'a20',
				text: 'It depends on the specific use case',
				weights: { typescript: 2, java: 1, python: 1, rust: 1 }
			}
		]
	},
	{
		id: 'q6',
		text: 'What is your preferred development environment?',
		answers: [
			{
				id: 'a21',
				text: 'Terminal-based tools and minimal setup',
				weights: { go: 3, rust: 2, python: 1, ruby: 1 }
			},
			{
				id: 'a22',
				text: 'Full-featured IDE with all the bells and whistles',
				weights: { java: 3, cpp: 2, swift: 2 }
			},
			{
				id: 'a23',
				text: 'Lightweight editor with good extensions',
				weights: { javascript: 3, typescript: 2, python: 2 }
			},
			{
				id: 'a24',
				text: 'Whatever helps me be most productive',
				weights: { python: 2, javascript: 1, go: 1, ruby: 1 }
			}
		]
	},
	{
		id: 'q7',
		text: 'How do you feel about learning curves?',
		answers: [
			{
				id: 'a25',
				text: 'I want to be productive immediately',
				weights: { python: 3, javascript: 2, go: 2, ruby: 1 }
			},
			{
				id: 'a26',
				text: 'I enjoy mastering complex concepts over time',
				weights: { haskell: 3, rust: 2, cpp: 2 }
			},
			{
				id: 'a27',
				text: 'Moderate learning curve with good documentation',
				weights: { java: 2, typescript: 2, swift: 2, go: 1 }
			},
			{
				id: 'a28',
				text: 'I prefer familiar concepts in new packages',
				weights: { typescript: 3, swift: 1, java: 1 }
			}
		]
	},
	{
		id: 'q8',
		text: 'What matters most in your code?',
		answers: [
			{
				id: 'a29',
				text: 'Readability and maintainability',
				weights: { python: 3, go: 2, ruby: 2, java: 1 }
			},
			{
				id: 'a30',
				text: 'Performance and efficiency',
				weights: { rust: 3, cpp: 3, go: 1 }
			},
			{
				id: 'a31',
				text: 'Flexibility and expressiveness',
				weights: { javascript: 3, ruby: 2, python: 1 }
			},
			{
				id: 'a32',
				text: 'Correctness and reliability',
				weights: { rust: 3, haskell: 3, java: 1, typescript: 1 }
			}
		]
	}
];
