// Update package.json file

const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Read the existing package.json
const packageJson = require(packageJsonPath);

// Add additional dependencies
const additionalDependencies = {
  "react-native-sound": "^0.11.2",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-reanimated": "^3.6.2",
  "react-native-haptic-feedback": "^2.2.0",
  "@react-native-async-storage/async-storage": "^1.21.0"
};

// Merge dependencies
packageJson.dependencies = {
  ...packageJson.dependencies,
  ...additionalDependencies
};

// Add additional scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "build:android": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res",
  "build:ios": "react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios"
};

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Package.json updated successfully!');
