#!/usr/bin/env tsx

import { languages } from '../src/lib/data/languages';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ValidationResult {
	id: string;
	name: string;
	url: string;
	status: number | null;
	isValid: boolean;
	error?: string;
}

async function testUrl(url: string): Promise<{ status: number | null; error?: string }> {
	try {
		// Use curl to test the URL with a 10 second timeout
		const { stdout } = await execAsync(`curl -I -s -w "%{http_code}" -m 10 "${url}"`);

		// Extract status code from curl output
		const lines = stdout.trim().split('\n');
		const lastLine = lines[lines.length - 1];
		const statusCode = parseInt(lastLine);

		if (isNaN(statusCode)) {
			return { status: null, error: 'Could not parse status code' };
		}

		return { status: statusCode };
	} catch (error) {
		return { status: null, error: error instanceof Error ? error.message : 'Unknown error' };
	}
}

async function validateAllUrls() {
	console.log('🔍 Validating all imgURL fields with curl...\n');

	const languagesWithUrls = languages.filter((lang) => lang.imgURL);
	const results: ValidationResult[] = [];

	console.log(`Found ${languagesWithUrls.length} languages with imgURL fields to validate.\n`);

	let validCount = 0;
	let invalidCount = 0;

	for (const lang of languagesWithUrls) {
		process.stdout.write(`Testing ${lang.name.padEnd(15)} ... `);

		const result = await testUrl(lang.imgURL!);
		const isValid = result.status === 200;

		if (isValid) {
			console.log('✅ VALID (200)');
			validCount++;
		} else {
			console.log(`❌ INVALID (${result.status || 'ERROR'})`);
			if (result.error) {
				console.log(`    Error: ${result.error}`);
			}
			invalidCount++;
		}

		results.push({
			id: lang.id,
			name: lang.name,
			url: lang.imgURL!,
			status: result.status,
			isValid,
			error: result.error
		});
	}

	console.log('\n' + '='.repeat(60));
	console.log(`📊 VALIDATION SUMMARY:`);
	console.log(`   ✅ Valid URLs:   ${validCount}`);
	console.log(`   ❌ Invalid URLs: ${invalidCount}`);
	console.log(`   📝 Total tested: ${languagesWithUrls.length}`);
	console.log('='.repeat(60) + '\n');

	// Show all invalid URLs
	const invalidResults = results.filter((r) => !r.isValid);
	if (invalidResults.length > 0) {
		console.log('❌ INVALID URLs that need fixing:\n');
		invalidResults.forEach((result) => {
			console.log(`   ${result.name} (${result.id})`);
			console.log(`   URL: ${result.url}`);
			console.log(`   Status: ${result.status || 'ERROR'}`);
			if (result.error) {
				console.log(`   Error: ${result.error}`);
			}
			console.log('');
		});
	} else {
		console.log('🎉 All URLs are valid!');
	}

	// Show languages without imgURL
	const languagesWithoutUrls = languages.filter((lang) => !lang.imgURL);
	if (languagesWithoutUrls.length > 0) {
		console.log(`📝 Languages missing imgURL field (${languagesWithoutUrls.length}):`);
		languagesWithoutUrls.forEach((lang) => {
			console.log(`   - ${lang.name} (${lang.id})`);
		});
	}
}

validateAllUrls().catch(console.error);

export {};
