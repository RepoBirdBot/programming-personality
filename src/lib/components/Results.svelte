<script lang="ts">
	import type { Language } from '$lib/types/quiz';

	export let language: Language;
	export let onRestart: () => void;
</script>

<div class="results-container">
	<div class="result-card">
		<div class="language-icon">{language.icon}</div>
		<h1 class="language-name">You are {language.name}!</h1>

		<p class="personality">{language.personality}</p>

		<div class="description">
			<p>{language.description}</p>
		</div>

		<div class="details">
			<div class="detail-section">
				<h3>Strengths</h3>
				<ul>
					{#each language.strengths as strength}
						<li>{strength}</li>
					{/each}
				</ul>
			</div>

			<div class="detail-section">
				<h3>Best For</h3>
				<ul>
					{#each language.useCases as useCase}
						<li>{useCase}</li>
					{/each}
				</ul>
			</div>
		</div>

		<button class="restart-button" onclick={onRestart}> Take Quiz Again </button>
	</div>
</div>

<style>
	.results-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}

	.result-card {
		background: white;
		border-radius: 16px;
		padding: 3rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.language-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.language-name {
		font-size: 2rem;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.personality {
		font-size: 1.2rem;
		color: #666;
		margin-bottom: 2rem;
		font-style: italic;
	}

	.description {
		margin-bottom: 2rem;
		color: #444;
		line-height: 1.6;
	}

	.details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin: 2rem 0;
		text-align: left;
	}

	.detail-section h3 {
		color: #333;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.detail-section ul {
		list-style: none;
		padding: 0;
	}

	.detail-section li {
		padding: 0.25rem 0;
		color: #666;
	}

	.detail-section li::before {
		content: '✓ ';
		color: #667eea;
		font-weight: bold;
	}

	.restart-button {
		margin-top: 2rem;
		padding: 1rem 2rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.restart-button:hover {
		transform: scale(1.05);
	}

	@media (max-width: 600px) {
		.details {
			grid-template-columns: 1fr;
		}
	}
</style>
