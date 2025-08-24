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

	// Get the currently selected answer for the current question
	$: selectedMBTIAnswerId = currentMBTIQuestion
		? $quizStore.mbtiAnswers[currentMBTIQuestion.id] || null
		: null;
	$: selectedLanguageAnswerId = currentLanguageQuestion
		? $quizStore.languageAnswers[currentLanguageQuestion.id] || null
		: null;

	function handleMBTIAnswer(answerId: string) {
		const questionId = currentMBTIQuestion.id;
		// Check if this is a new answer before updating the store
		const isNewAnswer = !$quizStore.mbtiAnswers[questionId];
		const currentIndex = $quizStore.currentQuestionIndex;

		quizStore.answerMBTIQuestion(questionId, answerId);

		// Auto-advance only if this was a new answer (not re-answering) and not on last question
		if (isNewAnswer && currentIndex < mbtiQuestions.length - 1) {
			// Small delay for animation
			setTimeout(() => {
				// Double-check we're still in MBTI phase and at the same question index
				// to prevent advancing after rapid clicks that triggered phase transition
				if ($quizStore.phase === 'mbti' && $quizStore.currentQuestionIndex === currentIndex) {
					quizStore.goToNextQuestion();
				}
			}, 100);
		}
	}

	function handleLanguageAnswer(answerId: string) {
		const questionId = currentLanguageQuestion.id;
		// Check if this is a new answer before updating the store
		const isNewAnswer = !$quizStore.languageAnswers[questionId];
		const currentIndex = $quizStore.currentQuestionIndex;

		quizStore.answerLanguageQuestion(questionId, answerId);

		// Auto-advance only if this was a new answer (not re-answering) and not on last question
		if (isNewAnswer && currentIndex < adaptiveQuestions.length - 1) {
			// Small delay for animation
			setTimeout(() => {
				// Double-check we're still in language phase and at the same question index
				// to prevent advancing after rapid clicks that triggered phase transition
				if ($quizStore.phase === 'language' && $quizStore.currentQuestionIndex === currentIndex) {
					quizStore.goToNextQuestion();
				}
			}, 100);
		}
	}

	function handlePrevious() {
		quizStore.goToPreviousQuestion();
	}

	function handleNext() {
		quizStore.goToNextQuestion();
	}

	$: canGoBack = (() => {
		if ($quizStore.phase === 'mbti') {
			const answered = Object.keys($quizStore.mbtiAnswers).length;
			return answered > 0 && $quizStore.currentQuestionIndex > 0;
		} else if ($quizStore.phase === 'language') {
			// Can always go back from language phase (either to previous language question or to MBTI)
			return true;
		}
		return false;
	})();

	$: canGoForward = (() => {
		if ($quizStore.phase === 'mbti') {
			const answered = Object.keys($quizStore.mbtiAnswers).length;
			return (
				$quizStore.currentQuestionIndex < answered &&
				$quizStore.currentQuestionIndex < mbtiQuestions.length - 1
			);
		} else if ($quizStore.phase === 'language') {
			const answered = Object.keys($quizStore.languageAnswers).length;
			const totalQuestions = adaptiveQuestions.length;
			return (
				$quizStore.currentQuestionIndex < answered &&
				$quizStore.currentQuestionIndex < totalQuestions - 1
			);
		}
		return false;
	})();

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
			: 'Discover which programming language matches your personality from 42 curated languages! Based on MBTI personality science.'}
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
			: 'Discover which programming language matches your personality from 42 curated languages! Based on MBTI personality science.'}
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
					<span class="gradient-text">Personality Programming Quiz</span>
				</h1>
				<p class="subtitle">Ever wondered which programming language truly matches who you are?</p>
				<p>Discover languages that match your thinking style from 42 curated options</p>
				<div class="intro-details">
					<p class="intro-subtitle">
						✨ Takes just 2-3 minutes<br />
						🎯 Based on MBTI personality framework<br />
						💯 100% free, no signup required
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
				onPrevious={handlePrevious}
				onNext={handleNext}
				{canGoBack}
				{canGoForward}
				selectedAnswerId={selectedMBTIAnswerId}
			/>
		{/if}
	{:else if $quizStore.phase === 'language'}
		{#if currentLanguageQuestion}
			<LanguageQuestion
				question={currentLanguageQuestion}
				questionNumber={$quizStore.currentQuestionIndex + 1}
				totalQuestions={adaptiveQuestions.length}
				onAnswer={handleLanguageAnswer}
				onPrevious={handlePrevious}
				onNext={handleNext}
				{canGoBack}
				{canGoForward}
				selectedAnswerId={selectedLanguageAnswerId}
			/>
		{/if}
	{:else if $quizStore.completed && $quizStore.result}
		<Results language={$quizStore.result} onRestart={handleRestart} />
	{/if}

	<a
		href="https://github.com/RepoBirdBot/programming-personality"
		class="github-badge"
		target="_blank"
		rel="noopener noreferrer"
	>
		<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<path
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
		Open Source
	</a>

	<a href="https://repobird.ai" class="repobird-badge" target="_blank" rel="noopener noreferrer">
		Created with Repobird.ai
	</a>
</main>

<style>
	main {
		min-height: 100vh;
		min-height: 100dvh; /* Dynamic viewport height for mobile */
		display: flex;
		align-items: flex-start; /* Align to top for results */
		justify-content: center;
		padding: 1rem;
		padding-bottom: 80px; /* Space for fixed badges */
		position: relative;
	}

	/* Center vertically only for intro and questions */
	main:has(.intro),
	main:has(:global(.question-container)) {
		align-items: center;
	}

	.intro {
		text-align: center;
		max-width: 700px;
		width: 100%;
		padding: 2rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		box-shadow: var(--shadow-xl);
	}

	.intro h1 {
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		margin-bottom: 1rem;
		color: var(--color-text-primary);
		line-height: 1.2;
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
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		color: var(--color-text-secondary);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.intro p.subtitle {
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		color: var(--color-text-primary);
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.intro-details {
		margin: 2rem 0;
	}

	.intro-subtitle {
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.start-button {
		padding: 1rem 2.5rem;
		min-height: 48px; /* Touch target minimum */
		min-width: 120px;
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		background: var(--gradient-primary);
		color: white;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: var(--shadow-md);
		-webkit-tap-highlight-color: transparent;
	}

	.start-button:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.start-button:active {
		transform: translateY(0);
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

	.github-badge {
		position: fixed;
		bottom: 20px;
		left: 20px;
		background: #24292e;
		color: white;
		padding: 8px 16px;
		border-radius: 20px;
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 500;
		box-shadow: var(--shadow-md);
		transition: all 0.2s ease;
		z-index: 1000;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.github-badge:hover {
		background: #1a1e22;
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	/* Tablet styles */
	@media (max-width: 768px) {
		main {
			padding: 1rem;
			padding-bottom: 80px;
		}

		.intro {
			padding: 1.5rem;
			border-radius: 12px;
		}
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		main {
			padding: 0.5rem;
			padding-bottom: 70px;
		}

		.intro {
			padding: 1.25rem;
			max-width: calc(100vw - 1rem);
		}

		.intro h1 .emoji {
			font-size: 2rem;
			display: block;
			margin-bottom: 0.5rem;
		}

		.intro-details {
			margin: 1.5rem 0;
		}

		.start-button {
			padding: 0.875rem 2rem;
			width: 100%;
			max-width: 280px;
		}

		.repobird-badge,
		.github-badge {
			bottom: 10px;
			padding: 6px 12px;
			font-size: 0.75rem;
			border-radius: 16px;
		}

		.repobird-badge {
			right: 10px;
		}

		.github-badge {
			left: 10px;
		}

		.github-badge svg {
			width: 14px;
			height: 14px;
		}
	}

	/* Landscape mobile */
	@media (max-height: 600px) and (orientation: landscape) {
		main {
			padding: 0.5rem;
		}

		.intro {
			padding: 1rem;
		}

		.intro h1 {
			margin-bottom: 0.5rem;
		}

		.intro-details {
			margin: 1rem 0;
		}
	}
</style>
