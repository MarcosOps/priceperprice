#!/bin/bash

# Script to open Android Studio with the correct environment variables
# This ensures Android Studio inherits the shell variables

# Get Node.js path
NODE_PATH=$(which node)
NODE_DIR=$(dirname "$NODE_PATH")

# Set NODE_BINARY environment variable
export NODE_BINARY="$NODE_PATH"

# Add Node.js to PATH
export PATH="$PATH:$NODE_DIR"

# Print the Node.js path
echo "🔧 Using Node.js: $NODE_BINARY"
echo "🔧 PATH includes: $NODE_DIR"

# Open Android Studio (ensuring it inherits shell variables)
echo "🚀 Opening Android Studio..."
open -a "Android Studio" ./android

echo ""
echo "📋 Instructions:"
echo "1. In Android Studio, go to Preferences > Appearance & Behavior > Path Variables"
echo "2. Add a variable named NODE_BINARY with value: $NODE_PATH"
echo "3. Click Apply and OK"
echo "4. Run the app from Android Studio"
