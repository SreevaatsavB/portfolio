import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SectionTitle = ({ title }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="mb-10 text-center stagger-item">
      <h2 className={`text-3xl md:text-4xl font-bold section-heading tracking-tight`}>
        {title}
      </h2>
      <div className="mt-3 flex justify-center">
        <div className={`h-0.5 w-24 rounded-full section-title-accent ${
          darkMode
            ? 'bg-gradient-to-r from-sky-400/70 to-amber-300/70'
            : 'bg-gradient-to-r from-sky-700/70 to-amber-700/70'
        }`}></div>
      </div>
    </div>
  );
};

export default SectionTitle;
