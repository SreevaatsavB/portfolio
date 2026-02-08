import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import { PUBLICATION_LINKS } from '../../constants/links';

const Research = () => {
  const { darkMode } = useTheme();
  
  // Publications data with links from constants
  const publications = [
    {
      id: 1,
      title: "GIV-CXR: Densely Grounded, Visually Interpretable, Chest X-Ray Question Answering Dataset",
      authors: "Sreevaatsav Bavana, Adit Rushil Potta, Sai Amrit Patnaik, Nidhi Goyal",
      conference: "KDD 2026",
      year: "2026",
      status: "Submitted",
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
    "Multi modal model research & frameworks development",
    "Explainable AI techniques in the field of conversational AI and multi-modalities",
    "Efficient fine-tuning and compression techniques for domain-specific small LLMs/VLMs"
  ];

  return (
    <section className="mb-12">
      <SectionTitle title="Research" />
      
      <SectionContainer>
        <div className="space-y-8">
          {publications.map((pub) => (
            <div 
              key={pub.id} 
              className={`p-6 rounded-lg mb-4 ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-sky-800'}`}>
                {pub.title}
              </h3>
              
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {pub.authors}
              </p>
              
              <p className={`text-sm mb-2 ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>
                {pub.conference}, {pub.year}
                {pub.status && <span className="ml-2 px-2 py-1 rounded-full text-xs bg-yellow-500 text-white">{pub.status}</span>}
              </p>
              
              {pub.link && (
                <div className="mt-3">
                  <a 
                    href={pub.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center ${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                    View Publication
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-sky-800'}`}>
            Research Interests
          </h3>
          
          <ul className="list-disc pl-6 space-y-2">
            {researchInterests.map((interest, index) => (
              <li key={index} className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Research;
