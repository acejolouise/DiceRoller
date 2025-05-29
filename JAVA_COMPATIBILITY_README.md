# Java Compatibility Fix for Dice Roller App

## Issue
The React Native project was encountering Java version compatibility issues. 
The error message "Unsupported class file major version 68" indicates that JDK 24 (installed on your system) 
is not compatible with the current version of Gradle being used.

## Solutions
Several approaches have been implemented to fix this issue:

### Option 1: Install JDK 17
The recommended approach is to install JDK 17 alongside your current JDK 24.
A script has been created to automate this process:

```powershell
# Run this from the project root
.\setup-jdk17.ps1
```

This script will:
1. Download OpenJDK 17 from AdoptOpenJDK
2. Extract it to your user directory
3. Configure Gradle to use this JDK specifically for this project

### Option 2: Use Compatibility Flags
If you prefer to continue using JDK 24, helper scripts have been created:

- `run-android.ps1`: Run the Android app with JDK compatibility flags
- `start-metro.ps1`: Start the Metro bundler with JDK compatibility flags

### Configuration Changes
The following configuration changes were made:

1. Updated Gradle wrapper to use a version that's more compatible
2. Set Java compatibility to Java 17 in build.gradle files
3. Added JVM arguments to allow running with newer Java versions

## Next Steps
After implementing these changes:
1. Run `npm install` to ensure all dependencies are installed
2. Run `.\setup-jdk17.ps1` (recommended) or use the helper scripts
3. Start the Metro bundler: `.\start-metro.ps1`
4. In another terminal, run: `.\run-android.ps1`

## Additional Resources
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Java Version Compatibility with Gradle](https://docs.gradle.org/current/userguide/compatibility.html)
