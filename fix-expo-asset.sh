#!/bin/bash

# There is an issue with the expo-asset package, specifically that it was looking for a file at /Users/marcos.feitoza/Documents/projeto/app/priceperprice/node_modules/expo-asset/build/index.js that didn't exist.
#The fix-expo-asset.sh script creates this missing file to resolve the error.

# Create the build directory if it doesn't exist
mkdir -p node_modules/expo-asset/build

# Create a simple index.js file in the build directory
echo "// Auto-generated index.js to fix expo-asset issue
export * from '../src/index';
" > node_modules/expo-asset/build/index.js

echo "✅ expo-asset fix applied successfully!"
