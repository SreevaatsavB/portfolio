import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import { PUBLICATION_LINKS } from '../../constants/links';

const Research = () => {
  // Publications data with links from constants
  const publications = [
    {
      id: 1,
      title: "GIV-CXR: Densely Grounded, Visually Interpretable, Chest X-Ray Question Answering Dataset",
      authors: "Sreevaatsav Bavana, Adit Rushil Potta, Sai Amrit Patnaik, Nidhi Goyal",
      conference: "MedReasoner Workshop at CVPR 2026",
      year: "2026",
      status: "Accepted",
      link: PUBLICATION_LINKS.givCXR
    },
    {
      id: 3,
      title: "From Layoff to Reemployment: Analyzing Social Media Narratives",
      authors: "Yayati Gupta, Sreevaatsav Bavana, Sudhira Chegu, Sujith Sai Kalakonda, Yash Mathur, Manmitha Polsani, and Sanatan Sukhija",
      conference: "CSoNet 2025",
      year: "2025",
      status: "Accepted",
      link: PUBLICATION_LINKS.layoffToReemploymentAcceptance
    },
    {
      id: 2,
      title: "A Systematic Study on Video Summarization: Approaches, Challenges, and Future Directions",
      authors: "Kajal Kansal, Nikita Kansal, Sreevaatsav Bavana, Bodla Krishna Vamshi, Nidhi Goyal",
      conference: "Proceedings of the 2nd Workshop on User-centric Narrative Summarization of Long Videos",
      year: "2023",
      link: PUBLICATION_LINKS.videoSummarizationStudy
    }
  ];

  // Research interests from resume
  const researchInterests = [
    "Learning robotic manipulation policies from multimodal perception",
    "Sim-to-real transfer and embodied learning for robotic control",
    "Grounded, interpretable vision-language models (VLMs)"
  ];

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Research" />

      <SectionContainer>
        <div className="divide-y divide-[var(--border-color)]">
          {publications.map((pub) => (
            <div key={pub.id} className="stagger-item py-5 first:pt-0 last:pb-0">
              <h3 className="entry-title mb-1.5">
                {pub.title}
              </h3>

              <p className="text-[0.93rem] text-[var(--text-secondary)] mb-1">
                {pub.authors}
              </p>

              <p className="text-[0.85rem] text-[var(--text-muted)] italic mb-2">
                {pub.conference}, {pub.year}
                {pub.status?.toLowerCase() === 'submitted' && (
                  <span className="ui-badge not-italic ml-2">
                    {pub.status}
                  </span>
                )}
              </p>

              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
                >
                  View publication →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] stagger-item">
          <h3 className="eyebrow-label mb-3">
            Research Interests
          </h3>

          <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-secondary)]">
            {researchInterests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Research;
