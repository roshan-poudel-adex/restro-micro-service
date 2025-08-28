#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏔️  Starting Everest Kitchen Services${NC}"
echo "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  docker-compose not found, using 'docker compose'${NC}"
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

echo -e "${YELLOW}📦 Building and starting services...${NC}"

# Build and start services
$COMPOSE_CMD up --build -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check service status
echo -e "${BLUE}📊 Service Status:${NC}"
$COMPOSE_CMD ps

echo ""
echo -e "${GREEN}✅ Services are starting up!${NC}"
echo ""
echo -e "${BLUE}🌐 Access URLs:${NC}"
echo -e "   Frontend (Customer):     ${GREEN}http://localhost:3000${NC}"
echo -e "   Admin Dashboard:         ${GREEN}http://localhost:3001${NC}"
echo -e "   Backend API:             ${GREEN}http://localhost:5000${NC}"
echo -e "   API Documentation:       ${GREEN}http://localhost:5000/api-docs${NC}"
echo -e "   MySQL Database:          ${GREEN}localhost:3306${NC}"
echo ""
echo -e "${BLUE}🔐 Default Credentials:${NC}"
echo -e "   Admin: ${YELLOW}admin@everestkitchen.de / admin123${NC}"
echo -e "   Manager: ${YELLOW}manager@everestkitchen.de / manager123${NC}"
echo -e "   Customer: ${YELLOW}anna@example.com / customer123${NC}"
echo ""
echo -e "${BLUE}📝 Useful Commands:${NC}"
echo -e "   View logs:     ${YELLOW}$COMPOSE_CMD logs -f [service_name]${NC}"
echo -e "   Stop services: ${YELLOW}$COMPOSE_CMD down${NC}"
echo -e "   Restart:       ${YELLOW}$COMPOSE_CMD restart [service_name]${NC}"
echo ""