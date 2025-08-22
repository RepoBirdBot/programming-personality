.PHONY: help dev build preview lint format format-check check clean install dev-open

# Configuration
PORT ?= 3001

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'
	@echo ""
	@echo "Configuration:"
	@echo "  PORT=$(PORT) (default: 3001, override with PORT=xxxx make dev)"

install: ## Install dependencies
	npm install

dev: ## Start dev server with hot reload on port 3001
	@echo "🚀 Starting development server with hot reload..."
	@echo "📍 Server: http://localhost:$(PORT)"
	@echo "🔥 Hot reload enabled - changes auto-refresh"
	@echo "📍 Press Ctrl+C to stop"
	npm run dev -- --port $(PORT)

dev-open: ## Start dev server and open browser
	@echo "🚀 Starting development server with hot reload..."
	@echo "📍 Opening http://localhost:$(PORT) in browser..."
	npm run dev -- --port $(PORT) --open

build: ## Build for production
	npm run build

preview: ## Preview production build on port 3001
	@echo "👀 Previewing production build..."
	@echo "📍 Preview server: http://localhost:$(PORT)"
	npm run preview -- --port $(PORT)

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

test-ci: lint format-check check build-check ## Run comprehensive tests matching GitHub CI workflow
	@echo "✅ All CI checks passed! Ready for deployment."

build-check: ## Run production build to catch all errors (matches GitHub CI)
	@echo "🏗️ Running production build check (matches GitHub CI)..."
	NODE_ENV=production npm run build

deploy: build ## Build and prepare for deployment
	@echo "Build complete. Ready for deployment to GitHub Pages."

# Additional useful commands
dev-watch: ## Run dev server with type checking in watch mode
	@echo "🚀 Starting dev server with type checking watch mode..."
	npm run check:watch & npm run dev -- --port $(PORT)

start: install dev ## Quick start - install deps and run dev server

restart: ## Restart dev server (useful if stuck)
	@echo "🔄 Restarting development server..."
	@pkill -f "vite" || true
	@sleep 1
	@make dev

logs: ## Show recent npm logs
	@tail -f ~/.npm/_logs/*.log 2>/dev/null || echo "No npm logs found"

serve: dev ## Alias for dev command

run: dev ## Alias for dev command

local: dev ## Alias for dev command