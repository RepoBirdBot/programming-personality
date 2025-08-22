<script lang="ts">
	import { languages } from '$lib/data/languages';

	let imageErrors: Record<string, boolean> = {};

	function handleImageError(languageId: string) {
		imageErrors[languageId] = true;
		imageErrors = { ...imageErrors };
	}

	function handleImageLoad(languageId: string) {
		if (imageErrors[languageId]) {
			delete imageErrors[languageId];
			imageErrors = { ...imageErrors };
		}
	}
</script>

<svelte:head>
	<title>Language Validation - Programming Personality</title>
</svelte:head>

<div class="validation-container">
	<header class="validation-header">
		<h1>Language Validation</h1>
		<p>Review all {languages.length} programming languages and their image URLs</p>
		<div class="stats">
			<span class="stat">
				With imgURL: {languages.filter(lang => lang.imgURL).length}
			</span>
			<span class="stat">
				Without imgURL: {languages.filter(lang => !lang.imgURL).length}
			</span>
			<span class="stat error">
				Image Errors: {Object.keys(imageErrors).length}
			</span>
		</div>
	</header>

	<div class="languages-grid">
		{#each languages as language}
			<div class="language-card" class:has-error={imageErrors[language.id]}>
				<div class="language-header">
					<div class="language-icon">
						{#if language.imgURL}
							<img
								src={language.imgURL}
								alt={language.name}
								class="language-img"
								on:error={() => handleImageError(language.id)}
								on:load={() => handleImageLoad(language.id)}
							/>
							{#if imageErrors[language.id]}
								<div class="fallback-icon">{language.icon}</div>
							{/if}
						{:else}
							<div class="emoji-icon">{language.icon}</div>
						{/if}
					</div>
					<div class="language-info">
						<h3 class="language-name">{language.name}</h3>
						<span class="language-id">ID: {language.id}</span>
						<span class="mbti-type">MBTI: {language.mbti}</span>
					</div>
				</div>

				<div class="language-details">
					{#if language.imgURL}
						<div class="url-section">
							<label>Image URL:</label>
							<a href={language.imgURL} target="_blank" rel="noopener" class="img-url">
								{language.imgURL}
							</a>
						</div>
					{:else}
						<div class="no-url">No imgURL defined</div>
					{/if}

					<div class="description">
						{language.description}
					</div>

					{#if imageErrors[language.id]}
						<div class="error-message">
							❌ Image failed to load - falling back to emoji
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.validation-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.validation-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid #e2e8f0;
	}

	.validation-header h1 {
		color: #1a202c;
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
	}

	.validation-header p {
		color: #4a5568;
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
	}

	.stats {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.stat {
		padding: 0.5rem 1rem;
		background: #f7fafc;
		border-radius: 8px;
		font-weight: 600;
		color: #2d3748;
	}

	.stat.error {
		background: #fed7d7;
		color: #c53030;
	}

	.languages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 1.5rem;
	}

	.language-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.language-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translateY(-1px);
	}

	.language-card.has-error {
		border-color: #fc8181;
		background: #fffafa;
	}

	.language-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.language-icon {
		width: 4rem;
		height: 4rem;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 8px;
		background: #f7fafc;
	}

	.language-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 6px;
	}

	.fallback-icon {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 6px;
	}

	.emoji-icon {
		font-size: 2.5rem;
	}

	.language-info {
		flex: 1;
		min-width: 0;
	}

	.language-name {
		margin: 0 0 0.25rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #1a202c;
	}

	.language-id {
		display: block;
		font-size: 0.875rem;
		color: #718096;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.mbti-type {
		display: inline-block;
		margin-top: 0.25rem;
		padding: 0.25rem 0.5rem;
		background: linear-gradient(90deg, #4fc3f7 0%, #29b6f6 100%);
		color: white;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.language-details {
		space-y: 1rem;
	}

	.url-section {
		margin-bottom: 1rem;
	}

	.url-section label {
		display: block;
		font-weight: 600;
		color: #4a5568;
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
	}

	.img-url {
		display: block;
		color: #3182ce;
		text-decoration: none;
		font-size: 0.875rem;
		word-break: break-all;
		line-height: 1.4;
		padding: 0.5rem;
		background: #f7fafc;
		border-radius: 6px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.img-url:hover {
		background: #edf2f7;
		text-decoration: underline;
	}

	.no-url {
		color: #a0aec0;
		font-style: italic;
		margin-bottom: 1rem;
	}

	.description {
		color: #4a5568;
		line-height: 1.5;
		font-size: 0.9rem;
	}

	.error-message {
		margin-top: 1rem;
		padding: 0.75rem;
		background: #fed7d7;
		color: #c53030;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.validation-container {
			padding: 1rem;
		}

		.languages-grid {
			grid-template-columns: 1fr;
		}

		.stats {
			gap: 1rem;
		}

		.language-header {
			flex-direction: column;
			text-align: center;
			gap: 0.75rem;
		}

		.language-icon {
			width: 3rem;
			height: 3rem;
		}

		.emoji-icon {
			font-size: 2rem;
		}
	}
</style>