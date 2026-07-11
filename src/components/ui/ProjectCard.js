import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <article className="stagger-item py-6 border-b border-[var(--border-color)] last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <h3 className="entry-title">
          {project.title}
        </h3>
        <span className="meta-text">
          {project.period}
        </span>
      </div>

      <p className="text-[var(--text-secondary)] text-[0.93rem] mb-4 max-w-[62ch]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="ui-badge">
            {tech}
          </span>
        ))}
      </div>

      {project.projectLink && (
        <a
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
        >
          View project
          <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
