import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import SocialIcons from '../ui/SocialIcons';

const About = () => {
  return (
    <section className="content-section stagger-group" id="about-section">
      <SectionTitle title="About Me" />

      <SectionContainer>
        <div className="grid md:grid-cols-7 gap-10 stagger-group">
          {/* Left column - Quick Info */}
          <div className="md:col-span-2 min-w-0 stagger-item">
            <h3 className="eyebrow-label mb-4">Quick Info</h3>
            <ul className="space-y-3 mb-9 text-sm">
              <li className="text-[var(--text-secondary)]">Data Scientist</li>
              <li className="text-[var(--text-secondary)]">Hyderabad, Telangana, India</li>
              <li>
                <a href="mailto:bavanasreevaatsav1@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors break-words">
                  bavanasreevaatsav1@gmail.com
                </a>
              </li>
              <li className="text-[var(--text-secondary)]">Gold Medalist, B.Tech AI</li>
            </ul>

            <h3 className="eyebrow-label mb-4">Languages</h3>
            <ul className="space-y-2 mb-9 text-sm">
              <li className="flex justify-between">
                <span className="text-[var(--text-secondary)]">English</span>
                <span className="text-[var(--text-muted)]">Professional</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Hindi</span>
                <span className="text-[var(--text-muted)]">Native</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Telugu</span>
                <span className="text-[var(--text-muted)]">Native</span>
              </li>
            </ul>

            <h3 className="eyebrow-label mb-4">Connect</h3>
            <SocialIcons />
          </div>

          {/* Right column - Main content */}
          <div className="md:col-span-5 min-w-0 stagger-item">
            <div className="mb-7">
              <div className="entry-title">Senior Data Scientist</div>
              <div className="meta-text mt-1">Penguin AI, Hyderabad</div>
            </div>

            <div className="mb-7">
              <h3 className="eyebrow-label mb-3">Bio</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                I build production AI systems that work at scale — from multimodal models to agentic
                pipelines. Currently deep in generative AI and slowly making my way into robotics.
              </p>
            </div>

            <div>
              <h3 className="eyebrow-label mb-3">Current Focus</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Pushing deeper into multimodal AI — models that see, read, and reason together.
                Building and shipping agentic systems that handle complex, real-world workflows end
                to end. Exploring robotics ML — still in the early stages, learning the fundamentals
                of how models interact with the physical world.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default About;
