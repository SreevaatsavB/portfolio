import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SOCIAL_LINKS } from '../../constants/links';

const SocialIcons = ({ className = "" }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`flex space-x-5 ${className}`}>
      {/* LinkedIn */}
      <a 
        href={SOCIAL_LINKS.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white hover:text-indigo-200 transition duration-300`}
        aria-label="LinkedIn"
      >
        <img 
          src={process.env.PUBLIC_URL +  "/icons/linkedin.svg" }
          alt="LinkedIn" 
          className={`w-6 h-6 ${darkMode ? 'filter invert brightness-75' : ''}`} 
        />
      </a>
      
      {/* GitHub */}
      <a 
        href={SOCIAL_LINKS.github} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white hover:text-indigo-200 transition duration-300`}
        aria-label="GitHub"
      >
        <img 
          src= {process.env.PUBLIC_URL + "/icons/github.svg"} 
          alt="GitHub" 
          className={`w-6 h-6 ${darkMode ? 'filter invert brightness-75' : ''}`} 
        />
      </a>
      
      {/* Google Scholar */}
      <a 
        href={SOCIAL_LINKS.googleScholar} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white hover:text-indigo-200 transition duration-300`}
        aria-label="Google Scholar"
      >
        <img 
          src= {process.env.PUBLIC_URL + "/icons/google-scholar.svg" }
          alt="Google Scholar" 
          className={`w-6 h-6 ${darkMode ? 'filter invert brightness-75' : ''}`} 
        />
      </a>
      
      {/* Kaggle */}
      <a 
        href={SOCIAL_LINKS.kaggle} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white hover:text-indigo-200 transition duration-300`}
        aria-label="Kaggle"
      >
        <img 
          src= {process.env.PUBLIC_URL + "/icons/kaggle.svg" }
          alt="Kaggle" 
          className={`w-6 h-6 ${darkMode ? 'filter invert brightness-75' : ''}`} 
        />
      </a>

      {/* LeetCode */}
      <a 
        href={SOCIAL_LINKS.leetcode} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white hover:text-indigo-200 transition duration-300`}
        aria-label="LeetCode"
      >
        <img 
          src= {process.env.PUBLIC_URL + "/icons/leetcode.svg" }
          alt="LeetCode" 
          className={`w-6 h-6 ${darkMode ? 'filter invert brightness-75' : ''}`} 
        />
      </a>
    </div>
  );
};

export default SocialIcons;