import React from 'react';

const SkillCard = ({ skill, darkMode }) => {
  // Determine the color based on expertise level (6-level scale with 3 categories, 2 levels each)
  const getExpertiseColor = (level) => {
    if (level <= 2) { // Beginner (levels 1-2)
      return darkMode ? 'bg-slate-500' : 'bg-slate-400';
    } else if (level <= 4) { // Intermediate (levels 3-4)
      return darkMode ? 'bg-sky-500' : 'bg-sky-600';
    } else { // Expert (levels 5-6)
      return darkMode ? 'bg-emerald-500' : 'bg-emerald-600';
    }
  };

  // Get text label for expertise level with sub-levels
  const getExpertiseLabel = (level) => {
    if (level <= 2) {
      return level === 1 ? 'Beginner' : 'Beginner';
    } else if (level <= 4) {
      return level === 3 ? 'Intermediate' : 'Intermediate';
    } else {
      return level === 5 ? 'Expert' : 'Expert';
    }
  };

  // Calculate width percentage based on level (now on a 6-level scale)
  const getBarWidth = (level) => {
    return `${(level / 6) * 100}%`;
  };

  return (
    <div className={`rounded-lg p-3 border card-trace stagger-item transition-all duration-200 ${
      darkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-800/70' : 'bg-white border-slate-200 hover:bg-slate-50'
    }`}>
      <span className={`font-medium block mb-2 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{skill.name}</span>
      
      {/* Expertise level bar */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        <div 
          className={`h-full ${getExpertiseColor(skill.level)}`}
          style={{ width: getBarWidth(skill.level) }}
        ></div>
      </div>
      
      {/* Expertise level label */}
      <span className={`text-xs mt-1 block ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
        {getExpertiseLabel(skill.level)}
      </span>
    </div>
  );
};

export default SkillCard;
