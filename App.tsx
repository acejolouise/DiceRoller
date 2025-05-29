/**
 * Dice Roller App
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';

import DiceRoller from './src/components/DiceRollerCompleteUpdated';
import SplashScreen from './src/components/SplashScreen';
import MultipleDiceRoller from './src/components/MultipleDiceRoller';
import SettingsScreen from './src/components/SettingsScreen';
import { AppSettings } from './src/config/AppSettings';
import SoundEffects from './src/utils/SoundEffects';
import { ThemeProvider } from './src/utils/ThemeContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showingSplash, setShowingSplash] = useState(true);
  const [activeScreen, setActiveScreen] = useState<'single' | 'multiple'>('single');
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState<any>({
    ...AppSettings.defaults,
    defaultDice: 'D20',
    soundEnabled: true,
    hapticEnabled: true,
    maxHistory: 20,
    darkMode: false,
  });

  // Initialize app resources
  useEffect(() => {
    SoundEffects.initialize();
    return () => {
      SoundEffects.release();
    };
  }, []);

  const handleSplashFinished = () => {
    setShowingSplash(false);
  };

  const handleSettingsChange = (newSettings: any) => {
    setAppSettings({ ...appSettings, ...newSettings });
  };

  if (showingSplash) {
    return <SplashScreen onFinish={handleSplashFinished} />;
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#000' : '#fff'}
        />
        <View style={styles.content}>
          {activeScreen === 'single' ? (
            <DiceRoller
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
        <Modal
          visible={showSettings}
          animationType="slide"
          transparent={false}
        >
          <SettingsScreen
            settings={appSettings}
            onClose={() => setShowSettings(false)}
            onSettingsChange={handleSettingsChange}
          />
        </Modal>
      </SafeAreaView>
    </ThemeProvider>
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
    borderTopColor: AppSettings.theme.light.primaryColor,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: AppSettings.theme.light.primaryColor,
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
