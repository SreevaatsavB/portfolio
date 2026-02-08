import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SocialIcons from '../ui/SocialIcons';

const Footer = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`mt-4 border-t py-10 ${
      darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-white/70 border-slate-200'
    }`}>
      <div className="portfolio-main px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Sreevaatsav B</h3>
            <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Data Scientist</p>
          </div>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
