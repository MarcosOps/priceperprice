#!/bin/bash

# Script to generate the JavaScript bundle for Android

echo "📦 Generating JavaScript bundle..."

# Create assets directory if it doesn't exist
mkdir -p android/app/src/main/assets

# Generate the bundle
npx react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Check if the bundle was generated successfully
if [ -f "android/app/src/main/assets/index.android.bundle" ]; then
  echo "✅ Bundle generated successfully!"
  echo "📄 Bundle location: android/app/src/main/assets/index.android.bundle"
else
  echo "❌ Failed to generate bundle"
fi
