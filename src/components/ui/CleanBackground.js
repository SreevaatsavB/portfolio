import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CleanBackground = () => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{ 
        backgroundColor: darkMode ? '#0f172a' : '#0ea5e9',  // Dark blue in dark mode, sky blue (sky-500) in light mode
      }}
    />
  );
};

export default CleanBackground;