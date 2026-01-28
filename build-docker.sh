#!/bin/bash

# Docker build and push script for Shopify Extractor Tool

# Configuration
IMAGE_NAME="waseemzahid48/clone-app"
TAG="latest"
PLATFORM="linux/amd64"

echo "🐳 Building Docker image for $PLATFORM..."
docker build --platform=$PLATFORM -t $IMAGE_NAME:$TAG .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Pushing image to Docker Hub..."
    docker push $IMAGE_NAME:$TAG
    
    if [ $? -eq 0 ]; then
        echo "✅ Push successful!"
        echo ""
        echo "📦 Image ready: $IMAGE_NAME:$TAG"
        echo ""
        echo "To run the container, use:"
        echo "docker run --dns 8.8.8.8 -p 5002:5000 $IMAGE_NAME:$TAG"
    else
        echo "❌ Push failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
