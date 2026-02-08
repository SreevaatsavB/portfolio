import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SectionContainer = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`surface-card p-6 md:p-8 ${
      darkMode ? 'bg-slate-900/90 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-200'
    }`}>
      {children}
    </div>
  );
};

export default SectionContainer;
