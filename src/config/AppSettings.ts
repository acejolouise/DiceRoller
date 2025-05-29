/**
 * Settings for the app
 */

export const AppSettings = {
  /**
   * Default settings for the dice roller
   */
  defaults: {
    /**
     * Default dice type to show when the app starts
     */
    defaultDice: 'D20',
    
    /**
     * Whether to enable sound effects
     */
    soundEnabled: true,
    
    /**
     * Whether to enable haptic feedback
     */
    hapticEnabled: true,
    
    /**
     * Maximum number of dice roll history entries to keep
     */
    maxHistory: 20,

    /**
     * Whether to use dark mode
     */
    darkMode: false,

    /**
     * Whether to follow system theme
     */
    followSystemTheme: true,
  },
  
  /**
   * Theme settings
   */
  theme: {
    light: {
      /**
       * Primary color for the light theme
       */
      primaryColor: '#4A148C',
      
      /**
       * Background color for the light theme
       */
      backgroundColor: '#F5F5F5',
      
      /**
       * Card background color for the light theme
       */
      cardColor: '#FFFFFF',
      
      /**
       * Text color for the light theme
       */
      textColor: '#333333',

      /**
       * Secondary text color for the light theme
       */
      secondaryText: '#666666',

      /**
       * Border color for the light theme
       */
      borderColor: '#E0E0E0',
    },
    dark: {
      /**
       * Primary color for the dark theme
       */
      primaryColor: '#7C4DFF',
      
      /**
       * Background color for the dark theme
       */
      backgroundColor: '#121212',
      
      /**
       * Card background color for the dark theme
       */
      cardColor: '#1E1E1E',
      
      /**
       * Text color for the dark theme
       */
      textColor: '#FFFFFF',

      /**
       * Secondary text color for the dark theme
       */
      secondaryText: '#AAAAAA',

      /**
       * Border color for the dark theme
       */
      borderColor: '#333333',
    }
  },
};
