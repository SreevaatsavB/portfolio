import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import InteractiveBackground from './InteractiveBackground';
import FlowBackground from './FlowBackground';
import NeuralNetworkBackground from './NeuralNetworkBackground';
import AuroraBackground from './AuroraBackground';

const DynamicBackground = ({ activeSection }) => {
  const { darkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [darkModeBackground, setDarkModeBackground] = useState('flow'); // Options: 'flow', 'neural'
  
  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint (tailwind's md)
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for window resize events
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
 
  // Check if we're in the Creative section
  const isCreativeSection = activeSection === 'hobbies';
  
  // Logic for choosing background with smooth transitions:
  // 1. Creative section: Use AuroraBackground regardless of dark/light mode
  // 2. Light mode (all devices): InteractiveBackground
  // 3. Dark mode on mobile: InteractiveBackground
  // 4. Dark mode on desktop: NeuralNetworkBackground
  return (
    <AnimatePresence mode="wait">
      {isCreativeSection && (
        <motion.div 
          key="aurora"
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <AuroraBackground />
        </motion.div>
      )}
      
      {!isCreativeSection && !darkMode && (
        <motion.div 
          key="interactive-light"
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <InteractiveBackground />
        </motion.div>
      )}
      
      {!isCreativeSection && darkMode && isMobile && (
        <motion.div 
          key="interactive-dark-mobile"
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <InteractiveBackground />
        </motion.div>
      )}
      
      {!isCreativeSection && darkMode && !isMobile && (
        <motion.div 
          key="neural-network"
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <NeuralNetworkBackground />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicBackground;