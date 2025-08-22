<script lang="ts">
	import { languages } from '$lib/data/languages';
	import type { Language } from '$lib/types/quiz';

	function formatYear(year?: number): string {
		return year ? year.toString() : 'Unknown';
	}

	function formatBoolean(value?: boolean): string {
		if (value === undefined) return '—';
		return value ? '✓' : '✗';
	}

	function formatArray(arr: string[]): string {
		return arr.join(', ');
	}

	function formatString(value?: string): string {
		return value || '—';
	}
</script>

<svelte:head>
	<title>All Programming Languages - Programming Personality</title>
	<meta
		name="description"
		content="Browse all 200+ programming languages with detailed information about their characteristics, strengths, and use cases."
	/>
</svelte:head>

<main class="container">
	<header>
		<h1>All Programming Languages</h1>
		<p>Browse our complete collection of {languages.length} programming languages</p>
	</header>

	<div class="languages-grid">
		{#each languages as language}
			<article class="language-card">
				<header class="card-header" style="--accent-color: {language.color}">
					<div class="language-title">
						{#if language.imgURL}
							<img src={language.imgURL} alt="{language.name} logo" class="language-logo" />
						{:else}
							<span class="language-icon">{language.icon}</span>
						{/if}
						<div>
							<h2>{language.name}</h2>
							<p class="mbti-badge">{language.mbti}</p>
						</div>
					</div>
				</header>

				<div class="card-content">
					<p class="description">{language.description}</p>

					<div class="personality-section">
						<h3>Personality</h3>
						<p class="personality">{language.personality}</p>
					</div>

					<div class="details-grid">
						<div class="detail-section">
							<h3>Strengths</h3>
							<ul>
								{#each language.strengths as strength}
									<li>{strength}</li>
								{/each}
							</ul>
						</div>

						<div class="detail-section">
							<h3>Use Cases</h3>
							<ul>
								{#each language.useCases as useCase}
									<li>{useCase}</li>
								{/each}
							</ul>
						</div>
					</div>

					<div class="characteristics">
						<h3>Characteristics</h3>
						<div class="char-grid">
							<div class="char-item">
								<span class="char-label">Domain:</span>
								<span>{formatString(language.primaryDomain)}</span>
							</div>
							<div class="char-item">
								<span class="char-label">Created:</span>
								<span>{formatYear(language.yearCreated)}</span>
							</div>
							<div class="char-item">
								<span class="char-label">Typing:</span>
								<span>{formatString(language.typing)}</span>
							</div>
							<div class="char-item">
								<span class="char-label">Paradigm:</span>
								<span>{formatString(language.paradigm)}</span>
							</div>
							<div class="char-item">
								<span class="char-label">Learning:</span>
								<span>{formatString(language.learningCurve)}</span>
							</div>
							<div class="char-item">
								<span class="char-label">Syntax:</span>
								<span>{formatString(language.syntaxStyle)}</span>
							</div>
						</div>
					</div>

					<div class="paradigms">
						<h3>Programming Paradigms</h3>
						<div class="paradigm-badges">
							{#if language.imperative}
								<span class="paradigm-badge">Imperative</span>
							{/if}
							{#if language.objectOriented}
								<span class="paradigm-badge">Object-Oriented</span>
							{/if}
							{#if language.functional}
								<span class="paradigm-badge">Functional</span>
							{/if}
							{#if language.procedural}
								<span class="paradigm-badge">Procedural</span>
							{/if}
							{#if language.generic}
								<span class="paradigm-badge">Generic</span>
							{/if}
							{#if language.reflective}
								<span class="paradigm-badge">Reflective</span>
							{/if}
							{#if language.eventDriven}
								<span class="paradigm-badge">Event-Driven</span>
							{/if}
							{#if language.concurrent}
								<span class="paradigm-badge">Concurrent</span>
							{/if}
						</div>
					</div>

					<div class="technical-details">
						<h3>Technical Details</h3>
						<div class="tech-grid">
							<div class="tech-item">
								<span class="tech-label">Compiled:</span>
								<span>{formatBoolean(language.compiled)}</span>
							</div>
							<div class="tech-item">
								<span class="tech-label">Interpreted:</span>
								<span>{formatBoolean(language.interpreted)}</span>
							</div>
							<div class="tech-item">
								<span class="tech-label">VM-based:</span>
								<span>{formatBoolean(language.vm)}</span>
							</div>
							<div class="tech-item">
								<span class="tech-label">Standardized:</span>
								<span>{formatBoolean(language.standardized)}</span>
							</div>
						</div>
						{#if language.memoryManagement}
							<div class="tech-item full-width">
								<span class="tech-label">Memory Management:</span>
								<span>{language.memoryManagement}</span>
							</div>
						{/if}
						{#if language.originalPurpose}
							<div class="tech-item full-width">
								<span class="tech-label">Original Purpose:</span>
								<span>{language.originalPurpose}</span>
							</div>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</main>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.languages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 2rem;
	}

	.language-card {
		background: var(--color-bg-card);
		border-radius: 12px;
		box-shadow: var(--shadow-md);
		overflow: hidden;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		border: 1px solid var(--color-border);
	}

	.language-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
		background: var(--color-bg-card-hover);
	}

	.card-header {
		padding: 1.5rem;
		background: linear-gradient(
			135deg,
			var(--accent-color, #667eea) 0%,
			color-mix(in srgb, var(--accent-color, #667eea) 80%, black) 100%
		);
		color: white;
	}

	.language-title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.language-logo {
		width: 3rem;
		height: 3rem;
		object-fit: contain;
		background: white;
		padding: 0.5rem;
		border-radius: 8px;
	}

	.language-icon {
		font-size: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 8px;
	}

	.language-title h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.mbti-badge {
		font-size: 0.875rem;
		background: rgba(255, 255, 255, 0.2);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		display: inline-block;
		margin-top: 0.25rem;
	}

	.card-content {
		padding: 1.5rem;
	}

	.description {
		margin-bottom: 1.5rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.personality-section {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: var(--color-bg-tertiary);
		border-radius: 8px;
		border-left: 4px solid var(--accent-color, var(--color-primary));
	}

	.personality-section h3 {
		margin: 0 0 0.5rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.personality {
		margin: 0;
		color: var(--color-text-secondary);
		font-style: italic;
	}

	.details-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.detail-section h3 {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.detail-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.detail-section li {
		padding: 0.25rem 0;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}

	.detail-section li:before {
		content: '•';
		color: var(--accent-color, var(--color-primary));
		font-weight: bold;
		display: inline-block;
		width: 1em;
	}

	.characteristics,
	.paradigms,
	.technical-details {
		margin-bottom: 1.5rem;
	}

	.characteristics h3,
	.paradigms h3,
	.technical-details h3 {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.char-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.char-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875rem;
	}

	.char-label {
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.paradigm-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.paradigm-badge {
		padding: 0.25rem 0.5rem;
		background: var(--accent-color, var(--color-primary));
		color: white;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.tech-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.tech-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875rem;
	}

	.tech-item.full-width {
		grid-column: 1 / -1;
	}

	.tech-label {
		font-weight: 500;
		color: var(--color-text-primary);
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.languages-grid {
			grid-template-columns: 1fr;
		}

		.details-grid,
		.char-grid,
		.tech-grid {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2rem;
		}

		.language-title {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
</style>
