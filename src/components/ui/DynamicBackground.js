import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const DynamicBackground = () => {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: darkMode
            ? 'linear-gradient(180deg, #0c1522 0%, #101a2a 40%, #0f1724 100%)'
            : 'linear-gradient(180deg, #f5f9ff 0%, #edf4ff 40%, #eaf2ff 100%)',
        }}
      />

      <div
        className="aurora-layer aurora-layer-primary"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 20% 25%, rgba(104, 168, 246, 0.33), transparent 56%)'
            : 'radial-gradient(circle at 20% 25%, rgba(130, 185, 245, 0.46), transparent 58%)',
        }}
      />
      <div
        className="aurora-layer aurora-layer-secondary"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 80% 74%, rgba(103, 143, 214, 0.28), transparent 58%)'
            : 'radial-gradient(circle at 80% 74%, rgba(139, 203, 255, 0.42), transparent 58%)',
        }}
      />
      <div
        className="aurora-layer aurora-layer-tertiary"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 52% 40%, rgba(53, 104, 184, 0.22), transparent 54%)'
            : 'radial-gradient(circle at 52% 40%, rgba(175, 216, 255, 0.34), transparent 56%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: darkMode ? 0.08 : 0.06,
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.35) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: darkMode ? 0.16 : 0.1,
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7) 0.5px, transparent 0.8px), radial-gradient(circle at 72% 66%, rgba(255,255,255,0.6) 0.6px, transparent 0.9px)',
          backgroundSize: '240px 240px',
        }}
      />
    </div>
  );
};

export default DynamicBackground;
