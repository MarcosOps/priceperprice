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

Simply run:

```bash
npx expo start
```

This will:
1. Apply necessary fixes for dependencies
2. Start the Expo development server
3. Allow you to run the app on iOS, Android, or web

## Troubleshooting

If you encounter any issues with the app, you can try:

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
