import React from 'react';

const MobileMenu = ({ activeSection, handleNavClick }) => {
  const sections = ['about', 'experience', 'education', 'research', 'projects', 'skills'];

  return (
    <div className="md:hidden mt-4 pb-2 border-t border-[var(--border-color)] pt-3">
      <nav className="flex flex-col">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleNavClick(section)}
            className={`py-2.5 text-left capitalize text-sm tracking-wide transition-colors ${
              activeSection === section
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-secondary)]'
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
