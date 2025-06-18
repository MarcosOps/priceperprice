#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p assets

# Create placeholder images
echo "Creating placeholder icon.png"
convert -size 1024x1024 xc:white assets/icon.png

echo "Creating placeholder splash.png"
convert -size 1242x2436 xc:white assets/splash.png

echo "Creating placeholder adaptive-icon.png"
convert -size 1024x1024 xc:white assets/adaptive-icon.png

echo "Placeholder images created successfully"
