# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S everest -u 1001

# Change ownership
RUN chown -R everest:nginx /var/cache/nginx && \
    chown -R everest:nginx /var/log/nginx && \
    chown -R everest:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R everest:nginx /var/run/nginx.pid

USER everest

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]