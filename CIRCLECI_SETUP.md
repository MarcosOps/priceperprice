# Setting Up CircleCI for PricePerPrice

This guide will walk you through the process of setting up CircleCI to build your Android APK and store it as an artifact.

## Prerequisites

- A GitHub account
- A CircleCI account
- Your project pushed to a GitHub repository

## Step 1: Connect Your GitHub Repository to CircleCI

1. Go to [CircleCI](https://circleci.com/) and sign in with your GitHub account.
2. Click on "Projects" in the left sidebar.
3. Find your repository in the list and click "Set Up Project".
4. Select "Use Existing Config" since we've already created a `.circleci/config.yml` file.
5. Click "Start Building" to trigger your first build.

## Step 2: Monitor the Build

1. CircleCI will automatically start building your project.
2. You can monitor the build progress in the CircleCI dashboard.
3. The build will go through several steps:
   - Checkout code
   - Install dependencies
   - Configure EAS
   - Update app.json
   - Create assets
   - Build APK
   - Store APK as artifact

## Step 3: Access the APK Artifact

1. Once the build is complete, click on the build in the CircleCI dashboard.
2. Click on the "Artifacts" tab.
3. You should see an `app.apk` file listed. Click on it to download the APK.

## Step 4: Customizing the Build

If you need to customize the build process, you can modify the following files:

- `.circleci/config.yml`: CircleCI configuration
- `eas.json`: EAS build configuration
- `app.json`: Expo app configuration

## Troubleshooting

### Build Fails with "No such file or directory"

If the build fails with a "No such file or directory" error, it might be because the assets directory or some required files are missing. Make sure you have:

1. Created the assets directory: `mkdir -p assets`
2. Added placeholder images for icon.png, splash.png, and adaptive-icon.png

### Build Fails with "Command not found"

If the build fails with a "Command not found" error, it might be because some required tools are not installed. Make sure the CircleCI configuration includes all necessary tools:

```yaml
- run:
    name: Install dependencies
    command: |
      npm install
      npm install -g eas-cli
      npm install -g expo-cli
```

### APK Not Generated

If the APK is not generated, check the build logs for errors. Common issues include:

1. Missing Android configuration in app.json
2. Missing or incorrect EAS configuration
3. Issues with the Android SDK

## Testing the CircleCI Configuration Locally

You can test the CircleCI configuration locally using the CircleCI CLI:

1. Install the CircleCI CLI: `brew install circleci`
2. Validate the configuration: `circleci config validate .circleci/config.yml`
3. Run the build locally: `circleci local execute`

Alternatively, you can use the provided script:

```bash
./test-circleci-config.sh
```

## Additional Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
