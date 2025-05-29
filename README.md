# Dice Roller Mobile App

A React Native mobile application for rolling different types of dice (d4, d6, d8, d10, d12, d20, d100).

## Features

- Roll various types of dice (d4, d6, d8, d10, d12, d20, d100)
- Animated dice rolls with visual feedback
- Haptic feedback when rolling dice
- Sound effects (simulated)nop
- Roll history to track your previous rolls
- Clean, intuitive user interface

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Using the Dice Roller App

1. Select a die type by tapping on one of the dice options at the bottom (D4, D6, D8, etc.)
2. Tap the "ROLL!" button to roll the selected die
3. The result will be displayed in the center of the screen
4. Your roll history will be shown at the bottom of the screen

## App Structure

- `App.tsx` - Main application entry point
- `src/components/DiceRollerClean.tsx` - Main dice roller component
- `src/components/DiceDisplay.tsx` - Dice display component 
- `src/utils/diceUtils.ts` - Utility functions for dice rolling
- `src/utils/SoundEffects.ts` - Sound effects handling
- `src/config/AppSettings.ts` - Application settings

## Future Enhancements

- Multiple dice rolls at once
- Custom dice faces
- Saving favorite dice combinations
- Dark mode support
- Actual sound effects implementation
- Customizable dice colors

## Troubleshooting

If you're having issues getting the app to work, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
