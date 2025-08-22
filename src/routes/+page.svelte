<script lang="ts">
	import { quizStore } from '$lib/stores/quiz';
	import { questions } from '$lib/data/questions';
	import Question from '$lib/components/Question.svelte';
	import Results from '$lib/components/Results.svelte';

	$: currentQuestion = questions[$quizStore.currentQuestionIndex];

	function handleAnswer(answerId: string) {
		quizStore.answerQuestion(currentQuestion.id, answerId);
	}

	function handleRestart() {
		quizStore.reset();
	}
</script>

<svelte:head>
	<title>Programming Language Personality Test</title>
	<meta
		name="description"
		content="Discover which programming language matches your personality!"
	/>
</svelte:head>

<main>
	{#if !$quizStore.completed}
		{#if $quizStore.currentQuestionIndex === 0 && Object.keys($quizStore.answers).length === 0}
			<div class="intro">
				<h1>🚀 Programming Language Personality Test</h1>
				<p>
					Answer a few questions to discover which programming language best matches your
					personality!
				</p>
				<button class="start-button" onclick={() => handleAnswer(currentQuestion.answers[0].id)}>
					Start Quiz
				</button>
			</div>
		{:else}
			<Question
				question={currentQuestion}
				questionNumber={$quizStore.currentQuestionIndex + 1}
				totalQuestions={questions.length}
				onAnswer={handleAnswer}
			/>
		{/if}
	{:else if $quizStore.result}
		<Results language={$quizStore.result} onRestart={handleRestart} />
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		min-height: 100vh;
	}

	:global(*) {
		box-sizing: border-box;
	}

	main {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.intro {
		text-align: center;
		max-width: 600px;
		padding: 3rem;
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	.intro h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.intro p {
		font-size: 1.2rem;
		color: #666;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.start-button {
		padding: 1rem 3rem;
		font-size: 1.2rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.start-button:hover {
		transform: scale(1.05);
	}

	@media (max-width: 600px) {
		.intro h1 {
			font-size: 2rem;
		}
	}
</style>
