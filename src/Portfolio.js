import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DynamicBackground from './components/ui/DynamicBackground';

// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Research from './components/sections/Research';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="min-h-screen text-white relative">
      {/* Dynamic background that switches based on theme */}
      <DynamicBackground />
      
      {/* Header with navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero section */}
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Section visibility is controlled by the activeSection state */}
        <div className={`${activeSection === 'about' ? 'block' : 'hidden'}`}>
          <About />
        </div>
        
        <div className={`${activeSection === 'experience' ? 'block' : 'hidden'}`}>
          <Experience />
        </div>
        
        <div className={`${activeSection === 'education' ? 'block' : 'hidden'}`}>
          <Education />
        </div>
        
        <div className={`${activeSection === 'research' ? 'block' : 'hidden'}`}>
          <Research />
        </div>
        
        <div className={`${activeSection === 'projects' ? 'block' : 'hidden'}`}>
          <Projects />
        </div>
        
        <div className={`${activeSection === 'skills' ? 'block' : 'hidden'}`}>
          <Skills />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;