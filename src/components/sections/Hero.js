import React from 'react';
import { RESUME_PATH } from '../../constants/links';

const Hero = () => {
  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="portfolio-main px-4 md:px-0">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[var(--border-color)] flex-shrink-0">
            <img
              src={process.env.PUBLIC_URL + "/images/profile/profile-photo.jpg"}
              alt="Sreevaatsav B"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/300/300";
              }}
            />
          </div>
          <div>
            <h1 className="page-title text-[var(--text-primary)]">Sreevaatsav Bavana</h1>
            <p className="meta-text mt-1.5">
              Senior Data Scientist, Penguin AI · Multimodal AI · Robotic ML
            </p>
          </div>
        </div>

        <p className="text-base md:text-[1.05rem] leading-relaxed text-[var(--text-secondary)] max-w-2xl mb-5">
          I work on multimodal AI, robotic policies, and LLM systems — building
          production AI that works at scale, with a growing research focus on grounded
          vision-language models. Gold medalist, B.Tech in Artificial Intelligence.
        </p>

        <a
          href={RESUME_PATH}
          download="SreevaatsavB_Resume.pdf"
          className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
        >
          Download CV →
        </a>
      </div>
    </section>
  );
};

export default Hero;
