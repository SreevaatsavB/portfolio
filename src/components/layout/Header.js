import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';

const Header = ({ activeSection, setActiveSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ['about', 'experience', 'education', 'research', 'projects', 'skills'];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <header className="bg-[var(--bg-subtle)] sticky top-0 z-50 border-b border-[var(--border-color)]">
      <div className="portfolio-main px-4 md:px-0 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-serif tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <span className="text-[var(--text-primary)]">Sreevaatsav</span>{' '}
            <span className="text-[var(--accent)]">B</span>
          </h1>
          <div className="flex items-center gap-1 md:gap-7">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`text-sm uppercase tracking-[0.06em] font-medium capitalize transition-colors pb-0.5 border-b-2 ${
                    activeSection === section
                      ? 'text-[var(--accent)] border-[var(--accent)]'
                      : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 border border-[var(--border-color)] text-[var(--text-secondary)] rounded-sm"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>

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
