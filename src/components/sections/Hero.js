import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RESUME_PATH } from '../../constants/links';

const Hero = () => {
  const { darkMode, colors } = useTheme();
  
  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : colors.heroBg} relative z-10`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side with text */}
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Sreevaatsav B</h1>
            <h2 className="text-xl md:text-2xl mb-6 text-white">Associate Data Scientist | Multi-modal AI | Gold Medalist</h2>
            <p className="text-lg mb-8 max-w-lg text-white">
              Passionate about leveraging data science and AI to build innovative solutions and detect interesting patterns from data.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href={RESUME_PATH} 
                download="SreevaatsavB_Resume.pdf"
                className={`${darkMode 
                  ? 'bg-white text-blue-900 hover:bg-gray-100' 
                  : 'bg-white text-sky-700 hover:bg-gray-100'} 
                  px-6 py-2 rounded-full font-medium transition duration-300 inline-block`}
              >
                Download Resume
              </a>
            </div>
          </div>
          
          {/* Right side with image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-64 h-64 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img 
                  src= {process.env.PUBLIC_URL + "/images/profile/profile-photo.jpg" }
                  alt="Sreevaatsav B" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "/api/placeholder/300/300";
                  }} 
                />
              </div>
              {/* <div className={`absolute -bottom-2 -right-2 ${darkMode ? 'bg-green-500' : 'bg-sky-400'} text-white text-xs px-3 py-1 rounded-full`}>
                Available for hire
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;