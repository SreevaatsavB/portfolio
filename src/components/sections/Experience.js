import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Experience = () => {
  const experienceData = [
    {
      id: 1,
      role: 'Senior Data Scientist',
      company: 'Penguin AI',
      companyUrl: 'https://www.penguinai.co/',
      period: 'May 2026 - Present',
      skills: ['Agents at Scale', 'Cost Optimization', 'Data Driven Development'],
      details: [
        'Building end-to-end LLM-based agent pipelines for healthcare workflows, incorporating live production user feedback for self-improving, data-driven agent development.',
        'Leading AI governance efforts — compliance, bias mitigation, and safety alignment across deployed systems.',
        'Driving cost optimization and scalability of agent infrastructure in production.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 2,
      role: 'Data Scientist',
      company: 'Penguin AI',
      companyUrl: 'https://www.penguinai.co/',
      period: 'June 2025 - May 2026',
      skills: ['Multi Agent workflows', 'MLOps'],
      details: [
        'Built production-grade LLM workflow systems to automate prior authorization, reducing medical nurse review time by approximately 30-40% with around 80-85% accuracy; currently improving the system with a HITL workflow.',
        'Working on applied research methodologies to enhance automated medical coding.',
        'Developed an ML system for appeal denial prediction directly from customer data sources, with a corresponding ETL pipeline.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 3,
      role: 'Associate Data Scientist',
      company: 'Awone AI',
      companyUrl: 'https://awone.ai',
      period: 'Jun 2024 - June 2025',
      skills: ['LLMs', 'VLMs', 'Machine Learning'],
      details: [
        'Developed an end-to-end interruptible voice chat application with open-source components with MCP client-server for a user database.',
        'Improved the inference speed of production LLMs by 15% by quantization and developing speculative decoding n-gram head.',
        'Built and deployed a BERT-based NER model for healthcare PII redaction using a custom loss function.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 4,
      role: 'Data Science Intern',
      company: 'Awone AI',
      companyUrl: 'https://awone.ai',
      period: 'Jan 2024 - Jun 2024',
      skills: ['LLMs', 'Transformers', 'Inference Optimization', 'GenAI'],
      details: [
        'Developed a strong foundation in LLMs and transformers by coding state-of-the-art models like Llama-2 and Mistral from scratch, focusing on architectures, attention mechanisms, and optimizations.',
        'Experimented with several LLM optimization and quantization techniques, helping to reduce latency on development platform.',
        'Finetuned task-specific SLMs for medical-insurance related tasks.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 5,
      role: 'Research Intern',
      company: 'Mahindra University',
      companyUrl: 'https://www.mahindrauniversity.edu.in',
      period: 'Jul 2023 - Sept 2023',
      skills: ['Research', 'Video Summarization', 'Data Analysis'],
      details: [
        'Collaborated with a four-person team to conduct a thorough research survey on video summarization techniques.',
        'Co-authored a survey paper published in the ACMMM Workshop 2023.'
      ],
      companyTrack: null
    }
  ];

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Experience" />

      <SectionContainer>
        <div className="divide-y divide-[var(--border-color)]">
          {experienceData.map((experience) => (
            <div key={experience.id} className="stagger-item py-6 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="entry-title">{experience.role}</h3>
                <span className="meta-text">{experience.period}</span>
              </div>

              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[0.93rem] text-[var(--text-secondary)]">{experience.company}</span>
                {experience.companyUrl && (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    aria-label={`Visit ${experience.company} website`}
                  >
                    <FaExternalLinkAlt size={11} />
                  </a>
                )}
              </div>

              <ul className="space-y-1.5 text-[0.93rem] text-[var(--text-secondary)] list-disc pl-5 mb-3">
                {experience.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span key={skill} className="ui-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Experience;
