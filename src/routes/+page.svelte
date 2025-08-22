<script lang="ts">
	import { onMount } from 'svelte';
	import { quizStore } from '$lib/stores/quiz';
	import { mbtiQuestions } from '$lib/data/mbti-questions';
	import { languages } from '$lib/data/languages';
	import MBTIQuestion from '$lib/components/MBTIQuestion.svelte';
	import LanguageQuestion from '$lib/components/LanguageQuestion.svelte';
	import Results from '$lib/components/Results.svelte';
	import { decodeResult } from '$lib/utils/sharing';

	$: currentMBTIQuestion = mbtiQuestions[$quizStore.currentQuestionIndex];
	$: adaptiveQuestions = $quizStore.adaptiveQuestions || [];
	$: currentLanguageQuestion = adaptiveQuestions[$quizStore.currentQuestionIndex];

	function handleMBTIAnswer(answerId: string) {
		const questionId = currentMBTIQuestion.id;
		quizStore.answerMBTIQuestion(questionId, answerId);
	}

	function handleLanguageAnswer(answerId: string) {
		const questionId = currentLanguageQuestion.id;
		quizStore.answerLanguageQuestion(questionId, answerId);
	}

	function handleRestart() {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('r')) {
			urlParams.delete('r');
			const newUrl =
				window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
			window.history.replaceState({}, '', newUrl);
		}
		hideIntro = false;
		quizStore.reset();
	}

	let hideIntro = false;
	$: showIntro =
		!hideIntro && $quizStore.phase === 'mbti' && Object.keys($quizStore.mbtiAnswers).length === 0;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const sharedResult = urlParams.get('r');

		if (sharedResult) {
			const decoded = decodeResult(sharedResult);
			if (decoded && languages.find((l) => l.id === decoded.languageId)) {
				quizStore.loadSharedResult(decoded.languageId, decoded.mbtiType);
			}
		}
	});
</script>

<svelte:head>
	<title>
		{$quizStore.completed && $quizStore.result
			? `I got ${$quizStore.result.name} - Programming Language Personality Test`
			: 'Programming Language Personality Test'}
	</title>
	<meta
		name="description"
		content={$quizStore.completed && $quizStore.result
			? `${$quizStore.result.name}: ${$quizStore.result.personality}. Discover which programming language matches your personality!`
			: 'Discover which programming language matches your personality from 200+ languages! Based on MBTI personality science.'}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content={$quizStore.completed && $quizStore.result
			? `I got ${$quizStore.result.name} - Programming Language Personality Test`
			: 'Programming Language Personality Test'}
	/>
	<meta
		property="og:description"
		content={$quizStore.completed && $quizStore.result
			? `${$quizStore.result.name}: ${$quizStore.result.personality}. Take the quiz to find your programming language match!`
			: 'Discover which programming language matches your personality from 200+ languages! Based on MBTI personality science.'}
	/>
	<meta
		property="og:image"
		content="https://og-image.vercel.app/**Programming%20Language**%20Personality%20Test.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
	/>

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={$quizStore.completed && $quizStore.result
			? `I got ${$quizStore.result.name} - Programming Language Personality Test`
			: 'Programming Language Personality Test'}
	/>
	<meta
		name="twitter:description"
		content={$quizStore.completed && $quizStore.result
			? `${$quizStore.result.name}: ${$quizStore.result.personality}. Take the quiz!`
			: 'Discover which programming language matches your personality!'}
	/>
	<meta
		name="twitter:image"
		content="https://og-image.vercel.app/**Programming%20Language**%20Personality%20Test.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
	/>
</svelte:head>

<main>
	{#if $quizStore.phase === 'mbti'}
		{#if showIntro}
			<div class="intro">
				<h1>
					<span class="emoji">🚀</span>
					<span class="gradient-text">Programming Language Personality Test</span>
				</h1>
				<p>Discover your coding personality match from 100 languages!</p>
				<div class="intro-details">
					<p class="intro-subtitle">
						✨ Takes just 2-3 minutes<br />
						🎯 Personalized to your coding style<br />
						💡 Based on MBTI personality science
					</p>
				</div>
				<button class="start-button" on:click={() => (hideIntro = true)}> Start Quiz </button>
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
		{#if currentLanguageQuestion}
			<LanguageQuestion
				question={currentLanguageQuestion}
				questionNumber={$quizStore.currentQuestionIndex + 1}
				totalQuestions={adaptiveQuestions.length}
				onAnswer={handleLanguageAnswer}
			/>
		{/if}
	{:else if $quizStore.completed && $quizStore.result}
		<Results language={$quizStore.result} onRestart={handleRestart} />
	{/if}

	<a href="https://repobird.ai" class="repobird-badge" target="_blank" rel="noopener noreferrer">
		Created with Repobird.ai
	</a>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 2rem 1rem;
		padding-top: 10vh;
	}

	.intro {
		text-align: center;
		max-width: 700px;
		padding: 3rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		box-shadow: var(--shadow-xl);
	}

	.intro h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: var(--color-text-primary);
	}

	.intro h1 .gradient-text {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.intro h1 .emoji {
		color: initial;
		background: none;
		-webkit-background-clip: initial;
		-webkit-text-fill-color: initial;
		background-clip: initial;
	}

	.intro p {
		font-size: 1.2rem;
		color: var(--color-text-secondary);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.intro-details {
		margin: 2rem 0;
	}

	.intro-subtitle {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.start-button {
		padding: 1rem 3rem;
		font-size: 1.2rem;
		background: var(--gradient-primary);
		color: white;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: var(--shadow-md);
	}

	.start-button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.repobird-badge {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: var(--color-primary);
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 500;
		box-shadow: var(--shadow-md);
		transition: all 0.2s ease;
		z-index: 1000;
	}

	.repobird-badge:hover {
		background: var(--color-primary-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 600px) {
		.intro h1 {
			font-size: 2rem;
		}

		.intro-details {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.repobird-badge {
			bottom: 15px;
			right: 15px;
			padding: 6px 12px;
			font-size: 0.8rem;
		}
	}
</style>
