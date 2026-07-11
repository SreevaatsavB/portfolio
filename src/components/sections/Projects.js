import React, { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import { PROJECT_LINKS } from '../../constants/links';

const Projects = () => {
  const [projectFilter, setProjectFilter] = useState('all');
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'Computer Vision', value: 'cv' },
    { label: 'LLMs', value: 'llm' },
    { label: 'NLP', value: 'nlp' },
  ];

  // Updated projects data with links from constants
  const projectsData = [
    {
      id: 1,
      title: "Explainable Visual Question-Answering for Chest X-rays",
      description: "Curated dataset with 892,364 QA pairs with grounding on chest X-rays. Developed VLMs with grounding capabilities outperforming baselines by 10%.",
      category: ["cv", "llm"],
      technologies: ["HuggingFace", "PyTorch", "AWS EC2"],
      period: "Aug 2024 - Jan 2025",
      projectLink: PROJECT_LINKS.chestXrayQA
    },
    {
      id: 2,
      title: "AnimalCLEF 2026 — Wildlife Re-identification (9th Place)",
      description: "Unsupervised clustering of ~2,400 unlabeled images across 4 species (lynx, salamanders, sea turtles, Texas horned lizards). Fused global embeddings (MiewID v3 + MegaDescriptor) with local feature matching (KAZE, ALIKED+LightGlue). Fine-tuned MegaDescriptor with ArcFace loss for a +6.4% gain. Used SAM2 to mask background keypoints before matching. 30+ documented experiments.",
      category: ["cv", "ml"],
      technologies: ["PyTorch", "HuggingFace", "SAM2", "LightGlue", "scikit-learn"],
      period: "Apr 2026 - May 2026",
      projectLink: PROJECT_LINKS.animalClef2026
    },
    {
      id: 3,
      title: "Generative AI fundamentals from scratch",
      description: "Coded modules like transformers and language models from scratch using PyTorch. Matched each intermediate output with HuggingFace's implementation.",
      category: ["llm"],
      technologies: ["HuggingFace", "PyTorch"],
      period: "Apr 2024 - May 2024",
      projectLink: PROJECT_LINKS.scratchLLM
    },
    {
      id: 4,
      title: "AI-Assisted Learning for NVIDIA SDKs and Toolkits",
      description: "Developed a fine-tuned LLM that assists users in understanding and effectively using various NVIDIA SDKs. Secured 3rd place in ICETCI Hackathon.",
      category: "llm",
      technologies: ["HuggingFace", "PyTorch", "Nvidia-SLURM"],
      period: "Aug 2023 - Sept 2023",
      projectLink: PROJECT_LINKS.nvidiaSDK
    },
    {
      id: 5,
      title: "Enhancing Video Summarization with Text-to-Image Module",
      description: "Improved text-to-image projection by augmenting with a learnable projection layer. Finetuned the baseline's projection module using QVHighlights dataset.",
      category: ["ml", "cv"],
      technologies: ["PyTorch", "Nvidia-SLURM"],
      period: "Aug 2023 - Dec 2023",
      projectLink: PROJECT_LINKS.videoSummarization
    },
    {
      id: 6,
      title: "Analysis of Social Media Posts About Mass Layoffs",
      description: "Collected data from LinkedIn, Twitter and Layoffs.fyi. Analyzed trends and patterns using language modeling and hashtag analysis.",
      category: ["nlp"],
      technologies: ["HuggingFace", "Scikit-learn", "BeautifulSoup", "GitHub Actions"],
      period: "Dec 2022 - Jun 2023",
      projectLink: PROJECT_LINKS.layoffsAnalysis
    }
  ];

  // Filtered projects based on category
  const filteredProjects = projectFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category.includes(projectFilter));

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Projects" />

      {/* Project filters */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 stagger-item">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setProjectFilter(option.value)}
            className={`text-xs uppercase tracking-[0.06em] pb-0.5 border-b transition-colors ${
              projectFilter === option.value
                ? 'text-[var(--accent)] border-[var(--accent)]'
                : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <SectionContainer>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </SectionContainer>
    </section>
  );
};

export default Projects;
