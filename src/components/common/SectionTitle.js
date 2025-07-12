import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SectionTitle = ({ title }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="mb-8 text-center">
      <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className="mt-2 w-24 h-1 mx-auto rounded-full bg-blue-500"></div>
    </div>
  );
};

export default SectionTitle;