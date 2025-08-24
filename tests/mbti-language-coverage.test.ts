import { languages } from '../src/lib/data/languages';

const ALL_MBTI_TYPES = [
	'INTJ',
	'INTP',
	'ENTJ',
	'ENTP',
	'INFJ',
	'INFP',
	'ENFJ',
	'ENFP',
	'ISTJ',
	'ISFJ',
	'ESTJ',
	'ESFJ',
	'ISTP',
	'ISFP',
	'ESTP',
	'ESFP'
];

function analyzeMBTILanguageCoverage() {
	console.log('=== MBTI LANGUAGE COVERAGE TEST ===\n');

	// Count languages per MBTI type
	const mbtiCounts: Record<string, string[]> = {};

	// Initialize all MBTI types
	ALL_MBTI_TYPES.forEach((type) => {
		mbtiCounts[type] = [];
	});

	// Count languages for each MBTI type
	languages.forEach((lang) => {
		if (lang.mbti) {
			// Handle both array format [primary, secondary?] and potential string format
			const mbtiTypes = Array.isArray(lang.mbti) ? lang.mbti : [lang.mbti];

			mbtiTypes.forEach((mbtiType, index) => {
				if (mbtiType) {
					if (!mbtiCounts[mbtiType]) {
						mbtiCounts[mbtiType] = [];
					}
					// Mark secondary assignments
					const suffix = index === 1 ? ' (2nd)' : '';
					mbtiCounts[mbtiType].push(lang.name + suffix);
				}
			});
		}
	});

	// Check for missing coverage
	const typesWithoutLanguages = ALL_MBTI_TYPES.filter((type) => mbtiCounts[type].length === 0);

	if (typesWithoutLanguages.length > 0) {
		console.log('❌ TEST FAILED: The following MBTI types have NO languages:');
		typesWithoutLanguages.forEach((type) => {
			console.log(`  - ${type}`);
		});
		console.log('\nThis will cause the quiz to fail for users who get these personality types!');
		process.exit(1);
	}

	console.log('✅ TEST PASSED: All 16 MBTI types have at least one language!\n');

	// Display distribution
	console.log('MBTI Type | Count | Languages');
	console.log('----------|-------|------------');

	const sortedMBTI = ALL_MBTI_TYPES.sort((a, b) => {
		return mbtiCounts[b].length - mbtiCounts[a].length;
	});

	sortedMBTI.forEach((type) => {
		const count = mbtiCounts[type].length;
		const languages = mbtiCounts[type].join(', ');
		const indicator = count === 0 ? '❌' : count === 1 ? '⚠️' : '  ';
		console.log(`${type.padEnd(9)} | ${indicator}${String(count).padStart(3)} | ${languages}`);
	});

	// Summary statistics
	console.log('\n=== SUMMARY ===');
	console.log(`Total languages in database: ${languages.length}`);
	console.log(`Total MBTI types: ${ALL_MBTI_TYPES.length}`);

	const typesWithLanguages = ALL_MBTI_TYPES.filter((type) => mbtiCounts[type].length > 0);
	console.log(`MBTI types with languages: ${typesWithLanguages.length}`);
	console.log(`MBTI types without languages: ${typesWithoutLanguages.length}`);

	// Distribution analysis
	const counts = ALL_MBTI_TYPES.map((type) => mbtiCounts[type].length);
	const avgLanguagesPerType = counts.reduce((a, b) => a + b, 0) / ALL_MBTI_TYPES.length;
	const maxLanguages = Math.max(...counts);
	const minLanguages = Math.min(...counts);

	console.log(`\n=== DISTRIBUTION STATS ===`);
	console.log(`Average languages per MBTI type: ${avgLanguagesPerType.toFixed(2)}`);
	console.log(`Max languages for a single type: ${maxLanguages}`);
	console.log(`Min languages for a single type: ${minLanguages}`);
	console.log(`Range: ${maxLanguages - minLanguages}`);

	// Warnings for imbalance
	const underRepresented = sortedMBTI.filter(
		(type) => mbtiCounts[type].length > 0 && mbtiCounts[type].length === 1
	);

	if (underRepresented.length > 0) {
		console.log(`\n⚠️  WARNING: Types with only 1 language (limited user choice):`);
		underRepresented.forEach((type) => {
			console.log(`  ${type}: ${mbtiCounts[type][0]}`);
		});
	}

	const overRepresented = sortedMBTI.filter(
		(type) => mbtiCounts[type].length > avgLanguagesPerType * 2
	);

	if (overRepresented.length > 0) {
		console.log(`\n📊 Types with many languages (>${Math.floor(avgLanguagesPerType * 2)}):`);
		overRepresented.forEach((type) => {
			console.log(`  ${type}: ${mbtiCounts[type].length} languages`);
		});
	}

	return {
		allTypesHaveLanguages: typesWithoutLanguages.length === 0,
		underRepresented,
		overRepresented,
		avgLanguagesPerType
	};
}

// Run the test
const results = analyzeMBTILanguageCoverage();

// Exit with appropriate code
if (!results.allTypesHaveLanguages) {
	process.exit(1);
}

export {};
