/**
 * Dice utility functions
 */

/**
 * Rolls a dice with the given number of sides
 * @param sides Number of sides on the dice
 * @returns A random number between 1 and the number of sides
 */
export const rollDice = (sides: number): number => {
  return Math.floor(Math.random() * sides) + 1;
};

/**
 * Returns the appropriate symbol for the dice
 * @param diceType The type of dice (e.g., 'D6', 'D20')
 * @returns A symbol representation for the dice
 */
export const getDiceSymbol = (diceType: string): string => {
  switch (diceType) {
    case 'D4':
      return '▼';
    case 'D6':
      return '⬢';
    case 'D8':
      return '◆';
    case 'D10':
      return '◇';
    case 'D12':
      return '⬟';
    case 'D20':
      return '⬠';
    case 'D100':
      return '%';
    default:
      return '?';
  }
};
