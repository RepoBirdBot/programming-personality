# Programming Language Personality Test 🚀

A fun, interactive web application that helps you discover which programming language best matches your personality! Built with SvelteKit, TypeScript, and deployed to GitHub Pages.

## 🎯 Live Demo

Visit the live application at: https://repobirdbot.github.io/programming-personality/

## 🌟 Features

- **MBTI-Based Assessment**: Two-phase quiz combining personality typing with language matching
- **100 Programming Languages**: Extensive list covering mainstream to esoteric languages
- **Adaptive Questioning**: Dynamic questions based on your MBTI personality type
- **Share Your Results**: Social sharing buttons for Twitter, LinkedIn, WhatsApp, and Reddit
- **Shareable Links**: Copy and share unique URLs that display your quiz results
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Type-Safe**: Built with TypeScript for reliability
- **Fast & Static**: Deployed as a static site for instant loading

## 🛠️ Technology Stack

- **Framework**: SvelteKit 2.0
- **Language**: TypeScript
- **Styling**: CSS with modern gradients and animations
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with GitHub Actions
- **Code Quality**: ESLint + Prettier

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/[your-username]/programming-personality.git
cd programming-personality
```

2. Install dependencies:

```bash
npm install
# or
make install
```

3. Start the development server:

```bash
npm run dev
# or
make dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Commands

Using npm:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run check        # Run type checking
```

Using Make:

```bash
make help           # Show all available commands
make dev            # Start development server
make build          # Build for production
make lint           # Run ESLint
make format         # Format code with Prettier
make test           # Run all checks
make deploy         # Build for deployment
```

## 🚀 Deployment

The application automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Deployment:

1. Build the application:

```bash
npm run build
# or
make build
```

2. The build output will be in the `build/` directory

3. Push to the `main` branch to trigger automatic deployment

### GitHub Pages Setup:

1. Go to your repository settings
2. Navigate to Pages section
3. Set source to "GitHub Actions"
4. The site will be available at `https://[your-username].github.io/programming-personality/`

## 📂 Project Structure

```
programming-personality/
├── src/
│   ├── lib/
│   │   ├── components/       # Svelte components
│   │   │   ├── Question.svelte
│   │   │   └── Results.svelte
│   │   ├── data/             # Quiz data
│   │   │   ├── questions.ts
│   │   │   └── languages.ts
│   │   ├── stores/           # State management
│   │   │   └── quiz.ts
│   │   └── types/            # TypeScript types
│   │       └── quiz.ts
│   └── routes/               # SvelteKit routes
│       ├── +layout.ts
│       └── +page.svelte
├── static/                   # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── Makefile                  # Build commands
├── package.json
├── svelte.config.js          # SvelteKit configuration
├── tsconfig.json             # TypeScript configuration
└── README.md
```

## 🎮 How It Works

1. **MBTI Assessment**: Answer personality questions to determine your MBTI type (INTJ, ENFP, etc.)
2. **Adaptive Questions**: Get customized language preference questions based on your personality
3. **Smart Matching**: Algorithm matches you with languages that align with your MBTI profile
4. **Share Results**: Generate a unique shareable link to show off your programming language match
5. **Social Sharing**: One-click sharing to Twitter, LinkedIn, WhatsApp, or Reddit with rich previews

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Deployed with [GitHub Pages](https://pages.github.com/)
- Icons and emojis for visual appeal

## 📮 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ using SvelteKit and TypeScript
