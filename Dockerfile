# Build stage
FROM node:14 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy entire project
COPY . .

# Build the Nuxt application (generates static files)
RUN npm run generate

# Production stage - serve static files with simple HTTP server
FROM node:14-slim

WORKDIR /app

# Install http-server to serve static files
RUN npm install -g http-server

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Serve static files from dist folder
CMD ["http-server", "dist", "-p", "3000", "--cors"]
