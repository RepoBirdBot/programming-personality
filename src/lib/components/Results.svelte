<script lang="ts">
	import type { Language } from '$lib/types/quiz';
	import { generateShareUrl, getShareText, shareLinks, copyToClipboard } from '$lib/utils/sharing';
	import { quizStore } from '$lib/stores/quiz';

	export let language: Language;
	export let onRestart: () => void;

	let copied = false;

	$: shareUrl = generateShareUrl({
		languageId: language.id,
		mbtiType: $quizStore.mbtiType
	});
	$: shareText = getShareText(language.name, $quizStore.mbtiType);

	async function handleCopyLink() {
		const success = await copyToClipboard(shareUrl);
		if (success) {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	function handleShare(platform: keyof typeof shareLinks) {
		const url = shareLinks[platform](shareUrl, shareText);
		window.open(url, '_blank', 'width=600,height=400');
	}
</script>

<div class="results-container">
	<div class="result-card">
		<div class="header">
			<div class="language-icon">
				{#if language.imgURL}
					<img src={language.imgURL} alt={language.name} class="language-img" />
				{:else}
					{language.icon}
				{/if}
			</div>
			<div class="title-section">
				<h1 class="language-name">You are {language.name}!</h1>
				{#if language.mbti}
					<div class="mbti-badge">MBTI: {language.mbti}</div>
				{/if}
			</div>
		</div>

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

		<div class="actions-section">
			<div class="share-section">
				<h3>Share Your Result!</h3>
				<div class="share-buttons">
					<button
						class="share-button twitter"
						onclick={() => handleShare('twitter')}
						aria-label="Share on Twitter"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</button>
					<button
						class="share-button linkedin"
						onclick={() => handleShare('linkedin')}
						aria-label="Share on LinkedIn"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
							/>
						</svg>
					</button>
					<button
						class="share-button whatsapp"
						onclick={() => handleShare('whatsapp')}
						aria-label="Share on WhatsApp"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
							/>
						</svg>
					</button>
					<button
						class="share-button reddit"
						onclick={() => handleShare('reddit')}
						aria-label="Share on Reddit"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
							/>
						</svg>
					</button>
					<button class="share-button copy" onclick={handleCopyLink} aria-label="Copy link">
						{#if copied}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
							</svg>
						{:else}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
								/>
							</svg>
						{/if}
					</button>
				</div>
				{#if copied}
					<p class="copy-feedback">Link copied to clipboard!</p>
				{/if}
			</div>

			<button class="restart-button" onclick={onRestart}> Take Quiz Again </button>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	.results-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
	}

	.result-card {
		background: white;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.language-icon {
		font-size: 4rem;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.language-img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 8px;
	}

	.title-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.language-name {
		font-size: 1.8rem;
		margin: 0;
		color: #2d3748;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		font-weight: 700;
		letter-spacing: -0.025em;
	}

	.mbti-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: linear-gradient(90deg, #4fc3f7 0%, #29b6f6 100%);
		color: white;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.personality {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.description {
		margin-bottom: 1.5rem;
		color: #444;
		line-height: 1.6;
	}

	.details {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 3rem;
		margin: 1.5rem 0;
		text-align: center;
	}

	.detail-section h3 {
		color: #333;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.detail-section {
		flex: 1;
		max-width: 300px;
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

	.actions-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e0e0e0;
	}

	.share-section {
		flex: 1;
	}

	.share-section h3 {
		color: #333;
		margin-bottom: 1rem;
		font-size: 1rem;
		text-align: center;
	}

	.share-buttons {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.restart-button {
		padding: 0.8rem 1.5rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: transform 0.2s ease;
		align-self: center;
	}

	.restart-button:hover {
		transform: scale(1.05);
	}

	.share-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
		color: white;
	}

	.share-button:hover {
		transform: scale(1.1);
		opacity: 0.9;
	}

	.share-button.twitter {
		background: #000000;
	}

	.share-button.linkedin {
		background: #0077b5;
	}

	.share-button.whatsapp {
		background: #25d366;
	}

	.share-button.reddit {
		background: #ff4500;
	}

	.share-button.copy {
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
	}

	.copy-feedback {
		margin-top: 0.5rem;
		color: #667eea;
		font-size: 0.9rem;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.actions-section {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.share-section h3 {
			margin-bottom: 0.5rem;
			text-align: center;
		}
	}

	@media (max-width: 767px) {
		.results-container {
			padding: 0.5rem;
		}

		.result-card {
			padding: 1.5rem;
		}

		.header {
			flex-direction: column;
			text-align: center;
		}

		.title-section {
			align-items: center;
		}

		.language-icon {
			font-size: 3.5rem;
			width: 3.5rem;
			height: 3.5rem;
		}

		.language-name {
			font-size: 1.5rem;
		}

		.details {
			flex-direction: column;
			gap: 1.5rem;
		}

		.personality {
			font-size: 1rem;
		}

		.description {
			font-size: 0.9rem;
		}

		.actions-section {
			gap: 1rem;
		}

		.share-buttons {
			gap: 0.5rem;
		}

		.share-button {
			width: 40px;
			height: 40px;
		}
	}

	@media (max-width: 480px) {
		.header {
			gap: 0.5rem;
		}

		.language-icon {
			font-size: 3rem;
			width: 3rem;
			height: 3rem;
		}

		.language-name {
			font-size: 1.3rem;
		}
	}
</style>
