import React from 'react';

const SectionContainer = ({ children }) => {
  return (
    <div className="surface-card stagger-item p-6 md:p-8 text-[var(--text-primary)]">
      {children}
    </div>
  );
};

export default SectionContainer;
