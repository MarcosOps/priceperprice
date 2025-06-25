# Android Studio Guide for PricePerPrice App

This guide provides simple, reliable steps to build and run your PricePerPrice app using Android Studio, both for development and release builds.

## First Time Setup (Important!)

Before using Android Studio with this project, run one of these setup scripts:

### Option 1: Quick Start with All-in-One Fix (Recommended)

```bash
npm run fix-all
```

This script applies ALL fixes in one go:
1. Updates MainApplication.kt with proper bundle loading code
2. Updates settings.gradle with Node.js path configuration
3. Updates gradle.properties with Node.js path and warning mode
4. Creates node scripts in both project root and android directory
5. Creates .env file with NODE_BINARY
6. Creates/updates react-native.config.js with proper configuration
7. Creates assets directory and .gitkeep file
8. Generates the JavaScript bundle
9. Makes all shell scripts executable

After running this script, you can open Android Studio with:

```bash
npm run studio
```

### Option 2: Run with Metro Bundler

```bash
npm run run-android
```

This will:
1. Start Metro bundler in the background
2. Open Android Studio with the correct environment variables
3. Guide you through the final setup steps

## Development Mode (with Metro)

### Option 1: Run with Metro Bundler (Recommended for Development)

1. **Start Metro Bundler**:
   ```bash
   npm start
   ```

2. **Run from Android Studio**:
   - Open the `android` folder in Android Studio
   - Click the "Run" button (green triangle)
   - Select your device/emulator
   - The app will connect to the Metro bundler automatically

### Option 2: Run without Metro (Quick Testing)

1. **Generate the bundle**:
   ```bash
   npm run bundle
   ```

2. **Run from Android Studio**:
   - Open the `android` folder in Android Studio
   - Click the "Run" button (green triangle)
   - Select your device/emulator
   - The app will use the bundled JavaScript code

## Release Build (for Distribution)

1. **Generate the bundle**:
   ```bash
   npm run bundle
   ```

2. **Build from Android Studio**:
   - Open the `android` folder in Android Studio
   - From the menu, select Build > Generate Signed Bundle / APK
   - Select "APK"
   - Fill in the keystore information (create a new one if needed)
   - Select "release" build variant
   - Click "Finish"

3. **Find your APK**:
   - The APK will be in `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting

### If you see "Unable to load script" error:

1. **Check if the bundle exists**:
   ```bash
   ls -la android/app/src/main/assets/index.android.bundle
   ```

2. **If the bundle doesn't exist, generate it**:
   ```bash
   npm run bundle
   ```

3. **Clean and rebuild the project in Android Studio**:
   - Build > Clean Project
   - Build > Rebuild Project

### If the app crashes on startup:

1. **Check Android Studio logs** for specific error messages

2. **Verify the bundle was generated correctly**:
   ```bash
   ls -la android/app/src/main/assets/index.android.bundle
   ```

3. **Try running with Metro bundler** to see if it's a bundle issue:
   ```bash
   npm start
   ```
   Then run from Android Studio

## How the Solution Works

The key fix is in `MainApplication.kt`, which implements a smart bundle loading strategy:

```kotlin
override fun getJSBundleFile(): String? {
  val bundleInAssets = try {
    val assets = application.assets.list("")
    assets != null && assets.contains("index.android.bundle")
  } catch (e: Exception) {
    false
  }
  
  return if (bundleInAssets) {
    "assets://index.android.bundle"
  } else if (BuildConfig.DEBUG) {
    // In debug mode, try to use Metro
    super.getJSBundleFile()
  } else {
    // In release mode, we must have a bundle
    "assets://index.android.bundle"
  }
}
```

This implementation:
1. First checks if the bundle exists in the assets directory
2. If it exists, uses it directly (fastest option)
3. If it doesn't exist and we're in debug mode, falls back to Metro bundler
4. If it doesn't exist and we're in release mode, still tries to use the assets bundle (which will fail gracefully if truly missing)

This ensures your app works in both development and release modes with the optimal strategy for each.

## Tips for Android Studio

- **Set NODE_BINARY environment variable** (critical for React Native):
  - In Android Studio: Preferences > Appearance & Behavior > Path Variables
  - Add NODE_BINARY pointing to your Node.js path (e.g., /opt/homebrew/bin/node)
  - You can find your Node.js path by running `which node` in the terminal

- **For physical devices**:
  - Enable USB debugging on your device
  - Connect via USB or use wireless debugging
  - Make sure your device is on the same network as your computer if using Metro

- **For release builds**:
  - Always generate a fresh bundle before building
  - Test the release build thoroughly before distribution
