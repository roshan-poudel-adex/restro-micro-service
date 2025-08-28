# Everest Kitchen - Docker Management

# Default target
.DEFAULT_GOAL := help

# Colors
BLUE := \033[0;34m
]
GREEN := \033[0;32m
]
YELLOW := \033[1;33m
]
RED := \033[0;31m
]
NC := \033[0m
]

# Docker compose command
COMPOSE := $(shell command -v docker-compose 2> /dev/null || echo "docker compose")

.PHONY: help start stop restart logs build clean reset status shell

help: ## Show this help message
	@echo -e "$(BLUE)🏔️  Everest Kitchen - Docker Management$(NC)"
	@echo "========================================"
	@echo ""
	@echo -e "$(YELLOW)Available commands:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-12s$(NC) %s\n", $$1, $$2}\' $(MAKEFILE_LIST)
	@echo ""

start: ## Start all services
	@echo -e "$(BLUE)🚀 Starting Everest Kitchen services...$(NC)"
	@$(COMPOSE) up -d --build
	@echo -e "$(GREEN)✅ Services started!$(NC)"
	@make status

stop: ## Stop all services
	@echo -e "$(YELLOW)🛑 Stopping services...$(NC)"
	@$(COMPOSE) down
	@echo -e "$(GREEN)✅ Services stopped!$(NC)"

restart: ## Restart all services
	@echo -e "$(YELLOW)🔄 Restarting services...$(NC)"
	@$(COMPOSE) restart
	@echo -e "$(GREEN)✅ Services restarted!$(NC)"

logs: ## Show logs for all services (or specific service: make logs SERVICE=backend)
	@if [ -n "$(SERVICE)" ]; then \
		echo -e "$(BLUE)📋 Logs for $(SERVICE):$(NC)"; \
		$(COMPOSE) logs -f $(SERVICE); \
	else \
		echo -e "$(BLUE)📋 Logs for all services:$(NC)"; \
		$(COMPOSE) logs -f; \
	fi

build: ## Build all services
	@echo -e "$(BLUE)🔨 Building services...$(NC)"
	@$(COMPOSE) build --no-cache
	@echo -e "$(GREEN)✅ Build complete!$(NC)"

clean: ## Remove stopped containers and unused images
	@echo -e "$(YELLOW)🧹 Cleaning up...$(NC)"
	@docker system prune -f
	@echo -e "$(GREEN)✅ Cleanup complete!$(NC)"

reset: ## Reset everything (removes all data!)
	@echo -e "$(RED)⚠️  This will remove ALL data including the database!$(NC)"
	@read -p "Are you sure? (y/N): \" confirm && [ "$$confirm" = "y" ] || exit 1
	@echo -e "$(YELLOW)🗑️  Removing all services and data...$(NC)"
	@$(COMPOSE) down -v --remove-orphans
	@docker system prune -f
	@echo -e "$(GREEN)✅ Reset complete!$(NC)"

status: ## Show service status
	@echo -e "$(BLUE)📊 Service Status:$(NC)"
	@$(COMPOSE) ps
	@echo ""
	@echo -e "$(BLUE)🌐 Access URLs:$(NC)"
	@echo -e "   Frontend:      $(GREEN)http://localhost:3000$(NC)"
	@echo -e "   Admin:         $(GREEN)http://localhost:3001$(NC)"
	@echo -e "   Backend API:   $(GREEN)http://localhost:5000$(NC)"
	@echo -e "   API Docs:      $(GREEN)http://localhost:5000/api-docs$(NC)"

shell: ## Access service shell (usage: make shell SERVICE=backend)
	@if [ -z "$(SERVICE)" ]; then \
		echo -e "$(RED)❌ Please specify SERVICE (backend, frontend, admin-dashboard, mysql)$(NC)"; \
		echo -e "$(YELLOW)Example: make shell SERVICE=backend$(NC)"; \
	else \
		echo -e "$(BLUE)🐚 Accessing $(SERVICE) shell...$(NC)"; \
		$(COMPOSE) exec $(SERVICE) /bin/sh; \
	fi

dev: ## Start in development mode with live reload
	@echo -e "$(BLUE)🔧 Starting in development mode...$(NC)"
	@$(COMPOSE) -f docker-compose.yml -f docker-compose.dev.yml up --build

prod: ## Start in production mode
	@echo -e "$(BLUE)🚀 Starting in production mode...$(NC)"
	@$(COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml up -d --build