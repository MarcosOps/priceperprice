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

## How to Run Locally and Create an APK

### 1. Run for Development (using Expo Go)

This is the easiest way to get started and test your app during development.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Metro Bundler:**
    ```bash
    npx expo start
    ```
    This will open a new tab in your browser with the Expo Dev Tools.

3.  **Run on Your Device/Emulator:**
    *   **iOS:** Open the Camera app on your iPhone/iPad and scan the QR code displayed in the terminal or Expo Dev Tools. Follow the prompts to open the project in the Expo Go app.
    *   **Android:** Open the Expo Go app on your Android device and scan the QR code displayed in the terminal or Expo Dev Tools.

    Alternatively, you can press `i` in the terminal to open the iOS Simulator or `a` to open the Android Emulator (if configured).

### 2. Build an APK for a Device

If you need a standalone Android application package (.apk) to install directly on a device, follow these steps. This process requires native build tools (Android SDK, Java) to be set up on your machine.

1.  **Generate Native Android Project Files:**
    If you don't have an `android` folder in your project root, or if you've deleted it, you need to generate the native project files. This command creates the `android` directory with all necessary native code and configurations.
    ```bash
    npx expo prebuild --platform android
    ```
    *Note: If you have made manual changes to the `android` folder, they will be overwritten by this command. Ensure you back up any custom native code.*

2.  **Navigate to the Android Project Directory:**
    ```bash
    cd android
    ```

3.  **Build the Release APK:**
    This command compiles your Android project and generates a release-ready APK.
    ```bash
    ./gradlew assembleRelease
    ```
    The generated APK will be located at `android/app/build/outputs/apk/release/app-release.apk`.

4.  **Install the APK on a Device (Optional):**
    Ensure your Android device has USB debugging enabled and is connected to your computer.
    ```bash
    adb install app/build/outputs/apk/release/app-release.apk
    ```
    *Replace `app/build/outputs/apk/release/app-release.apk` with the actual path to your generated APK if it differs.*

### Troubleshooting

If you encounter any issues during installation or building, you can try resetting the project:

```bash
npm run reset
```
This will clean your project by removing `node_modules` and reinstalling the dependencies.

#### How to Capture Logcat for Debugging

If your app crashes on a device, capturing the logcat output is crucial for diagnosing the issue. This will provide detailed error messages and stack traces.

1.  **Enable USB Debugging on your Android device:**
    *   Go to `Settings` > `About phone` (or `About device`).
    *   Tap "Build number" seven times rapidly until you see a message that "Developer options" are enabled.
    *   Go back to `Settings` > `System` (or `Developer options` directly if it appears in the main settings list).
    *   Find and enable "USB debugging."

2.  **Connect your Android device to your computer:**
    *   Use a USB cable to connect your phone to your computer.
    *   On your phone, you might see a pop-up asking to "Allow USB debugging." Tap "OK."

3.  **Verify device connection:**
    Open your terminal and run:
    ```bash
    adb devices
    ```
    You should see your device listed.

4.  **Capture the logs:**
    Run the following command in your terminal:
    ```bash
    adb logcat -s "AndroidRuntime:E *:S" > app_crash_log_filtered.txt
    ```
    *   Immediately after running this command, try to open your app on the Android device. Let it crash.
    *   Once the app crashes, go back to your terminal and press `Ctrl+C` (or `Cmd+C` on Mac) to stop the logcat capture.

    A file named `app_crash_log_filtered.txt` will be created in your current directory (`/Users/marcosfeitoza/`). This file will contain only error messages, making it easier to pinpoint the issue. 




## Mantinance:
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
```
