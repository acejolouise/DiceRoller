import { useState, useEffect } from 'react';
import { Vibration, Animated, Easing } from 'react-native';
import { rollDice } from './diceUtils';
import SoundEffects from './SoundEffects';
import { AppSettings } from '../config/AppSettings';

export interface DiceType {
  name: string;
  sides: number;
  color: string;
}

export interface RollHistoryEntry {
  dice: string;
  result: number;
  timestamp: Date;
}

export const useDiceRoller = (initialDiceType: DiceType) => {
  // State
  const [result, setResult] = useState<number | null>(null);
  const [selectedDice, setSelectedDice] = useState<DiceType>(initialDiceType);
  const [rollHistory, setRollHistory] = useState<RollHistoryEntry[]>([]);
  const [rollAnim] = useState(new Animated.Value(0));
  const [isRolling, setIsRolling] = useState(false);
  const [settings, setSettings] = useState(AppSettings.defaults);

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

  // Handle dice roll
  const handleDiceRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    
    // Apply haptic feedback if enabled
    if (settings.hapticEnabled) {
      Vibration.vibrate(100);
    }
    
    // Play sound if enabled
    if (settings.soundEnabled) {
      SoundEffects.playRollSound();
    }

    // Animate rapid changing
    let rollCount = 0;
    const maxRolls = 20;
    
    const rollInterval = setInterval(() => {
      setResult(rollDice(selectedDice.sides));
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        
        const finalResult = rollDice(selectedDice.sides);
        setResult(finalResult);
        
        // Final haptic feedback if enabled
        if (settings.hapticEnabled) {
          Vibration.vibrate(200);
        }
        
        // Final sound if enabled
        if (settings.soundEnabled) {
          SoundEffects.playLandSound();
        }
        
        // Update history
        const maxHistory = settings.maxHistory;
        setRollHistory(prev => [
          { 
            dice: selectedDice.name, 
            result: finalResult, 
            timestamp: new Date() 
          },
          ...prev.slice(0, maxHistory - 1),
        ]);
        
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
  };

  // Update settings
  const updateSettings = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Return values and functions
  return {
    result,
    selectedDice,
    setSelectedDice,
    rollHistory,
    isRolling,
    diceTypes,
    settings,
    updateSettings,
    handleDiceRoll,
    animations: {
      rollAnim,
      spin,
      scale,
    },
  };
};

export default useDiceRoller;
