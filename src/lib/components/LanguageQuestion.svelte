<script lang="ts">
	import type { LanguageQuestion } from '$lib/types/quiz';

	export let question: LanguageQuestion;
	export let questionNumber: number;
	export let totalQuestions: number;
	export let onAnswer: (answerId: string) => void;
	export let onPrevious: (() => void) | null = null;
	export let onNext: (() => void) | null = null;
	export let canGoBack = false;
	export let canGoForward = false;
	export let selectedAnswerId: string | null = null;

	let animatingAnswerId: string | null = null;

	function handleAnswerClick(answerId: string) {
		// Show animation first
		animatingAnswerId = answerId;

		// Call onAnswer immediately to update store
		onAnswer(answerId);

		// Remove focus from all buttons
		document.querySelectorAll('button').forEach((btn) => btn.blur());

		// Clear animation state after animation completes
		setTimeout(() => {
			animatingAnswerId = null;
		}, 200);
	}
</script>

<div class="question-container">
	<div class="progress">
		<div
			class="progress-bar language"
			style="width: {(questionNumber / totalQuestions) * 100}%"
		></div>
	</div>

	<div class="question-header">
		<span class="phase-label">Finding Your Language Match</span>
		<span class="question-number">Question {questionNumber} of {totalQuestions}</span>
	</div>

	<h2 class="question-text">{question.text}</h2>

	<div class="quiz-content">
		<button class="nav-button nav-left" disabled={!canGoBack} onclick={() => onPrevious?.()}>
			←
		</button>

		<div class="answers">
			{#each question.answers as answer}
				<button
					class="answer-button"
					class:selected={selectedAnswerId === answer.id || animatingAnswerId === answer.id}
					onclick={() => handleAnswerClick(answer.id)}
				>
					{answer.text}
					{#if selectedAnswerId === answer.id || animatingAnswerId === answer.id}
						<span class="checkmark">✓</span>
					{/if}
				</button>
			{/each}
		</div>

		<button class="nav-button nav-right" disabled={!canGoForward} onclick={() => onNext?.()}>
			→
		</button>
	</div>
</div>

<style>
	.question-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}

	.progress {
		height: 4px;
		background: var(--color-bg-tertiary);
		border-radius: 2px;
		margin-bottom: 2rem;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		transition: width 0.3s ease;
	}

	.progress-bar.language {
		background: var(--gradient-primary);
	}

	.question-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.phase-label {
		display: block;
		color: var(--color-secondary);
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.question-number {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
	}

	.question-text {
		font-size: 1.5rem;
		margin-bottom: 0;
		text-align: center;
		color: var(--color-text-primary);
		min-height: 6.75rem; /* 108px - Accommodate up to 3 lines */
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.5;
		padding: 0 0.5rem;
	}

	.quiz-content {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
		min-height: 400px;
		height: 400px;
		padding-top: 2.5rem;
	}

	.nav-button {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--color-bg-card);
		border: 2px solid var(--color-border);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 4rem;
		align-self: flex-start;
	}

	.nav-button:hover:not(:disabled) {
		border-color: var(--color-primary);
		background: var(--color-primary);
		color: white;
	}

	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.answers {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(10, minmax(104px, auto));
		gap: 0.75rem;
		flex: 1;
		min-width: 0;
		align-content: start;
	}

	.answer-button {
		padding: 1rem 1.5rem;
		background: var(--color-bg-card);
		border: 2px solid var(--color-border);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
		text-align: left;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 104px;
		height: 100%;
		white-space: normal;
		word-wrap: break-word;
		line-height: 1.4;
	}

	/* Dynamically adjust grid rows based on number of answers */
	.answers:has(.answer-button:nth-child(2):last-child) {
		grid-template-rows: repeat(2, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(3):last-child) {
		grid-template-rows: repeat(3, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(4):last-child) {
		grid-template-rows: repeat(4, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(5):last-child) {
		grid-template-rows: repeat(5, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(6):last-child) {
		grid-template-rows: repeat(6, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(7):last-child) {
		grid-template-rows: repeat(7, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(8):last-child) {
		grid-template-rows: repeat(8, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(9):last-child) {
		grid-template-rows: repeat(9, minmax(104px, 1fr));
	}

	.answers:has(.answer-button:nth-child(10):last-child) {
		grid-template-rows: repeat(10, minmax(104px, 1fr));
	}

	.answer-button:hover {
		border-color: var(--color-primary);
		box-shadow: var(--shadow-md);
	}

	.answer-button.selected {
		border-color: #22c55e;
		background: rgba(34, 197, 94, 0.1);
		color: var(--color-text-primary);
	}

	.answer-button.selected:hover {
		border-color: #16a34a;
		background: rgba(34, 197, 94, 0.15);
	}

	.checkmark {
		color: #22c55e;
		font-weight: bold;
		font-size: 1.2rem;
		margin-left: 1rem;
		flex-shrink: 0;
		animation: checkmarkAppear 0.2s ease-out;
		transform-origin: center;
	}

	@keyframes checkmarkAppear {
		0% {
			opacity: 0;
			transform: scale(0.5) rotate(-10deg);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.2) rotate(5deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	@media (max-width: 768px) {
		.quiz-content {
			gap: 1rem;
			min-height: 350px;
			height: 350px;
			padding-top: 1.5rem;
		}

		.nav-button {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
			margin-top: 3rem;
		}

		.question-text {
			font-size: 1.25rem;
			min-height: 5.5rem;
		}

		.answers {
			gap: 0.5rem;
		}

		.answer-button {
			padding: 0.75rem 1rem;
			font-size: 0.95rem;
		}
	}
</style>
