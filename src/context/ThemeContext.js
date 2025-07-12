import React, { createContext, useState, useContext, useEffect } from 'react';

// Theme color constants
const THEME_COLORS = {
  dark: {
    primary: 'bg-blue-900',
    primaryHover: 'hover:bg-blue-800',
    secondary: 'bg-gray-800',
    secondaryHover: 'hover:bg-gray-700',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-500',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textAccent: 'text-blue-400',
    border: 'border-gray-700',
    cardBg: 'bg-gray-800',
    headerBg: 'bg-gray-900/90',
    heroBg: 'bg-gray-900/50',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900',
  },
  light: {
    primary: 'bg-sky-600', // Sky blue as the primary color
    primaryHover: 'hover:bg-sky-600',
    secondary: 'bg-sky-100', // Light sky blue for secondary elements
    secondaryHover: 'hover:bg-sky-200',
    accent: 'bg-sky-600',
    accentHover: 'hover:bg-sky-700',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textAccent: 'text-sky-600',
    border: 'border-sky-200',
    cardBg: 'bg-white',
    headerBg: 'bg-sky-600/90', // Semi-transparent sky blue for header
    heroBg: 'bg-sky-600/50', // Semi-transparent sky blue for hero section
    buttonPrimary: 'bg-sky-600 hover:bg-sky-700 text-white',
    buttonSecondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-700',
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Derive the current theme colors based on dark mode state
  const colors = darkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  // Check if user has a preference saved in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};