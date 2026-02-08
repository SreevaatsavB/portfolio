import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../common/SectionTitle';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const { darkMode } = useTheme();
  
  // Updated skills data with expertise levels
  // Expertise levels: 1-2 = Beginner, 3-4 = Intermediate, 5-6 = Expert
  const skillsCategories = [
    {
      category: "Languages & Libraries",
      skills: [
        { name: "Python", level: 6 },
        { name: "C++", level: 3 },
        { name: "SQL", level: 5 },
        { name: "Pandas", level: 5 },
        { name: "NumPy", level: 6 },
        { name: "Scikit-learn", level: 6 },
        { name: "HuggingFace", level: 6 },
        { name: "PyTorch", level: 6 },
        { name: "TensorFlow", level: 5 }
      ]
    },
    {
      category: "Machine & Deep Learning",
      skills: [
        { name: "Supervised Learning (Tradional ML)", level: 6 },
        { name: "Unsupervised Learning", level: 5 },
        { name: "Reinforcement Learning", level: 3 },
      ]
    },
    {
      category: "AI engineering & Infrastructure",
      skills: [
        { name: "MCP", level: 6 },
        { name: "Langchain", level: 5 },
        { name: "VLLM", level: 4 },
        { name: "MLFlow", level: 4 },
        { name: "SLRUM", level: 4 },
        { name: "Ray", level: 2 }
      ]
    },
    {
      category: "Cloud & Deployment",
      skills: [
        { name: "AWS", level: 4 },
        { name: "Docker", level: 5 },
        { name: "Async programming", level: 6 },
        { name: "Web Sockets", level: 6 },
        { name: "Linux", level: 5 },
        { name: "FastAPI", level: 6 },
        { name: "Computer networks", level: 4 },
        { name: "GitHub Actions", level: 4 },
        { name: "MongoDB", level: 5 },

      ]
    }
  ];

  return (
    <section className="mb-12">
      <SectionTitle title="Skills" />
      
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-300 relative z-10`}>
        {skillsCategories.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${darkMode ? 'text-white border-blue-800' : 'text-gray-900 border-blue-200'}`}>
              {category.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} darkMode={darkMode} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
