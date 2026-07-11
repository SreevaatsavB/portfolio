import React from 'react';

const DynamicBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--bg-primary)' }}
    />
  );
};

export default DynamicBackground;
