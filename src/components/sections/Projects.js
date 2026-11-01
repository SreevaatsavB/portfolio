import React, { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';
import { PROJECT_LINKS } from '../../constants/links';

const Projects = () => {
  const [projectFilter, setProjectFilter] = useState('all');
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Robotics', value: 'robotics' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'Computer Vision', value: 'cv' },
    { label: 'LLMs', value: 'llm' },
    { label: 'NLP', value: 'nlp' },
  ];

  // Updated projects data with links from constants
  const projectsData = [
    {
      id: 0,
      title: "Imitation-Learning Policies on a Fairino FR5 Cobot",
      description: "Founding engineer at Sliact Robotics (stealth startup). Collected 1,021 teleoperated demonstrations (about 11.5 hours) on a 6-DOF Fairino FR5 for colour sorting, sanding and pick-to-light, first with an SO-101 leader arm and later a Meta Quest controller over ROS 2, syncing 100 Hz robot logs with 30 Hz wrist (RealSense D405) and scene camera frames. Trained ACT, Diffusion Policy, Octo, π0 and π0.5 and ran them closed-loop at 30 Hz; fully fine-tuned π0 on an A100. Found that a π0 checkpoint with low validation loss did worse than simply not moving; switching to relative joint actions fixed it. π0 reached 80% on sanding and 65% on colour sorting over 20 trials each. Connecting π0 to a VLM planner (Sonnet 5.5) for multi-step tasks showed that neither could detect contact failures, so we're now adding a force/torque sensor and trying RL post-training with human corrections for sanding and screwing. XR-1 adaptation is in progress. Collaborator: Vivek Kanjarla.",
      category: ["robotics", "ml", "cv"],
      technologies: ["LeRobot", "PyTorch", "π0 / π0.5", "ACT", "Diffusion Policy", "Octo", "ROS 2", "Meta Quest", "Fairino SDK"],
      blogLink: "/blog",
      period: "Mar 2026 - Present",
      projectLink: PROJECT_LINKS.fr5Policies
    },
    {
      id: 6,
      title: "Robotic ML from Scratch: ACT",
      description: "Reimplemented ACT (Action Chunking with Transformers) from the paper (a CVAE plus transformer encoder/decoder), built up through autoencoder and VAE components.",
      category: ["robotics", "ml"],
      technologies: ["PyTorch"],
      period: "2026",
      projectLink: PROJECT_LINKS.actFromScratch
    },
    {
      id: 1,
      title: "GIV-CXR: Grounded, Interpretable Chest X-ray Question Answering",
      description: "Built a chest X-ray question-answering benchmark with 355,293 question-answer pairs, each tied to bounding boxes across 36 anatomical regions, to test spatial reasoning (VLaNC Lab, Mahindra University, with IIIT Hyderabad). Set up a hallucination filter combining automatic checks with radiologist review (82.4% acceptance). The best grounded VLM baseline reached 68.1 mIoU on spatial grounding, nearly double GPT-4o-mini's 39.0, and the top G-Eval answer score (3.98).",
      category: ["cv", "llm"],
      technologies: ["HuggingFace", "PyTorch", "AWS EC2"],
      period: "Aug 2024 - Jan 2025",
      projectLink: PROJECT_LINKS.chestXrayQA
    },
    {
      id: 2,
      title: "AnimalCLEF 2026: Wildlife Re-identification (9th Place)",
      description: "Unsupervised clustering of ~2,400 unlabeled images across 4 species (lynx, salamanders, sea turtles, Texas horned lizards). Fused global embeddings (MiewID v3 + MegaDescriptor) with local feature matching (KAZE, ALIKED+LightGlue). Fine-tuned MegaDescriptor with ArcFace loss for a +6.4% gain. Used SAM2 to mask background keypoints before matching. 30+ documented experiments.",
      category: ["cv", "ml"],
      technologies: ["PyTorch", "HuggingFace", "SAM2", "LightGlue", "scikit-learn"],
      period: "Mar 2026 - May 2026",
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
      title: "Query-Based Video Summarization with a Learnable Text-to-Frame Projection",
      description: "Added a learnable GELU projection that maps CLIP text-query embeddings into the video-frame embedding space of Moment-DETR, a transformer that finds the moments and highlights in a video that match a text query. Trained on a subset of QVHighlights, it improved mAP by about 18% over the original Moment-DETR. Supervised by Dr. Nidhi Goyal.",
      category: ["ml", "cv"],
      technologies: ["PyTorch", "Nvidia-SLURM"],
      period: "Aug 2023 - Dec 2023",
      projectLink: PROJECT_LINKS.videoSummarization
    },
    {
      id: 7,
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
