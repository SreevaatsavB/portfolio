import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SocialIcons from '../ui/SocialIcons';

const Footer = () => {
  const { darkMode, colors } = useTheme();
  
  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-sky-600'} text-white py-8`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Sreevaatsav B</h3>
            <p>Associate Data Scientist</p>
          </div>
          <SocialIcons />
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Sreevaatsav B. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;