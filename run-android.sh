#!/bin/bash

# Script to run the Android app with proper Node.js path

# Get Node.js path
NODE_PATH=$(which node)

# Set NODE_BINARY environment variable
export NODE_BINARY="$NODE_PATH"

# Print the Node.js path
echo "🔧 Using Node.js: $NODE_BINARY"

# Start Metro bundler in the background
echo "🚀 Starting Metro bundler..."
npm start &
METRO_PID=$!

# Wait a bit for Metro to start
sleep 5

# Open Android Studio
echo "🚀 Opening Android Studio..."
open -a "Android Studio" ./android

# Instructions
echo ""
echo "📋 Instructions:"
echo "1. In Android Studio, go to Preferences > Appearance & Behavior > Path Variables"
echo "2. Add a variable named NODE_BINARY with value: $NODE_PATH"
echo "3. Click Apply and OK"
echo "4. Run the app from Android Studio"
echo ""
echo "Press Ctrl+C to stop Metro bundler when done"

# Wait for user to press Ctrl+C
wait $METRO_PID
