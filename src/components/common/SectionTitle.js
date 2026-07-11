import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <div className="mb-8 stagger-item">
      <h2 className="section-title section-heading pb-3 border-b border-[var(--border-color)]">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
