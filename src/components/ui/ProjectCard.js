import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project, index }) => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className="mb-4 h-40 bg-indigo-100 rounded-lg overflow-hidden flex items-center justify-center relative">
        {/* Background decoration with animations */}
        <div className={`absolute inset-0 ${darkMode ? 'bg-blue-800' : 'bg-sky-800'}`}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-900/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-70">
            <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M400,200 Q550,150 650,250 T800,400 Q750,550 650,650 T400,800 Q250,750 150,650 T0,400 Q50,250 150,150 T400,200" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2">
                <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
                  M400,200 Q550,150 650,250 T800,400 Q750,550 650,650 T400,800 Q250,750 150,650 T0,400 Q50,250 150,150 T400,200;
                  M400,250 Q500,100 600,200 T800,400 Q700,600 600,700 T400,750 Q300,600 200,700 T0,400 Q100,200 200,100 T400,250;
                  M400,200 Q550,150 650,250 T800,400 Q750,550 650,650 T400,800 Q250,750 150,650 T0,400 Q50,250 150,150 T400,200"
                />
              </path>
              <path d="M400,300 Q500,250 600,300 T800,400 Q700,500 600,600 T400,700 Q300,600 200,500 T0,400 Q100,300 200,200 T400,300" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2">
                <animate attributeName="d" dur="25s" repeatCount="indefinite" values="
                  M400,300 Q500,250 600,300 T800,400 Q700,500 600,600 T400,700 Q300,600 200,500 T0,400 Q100,300 200,200 T400,300;
                  M400,250 Q550,200 650,300 T800,400 Q750,500 650,550 T400,650 Q250,600 150,550 T0,400 Q50,300 150,250 T400,250;
                  M400,300 Q500,250 600,300 T800,400 Q700,500 600,600 T400,700 Q300,600 200,500 T0,400 Q100,300 200,200 T400,300"
                />
              </path>
            </svg>
            {index % 3 === 0 && (
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4 opacity-30">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white" style={{
                    transform: `translate(${Math.random() * 100}%, ${Math.random() * 100}%)`,
                    animation: `pulse ${2 + Math.random() * 3}s infinite alternate ${Math.random() * 2}s`
                  }}></div>
                ))}
              </div>
            )}
            {index % 3 === 1 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-32 h-32 border-4 border-white rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
                <div className="absolute w-24 h-24 border-4 border-white rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                <div className="absolute w-16 h-16 border-4 border-white rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
              </div>
            )}
            {index % 3 === 2 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full p-4">
                  {[...Array(32)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white rounded-full" style={{
                      transform: `scale(${1 + Math.random()})`,
                      opacity: Math.random() * 0.7 + 0.3
                    }}></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative z-10 font-bold text-xl text-white text-center px-4 py-2">
          {project.title}
        </div>
      </div>
      
      {/* Period/Date badge */}
      <div className="mb-2">
        <span className={`inline-block px-3 py-1 text-xs rounded-full ${
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
        }`}>
          {project.period}
        </span>
      </div>
      
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {project.title}
      </h3>
      
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span 
            key={index} 
            className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full text-sm`}
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex justify-start items-center mt-4">
        {project.projectLink && (
          <a 
            href={project.projectLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium hover:underline flex items-center`}
          >
            View Project 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;