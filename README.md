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
###  Atualize suas dependências principais
```
npm outdated                                                                                            ~/Documents/projeto/app/priceperprice

Package                                    Current   Wanted   Latest  Location                                                Depended by
@react-native-async-storage/async-storage    2.1.2    2.1.2    2.2.0  node_modules/@react-native-async-storage/async-storage  priceperprice
@react-native-picker/picker                 2.11.0   2.11.1   2.11.1  node_modules/@react-native-picker/picker                priceperprice
@react-navigation/native                    6.1.18   6.1.18   7.1.14  node_modules/@react-navigation/native                   priceperprice
@react-navigation/stack                      6.4.1    6.4.1    7.4.2  node_modules/@react-navigation/stack                    priceperprices
expo                                       53.0.11  53.0.12  53.0.12  node_modules/expo                                       priceperprice
react                                       19.0.0   19.0.0   19.1.0  node_modules/react                                      priceperprice
react-native                                0.79.3   0.79.3   0.80.0  node_modules/react-native                               priceperprice
react-native-gesture-handler                2.24.0   2.24.0   2.26.0  node_modules/react-native-gesture-handler               priceperprice
react-native-reanimated                     3.17.5   3.17.5   3.18.0  node_modules/react-native-reanimated                    priceperprice
```

### Ferramenta de upgrade automático
```
npx npm-check-updates -u                                                                              ~/Documents/projeto/app/priceperprice
Need to install the following packages:
npm-check-updates@18.0.1
Ok to proceed? (y) y

Upgrading /Users/marcosfeitoza/Documents/projeto/app/priceperprice/package.json
[====================] 15/15 100%

 @babel/core                   ^7.25.2  →   ^7.27.4
 @expo/vector-icons            ^14.0.2  →   ^14.1.0
 @react-native-picker/picker   ^2.11.0  →   ^2.11.1
 @react-navigation/native      ^6.1.18  →   ^7.1.14
 expo                         ^53.0.11  →  ^53.0.12
 react                          19.0.0  →    19.1.0
 react-native-paper            ^5.13.1  →   ^5.14.5
 react-native-reanimated       ~3.17.4  →   ~3.18.0
 Run npm install to install new versions.
 ```

```bash
# Install dependencies
  npm install
```

```
up to date, audited 716 packages in 5s

70 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
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
