import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AppSettings } from '../config/AppSettings';
import { Storage, ThemeType } from './storage';

// Theme context properties
interface ThemeContextProps {
  isDarkMode: boolean;
  theme: typeof AppSettings.theme.light | typeof AppSettings.theme.dark;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeType) => void;
  themeMode: ThemeType;
}

// Create theme context
const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  theme: AppSettings.theme.light,
  toggleTheme: () => {},
  setThemeMode: () => {},
  themeMode: 'system',
});

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeType>('system');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load theme preference from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await Storage.loadTheme();
        setThemeMode(theme || 'system');
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    
    loadTheme();
  }, []);

  // Update theme when theme mode or system color scheme changes
  useEffect(() => {
    if (themeMode === 'system') {
      setIsDarkMode(colorScheme === 'dark');
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode, colorScheme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setThemeMode(newTheme);
    Storage.saveTheme(newTheme);
  };

  // Set specific theme mode
  const handleSetThemeMode = (mode: ThemeType) => {
    setThemeMode(mode);
    Storage.saveTheme(mode);
  };

  // Get current theme based on dark mode state
  const theme = isDarkMode ? AppSettings.theme.dark : AppSettings.theme.light;

  // Context value
  const contextValue = {
    isDarkMode,
    theme,
    toggleTheme,
    setThemeMode: handleSetThemeMode,
    themeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);
