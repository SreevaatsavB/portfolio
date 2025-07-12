import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SectionContainer = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`rounded-lg shadow-lg p-6 ${
      darkMode 
        ? 'bg-gray-900 border border-gray-800 text-white' 
        : 'bg-white border border-gray-200 text-gray-800'
    }`}>
      {children}
    </div>
  );
};

export default SectionContainer;