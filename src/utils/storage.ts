import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../config/AppSettings';

// Storage keys
const STORAGE_KEYS = {
  SETTINGS: '@DiceRoller:settings',
  ROLL_HISTORY: '@DiceRoller:rollHistory',
  THEME: '@DiceRoller:theme',
};

// Type for roll history entry
export interface RollHistoryEntry {
  dice: string;
  result: number;
  timestamp: Date;
  multiple?: boolean;
  count?: number;
}

// Type for app settings
export interface AppSettingsStorage {
  defaultDice: string;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  maxHistory: number;
  darkMode: boolean;
}

// Type for theme
export type ThemeType = 'light' | 'dark' | 'system';

/**
 * Storage utility for persisting app data
 */
export const Storage = {
  /**
   * Save settings to AsyncStorage
   * @param settings The settings object to save
   */
  async saveSettings(settings: Partial<AppSettingsStorage>): Promise<void> {
    try {
      // Get current settings first
      const currentSettings = await this.loadSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(updatedSettings)
      );
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },

  /**
   * Load settings from AsyncStorage
   * @returns The saved settings or default settings if none exist
   */
  async loadSettings(): Promise<AppSettingsStorage> {
    try {
      const savedSettings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
        const defaultSettings: AppSettingsStorage = {
        defaultDice: AppSettings.defaults.defaultDice,
        soundEnabled: AppSettings.defaults.soundEnabled,
        hapticEnabled: AppSettings.defaults.hapticEnabled,
        maxHistory: AppSettings.defaults.maxHistory,
        darkMode: false,
      };
      
      if (!savedSettings) {
        return defaultSettings;
      }
      
      return { ...defaultSettings, ...JSON.parse(savedSettings) };
    } catch (error) {
      console.error('Failed to load settings:', error);      return {
        defaultDice: 'D20',
        soundEnabled: true,
        hapticEnabled: true,
        maxHistory: 20,
        darkMode: false,
      };
    }
  },

  /**
   * Save roll history to AsyncStorage
   * @param history The roll history array to save
   */
  async saveRollHistory(history: RollHistoryEntry[]): Promise<void> {
    try {
      const historyForStorage = history.map(item => ({
        ...item,
        timestamp: item.timestamp.toISOString(),
      }));
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.ROLL_HISTORY,
        JSON.stringify(historyForStorage)
      );
      console.log('Roll history saved successfully');
    } catch (error) {
      console.error('Failed to save roll history:', error);
    }
  },

  /**
   * Load roll history from AsyncStorage
   * @returns The saved roll history or an empty array if none exists
   */
  async loadRollHistory(): Promise<RollHistoryEntry[]> {
    try {
      const savedHistory = await AsyncStorage.getItem(STORAGE_KEYS.ROLL_HISTORY);
      
      if (!savedHistory) {
        return [];
      }
      
      const parsedHistory = JSON.parse(savedHistory);
      return parsedHistory.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } catch (error) {
      console.error('Failed to load roll history:', error);
      return [];
    }
  },
  
  /**
   * Save theme preference to AsyncStorage
   * @param theme The theme preference to save
   */
  async saveTheme(theme: ThemeType): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
      console.log('Theme saved successfully');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
  
  /**
   * Load theme preference from AsyncStorage
   * @returns The saved theme preference or undefined if none exists
   */
  async loadTheme(): Promise<ThemeType | undefined> {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return theme as ThemeType || undefined;
    } catch (error) {
      console.error('Failed to load theme:', error);
      return undefined;
    }  },

  /**
   * Clear all saved data (for debugging or reset functionality)
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SETTINGS,
        STORAGE_KEYS.ROLL_HISTORY,
        STORAGE_KEYS.THEME,
      ]);    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  },
};

export default Storage;
