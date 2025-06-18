#!/bin/bash

# This script validates and tests the CircleCI configuration locally
# Requires the CircleCI CLI to be installed: https://circleci.com/docs/local-cli/

# Check if CircleCI CLI is installed
if ! command -v circleci &> /dev/null; then
    echo "CircleCI CLI is not installed. Please install it first:"
    echo "brew install circleci"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
REQUIRED_VERSION="18.18.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "Warning: Your Node.js version ($NODE_VERSION) is older than the required version ($REQUIRED_VERSION)."
    echo "This might cause compatibility issues with some packages."
    echo "Consider upgrading your Node.js version using nvm or another version manager."
    echo ""
fi

# Validate the CircleCI configuration
echo "Validating CircleCI configuration..."
circleci config validate .circleci/config.yml

# If validation is successful, offer to run the build locally
if [ $? -eq 0 ]; then
    echo "Configuration is valid!"
    echo ""
    echo "Do you want to run the build locally? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Running build locally..."
        circleci local execute
    else
        echo "Skipping local build."
    fi
else
    echo "Configuration validation failed. Please fix the errors and try again."
fi
