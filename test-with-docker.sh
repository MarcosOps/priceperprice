#!/bin/bash

# This script tests the CircleCI configuration using Docker
# It simulates the CircleCI environment more closely than the CircleCI CLI

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install it first."
    exit 1
fi

# Create a temporary directory for the Docker build
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR" || exit 1

# Create a Dockerfile that mimics the CircleCI environment
cat > Dockerfile << 'EOL'
FROM cimg/android:2024.01-node

# Install dependencies
RUN sudo apt-get update && \
    sudo apt-get install -y imagemagick

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install npm dependencies
RUN npm install && \
    npm install --save-dev eas-cli expo-cli

# Create assets directory and placeholder images
RUN mkdir -p assets && \
    convert -size 1024x1024 xc:white assets/icon.png && \
    convert -size 1242x2436 xc:white assets/splash.png && \
    convert -size 1024x1024 xc:white assets/adaptive-icon.png

# Create build directory
RUN mkdir -p build

# Set the entrypoint
ENTRYPOINT ["npx", "eas-cli", "build", "--platform", "android", "--profile", "preview", "--local", "--non-interactive", "--output=./build/app.apk"]
EOL

# Copy the project files to the temporary directory
echo "Copying project files to temporary directory..."
cp -r /Users/marcos.feitoza/Documents/projeto/app/priceperprice/* "$TEMP_DIR/"

# Build the Docker image
echo "Building Docker image..."
docker build -t priceperprice-build .

# Run the Docker container
echo "Running Docker container..."
docker run --rm -it priceperprice-build

# Clean up
cd - || exit 1
rm -rf "$TEMP_DIR"
