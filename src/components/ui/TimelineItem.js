import React from 'react';

const TimelineItem = ({ data, isEven, darkMode }) => {
  return (
    <div className="relative">
      <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-white"></div>
      </div>
      
      <div className="ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 items-center">
        <div className="md:text-right md:pr-12 md:col-start-1">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            darkMode 
              ? (isEven ? 'bg-blue-900 text-white' : 'bg-indigo-800 text-white') 
              : (isEven ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800')
          }`}>
            {data.period}
          </span>
        </div>
        <div className={`mt-2 md:mt-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md transition-transform duration-500 hover:scale-105`}>
          <h3 className="text-xl font-bold">{data.role}</h3>
          <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{data.company}</p>
          <p className="mt-2">
            {data.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className={`inline-block px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;