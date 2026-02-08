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
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="min-h-screen text-white relative">
      {/* Dynamic background that switches based on theme and section */}
      <DynamicBackground activeSection={activeSection} />
      
      {/* Header with navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero section - hidden when Creative section is active */}
      {activeSection !== 'hobbies' && <Hero />}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Section visibility is controlled by AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {activeSection === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <About />
            </motion.div>
          )}
          
          {activeSection === 'experience' && (
            <motion.div 
              key="experience"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Experience />
            </motion.div>
          )}
          
          {activeSection === 'education' && (
            <motion.div 
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Education />
            </motion.div>
          )}
          
          {activeSection === 'research' && (
            <motion.div 
              key="research"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Research />
            </motion.div>
          )}
          
          {activeSection === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Projects />
            </motion.div>
          )}
          
          {activeSection === 'skills' && (
            <motion.div 
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Skills />
            </motion.div>
          )}
          
          {activeSection === 'hobbies' && (
            <motion.div 
              key="hobbies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut" 
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