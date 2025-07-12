import React from 'react';

const MobileMenu = ({ activeSection, handleNavClick }) => {
  return (
    <div className="md:hidden mt-4 pb-4">
      <nav className="flex flex-col space-y-2">
        <button 
          onClick={() => handleNavClick('about')}
          className={`${activeSection === 'about' ? 'bg-blue-700' : ''} py-2 px-4 rounded transition duration-300`}
        >
          About
        </button>
        <button 
          onClick={() => handleNavClick('experience')}
          className={`${activeSection === 'experience' ? 'bg-indigo-500' : ''} py-2 px-4 rounded transition duration-300`}
        >
          Experience
        </button>
        <button 
          onClick={() => handleNavClick('education')}
          className={`${activeSection === 'education' ? 'bg-indigo-500' : ''} py-2 px-4 rounded transition duration-300`}
        >
          Education
        </button>
        <button 
          onClick={() => handleNavClick('research')}
          className={`${activeSection === 'research' ? 'bg-indigo-500' : ''} py-2 px-4 rounded transition duration-300`}
        >
          Research
        </button>
        <button 
          onClick={() => handleNavClick('projects')}
          className={`${activeSection === 'projects' ? 'bg-indigo-500' : ''} py-2 px-4 rounded transition duration-300`}
        >
          Projects
        </button>
        <button 
          onClick={() => handleNavClick('skills')}
          className={`${activeSection === 'skills' ? 'bg-indigo-500' : ''} py-2 px-4 rounded transition duration-300`}
        >
          Skills
        </button>
      </nav>
    </div>
  );
};

export default MobileMenu;