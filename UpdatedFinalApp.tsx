/**
 * Dice Roller App - Complete Implementation
 * 
 * Includes:
 * - Dark mode support using ThemeContext
 * - Persistent settings with AsyncStorage
 * - Sound effects
 * - Haptic feedback
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';

import DiceRollerComplete from './src/components/DiceRollerComplete';
import SplashScreen from './src/components/SplashScreen';
import MultipleDiceRoller from './src/components/MultipleDiceRoller';
import SettingsScreen from './src/components/SettingsScreen';
import { ThemeProvider, useTheme } from './src/utils/ThemeContext';
import SoundEffects from './src/utils/SoundEffects';
import HapticFeedback from './src/utils/HapticFeedback';
import Storage, { AppSettingsStorage } from './src/utils/storageClean';


// Main App content with theme support
const AppContent: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showingSplash, setShowingSplash] = useState(true);
  const [activeScreen, setActiveScreen] = useState<'single' | 'multiple'>('single');
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState<AppSettingsStorage>({
    defaultDice: 'D20',
    soundEnabled: true,
    hapticEnabled: true,
    maxHistory: 20,
    darkMode: isDarkMode,
  });
  
  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await Storage.loadSettings();
        setAppSettings(storedSettings);
        
        // Apply the settings
        SoundEffects.setSoundEnabled(storedSettings.soundEnabled);
        HapticFeedback.setEnabled(storedSettings.hapticEnabled);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setIsLoading(false);
      }
    };
    
    loadSettings();
    
    // Initialize sound effects
    SoundEffects.initialize();
    
    // Return cleanup function
    return () => {
      SoundEffects.release();
    };
  }, []);
  
  // Hide splash screen after a delay
  const handleSplashFinished = () => {
    setShowingSplash(false);
  };

  // Handle settings change
  const handleSettingsChange = async (newSettings: Partial<AppSettingsStorage>) => {
    const updatedSettings = { ...appSettings, ...newSettings };
    setAppSettings(updatedSettings);
    
    // Apply the settings
    if (newSettings.soundEnabled !== undefined) {
      SoundEffects.setSoundEnabled(newSettings.soundEnabled);
    }
    
    if (newSettings.hapticEnabled !== undefined) {
      HapticFeedback.setEnabled(newSettings.hapticEnabled);
    }
    
    if (newSettings.darkMode !== undefined && newSettings.darkMode !== isDarkMode) {
      toggleTheme();
    }
    
    // Save settings
    await Storage.saveSettings(newSettings);
  };
  
  // Provide feedback when changing tabs
  const handleTabPress = (tab: 'single' | 'multiple') => {
    if (tab !== activeScreen) {
      if (appSettings.hapticEnabled) {
        HapticFeedback.lightImpact();
      }
      setActiveScreen(tab);
    }
  };
  
  // Render splash screen if needed
  if (showingSplash) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }
  
  // Show loading indicator while fetching settings
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.primaryColor} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? theme.cardColor : theme.backgroundColor}
      />
      
      {/* Main content area */}
      <View style={styles.content}>
        {activeScreen === 'single' ? (
          <DiceRollerComplete 
            settings={appSettings}
            onSettingsChange={handleSettingsChange}
          />
        ) : (
          <MultipleDiceRoller 
            settings={appSettings} 
            onSettingsChange={handleSettingsChange}
          />
        )}
      </View>
      
      {/* Tab bar */}
      <View style={[styles.tabBar, { backgroundColor: theme.cardColor }]}>        <TouchableOpacity
          style={[
            styles.tab,
            activeScreen === 'single' && [styles.activeTab, { borderColor: theme.primaryColor }],
          ]}
          onPress={() => handleTabPress('single')}
        >
          <Text style={[
            styles.tabText,
            { color: theme.textColor },
            activeScreen === 'single' && { color: theme.primaryColor },
          ]}>
            Single Die
          </Text>
        </TouchableOpacity>
          <TouchableOpacity
          style={[
            styles.tab,
            activeScreen === 'multiple' && [styles.activeTab, { borderColor: theme.primaryColor }],
          ]}
          onPress={() => handleTabPress('multiple')}
        >
          <Text style={[
            styles.tabText,
            { color: theme.textColor },
            activeScreen === 'multiple' && { color: theme.primaryColor },
          ]}>
            Multiple Dice
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => setShowSettings(true)}
        >
          <Text style={[styles.tabText, { color: theme.textColor }]}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Settings modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSettings(false)}
      >
        <SettingsScreen
          settings={appSettings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

// App root component with ThemeProvider
function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderTopWidth: 2,
  },
  settingsTab: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;
