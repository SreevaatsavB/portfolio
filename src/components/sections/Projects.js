import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../common/SectionTitle';
import { PROJECT_LINKS } from '../../constants/links';

const Projects = () => {
  const { darkMode } = useTheme();
  const [projectFilter, setProjectFilter] = useState('all');
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'AI', value: 'ai' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'Computer Vision', value: 'cv' },
    { label: 'LLMs', value: 'llm' },
    { label: 'NLP', value: 'nlp' },
  ];
  
  // Updated projects data with links from constants
  const projectsData = [
    {
      id: 1,
      title: "AnimalCLEF 2026 — Wildlife Re-identification (9th Place)",
      description: "Unsupervised clustering of ~2,400 unlabeled images across 4 species (lynx, salamanders, sea turtles, Texas horned lizards). Fused global embeddings (MiewID v3 + MegaDescriptor) with local feature matching (KAZE, ALIKED+LightGlue). Fine-tuned MegaDescriptor with ArcFace loss for a +6.4% gain. Used SAM2 to mask background keypoints before matching. 30+ documented experiments.",
      category: "cv",
      technologies: ["PyTorch", "HuggingFace", "SAM2", "LightGlue", "scikit-learn"],
      period: "Apr 2026 - May 2026",
      projectLink: PROJECT_LINKS.animalClef2026
    },
    {
      id: 2,
      title: "Explainable Visual Question-Answering for Chest X-rays",
      description: "Curated dataset with 892,364 QA pairs with grounding on chest X-rays. Developed VLMs with grounding capabilities outperforming baselines by 10%.",
      category: "ai",
      technologies: ["HuggingFace", "PyTorch", "AWS EC2"],
      period: "Aug 2024 - Jan 2025",
      projectLink: PROJECT_LINKS.chestXrayQA
    },
    {
      id: 3,
      title: "Generative AI fundamentals from scratch",
      description: "Coded modules like transformers and language models from scratch using PyTorch. Matched each intermediate output with HuggingFace's implementation.",
      category: "llm",
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
      category: "ml",
      technologies: ["PyTorch", "Nvidia-SLURM"],
      period: "Aug 2023 - Dec 2023",
      projectLink: PROJECT_LINKS.videoSummarization
    },
    {
      id: 6,
      title: "Analysis of Social Media Posts About Mass Layoffs",
      description: "Collected data from LinkedIn, Twitter and Layoffs.fyi. Analyzed trends and patterns using language modeling and hashtag analysis.",
      category: "nlp",
      technologies: ["HuggingFace", "Scikit-learn", "BeautifulSoup", "GitHub Actions"],
      period: "Dec 2022 - Jun 2023",
      projectLink: PROJECT_LINKS.layoffsAnalysis
    }
  ];
  
  // Filtered projects based on category
  const filteredProjects = projectFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === projectFilter);

  const getFilterButtonClass = (value) => {
    const isActive = projectFilter === value;
    return `ui-button !py-2 !px-3.5 !rounded-md !text-xs ${
      isActive
        ? 'ui-button-primary'
        : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100')
    }`;
  };
  
  return (
    <section className="content-section section-tone section-tone-cool stagger-group">
      <SectionTitle title="Projects" />
      
      {/* Project filters */}
      <div className="flex justify-center mb-8 overflow-x-auto pb-2 stagger-item">
        <div className={`inline-flex p-1 rounded-lg border ${
          darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setProjectFilter(option.value)}
              className={getFilterButtonClass(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects grid */}
      <div className="grid md:grid-cols-2 gap-6 stagger-group">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={{
              ...project,
              // Adding these props for the ProjectCard component
              description: project.description,
              technologies: project.technologies,
              period: project.period,
              projectLink: project.projectLink
            }}
            index={project.id - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
