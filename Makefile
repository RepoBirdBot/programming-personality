.PHONY: help dev build preview lint format format-check check clean install

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

preview: ## Preview production build
	npm run preview

lint: ## Run ESLint
	npm run lint

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting
	npm run format:check

check: ## Run type checking
	npm run check

clean: ## Clean build artifacts
	rm -rf build .svelte-kit node_modules

test: lint format-check check ## Run all tests (lint, format check, type check)

deploy: build ## Build and prepare for deployment
	@echo "Build complete. Ready for deployment to GitHub Pages."