# 🐳 Docker Deployment Guide

## Prerequisites

1. **Docker Desktop** installed and running
2. **Docker Hub account** (waseemzahid48)
3. **Logged into Docker Hub** via terminal:
   ```bash
   docker login
   ```

## Quick Start

### Option 1: Using Build Scripts (Recommended)

#### On Windows:
```bash
build-docker.bat
```

#### On Linux/Mac:
```bash
chmod +x build-docker.sh
./build-docker.sh
```

### Option 2: Manual Commands

#### 1. Build the Docker Image
```bash
docker build --platform=linux/amd64 -t waseemzahid48/clone-app:latest .
```

#### 2. Push to Docker Hub
```bash
docker push waseemzahid48/clone-app:latest
```

#### 3. Pull the Image (on any machine)
```bash
docker pull --platform=linux/amd64 waseemzahid48/clone-app:latest
```

#### 4. Run the Container
```bash
docker run --dns 8.8.8.8 -p 5002:5000 waseemzahid48/clone-app:latest
```

Or run in detached mode:
```bash
docker run -d --name shopify-tool --dns 8.8.8.8 -p 5002:5000 waseemzahid48/clone-app:latest
```

## Access the Application

Once the container is running, open your browser and navigate to:
```
http://localhost:5002
```

## Docker Container Management

### View Running Containers
```bash
docker ps
```

### View All Containers (including stopped)
```bash
docker ps -a
```

### Stop the Container
```bash
docker stop shopify-tool
```

### Start the Container
```bash
docker start shopify-tool
```

### View Container Logs
```bash
docker logs shopify-tool
```

### Follow Logs in Real-time
```bash
docker logs -f shopify-tool
```

### Remove the Container
```bash
docker rm shopify-tool
```

### Remove the Image
```bash
docker rmi waseemzahid48/clone-app:latest
```

## Environment Variables

You can customize the application using environment variables:

```bash
docker run -d \
  --name shopify-tool \
  --dns 8.8.8.8 \
  -p 5002:5000 \
  -e PORT=5000 \
  -e NODE_ENV=production \
  waseemzahid48/clone-app:latest
```

## Volume Mounting (Optional)

To persist downloaded websites:

```bash
docker run -d \
  --name shopify-tool \
  --dns 8.8.8.8 \
  -p 5002:5000 \
  -v $(pwd)/downloads:/app/downloads \
  waseemzahid48/clone-app:latest
```

On Windows PowerShell:
```powershell
docker run -d --name shopify-tool --dns 8.8.8.8 -p 5002:5000 -v ${PWD}/downloads:/app/downloads waseemzahid48/clone-app:latest
```

## Troubleshooting

### Container won't start
```bash
docker logs shopify-tool
```

### Port already in use
Change the host port (5002) to another available port:
```bash
docker run --dns 8.8.8.8 -p 5003:5000 waseemzahid48/clone-app:latest
```

### DNS issues
The `--dns 8.8.8.8` flag uses Google's DNS server. You can change it if needed:
```bash
docker run --dns 1.1.1.1 -p 5002:5000 waseemzahid48/clone-app:latest
```

### Rebuild without cache
```bash
docker build --no-cache --platform=linux/amd64 -t waseemzahid48/clone-app:latest .
```

## Production Deployment

### Using Docker Compose (Optional)

Create a `docker-compose.yml`:
```yaml
version: '3.8'
services:
  shopify-tool:
    image: waseemzahid48/clone-app:latest
    container_name: shopify-tool
    ports:
      - "5002:5000"
    dns:
      - 8.8.8.8
    environment:
      - NODE_ENV=production
      - PORT=5000
    volumes:
      - ./downloads:/app/downloads
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Features in Docker

✅ All functionality preserved
✅ Runs on port 5000 internally (mapped to 5002)
✅ Production-optimized build
✅ Built Vite frontend included
✅ Express server handles all routes
✅ Website scraping works
✅ Bundle builder works
✅ Logo injection works
✅ Button redirect works
✅ Netlify deployment works

## Architecture

- **Base Image**: Node.js 18 Alpine (lightweight)
- **Build Process**: Vite builds frontend to `dist/`
- **Runtime**: Express serves API + built frontend
- **Port**: 5000 (internal), mapped to 5002 (host)
- **Size**: ~200MB (optimized)

## Notes

- The container runs in production mode
- Frontend is pre-built for better performance
- All Node.js dependencies are installed
- Downloads directory is created automatically
- No separate Vite server needed in production
