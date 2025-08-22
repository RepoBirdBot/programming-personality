<script lang="ts">
	import type { MBTIQuestion } from '$lib/types/quiz';

	export let question: MBTIQuestion;
	export let questionNumber: number;
	export let totalQuestions: number;
	export let onAnswer: (answerId: string) => void;
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

	<div class="answers">
		{#each question.answers as answer}
			<button class="answer-button" onclick={() => onAnswer(answer.id)}>
				{answer.text}
			</button>
		{/each}
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
		background: #e0e0e0;
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
		color: #29b6f6;
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.question-number {
		color: #666;
		font-size: 0.9rem;
	}

	.question-text {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #333;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.answer-button {
		padding: 1rem 1.5rem;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
		text-align: left;
	}

	.answer-button:hover {
		border-color: #29b6f6;
		transform: translateX(4px);
		box-shadow: 0 4px 12px rgba(41, 182, 246, 0.1);
	}
</style>
