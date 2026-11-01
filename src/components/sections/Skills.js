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
      skills: ["LangChain", "LangGraph", "Langfuse", "MCP", "VLLM", "ONNX", "MLFlow", "SLURM", "Ray"]
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
      skills: ["ROS 2", "LeRobot", "Fairino SDK", "MuJoCo", "CoppeliaSim"]
    }
  ];

  const certifications = [
    "Modern Robotics, Course 1: Foundations of Robot Motion (Northwestern University, Coursera), Apr 2026, grade 98.46%",
    "Modern Robotics, Course 2: Robot Kinematics (Northwestern University, Coursera), in progress",
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

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] stagger-item">
          <h3 className="eyebrow-label mb-3">Courses & Certifications</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-secondary)]">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Skills;
