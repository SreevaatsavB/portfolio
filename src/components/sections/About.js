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
              <li className="text-[var(--text-secondary)]">Senior Data Scientist, Penguin AI</li>
              <li className="text-[var(--text-secondary)]">Founding team, SliAct Robotics</li>
              <li className="text-[var(--text-secondary)]">Hyderabad, Telangana, India</li>
              <li>
                <a href="mailto:bavanasreevaatsav1@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors break-words">
                  bavanasreevaatsav1@gmail.com
                </a>
              </li>
              <li className="text-[var(--text-secondary)]">Gold Medalist, B.Tech AI</li>
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
                I build production AI systems that work at scale, from multimodal models to agentic
                pipelines. Over the past year my focus has moved towards robot learning, training
                imitation-learning policies that run on a real 6-DOF cobot.
              </p>
            </div>

            <div>
              <h3 className="eyebrow-label mb-3">Current Focus</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                I'm interested in robot learning policies, especially for manipulation on real robot arms.
                Alongside that, multimodal AI (models that see, read and reason together) and agentic
                systems that handle complex, real-world workflows end to end.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default About;
