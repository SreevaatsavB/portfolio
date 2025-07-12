import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';

const Header = ({ activeSection, setActiveSection }) => {
  const { darkMode, colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleNavClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <header className={`${darkMode ? 'bg-gray-900/90' : colors.headerBg} sticky top-0 z-50 shadow-lg border-b ${darkMode ? 'border-gray-800' : 'border-sky-400'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Sreevaatsav B</h1>
          <div className="flex items-center space-x-6">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => handleNavClick('about')}
                className={`text-white ${activeSection === 'about' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('experience')}
                className={`text-white ${activeSection === 'experience' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                Experience
              </button>
              <button 
                onClick={() => handleNavClick('education')}
                className={`text-white ${activeSection === 'education' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                Education
              </button>
              <button 
                onClick={() => handleNavClick('research')}
                className={`text-white ${activeSection === 'research' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                Research
              </button>
              <button 
                onClick={() => handleNavClick('projects')}
                className={`text-white ${activeSection === 'projects' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick('skills')}
                className={`text-white ${activeSection === 'skills' ? 'font-bold border-b-2 border-white' : ''} transition duration-300 hover:text-sky-200`}
              >
                Skills
              </button>
            </nav>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-white hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
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