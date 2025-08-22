import { languages, languageMBTIMapping } from './languages';
import type { Language, MBTI_TYPES } from '$lib/types/quiz';

// Runtime validation to ensure all MBTI mapped languages have detailed definitions
export function validateLanguageCoverage(): {
	isComplete: boolean;
	implemented: string[];
	missing: string[];
	coverage: number;
} {
	const implementedIds = languages.map((lang) => lang.id);
	const requiredIds = Object.keys(languageMBTIMapping);
	const missingIds = requiredIds.filter((id) => !implementedIds.includes(id));

	return {
		isComplete: missingIds.length === 0,
		implemented: implementedIds,
		missing: missingIds,
		coverage: (implementedIds.length / requiredIds.length) * 100
	};
}

// Type guard to ensure a language ID exists in our detailed definitions
export function hasDetailedDefinition(
	languageId: string
): languageId is (typeof languages)[number]['id'] {
	return languages.some((lang) => lang.id === languageId);
}

// Get language by ID with fallback to basic definition
export function getLanguageById(id: string): Language {
	// First try to find in detailed definitions
	const detailed = languages.find((lang) => lang.id === id);
	if (detailed) return detailed;

	// Fallback: create basic definition from MBTI mapping
	const mbti = languageMBTIMapping[id];
	if (!mbti) {
		throw new Error(`Language "${id}" not found in MBTI mapping`);
	}

	return {
		id,
		name:
			id.charAt(0).toUpperCase() +
			id
				.slice(1)
				.replace(/([A-Z])/g, ' $1')
				.trim(),
		description: `Programming language with ${mbti} personality traits`,
		strengths: ['To be defined', 'To be defined', 'To be defined', 'To be defined'],
		useCases: ['To be defined', 'To be defined', 'To be defined', 'To be defined'],
		personality: `Suitable for ${mbti} personality types`,
		mbti: mbti as (typeof MBTI_TYPES)[number],
		icon: '🔧',
		color: '#666666'
	};
}

// Development helper - logs missing languages
if (import.meta.env.DEV) {
	const validation = validateLanguageCoverage();
	if (!validation.isComplete) {
		console.warn(
			`⚠️ Language coverage: ${validation.coverage.toFixed(1)}% (${validation.implemented.length}/${validation.implemented.length + validation.missing.length})`,
			'\nMissing languages:',
			validation.missing
		);
	}
}
