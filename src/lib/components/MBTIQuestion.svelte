<script lang="ts">
	import type { MBTIQuestion } from '$lib/types/quiz';

	export let question: MBTIQuestion;
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
		<div class="progress-bar mbti" style="width: {(questionNumber / totalQuestions) * 100}%"></div>
	</div>

	<div class="question-header">
		<span class="phase-label">Phase 1 of 2</span>
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
					onclick={(e) => {
						e.currentTarget.blur();
						handleAnswerClick(answer.id);
					}}
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
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
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

	.progress-bar.mbti {
		background: linear-gradient(90deg, #4fc3f7 0%, #29b6f6 100%);
	}

	.question-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.phase-label {
		display: block;
		color: var(--color-primary-light);
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
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		margin-bottom: 0;
		text-align: center;
		color: var(--color-text-primary);
		min-height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.4;
		padding: 0.5rem;
		flex-shrink: 0;
	}

	.quiz-content {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 0;
	}

	.nav-button {
		width: 48px;
		height: 48px;
		min-width: 48px;
		min-height: 48px;
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
		align-self: center;
		-webkit-tap-highlight-color: transparent;
	}

	.nav-button:hover:not(:disabled) {
		border-color: var(--color-primary-light);
		background: var(--color-primary-light);
		color: white;
	}

	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
		min-width: 0;
		max-height: 60vh;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0.5rem;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
	}

	.answer-button {
		padding: 1rem 1.25rem;
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
		min-height: 60px;
		flex-shrink: 0;
		white-space: normal;
		word-wrap: break-word;
		line-height: 1.4;
		-webkit-tap-highlight-color: transparent;
	}

	/* Custom scrollbar for answers */
	.answers::-webkit-scrollbar {
		width: 6px;
	}

	.answers::-webkit-scrollbar-track {
		background: var(--color-bg-tertiary);
		border-radius: 3px;
	}

	.answers::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: 3px;
	}

	.answers::-webkit-scrollbar-thumb:hover {
		background: var(--color-border-light);
	}

	.answer-button:hover {
		border-color: var(--color-primary-light);
		box-shadow: var(--shadow-md);
	}

	.answer-button:active {
		transform: scale(0.98);
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

	/* Tablet styles */
	@media (max-width: 768px) {
		.question-container {
			padding: 0.75rem;
		}

		.quiz-content {
			gap: 0.75rem;
		}

		.nav-button {
			width: 44px;
			height: 44px;
			min-width: 44px;
			min-height: 44px;
			font-size: 1.25rem;
		}

		.answers {
			gap: 0.625rem;
			padding: 0.25rem;
		}

		.answer-button {
			padding: 0.875rem 1rem;
			font-size: 0.95rem;
			min-height: 56px;
		}
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		.question-container {
			padding: 0.5rem;
		}

		.answers {
			max-height: 50vh; /* Smaller on mobile to account for chrome */
		}

		.progress {
			margin-bottom: 1rem;
		}

		.question-header {
			margin-bottom: 0.75rem;
		}

		.question-text {
			min-height: 3rem;
			padding: 0.25rem;
		}

		.quiz-content {
			gap: 0.5rem;
			padding: 0.5rem 0;
		}

		.nav-button {
			width: 40px;
			height: 40px;
			min-width: 40px;
			min-height: 40px;
			font-size: 1.125rem;
		}

		.answers {
			gap: 0.5rem;
			padding: 0.125rem;
		}

		.answer-button {
			padding: 0.75rem;
			font-size: 0.9rem;
			min-height: 52px;
		}

		.checkmark {
			font-size: 1rem;
			margin-left: 0.5rem;
		}
	}

	/* Landscape mobile */
	@media (max-height: 600px) and (orientation: landscape) {
		.question-container {
			padding: 0.5rem;
		}

		.progress {
			margin-bottom: 0.75rem;
		}

		.question-header {
			margin-bottom: 0.5rem;
		}

		.question-text {
			min-height: 2.5rem;
			font-size: 1.125rem;
		}

		.quiz-content {
			padding: 0.25rem 0;
		}

		.answers {
			padding: 0;
		}

		.answer-button {
			min-height: 48px;
			padding: 0.625rem 0.875rem;
		}
	}
</style>
