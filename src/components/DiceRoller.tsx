import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  SafeAreaView,
  Vibration,
} from 'react-native';
import { rollDice } from '../utils/diceUtils';
import DiceDisplay from './DiceDisplay';
import SoundEffects from '../utils/SoundEffects';
import { AppSettings } from '../config/AppSettings';

interface DiceType {
  name: string;
  sides: number;
  color: string;
}

const DiceRoller: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);  const [selectedDice, setSelectedDice] = useState<DiceType>({ name: 'D20', sides: 20, color: '#607D8B' });
  const [rollHistory, setRollHistory] = useState<{ dice: string; result: number; timestamp: Date }[]>([]);
  const [rollAnim] = useState(new Animated.Value(0));
  const [isRolling, setIsRolling] = useState(false);
    // Set the default dice based on app settings
  useEffect(() => {
    const defaultDiceType = AppSettings.defaults.defaultDice;
    const defaultDice = diceTypes.find(dice => dice.name === defaultDiceType);
    if (defaultDice) {
      setSelectedDice(defaultDice);
    }
  }, [diceTypes]);
  
  // Define dice types
  const diceTypes: DiceType[] = [
    { name: 'D4', sides: 4, color: '#2196F3' },
    { name: 'D6', sides: 6, color: '#FF5252' },
    { name: 'D8', sides: 8, color: '#4CAF50' },
    { name: 'D10', sides: 10, color: '#9C27B0' },
    { name: 'D12', sides: 12, color: '#FF9800' },
    { name: 'D20', sides: 20, color: '#607D8B' },
    { name: 'D100', sides: 100, color: '#795548' },
  ];  const handleDiceRoll = () => {
    // Don't allow rolling while animation is in progress
    if (isRolling) {
      return;
    }
    
    // Start the roll
    setIsRolling(true);
    Vibration.vibrate(100); // Short vibration feedback
    SoundEffects.playRollSound();
    
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
        Vibration.vibrate(200); // Longer vibration for final result
        SoundEffects.playLandSound();
        
        // Add to roll history
        const maxHistory = AppSettings.defaults.maxHistory;
        setRollHistory(prevHistory => [
          { dice: selectedDice.name, result: finalResult, timestamp: new Date() },
          ...prevHistory.slice(0, maxHistory - 1)
        ]);
        
        setIsRolling(false);
      }
    }, 50);
    
    // Animate the dice
    rollAnim.setValue(0);
    Animated.timing(rollAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const spin = rollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const scale = rollAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dice Roller</Text>
        <View style={styles.diceContainer}>
        <Animated.View
          style={{
            transform: [{ rotate: spin }, { scale: scale }],
          }}
        >
          <DiceDisplay 
            type={selectedDice.name}
            value={result}
            color={selectedDice.color}
          />
        </Animated.View>
        <Text style={styles.diceLabel}>{selectedDice.name}</Text>
      </View>
        <TouchableOpacity style={styles.rollButton} onPress={handleDiceRoll}>
        <Text style={styles.rollButtonText}>ROLL!</Text>
      </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diceSelector}>
        {diceTypes.map((dice) => {
          const isSelected = selectedDice.name === dice.name;
          return (
            <TouchableOpacity
              key={dice.name}
              style={[
                styles.diceSelectorButton,
                {
                  backgroundColor: dice.color,
                  borderWidth: isSelected ? 3 : 0,
                },
              ]}
              onPress={() => setSelectedDice(dice)}
            >
              <Text style={styles.diceSelectorText}>{dice.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Roll History</Text>
        <ScrollView style={styles.historyList}>
          {rollHistory.length > 0 ? (
            rollHistory.map((roll, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>
                  {roll.dice}: {roll.result} - {roll.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyHistory}>No rolls yet</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  diceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dice: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  diceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  diceLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  rollButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rollButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  diceSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    maxHeight: 60,
  },
  diceSelectorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#FFF',
  },
  diceSelectorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  historyText: {
    color: '#555',
  },
  emptyHistory: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default DiceRoller;
