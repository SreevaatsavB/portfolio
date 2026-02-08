import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';

const Header = ({ activeSection, setActiveSection }) => {
  const { darkMode, colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ['about', 'experience', 'education', 'research', 'projects', 'skills'];
  
  const handleNavClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <header className={`${colors.headerBg} sticky top-0 z-50 backdrop-blur border-b ${darkMode ? 'border-slate-700/80' : 'border-slate-200/80'}`}>
      <div className="portfolio-main px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className={`${darkMode ? 'text-slate-100' : 'text-slate-900'} text-xl md:text-2xl font-bold tracking-tight`}>
            Sreevaatsav B
          </h1>
          <div className="flex items-center gap-2 md:gap-6">
            {/* Theme toggle (desktop) */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center rounded-full border p-1 ${
              darkMode ? 'border-slate-700 bg-slate-900/75' : 'border-slate-200 bg-white/85'
            }`}>
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition ${
                    activeSection === section
                      ? darkMode
                        ? 'bg-sky-900/60 text-sky-100 border border-sky-700/60'
                        : 'bg-sky-900 text-white border border-sky-900'
                      : darkMode
                        ? 'text-slate-300 hover:text-sky-100'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className={`p-2 rounded-lg border ${
                  darkMode
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <MobileMenu 
            activeSection={activeSection} 
            handleNavClick={handleNavClick} 
          />
        )}
      </div>
    </header>
  );
};

export default Header;
