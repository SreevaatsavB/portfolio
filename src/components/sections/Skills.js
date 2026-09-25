import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';

const Skills = () => {
  const skillsCategories = [
    {
      category: "Languages & Libraries",
      skills: ["Python", "C++", "SQL", "Pandas", "NumPy", "Scikit-learn", "HuggingFace", "PyTorch", "OpenCV"]
    },
    {
      category: "Machine & Deep Learning",
      skills: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"]
    },
    {
      category: "AI Engineering & Infrastructure",
      skills: ["LangChain", "LangGraph", "Langfuse", "MCP", "VLLM", "MLFlow", "SLURM", "Ray"]
    },
    {
      category: "Cloud & Deployment",
      skills: ["AWS", "Docker", "Async programming", "Web Sockets", "Linux", "FastAPI", "Computer networks", "GitHub Actions", "MongoDB", "PostgreSQL", "Kubernetes"]
    },
    {
      category: "Robot Learning",
      skills: ["Imitation learning", "ACT", "Diffusion Policy", "π0 / π0.5 VLAs", "LoRA & quantized fine-tuning"]
    },
    {
      category: "Robotics & Simulation",
      skills: ["ROS 2", "LeRobot", "Fairino SDK", "SO-101", "RealSense", "MuJoCo", "CoppeliaSim"]
    }
  ];

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Skills" />

      <SectionContainer>
        <div className="divide-y divide-[var(--border-color)]">
          {skillsCategories.map((category) => (
            <div key={category.category} className="stagger-item py-5 first:pt-0 last:pb-0">
              <h3 className="eyebrow-label mb-3">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
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

export default Skills;
