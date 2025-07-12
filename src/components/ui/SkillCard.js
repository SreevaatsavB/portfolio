import React from 'react';

const SkillCard = ({ skill, darkMode }) => {
  // Determine the color based on expertise level (6-level scale with 3 categories, 2 levels each)
  const getExpertiseColor = (level) => {
    if (level <= 2) { // Beginner (levels 1-2)
      return darkMode ? 'bg-blue-500' : 'bg-blue-400';
    } else if (level <= 4) { // Intermediate (levels 3-4)
      return darkMode ? 'bg-yellow-500' : 'bg-yellow-400';
    } else { // Expert (levels 5-6)
      return darkMode ? 'bg-green-500' : 'bg-green-400';
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
    <div className={`rounded-lg p-3 transition-all duration-300 transform hover:scale-105 ${
      darkMode ? 'bg-blue-900/30 hover:bg-blue-800/50' : 'bg-blue-50 hover:bg-blue-100'
    }`}>
      <span className={`font-medium block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{skill.name}</span>
      
      {/* Expertise level bar */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className={`h-full ${getExpertiseColor(skill.level)}`}
          style={{ width: getBarWidth(skill.level) }}
        ></div>
      </div>
      
      {/* Expertise level label */}
      <span className={`text-xs mt-1 block ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        {getExpertiseLabel(skill.level)}
      </span>
    </div>
  );
};

export default SkillCard;