# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SvelteKit-based personality quiz that matches users with programming languages based on their MBTI personality type. The quiz has two phases:

1. MBTI assessment (16 personality types)
2. Adaptive language matching from 200+ programming languages

## Development Commands

### Primary Development

```bash
npm run dev          # Start dev server on port 5173
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality (Run before committing)

```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run check        # Type checking with svelte-check
```

### Alternative (using Make)

```bash
make dev             # Start dev server on port 3001
make build           # Build for production
make test            # Run all checks (lint, format check, type check)
```

## Architecture

### Quiz Flow State Machine

The quiz operates in three phases managed by `src/lib/stores/quiz.ts`:

1. **mbti phase**: User answers MBTI questions to determine personality type
2. **language phase**: Adaptive questions based on MBTI type to narrow down language choice
3. **completed phase**: Display matched programming language result

### Key Data Flow

1. MBTI questions (`mbti-questions.ts`) → Calculate MBTI type → Filter candidate languages from `language-profiles.ts`
2. Generate adaptive questions (`adaptive-questions.ts`) based on MBTI type
3. Score candidate languages based on answers → Return highest scoring language

### Component Structure

- **MBTIQuestion.svelte**: Handles MBTI personality questions
- **LanguageQuestion.svelte**: Handles adaptive language matching questions
- **Results.svelte**: Displays final matched language with personality insights
- **+page.svelte**: Main orchestrator managing quiz phases and state transitions

### Data Architecture

- **language-profiles.ts**: 200+ language profiles with MBTI mappings
- **adaptive-questions.ts**: Dynamic question generation based on MBTI type
- **quiz.ts store**: Centralized state management using Svelte stores

## Deployment

The app deploys to GitHub Pages via GitHub Actions on push to main branch. The deployment workflow:

1. Runs linting, format check, and type checking
2. Builds with `NODE_ENV=production`
3. Deploys to `https://[username].github.io/programming-personality/`

Base path is configured in `svelte.config.js` to handle GitHub Pages subdirectory deployment.

## Important Configuration

- **Static adapter**: Configured for GitHub Pages with fallback to 404.html
- **Base path**: Automatically switches between development (/) and production (/programming-personality)
- **TypeScript**: Strict mode enabled with svelte-check for type safety
