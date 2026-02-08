import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import Hobbies from './components/sections/Hobbies';

const Portfolio = () => {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className={`portfolio-shell relative ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* Dynamic background that switches based on theme and section */}
      <DynamicBackground activeSection={activeSection} />
      
      {/* Header with navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero section - hidden when Creative section is active */}
      {activeSection !== 'hobbies' && <Hero />}

      {/* Main Content */}
      <main className="portfolio-main px-4 md:px-6 py-10 md:py-12 relative z-10">
        {/* Section visibility is controlled by AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {activeSection === 'about' && (
            <motion.div 
              key="about"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <About />
            </motion.div>
          )}
          
          {activeSection === 'experience' && (
            <motion.div 
              key="experience"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Experience />
            </motion.div>
          )}
          
          {activeSection === 'education' && (
            <motion.div 
              key="education"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Education />
            </motion.div>
          )}
          
          {activeSection === 'research' && (
            <motion.div 
              key="research"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Research />
            </motion.div>
          )}
          
          {activeSection === 'projects' && (
            <motion.div 
              key="projects"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Projects />
            </motion.div>
          )}
          
          {activeSection === 'skills' && (
            <motion.div 
              key="skills"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Skills />
            </motion.div>
          )}
          
          {activeSection === 'hobbies' && (
            <motion.div 
              key="hobbies"
              className="stagger-group"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ 
                duration: 0.34,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Hobbies />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;
