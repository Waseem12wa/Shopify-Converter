# 🚀 Quick Docker Setup Guide

## Step-by-Step Instructions

### Step 1: Login to Docker Hub
```bash
docker login
```
Enter username: `waseemzahid48`
Enter password: [your Docker Hub password]

### Step 2: Build the Image

**On Windows (PowerShell or CMD):**
```bash
build-docker.bat
```

**On Linux/Mac:**
```bash
chmod +x build-docker.sh
./build-docker.sh
```

**Or manually:**
```bash
docker build --platform=linux/amd64 -t waseemzahid48/clone-app:latest .
docker push waseemzahid48/clone-app:latest
```

### Step 3: Pull and Run (on any machine)

```bash
# Pull the image
docker pull --platform=linux/amd64 waseemzahid48/clone-app:latest

# Run the container
docker run --dns 8.8.8.8 -p 5002:5000 waseemzahid48/clone-app:latest
```

### Step 4: Access the Application

Open your browser and go to:
```
http://localhost:5002
```

## ✅ What's Included

- ✅ Complete Node.js application
- ✅ Built Vite frontend (optimized)
- ✅ Express backend (API server)
- ✅ All dependencies installed
- ✅ Production-ready configuration
- ✅ All features working:
  - Website scraping
  - Bundle builder with styling
  - Logo injection
  - Button redirect
  - Header icon removal
  - Netlify deployment

## 🎯 Port Mapping

- **Container Internal Port:** 5000
- **Your Machine Port:** 5002
- **Access URL:** http://localhost:5002

## 🛠 Management Commands

```bash
# Run in background (detached mode)
docker run -d --name shopify-tool --dns 8.8.8.8 -p 5002:5000 waseemzahid48/clone-app:latest

# View logs
docker logs shopify-tool

# Stop container
docker stop shopify-tool

# Start container
docker start shopify-tool

# Remove container
docker rm shopify-tool
```

## 📝 Notes

- First build may take 5-10 minutes
- Image size: ~200MB
- No changes to application logic
- All functionality preserved
- DNS set to 8.8.8.8 (Google DNS) for reliable scraping

## 🆘 Need Help?

See [DOCKER_README.md](./DOCKER_README.md) for detailed documentation.
