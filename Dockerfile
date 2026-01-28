# Use Node.js 20 LTS version (required for latest dependencies)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy application files
COPY . .

# Build Vite frontend
RUN npm run build

# Create downloads directory
RUN mkdir -p downloads

# Expose port 5000
EXPOSE 5000

# Set environment variable for production
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["node", "server.js"]
