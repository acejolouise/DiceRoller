import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { AppSettings } from '../config/AppSettings';
import { AppSettingsStorage } from '../utils/storageClean';

interface SettingsScreenProps {
  settings: AppSettingsStorage;
  onClose: () => void;
  onSettingsChange: (settings: Partial<AppSettingsStorage>) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings: initialSettings, onClose, onSettingsChange }) => {
  // Initialize state with current settings
  const [localSettings, setLocalSettings] = useState({
    soundEnabled: initialSettings.soundEnabled,
    hapticEnabled: initialSettings.hapticEnabled,
    defaultDice: AppSettings.defaults.defaultDice,
    maxHistory: AppSettings.defaults.maxHistory,
  });

  // Available dice options
  const diceOptions = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];
  
  // Available history limit options
  const historyOptions = [10, 20, 50, 100];

  // Update a specific setting
  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  // Save settings and close
  const saveSettings = () => {
    // In a real app, we would persist these settings
    console.log('Saving settings:', settings);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.settingsContainer}>
        <View style={styles.settingGroup}>
          <Text style={styles.settingGroupTitle}>Sound & Feedback</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSetting('soundEnabled', value)}
              trackColor={{ false: '#ccc', true: '#4A148C' }}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Switch
              value={settings.hapticEnabled}
              onValueChange={(value) => updateSetting('hapticEnabled', value)}
              trackColor={{ false: '#ccc', true: '#4A148C' }}
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.settingGroupTitle}>Default Options</Text>
          
          <Text style={styles.settingLabel}>Default Dice</Text>
          <View style={styles.optionButtonsContainer}>
            {diceOptions.map((dice) => (
              <TouchableOpacity
                key={dice}
                style={[
                  styles.optionButton,
                  settings.defaultDice === dice && styles.selectedOption,
                ]}
                onPress={() => updateSetting('defaultDice', dice)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    settings.defaultDice === dice && styles.selectedOptionText,
                  ]}
                >
                  {dice}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.settingLabel, { marginTop: 15 }]}>
            History Limit
          </Text>
          <View style={styles.optionButtonsContainer}>
            {historyOptions.map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.optionButton,
                  settings.maxHistory === count && styles.selectedOption,
                ]}
                onPress={() => updateSetting('maxHistory', count)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    settings.maxHistory === count && styles.selectedOptionText,
                  ]}
                >
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: AppSettings.theme.primaryColor,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsContainer: {
    flex: 1,
    padding: 15,
  },
  settingGroup: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  settingGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: AppSettings.theme.textColor,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: AppSettings.theme.primaryColor,
  },
  optionButtonText: {
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: AppSettings.theme.primaryColor,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
