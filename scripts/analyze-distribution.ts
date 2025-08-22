#!/usr/bin/env tsx

import { languages } from '../src/lib/data/languages';

// All 16 MBTI personality types
const MBTI_TYPES = [
	'ISTJ',
	'ISFJ',
	'INFJ',
	'INTJ',
	'ISTP',
	'ISFP',
	'INFP',
	'INTP',
	'ESTP',
	'ESFP',
	'ENFP',
	'ENTP',
	'ESTJ',
	'ESFJ',
	'ENFJ',
	'ENTJ'
] as const;

console.log('=== Programming Language MBTI Distribution Analysis ===\n');

// Count total languages
console.log(`Total Languages: ${languages.length}\n`);

// MBTI Distribution
console.log('=== MBTI Type Distribution ===');
const mbtiCounts: Record<string, number> = {};
const mbtiLanguages: Record<string, string[]> = {};

// Initialize counts
MBTI_TYPES.forEach((type) => {
	mbtiCounts[type] = 0;
	mbtiLanguages[type] = [];
});

// Count languages per MBTI type
languages.forEach((lang) => {
	if (mbtiCounts[lang.mbti] !== undefined) {
		mbtiCounts[lang.mbti]++;
		mbtiLanguages[lang.mbti].push(lang.name);
	} else {
		console.log(`⚠️  Unknown MBTI type: ${lang.mbti} for language: ${lang.name}`);
	}
});

// Display distribution
MBTI_TYPES.forEach((type) => {
	const count = mbtiCounts[type];
	const percentage = ((count / languages.length) * 100).toFixed(1);
	console.log(`${type}: ${count} languages (${percentage}%)`);
});

console.log('\n=== Detailed MBTI Language Lists ===');
MBTI_TYPES.forEach((type) => {
	const count = mbtiCounts[type];
	if (count > 0) {
		console.log(`\n${type} (${count} languages):`);
		mbtiLanguages[type].forEach((name) => {
			console.log(`  - ${name}`);
		});
	}
});

// Domain Distribution
console.log('\n=== Primary Domain Distribution ===');
const domainCounts: Record<string, number> = {};
languages.forEach((lang) => {
	if (lang.primaryDomain) {
		domainCounts[lang.primaryDomain] = (domainCounts[lang.primaryDomain] || 0) + 1;
	}
});

Object.entries(domainCounts)
	.sort(([, a], [, b]) => b - a)
	.forEach(([domain, count]) => {
		const percentage = ((count / languages.length) * 100).toFixed(1);
		console.log(`${domain}: ${count} languages (${percentage}%)`);
	});

// Year Distribution
console.log('\n=== Year Created Distribution ===');
const yearCounts: Record<string, number> = {};
languages.forEach((lang) => {
	if (lang.yearCreated) {
		const decade = Math.floor(lang.yearCreated / 10) * 10;
		const decadeStr = `${decade}s`;
		yearCounts[decadeStr] = (yearCounts[decadeStr] || 0) + 1;
	}
});

Object.entries(yearCounts)
	.sort(([a], [b]) => a.localeCompare(b))
	.forEach(([decade, count]) => {
		const percentage = ((count / languages.length) * 100).toFixed(1);
		console.log(`${decade}: ${count} languages (${percentage}%)`);
	});

// Paradigm Distribution
console.log('\n=== Paradigm Distribution ===');
const paradigmCounts: Record<string, number> = {};
languages.forEach((lang) => {
	if (lang.paradigm) {
		paradigmCounts[lang.paradigm] = (paradigmCounts[lang.paradigm] || 0) + 1;
	}
});

Object.entries(paradigmCounts)
	.sort(([, a], [, b]) => b - a)
	.forEach(([paradigm, count]) => {
		const percentage = ((count / languages.length) * 100).toFixed(1);
		console.log(`${paradigm}: ${count} languages (${percentage}%)`);
	});

// Balance Analysis
console.log('\n=== MBTI Balance Analysis ===');
const idealCount = languages.length / 16;
console.log(`Ideal count per MBTI type: ${idealCount.toFixed(1)} languages`);

const imbalances = MBTI_TYPES.map((type) => ({
	type,
	count: mbtiCounts[type],
	deviation: Math.abs(mbtiCounts[type] - idealCount)
})).sort((a, b) => b.deviation - a.deviation);

console.log('\nMost over/under-represented types:');
imbalances.slice(0, 5).forEach(({ type, count, deviation }) => {
	const status = count > idealCount ? 'over' : 'under';
	console.log(`  ${type}: ${count} (${deviation.toFixed(1)} ${status})`);
});

export {};
