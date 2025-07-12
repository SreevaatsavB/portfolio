import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import InteractiveBackground from './InteractiveBackground';
import FlowBackground from './FlowBackground';
import NeuralNetworkBackground from './NeuralNetworkBackground';

const DynamicBackground = () => {
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
 
  // Logic for choosing background:
  // 1. Light mode (all devices): InteractiveBackground
  // 2. Dark mode on mobile: InteractiveBackground
  // 3. Dark mode on desktop: NeuralNetworkBackground (FlowBackground commented out)
  if (!darkMode) {
    return <InteractiveBackground />;
  } else if (isMobile) {
    return <InteractiveBackground />;
  } else {
    // For dark mode on desktop, currently only using NeuralNetworkBackground
    // To use FlowBackground, uncomment the line below and comment out the NeuralNetworkBackground line
    // return <FlowBackground />;
    return <NeuralNetworkBackground />;
  }
};

export default DynamicBackground;