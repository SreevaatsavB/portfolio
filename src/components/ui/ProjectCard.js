import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project, index }) => {
  const { darkMode } = useTheme();

  return (
    <article
      className={`surface-card card-trace stagger-item p-6 transition-transform duration-200 hover:-translate-y-0.5 ${
        darkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`ui-badge ${
            darkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
          }`}
        >
          {project.period}
        </span>
        <span className={darkMode ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>
          #{index + 1}
        </span>
      </div>

      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        {project.title}
      </h3>

      <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-5`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.technologies.map((tech, techIndex) => (
          <span
            key={tech}
            className={`ui-badge ${
              techIndex % 3 === 0
                ? 'accent-chip'
                : techIndex % 3 === 1
                  ? 'accent-chip-secondary'
                  : darkMode
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-700'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {project.projectLink && (
        <a
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center font-semibold ${
            darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-sky-700 hover:text-sky-800'
          } transition-colors`}
        >
          View Project
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
