import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const MobileMenu = ({ activeSection, handleNavClick }) => {
  const { darkMode } = useTheme();
  const sections = ['about', 'experience', 'education', 'research', 'projects', 'skills'];

  return (
    <div className={`md:hidden mt-4 pb-4 border rounded-xl p-3 ${
      darkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white/95 border-slate-200'
    }`}>
      <nav className="flex flex-col space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleNavClick(section)}
            className={`py-2 px-4 rounded text-left capitalize transition ${
              activeSection === section
                ? darkMode
                  ? 'bg-slate-700 text-slate-100'
                  : 'bg-slate-900 text-white'
                : darkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
