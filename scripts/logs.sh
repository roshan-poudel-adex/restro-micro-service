#!/bin/bash

# Colors for output
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

if [ -z "$1" ]; then
    echo -e "${BLUE}📋 Showing logs for all services${NC}"
    echo "================================"
    $COMPOSE_CMD logs -f
else
    echo -e "${BLUE}📋 Showing logs for: ${YELLOW}$1${NC}"
    echo "=========================="
    $COMPOSE_CMD logs -f $1
fi