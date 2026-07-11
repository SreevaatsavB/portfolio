import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';

const Hobbies = () => {
  const interests = [
    {
      title: "Gaming",
      description: "A growing PS5 collection spanning RPGs and competitive shooters."
    },
    {
      title: "Digital Art & Design",
      description: "Photoshop illustration, character design concepts, and the occasional UI/UX experiment."
    },
    {
      title: "Music & Audio",
      description: "Beat making, sound design, and mixing podcast episodes for friends."
    },
    {
      title: "Photography",
      description: "Landscapes, urban scenes, and night photography."
    },
    {
      title: "Coding for fun",
      description: "Small generative art, random generators, and experimental apps outside of work."
    },
    {
      title: "Other interests",
      description: "Food adventures, sci-fi novels, movie marathons, and puzzles."
    }
  ];

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Beyond Work" />

      <SectionContainer>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 stagger-group">
          {interests.map((interest) => (
            <div key={interest.title} className="stagger-item">
              <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1">{interest.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{interest.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Hobbies;
