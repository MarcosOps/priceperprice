# PricePerPrice

A React Native app built with Expo.

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
## Project Structure

```
priceperprice/
├── src/
│   ├── screens/        # App screens
│   │   ├── HomeScreen.js
│   │   ├── CategoryScreen.js
│   │   ├── ComparisonScreen.js
│   ├── components/     # Reusable components
│   ├── App.js          # Main app file
│   ├── navigation/     # Navigation system
│   │   ├── StackNavigator.js
├── package.json        # Project dependencies
```

## Development

To start the development server:

```bash
npm start
```

To run on Android:

```bash
npm run android
```

To run on iOS:

```bash
npm run ios
```

## CircleCI Pipeline

This project includes a CircleCI pipeline that builds an Android APK and stores it as an artifact in CircleCI.

### How it works

1. The pipeline uses the `cimg/android:2023.08-node` Docker image, which includes Node.js and Android SDK.
2. It installs dependencies, including Expo CLI and EAS CLI.
3. It configures EAS to build the APK locally.
4. It creates placeholder images for the app icon and splash screen.
5. It builds the APK using EAS CLI.
6. It stores the APK as an artifact in CircleCI.

### How to use

1. Push your code to GitHub.
2. Connect your GitHub repository to CircleCI.
3. CircleCI will automatically build the APK when you push to the repository.
4. You can download the APK from the Artifacts tab in the CircleCI dashboard.

### Customization

You can customize the build process by modifying the following files:

- `.circleci/config.yml`: CircleCI configuration
- `eas.json`: EAS build configuration
- `app.json`: Expo app configuration

## License

ISC
