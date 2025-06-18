#!/bin/bash

# This script validates and tests the CircleCI configuration locally
# Requires the CircleCI CLI to be installed: https://circleci.com/docs/local-cli/

# Check if CircleCI CLI is installed
if ! command -v circleci &> /dev/null; then
    echo "CircleCI CLI is not installed. Please install it first:"
    echo "brew install circleci"
    exit 1
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
