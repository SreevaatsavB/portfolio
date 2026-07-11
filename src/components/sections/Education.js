import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SectionContainer from '../common/SectionContainer';

const Education = () => {
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

  const achievements = [
    "Cumulative GPA: 8.76",
    "4 years consecutive merit scholarship (2020-2024)",
    "Top 5% of the class consistently",
  ];

  return (
    <section className="content-section stagger-group">
      <SectionTitle title="Education" />

      <SectionContainer>
        <div className="stagger-item">
          <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-1">
            <h3 className="entry-title">
              Bachelor of Technology (BTech), Artificial Intelligence
            </h3>
            <span className="meta-text flex-shrink-0">Aug 2020 - Aug 2024</span>
          </div>
          <p className="text-[0.93rem] text-[var(--text-secondary)] mb-4">
            Mahindra University, Hyderabad, India
          </p>

          <p className="text-[var(--text-secondary)] mb-1">
            Gold medalist in BTech AI for the class of 2020
          </p>

          {/* Gold Medal Photo */}
          <div className="my-8 flex flex-col items-center">
            <div className="rounded-sm overflow-hidden border border-[var(--border-color)] shadow-sm w-full max-w-lg">
              <img
                src={process.env.PUBLIC_URL + "/images/graduation/gold_medal.jpg"}
                alt="Receiving Gold Medal from Anand Mahindra"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/400/250";
                }}
              />
            </div>
            <p className="mt-3 text-sm italic text-[var(--text-muted)] text-center max-w-md">
              A memorable moment at convocation, with Mr. Anand Mahindra
            </p>
          </div>

          {/* Key Courses */}
          <div className="mt-6">
            <h4 className="eyebrow-label mb-3">Relevant Courses</h4>
            <div className="flex flex-wrap gap-2">
              {keyCourses.map((course) => (
                <span key={course} className="ui-badge">
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Achievements */}
          <div className="mt-6">
            <h4 className="eyebrow-label mb-3">Academic Achievements</h4>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Education;
