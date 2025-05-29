import { useState, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { rollDice } from './diceUtils';
import SoundEffects from './SoundEffects';
import HapticFeedback from './HapticFeedback';
import Storage, { RollHistoryEntry, AppSettingsStorage } from './storageClean';
import { AppSettings } from '../config/AppSettings';

export interface DiceType {
  name: string;
  sides: number;
  color: string;
}

export const useDiceRoller = (initialDiceType: DiceType) => {
  // State
  const [result, setResult] = useState<number | null>(null);
  const [selectedDice, setSelectedDice] = useState<DiceType>(initialDiceType);
  const [rollHistory, setRollHistory] = useState<RollHistoryEntry[]>([]);
  const [rollAnim] = useState(new Animated.Value(0));
  const [isRolling, setIsRolling] = useState(false);  const [settings, setSettings] = useState<AppSettingsStorage>({
    defaultDice: AppSettings.defaults.defaultDice,
    soundEnabled: AppSettings.defaults.soundEnabled,
    hapticEnabled: AppSettings.defaults.hapticEnabled,
    maxHistory: AppSettings.defaults.maxHistory,
    darkMode: false,
  });

  // Define all available dice types
  const diceTypes: DiceType[] = [
    { name: 'D4', sides: 4, color: '#2196F3' },
    { name: 'D6', sides: 6, color: '#FF5252' },
    { name: 'D8', sides: 8, color: '#4CAF50' },
    { name: 'D10', sides: 10, color: '#9C27B0' },
    { name: 'D12', sides: 12, color: '#FF9800' },
    { name: 'D20', sides: 20, color: '#607D8B' },
    { name: 'D100', sides: 100, color: '#795548' },
  ];

  // Load settings from storage on component mount
  useEffect(() => {
    const loadStoredSettings = async () => {
      try {
        const storedSettings = await Storage.loadSettings();
        setSettings(storedSettings);
        
        // Update sound and haptic feedback settings
        SoundEffects.setSoundEnabled(storedSettings.soundEnabled);
        HapticFeedback.setEnabled(storedSettings.hapticEnabled);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    
    const loadStoredHistory = async () => {
      try {
        const storedHistory = await Storage.loadRollHistory();
        setRollHistory(storedHistory);
      } catch (error) {
        console.error('Failed to load roll history:', error);
      }
    };
    
    // Initialize sound effects
    SoundEffects.initialize();
    
    // Load data from storage
    loadStoredSettings();
    loadStoredHistory();
  }, []);

  // Set the default dice based on settings
  useEffect(() => {
    const defaultDiceType = settings.defaultDice;
    const foundDice = diceTypes.find(d => d.name === defaultDiceType);
    if (foundDice) {
      setSelectedDice(foundDice);
    }
  }, [settings.defaultDice]);

  // Animation values
  const spin = rollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const scale = rollAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<AppSettingsStorage>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Apply settings changes
    if (newSettings.soundEnabled !== undefined) {
      SoundEffects.setSoundEnabled(newSettings.soundEnabled);
    }
    
    if (newSettings.hapticEnabled !== undefined) {
      HapticFeedback.setEnabled(newSettings.hapticEnabled);
    }
    
    // Save to storage
    await Storage.saveSettings(newSettings);
  }, [settings]);

  // Handle dice roll
  const handleDiceRoll = useCallback(() => {
    if (isRolling) return;

    // Start rolling
    setIsRolling(true);
    
    // Provide feedback
    if (settings.hapticEnabled) {
      HapticFeedback.diceRollStart();
    }
    
    if (settings.soundEnabled) {
      SoundEffects.playRollSound();
    }

    // Start with rapid number changes
    let rollCount = 0;
    const maxRolls = 20;
    
    const rollInterval = setInterval(() => {
      setResult(rollDice(selectedDice.sides));
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        
        // Final result
        const finalResult = rollDice(selectedDice.sides);
        setResult(finalResult);
        
        // Final feedback
        if (settings.hapticEnabled) {
          HapticFeedback.diceRollResult();
        }
        
        if (settings.soundEnabled) {
          SoundEffects.playLandSound();
        }
        
        // Add to roll history
        const newRollEntry = {
          dice: selectedDice.name,
          result: finalResult,
          timestamp: new Date()
        };
        
        const updatedHistory = [
          newRollEntry,
          ...rollHistory.slice(0, settings.maxHistory - 1)
        ];
        
        setRollHistory(updatedHistory);
        
        // Save to storage
        Storage.saveRollHistory(updatedHistory).catch(error => {
          console.error('Failed to save roll history:', error);
        });
        
        setIsRolling(false);
      }
    }, 50);

    // Animate dice
    rollAnim.setValue(0);
    Animated.timing(rollAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [isRolling, selectedDice, rollHistory, settings, rollAnim]);

  // Clear roll history
  const clearHistory = useCallback(async () => {
    setRollHistory([]);
    await Storage.saveRollHistory([]);
  }, []);

  return {
    result,
    selectedDice,
    setSelectedDice,
    rollHistory,
    clearHistory,
    isRolling,
    handleDiceRoll,
    spin,
    scale,
    diceTypes,
    settings,
    updateSettings,
  };
};
