import type { Language } from '$lib/types/quiz';

export const languages: Language[] = [
	{
		id: 'python',
		name: 'Python',
		description: 'A versatile, beginner-friendly language known for its clean syntax',
		strengths: ['Easy to learn', 'Great libraries', 'Versatile', 'Strong community'],
		useCases: ['Data Science', 'Web Development', 'Automation', 'Machine Learning'],
		personality: 'You value clarity and simplicity. You prefer getting things done efficiently over complex solutions.',
		icon: '🐍',
		color: '#3776AB'
	},
	{
		id: 'javascript',
		name: 'JavaScript',
		description: 'The language of the web, flexible and everywhere',
		strengths: ['Runs everywhere', 'Huge ecosystem', 'Flexible', 'Active community'],
		useCases: ['Web Development', 'Mobile Apps', 'Server-side', 'Desktop Apps'],
		personality: 'You are creative and adaptable. You thrive in dynamic environments and enjoy seeing immediate results.',
		icon: '⚡',
		color: '#F7DF1E'
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		description: 'JavaScript with type safety and better tooling',
		strengths: ['Type safety', 'Better IDE support', 'Scalable', 'JavaScript compatible'],
		useCases: ['Large Applications', 'Enterprise Software', 'Modern Web Apps', 'Libraries'],
		personality: 'You appreciate structure but still want flexibility. You believe in preventing errors before they happen.',
		icon: '🔷',
		color: '#3178C6'
	},
	{
		id: 'rust',
		name: 'Rust',
		description: 'A systems programming language focused on safety and performance',
		strengths: ['Memory safe', 'Fast', 'Concurrent', 'Zero-cost abstractions'],
		useCases: ['Systems Programming', 'WebAssembly', 'Game Engines', 'Embedded Systems'],
		personality: 'You are detail-oriented and value correctness. Performance and safety are your top priorities.',
		icon: '🦀',
		color: '#CE4A16'
	},
	{
		id: 'go',
		name: 'Go',
		description: 'Simple, efficient, and built for modern systems',
		strengths: ['Simple syntax', 'Fast compilation', 'Built-in concurrency', 'Great tooling'],
		useCases: ['Cloud Services', 'DevOps Tools', 'Microservices', 'Network Programming'],
		personality: 'You are pragmatic and efficient. You prefer simple solutions that work well at scale.',
		icon: '🐹',
		color: '#00ADD8'
	},
	{
		id: 'java',
		name: 'Java',
		description: 'Enterprise-ready, platform-independent, and mature',
		strengths: ['Platform independent', 'Mature ecosystem', 'Strong typing', 'Enterprise support'],
		useCases: ['Enterprise Applications', 'Android Development', 'Web Services', 'Big Data'],
		personality: 'You value stability and proven solutions. You appreciate comprehensive tooling and established patterns.',
		icon: '☕',
		color: '#007396'
	},
	{
		id: 'cpp',
		name: 'C++',
		description: 'Powerful, complex, and gives you complete control',
		strengths: ['High performance', 'Hardware control', 'Large ecosystem', 'Versatile'],
		useCases: ['Game Development', 'System Software', 'Embedded Systems', 'High-Performance Computing'],
		personality: 'You want complete control and maximum performance. Complexity does not scare you.',
		icon: '⚙️',
		color: '#00599C'
	},
	{
		id: 'ruby',
		name: 'Ruby',
		description: 'Optimized for developer happiness and productivity',
		strengths: ['Expressive syntax', 'Developer friendly', 'Great for prototyping', 'Strong conventions'],
		useCases: ['Web Development', 'Scripting', 'Prototyping', 'DevOps'],
		personality: 'You value developer happiness and elegant code. You believe programming should be enjoyable.',
		icon: '💎',
		color: '#CC342D'
	},
	{
		id: 'swift',
		name: 'Swift',
		description: 'Modern, safe, and designed for Apple platforms',
		strengths: ['Modern syntax', 'Safe', 'Fast', 'Great for iOS'],
		useCases: ['iOS Development', 'macOS Apps', 'Server-side Swift', 'Cross-platform'],
		personality: 'You appreciate modern design and safety. You likely enjoy working in the Apple ecosystem.',
		icon: '🦉',
		color: '#FA7343'
	},
	{
		id: 'haskell',
		name: 'Haskell',
		description: 'Pure functional programming with strong mathematical foundations',
		strengths: ['Pure functional', 'Strong type system', 'Lazy evaluation', 'Mathematical'],
		useCases: ['Academic Research', 'Financial Systems', 'Compilers', 'Formal Verification'],
		personality: 'You think mathematically and love elegant abstractions. You believe in correctness through types.',
		icon: '🎓',
		color: '#5D4F85'
	}
];