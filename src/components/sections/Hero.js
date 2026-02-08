import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RESUME_PATH } from '../../constants/links';

const Hero = () => {
  const { darkMode } = useTheme();
  
  return (
    <section className="py-12 md:py-14 relative z-10">
      <div className="portfolio-main px-4 md:px-6">
        <div className={`surface-card card-trace p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 ${
          darkMode ? 'bg-slate-900/90' : 'bg-white/95'
        }`}>
          {/* Left side with text */}
          <div className="md:w-3/5 mb-4 md:mb-0 text-center md:text-left">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Sreevaatsav B</h1>
            <h2 className={`text-lg md:text-xl mb-5 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Data Scientist | AI Engineering | Multimodal AI | Gold Medalist
            </h2>
            <p className={`text-base md:text-lg mb-8 max-w-xl ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Passionate about leveraging data science and AI to build innovative solutions and detect interesting patterns from data.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href={RESUME_PATH} 
                download="SreevaatsavB_Resume.pdf"
                className="ui-button ui-button-primary px-6"
              >
                Download Resume
              </a>
            </div>
          </div>
          
          {/* Right side with image */}
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="relative">
              <div className="hero-halo w-72 h-72 md:w-80 md:h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="hero-halo hero-halo-secondary w-64 h-64 md:w-72 md:h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className={`w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border ${
                darkMode ? 'border-slate-700' : 'border-slate-200'
              } shadow-lg`}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
