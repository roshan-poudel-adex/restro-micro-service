#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛑 Stopping Everest Kitchen Services${NC}"
echo "===================================="

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

echo -e "${YELLOW}📦 Stopping services...${NC}"
$COMPOSE_CMD down

echo -e "${GREEN}✅ All services stopped successfully!${NC}"
echo ""
echo -e "${BLUE}💡 To remove all data (including database):${NC}"
echo -e "   ${YELLOW}$COMPOSE_CMD down -v${NC}"
echo ""