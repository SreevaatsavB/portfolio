import React, { createContext, useState, useContext, useEffect } from 'react';

// Theme color constants
const THEME_COLORS = {
  dark: {
    primary: 'bg-slate-800',
    primaryHover: 'hover:bg-slate-700',
    secondary: 'bg-slate-900',
    secondaryHover: 'hover:bg-slate-800',
    accent: 'bg-sky-500',
    accentHover: 'hover:bg-sky-400',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textAccent: 'text-sky-300',
    border: 'border-slate-700',
    cardBg: 'bg-slate-900',
    headerBg: 'bg-slate-950/88',
    heroBg: 'bg-slate-900/70',
    buttonPrimary: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
    buttonSecondary: 'bg-transparent border border-slate-400 text-slate-200 hover:bg-slate-800 hover:text-white',
  },
  light: {
    primary: 'bg-blue-700',
    primaryHover: 'hover:bg-blue-800',
    secondary: 'bg-blue-100',
    secondaryHover: 'hover:bg-blue-200',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-700',
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-600',
    textAccent: 'text-blue-700',
    border: 'border-blue-200',
    cardBg: 'bg-blue-50/90',
    headerBg: 'bg-blue-50/85',
    heroBg: 'bg-blue-100/75',
    buttonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white',
    buttonSecondary: 'bg-transparent border border-blue-300 text-blue-700 hover:bg-blue-100 hover:text-blue-800',
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
