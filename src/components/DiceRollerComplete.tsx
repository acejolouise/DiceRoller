/**
 * Dice Roller component with complete implementation
 * Includes support for app settings
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DiceDisplay from './DiceDisplay';
import useDiceRoller from '../utils/useDiceRoller';
import { AppSettingsStorage } from '../utils/storageClean';

interface DiceRollerCompleteProps {
  settings: AppSettingsStorage;
  onSettingsChange: (settings: Partial<AppSettingsStorage>) => void;
}

const DiceRollerComplete: React.FC<DiceRollerCompleteProps> = ({ settings, onSettingsChange }) => {
  // Use our custom hook
  const {
    result,
    selectedDice,
    setSelectedDice,
    rollHistory,
    isRolling,
    diceTypes,
    handleDiceRoll,
    animations: { spin, scale },
  } = useDiceRoller({ name: 'D20', sides: 20, color: '#607D8B' });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dice Roller</Text>
      
      {/* Dice display area */}
      <View style={styles.diceContainer}>
        <Animated.View
          style={{
            transform: [{ rotate: spin }, { scale }],
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

      {/* Roll button */}
      <TouchableOpacity 
        style={styles.rollButton} 
        onPress={handleDiceRoll}
        disabled={isRolling}
      >
        <Text style={styles.rollButtonText}>
          {isRolling ? 'ROLLING...' : 'ROLL!'}
        </Text>
      </TouchableOpacity>

      {/* Dice selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.diceSelector}
      >
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
              disabled={isRolling}
            >
              <Text style={styles.diceSelectorText}>{dice.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Roll history */}
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
  diceLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  rollButton: {
    backgroundColor: AppSettings.theme.primaryColor,
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

export default DiceRollerClean;
