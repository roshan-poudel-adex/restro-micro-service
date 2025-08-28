#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}🔄 Resetting Everest Kitchen Services${NC}"
echo "====================================="

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

echo -e "${YELLOW}⚠️  This will remove all containers, volumes, and data!${NC}"
read -p "Are you sure? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Stopping and removing all services...${NC}"
    $COMPOSE_CMD down -v --remove-orphans
    
    echo -e "${YELLOW}🧹 Removing unused Docker resources...${NC}"
    docker system prune -f
    
    echo -e "${GREEN}✅ Reset complete!${NC}"
    echo -e "${BLUE}💡 Run './scripts/start.sh' to start fresh${NC}"
else
    echo -e "${BLUE}❌ Reset cancelled${NC}"
fi