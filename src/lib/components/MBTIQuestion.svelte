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
		<span class="phase-label">Phase 1: Personality Assessment</span>
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
		font-size: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
		color: var(--color-text-primary);
	}

	.quiz-content {
		display: flex;
		align-items: center;
		gap: 2rem;
		min-height: 300px;
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
		gap: 1rem;
		flex: 1;
		min-width: 0;
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
	}

	.answer-button:hover {
		border-color: var(--color-primary-light);
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
			min-height: 250px;
		}

		.nav-button {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
		}
	}
</style>
