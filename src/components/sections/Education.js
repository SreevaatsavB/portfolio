import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';

const Education = () => {
  const { darkMode } = useTheme();
  
  // Key courses data from resume
  const keyCourses = [
    "Data Structures and Algorithms", 
    "Linear Algebra", 
    "Probability and Statistics", 
    "Optimization Techniques in AI",
    "DBMS", 
    "Machine and Deep Learning", 
    "Natural Language Processing", 
    "Reinforcement Learning"
  ];

  // Academic achievements from resume
  const achievements = [
    "Cumulative GPA: 8.76",
    "4 years consecutive merit scholarship (2020-2024)",
    "Top 5% of the class consistently",
  ];

  return (
    <section className="mb-12">
      <SectionTitle title="Education" />
      
      <SectionContainer>
        <div className="relative">
          <div className="flex items-start">
            {/* Timeline dot */}
            <div className="mr-4 mt-1">
              <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-sky-500' : 'bg-sky-600'} flex items-center justify-center`}>
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-sky-800'}`}>
                    Bachelor of Technology (BTech), Artificial Intelligence
                  </h3>
                  <p className={`text-lg ${darkMode ? 'text-sky-300' : 'text-sky-600'}`}>
                    Mahindra University, Hyderabad, India
                  </p>
                </div>
                
                <div className={`${darkMode ? 'bg-sky-800' : 'bg-sky-100'} ${darkMode ? 'text-white' : 'text-sky-800'} px-3 py-1 rounded-full text-sm mt-2 md:mt-0`}>
                  Aug 2020 - Aug 2024
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Gold medalist in BTech AI for the class of 2020
                </span>
              </div>
              
              {/* Gold Medal Image Section - Compact Size */}
              <div className="my-4 flex flex-col items-center">
                <div className={`rounded-lg overflow-hidden border-2 ${darkMode ? 'border-blue-200' : 'border-blue-200'} shadow-md`} style={{ width: '110%', maxWidth: '600px' }}>
                  <img 
                    src= {process.env.PUBLIC_URL + "/images/graduation/gold_medal.jpg"}
                    alt="Receiving Gold Medal from Anand Mahindra" 
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '350px' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/api/placeholder/400/250";
                    }}
                  />
                </div>
                <p className={`mt-2 text-center text-xs italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ maxWidth: '400px' }}>
                Honored to receive the Gold Medal from Mr. Anand Mahindra at my convocation ceremony
                </p>
              </div>
              
              <div className="mt-2 mb-6">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <strong>Grade:</strong> 8.76/10
                </p>
              </div>
              
              {/* Key Courses */}
              <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Relevant Courses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {keyCourses.map((course, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} ${darkMode ? 'text-white' : 'text-gray-800'} shadow`}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Academic Achievements */}
              <div className="mt-6">
                <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Academic Achievements</h4>
                <ul className={`list-disc pl-5 space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Education;