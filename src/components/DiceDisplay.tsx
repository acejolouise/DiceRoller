import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDiceSymbol } from '../utils/diceUtils';

interface DiceDisplayProps {
  type: string;
  value: number | null;
  color: string;
}

const DiceDisplay: React.FC<DiceDisplayProps> = ({ type, value, color }) => {
  // Get the symbol for the dice type
  const symbol = getDiceSymbol(type);
  
  return (
    <View style={[styles.diceShape, { backgroundColor: color }]}>
      <Text style={styles.diceValue}>{value !== null ? value : '?'}</Text>
      <Text style={styles.diceSymbol}>{symbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  diceShape: {
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
    position: 'relative',
  },
  diceValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  diceSymbol: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  }
});

export default DiceDisplay;
