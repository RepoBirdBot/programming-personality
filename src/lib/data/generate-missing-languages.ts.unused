import { languageMBTIMapping } from './languages';
import type { Language, MBTIType } from '$lib/types/quiz';

// Helper to generate missing language entries
// This file helps identify which languages need to be added to the languages array

const currentLanguageIds = [
	'python',
	'javascript',
	'typescript',
	'rust',
	'go',
	'java',
	'cpp',
	'ruby',
	'swift',
	'haskell',
	'csharp',
	'c',
	'php',
	'kotlin',
	'r',
	'matlab',
	'scala',
	'dart',
	'objectivec',
	'perl',
	'lua',
	'julia',
	'elixir',
	'clojure',
	'fsharp',
	'erlang',
	'visualbasic',
	'delphi',
	'cobol'
];

const allMBTILanguageIds = Object.keys(languageMBTIMapping);

export const missingLanguageIds = allMBTILanguageIds.filter(
	(id) => !currentLanguageIds.includes(id)
);

console.log(`Total MBTI mapped languages: ${allMBTILanguageIds.length}`);
console.log(`Currently implemented: ${currentLanguageIds.length}`);
console.log(`Missing: ${missingLanguageIds.length}`);
console.log('\nMissing language IDs:', missingLanguageIds);

// Template for missing languages
export const generateLanguageTemplates = (): Partial<Language>[] => {
	return missingLanguageIds.map((id) => ({
		id,
		name: id.charAt(0).toUpperCase() + id.slice(1),
		description: `Description for ${id}`,
		strengths: ['Strength 1', 'Strength 2', 'Strength 3', 'Strength 4'],
		useCases: ['Use Case 1', 'Use Case 2', 'Use Case 3', 'Use Case 4'],
		personality: `Personality description for ${id}`,
		mbti: languageMBTIMapping[id] as MBTIType,
		icon: '🔧',
		color: '#000000'
	}));
};
