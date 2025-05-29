/**
 * Dice Roller App - Main Application
 *
 * @format
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

import DiceRoller from './src/components/DiceRollerComplete';
import SplashScreen from './src/components/SplashScreen';
import MultipleDiceRoller from './src/components/MultipleDiceRoller';
import SettingsScreen from './src/components/SettingsScreen';
import { ThemeProvider, useTheme } from './src/utils/ThemeContext';
import SoundEffects from './src/utils/SoundEffects';
import HapticFeedback from './src/utils/HapticFeedback';
import Storage from './src/utils/storageClean';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showingSplash, setShowingSplash] = useState(true);
  const [activeScreen, setActiveScreen] = useState<'single' | 'multiple'>('single');
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState(AppSettings.defaults);
  const [selectedDiceType, setSelectedDiceType] = useState({ sides: 20, color: '#607D8B' });

  // Hide splash screen after a delay
  const handleSplashFinished = () => {
    setShowingSplash(false);
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: any) => {
    setAppSettings({ ...appSettings, ...newSettings });
  };

  // Render splash screen if needed
  if (showingSplash) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      
      {/* Main Content */}
      <View style={styles.content}>
        {activeScreen === 'single' ? (
          <DiceRoller />
        ) : (
          <MultipleDiceRoller 
            diceType={selectedDiceType.sides} 
            color={selectedDiceType.color} 
          />
        )}
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeScreen === 'single' && styles.activeTab,
          ]}
          onPress={() => setActiveScreen('single')}
        >
          <Text
            style={[
              styles.tabText,
              activeScreen === 'single' && styles.activeTabText,
            ]}
          >
            Single Die
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeScreen === 'multiple' && styles.activeTab,
          ]}
          onPress={() => setActiveScreen('multiple')}
        >
          <Text
            style={[
              styles.tabText,
              activeScreen === 'multiple' && styles.activeTabText,
            ]}
          >
            Multiple Dice
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={false}
      >
        <SettingsScreen
          onClose={() => setShowSettings(false)}
          onSettingsChange={handleSettingsChange}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: AppSettings.theme.primaryColor,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: AppSettings.theme.primaryColor,
    fontWeight: 'bold',
  },
  settingsTab: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    fontSize: 20,
  },
});

export default App;
