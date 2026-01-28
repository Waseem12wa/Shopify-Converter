@echo off
REM Docker build and push script for Shopify Extractor Tool (Windows)

REM Configuration
set IMAGE_NAME=waseemzahid48/clone-app
set TAG=latest
set PLATFORM=linux/amd64

echo 🐳 Building Docker image for %PLATFORM%...
docker build --platform=%PLATFORM% -t %IMAGE_NAME%:%TAG% .

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo.
    echo 🚀 Pushing image to Docker Hub...
    docker push %IMAGE_NAME%:%TAG%
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Push successful!
        echo.
        echo 📦 Image ready: %IMAGE_NAME%:%TAG%
        echo.
        echo To run the container, use:
        echo docker run --dns 8.8.8.8 -p 5002:5000 %IMAGE_NAME%:%TAG%
    ) else (
        echo ❌ Push failed!
        exit /b 1
    )
) else (
    echo ❌ Build failed!
    exit /b 1
)
