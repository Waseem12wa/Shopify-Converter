# Docker Deployment Instructions

## Prerequisites
- Docker installed on your system
- Internet connection to pull the image

## Quick Start Commands

### 1. Pull the Docker Image
```bash
docker pull waseemzahid48/clone-app:latest
```

### 2. Run the Container
```bash
docker run -d -p 5002:5000 --name clone-app waseemzahid48/clone-app:latest
```

### 3. Access the Application
Open your browser and navigate to:
```
http://localhost:5002
```

---

## Container Management Commands

### View Container Logs
```bash
docker logs clone-app
```

### Check Container Status
```bash
docker ps
```

### Stop the Container
```bash
docker stop clone-app
```

### Start the Container (after stopping)
```bash
docker start clone-app
```

### Restart the Container
```bash
docker restart clone-app
```

### Remove the Container
```bash
docker stop clone-app
docker rm clone-app
```

### Pull Latest Updates and Restart
```bash
docker pull waseemzahid48/clone-app:latest
docker stop clone-app
docker rm clone-app
docker run -d -p 5002:5000 --name clone-app waseemzahid48/clone-app:latest
```

---

## Custom Port Configuration

If port 5002 is already in use, you can change it to any available port:

```bash
docker run -d -p 8080:5000 --name clone-app waseemzahid48/clone-app:latest
```

Then access the app at: `http://localhost:8080`

---

## Troubleshooting

### Port Already in Use Error
```bash
# Find and stop the container using the port
docker ps
docker stop <container-name-or-id>
docker rm <container-name-or-id>

# Then run the new container
docker run -d -p 5002:5000 --name clone-app waseemzahid48/clone-app:latest
```

### Check if Container is Running
```bash
docker ps
```

### View Container Errors
```bash
docker logs clone-app
```
