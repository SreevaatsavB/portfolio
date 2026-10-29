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
      skills: ['LangGraph', 'AWS Bedrock', 'Agents at Scale', 'Self-Consistency', 'Human-AI Agreement'],
      details: [
        'Lead the AI module of a prior-authorization agent system for a large US health plan (LangGraph, AWS Bedrock) that turns clinical guidelines into questionnaire trees, judges each atomic criterion as met or not met from patient records, and rolls the answers up to a decision. Processed 18,500+ cases across 110 guidelines with 99.4% pipeline success and a 4.4-minute median latency.',
        'Built a guideline selector based on self-consistency sampling that corrected 830 of 1,185 audited routing decisions. With this and other accuracy fixes, agreement between the AI and human reviewers rose from 31% to 67% per procedure line in four months (Orthopedics: 47% to 77%), and unsafe approvals stayed under 1%.',
        'Helped raise turnaround-time compliance from 44% to 92% and cut reviewer time per line by nearly 40% (4.4 to 2.8 min) across 41 clinical reviewers.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 2,
      role: 'Data Scientist',
      company: 'Penguin AI',
      companyUrl: 'https://www.penguinai.co/',
      period: 'Jul 2025 - May 2026',
      skills: ['LightGBM', 'XGBoost', 'MLflow', 'MLOps', 'Agentic Workflows'],
      details: [
        'Built a claim-denial prediction system end to end, from per-client ETL to a LightGBM and XGBoost ensemble trained with MLflow, with PSI drift alerts and periodic retraining. It reached 0.87 AUC and caught 92% of denials on 18,823 held-out claims.',
        'Built an LLM agentic workflow that turns payer medical-policy PDFs into questionnaire trees. It scored higher question F1 than the existing drafts (0.64 vs 0.60), at $0.30 to $0.60 and 5 to 10 minutes per policy.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 3,
      role: 'Associate Data Scientist',
      company: 'Awone AI',
      companyUrl: 'https://awone.ai',
      period: 'Jul 2024 - Jun 2025',
      skills: ['LLMs', 'VLMs', 'Inference Optimization', 'MCP'],
      details: [
        'Made production LLM inference 15% faster with quantization and an n-gram speculative decoding head.',
        'Built a medical PII redaction system that combined a BERT NER model, trained with a custom loss, with document vision-language models. It redacted correctly 90% of the time, against 60-70% for standard tools.',
        'Trained document vision-language models to fill in forms automatically, with 82% accuracy on forms they had not seen before.',
        'Built a voice chat app from open-source components that users can interrupt mid-reply, plus an MCP client and server for querying a user database.'
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
        'Re-implemented Llama-2, Mistral, Qwen2 and LLaVA from scratch to understand their architectures and attention.',
        'Explored generative and multimodal models, including diffusion models built from scratch, Stable Diffusion 3, speech LLMs that output audio, and PaliGemma.',
        'Studied ways to speed up LLM inference, such as speculative decoding with n-gram and Medusa heads, KV caching, FlashAttention and quantization.'
      ],
      companyTrack: 'awone-penguin'
    },
    {
      id: 5,
      role: 'Summer Research Intern (Supervisor: Dr. Nidhi Goyal)',
      company: 'Mahindra University',
      companyUrl: 'https://www.mahindrauniversity.edu.in',
      period: 'Jul 2023 - Sept 2023',
      skills: ['Research', 'Video Summarization', 'Data Analysis'],
      details: [
        'Surveyed video summarization methods with a four-person team, in collaboration with a researcher from the National University of Singapore (NUS). The survey was published at the NarSUM workshop, ACM MM 2023.'
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
