<script lang="ts">
	import { quizStore } from '$lib/stores/quiz';
	import { mbtiQuestions } from '$lib/data/mbti-questions';
	import { languageQuestions } from '$lib/data/language-questions';
	import Question from '$lib/components/Question.svelte';
	import MBTIQuestion from '$lib/components/MBTIQuestion.svelte';
	import LanguageQuestion from '$lib/components/LanguageQuestion.svelte';
	import Results from '$lib/components/Results.svelte';

	$: currentMBTIQuestion = mbtiQuestions[$quizStore.currentQuestionIndex];
	$: currentLanguageQuestion = languageQuestions[$quizStore.currentQuestionIndex];

	function handleMBTIAnswer(answerId: string) {
		const questionId = currentMBTIQuestion.id;
		quizStore.answerMBTIQuestion(questionId, answerId);
	}

	function handleLanguageAnswer(answerId: string) {
		const questionId = currentLanguageQuestion.id;
		quizStore.answerLanguageQuestion(questionId, answerId);
	}

	function handleRestart() {
		quizStore.reset();
	}

	$: showIntro = $quizStore.phase === 'mbti' && Object.keys($quizStore.mbtiAnswers).length === 0;
	$: showPhaseTransition =
		$quizStore.phase === 'language' && Object.keys($quizStore.languageAnswers).length === 0;
</script>

<svelte:head>
	<title>Programming Language Personality Test</title>
	<meta
		name="description"
		content="Discover which programming language matches your personality!"
	/>
</svelte:head>

<main>
	{#if $quizStore.phase === 'mbti'}
		{#if showIntro}
			<div class="intro">
				<h1>🚀 Programming Language Personality Test</h1>
				<p>
					Discover which of 200+ programming languages best matches your personality! We'll first
					determine your MBTI type, then find your perfect language match.
				</p>
				<div class="intro-details">
					<div class="phase-info">
						<h3>📊 Phase 1: Personality Assessment</h3>
						<p>8 questions to determine your MBTI type</p>
					</div>
					<div class="phase-info">
						<h3>🎯 Phase 2: Language Matching</h3>
						<p>12 questions to find your ideal language</p>
					</div>
				</div>
				<button
					class="start-button"
					onclick={() => handleMBTIAnswer(currentMBTIQuestion.answers[0].id)}
				>
					Start Quiz
				</button>
			</div>
		{:else}
			<MBTIQuestion
				question={currentMBTIQuestion}
				questionNumber={$quizStore.currentQuestionIndex + 1}
				totalQuestions={mbtiQuestions.length}
				onAnswer={handleMBTIAnswer}
			/>
		{/if}
	{:else if $quizStore.phase === 'language'}
		{#if showPhaseTransition}
			<div class="phase-transition">
				<h2>🎉 Your MBTI Type: {$quizStore.mbtiType}</h2>
				<p>
					Great! You're a {$quizStore.mbtiType} personality type. Now let's find the perfect programming
					language for you from
					{$quizStore.candidateLanguages.length} candidates!
				</p>
				<button
					class="continue-button"
					onclick={() => handleLanguageAnswer(currentLanguageQuestion.answers[0].id)}
				>
					Continue to Language Selection
				</button>
			</div>
		{:else}
			<LanguageQuestion
				question={currentLanguageQuestion}
				questionNumber={$quizStore.currentQuestionIndex + 1}
				totalQuestions={languageQuestions.length}
				mbtiType={$quizStore.mbtiType}
				onAnswer={handleLanguageAnswer}
			/>
		{/if}
	{:else if $quizStore.completed && $quizStore.result}
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
		max-width: 700px;
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

	.intro-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin: 2rem 0;
	}

	.phase-info {
		padding: 1.5rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.phase-info h3 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.1rem;
	}

	.phase-info p {
		margin: 0;
		font-size: 0.95rem;
		color: #666;
	}

	.phase-transition {
		text-align: center;
		max-width: 600px;
		padding: 3rem;
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	.phase-transition h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.phase-transition p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.start-button,
	.continue-button {
		padding: 1rem 3rem;
		font-size: 1.2rem;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.start-button:hover,
	.continue-button:hover {
		transform: scale(1.05);
	}

	@media (max-width: 600px) {
		.intro h1 {
			font-size: 2rem;
		}

		.intro-details {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
