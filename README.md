# PricePerPrice

A React Native app for comparing product prices based on quantity and unit.

## Features

- Compare prices of two products with different quantities and units
- Calculate which product offers better value for money
- Support for multiple languages:
  - English (🇺🇸)
  - Spanish (🇪🇸)
  - Portuguese (Brazil) (🇧🇷)
  - French (🇫🇷)
- Language selection with country flags
- Persistent language preference using AsyncStorage

## Installation

```bash
# Install dependencies
npm install
```

## Running the App

### Using Expo Go

Simply run:

```bash
npx expo start
```

This will:
1. Apply necessary fixes for dependencies
2. Start the Expo development server
3. Allow you to run the app on iOS, Android, or web

### Using Android Studio

For running the app directly in Android Studio, we've provided scripts to fix common issues:

```bash
# Apply all fixes and prepare for Android Studio
npm run fix-all

# Open Android Studio with the correct environment variables
npm run studio
```

See the [Android Studio Guide](ANDROID-STUDIO-GUIDE.md) for detailed instructions.

## Troubleshooting

### Expo Issues

If you encounter any issues with the Expo app, you can try:

```bash
# Reset the app (clean dependencies and restart)
npm run reset
```

This will:
1. Remove the .expo directory
2. Remove node_modules
3. Remove package-lock.json
4. Reinstall dependencies
5. Apply the expo-asset fix
6. Start the Expo development server

### Android Studio Issues

If you encounter issues with Android Studio:

#### "Cannot run program 'node'" error

```bash
npm run fix-all
```

This will fix the Gradle settings for your specific Gradle version.

#### "Unable to load script" Error

If you encounter the "Unable to load script" error:

```bash
# Generate the bundle
npm run bundle

# Open Android Studio with the correct environment variables
npm run studio
```

For more detailed troubleshooting, see the [Android Studio Guide](ANDROID-STUDIO-GUIDE.md).

## Project Structure

```
priceperprice/
├── src/
│   ├── screens/        # App screens
│   │   ├── SplashScreen.js
│   │   ├── ConversionScreen.js
│   ├── components/     # Reusable components
│   │   ├── ColoredTitle.js
│   │   ├── ProductInputGroup.js
│   │   ├── ResultDisplay.js
│   │   ├── LanguageSelector.js
│   ├── context/        # React Context
│   │   ├── LanguageContext.js
│   ├── translations/   # Language translations
│   │   ├── translations.js
│   ├── helpers/        # Helper functions
│   │   ├── units.js
│   │   ├── translatedUnits.js
│   │   ├── format.js
│   ├── styles/         # Styles
│   │   ├── styles.js
├── navigation/         # Navigation system
│   ├── StackNavigator.js
├── App.js              # Main app file
├── package.json        # Project dependencies
