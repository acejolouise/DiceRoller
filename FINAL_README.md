# 🎲 Dice Roller Mobile App

A React Native mobile application for tabletop gaming enthusiasts to roll various types of dice (d4, d6, d8, d10, d12, d20, d100).

## ✨ Features

- Roll various types of dice (d4, d6, d8, d10, d12, d20, d100)
- Beautiful, animated dice rolls with visual feedback
- Haptic feedback when rolling dice
- Sound effects
- Roll history to track your previous rolls
- Multiple dice rolling mode - roll several of the same dice at once
- Modern, intuitive user interface
- Customizable settings (default dice type, sound, haptic feedback)

## 📱 Screenshots

*Placeholder for screenshots*

## 🚀 Getting Started

### Prerequisites

- Node.js 14 or later
- React Native development environment
- Android Studio or Xcode (for iOS development)

### Installation

1. Clone this repository or download the source code
2. Install dependencies:
```
cd DiceRoller
npm install
```

### Running the App

#### For Android:
```
npm run android
```

#### For iOS:
```
npm run ios
```

## 🎮 How to Use

1. Select a die type by tapping on one of the dice options at the bottom (D4, D6, D8, etc.)
2. Tap the "ROLL!" button to roll the selected die
3. The result will be displayed in the center of the screen
4. Your roll history will be shown at the bottom of the screen
5. Switch to "Multiple Dice" mode to roll several dice at once
6. Access settings by tapping the ⚙️ icon

## 🛠️ App Structure

- `App.tsx` - Main application entry point
- `src/components/DiceRollerComplete.tsx` - Main dice roller component
- `src/components/DiceDisplay.tsx` - Dice display component
- `src/components/MultipleDiceRoller.tsx` - Component for rolling multiple dice
- `src/components/SettingsScreen.tsx` - Settings interface
- `src/components/SplashScreen.tsx` - Splash screen shown on app startup
- `src/utils/diceUtils.ts` - Utility functions for dice rolling
- `src/utils/useDiceRoller.ts` - Custom hook for dice rolling logic
- `src/utils/SoundEffects.ts` - Sound effects handling
- `src/config/AppSettings.ts` - Application settings

## 🎯 Future Enhancements

- Custom dice faces and themes
- Saving favorite dice combinations
- Dark mode support
- Dice rolling presets for common games
- Statistical analysis of rolls
- Cloud sync for roll history
- Multiplayer mode for shared dice rolling sessions
- Expanded sound effects library

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The React Native community
- Board game and tabletop RPG enthusiasts everywhere

---

Happy Rolling! 🎲
