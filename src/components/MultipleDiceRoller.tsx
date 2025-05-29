import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { rollDice } from '../utils/diceUtils';
import { AppSettingsStorage } from '../utils/storageClean';
import SoundEffects from '../utils/SoundEffects';
import HapticFeedback from '../utils/HapticFeedback';

interface MultipleDiceRollerProps {
  settings: AppSettingsStorage;
  onSettingsChange: (settings: Partial<AppSettingsStorage>) => void;
}

const MultipleDiceRoller: React.FC<MultipleDiceRollerProps> = ({ settings }) => {
  const diceType = parseInt(settings.defaultDice.replace('D', ''));
  const color = '#607D8B';
  const [diceCount, setDiceCount] = useState<number>(1);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const rollMultipleDice = () => {
    const newResults = Array(diceCount).fill(0).map(() => rollDice(diceType));
    const newTotal = newResults.reduce((sum, roll) => sum + roll, 0);
    
    setResults(newResults);
    setTotal(newTotal);
  };

  const adjustDiceCount = (amount: number) => {
    const newCount = Math.max(1, Math.min(10, diceCount + amount));
    setDiceCount(newCount);
    
    // If changing dice count, reset results
    if (newCount !== diceCount) {
      setResults([]);
      setTotal(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Multiple Dice Roll</Text>
      </View>
      
      <View style={styles.diceCountContainer}>
        <TouchableOpacity 
          style={styles.countButton} 
          onPress={() => adjustDiceCount(-1)}
          disabled={diceCount <= 1}
        >
          <Text style={styles.countButtonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.countDisplay}>
          <Text style={styles.countText}>{diceCount}</Text>
          <Text style={styles.diceTypeText}>d{diceType}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.countButton} 
          onPress={() => adjustDiceCount(1)}
          disabled={diceCount >= 10}
        >
          <Text style={styles.countButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.rollButton, { backgroundColor: color }]}
        onPress={rollMultipleDice}
      >
        <Text style={styles.rollButtonText}>ROLL {diceCount}d{diceType}</Text>
      </TouchableOpacity>
      
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          <View style={styles.diceResultsContainer}>
            {results.map((result, index) => (
              <View key={index} style={[styles.dieResult, { backgroundColor: color }]}>
                <Text style={styles.dieResultText}>{result}</Text>
              </View>
            ))}
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{total}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  diceCountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  countButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  countDisplay: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  diceTypeText: {
    fontSize: 16,
    color: '#666',
  },
  rollButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  rollButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 10,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  diceResultsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dieResult: {
    width: 40,
    height: 40,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dieResultText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MultipleDiceRoller;
