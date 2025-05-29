/**
 * DiceRollerComplete Component
 * Complete dice roller with all features implemented
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import { useDiceRoller } from '../utils/useDiceRollerUpdate';
import { useTheme } from '../utils/ThemeContext';
import DiceDisplay from './DiceDisplay';
import HapticFeedback from '../utils/HapticFeedback';
import { AppSettingsStorage } from '../utils/storageClean';

interface DiceRollerCompleteProps {
  settings: AppSettingsStorage;
  onSettingsChange: (settings: Partial<AppSettingsStorage>) => void;
}

const DiceRollerComplete: React.FC<DiceRollerCompleteProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Initialize with a D20
  const initialDice = { name: 'D20', sides: 20, color: '#607D8B' };
  
  // Use our custom hook for dice roller functionality
  const {
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
  } = useDiceRoller(initialDice);
  
  // Get theme context
  const { theme } = useTheme();

  // Handle clearing history with confirmation
  const handleClearHistory = () => {
    if (rollHistory.length === 0) return;
    
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your roll history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearHistory();
            if (settings.hapticEnabled) {
              HapticFeedback.mediumImpact();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Dice Roller</Text>
      
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
        <Text style={[styles.diceLabel, { color: theme.textColor }]}>
          {selectedDice.name}
        </Text>
      </View>

      {/* Roll button */}
      <TouchableOpacity 
        style={[styles.rollButton, { backgroundColor: theme.primaryColor }]}
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
        contentContainerStyle={styles.diceSelectorContent}
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
                  borderColor: isSelected ? theme.primaryColor : 'transparent',
                },
              ]}
              onPress={() => {
                setSelectedDice(dice);
                if (settings.hapticEnabled) {
                  HapticFeedback.lightImpact();
                }
              }}
            >
              <Text style={styles.diceSelectorText}>{dice.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Roll history */}
      <View style={[styles.historyContainer, { backgroundColor: theme.cardColor }]}>
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: theme.textColor }]}>
            Roll History
          </Text>
          <TouchableOpacity 
            style={styles.clearHistoryButton} 
            onPress={handleClearHistory}
          >
            <Text style={[styles.clearHistoryText, { color: theme.primaryColor }]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.historyList}>
          {rollHistory.length > 0 ? (
            rollHistory.map((roll, index) => (
              <View 
                key={index} 
                style={[
                  styles.historyItem, 
                  { borderBottomColor: theme.borderColor }
                ]}
              >
                <Text style={[styles.historyText, { color: theme.textColor }]}>
                  {roll.dice}: <Text style={styles.historyResult}>{roll.result}</Text> - {roll.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyHistory, { color: theme.secondaryText }]}>
              No rolls yet
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  diceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  diceLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
  },
  rollButton: {
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
  diceSelectorContent: {
    paddingHorizontal: 8,
  },
  diceSelectorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  diceSelectorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  historyContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearHistoryButton: {
    padding: 5,
  },
  clearHistoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  historyText: {
    fontSize: 14,
  },
  historyResult: {
    fontWeight: 'bold',
  },
  emptyHistory: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiceRollerComplete;
