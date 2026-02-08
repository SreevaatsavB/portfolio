import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const DynamicBackground = () => {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 12% 18%, rgba(121,180,255,0.11), transparent 38%), radial-gradient(circle at 86% 82%, rgba(170,205,255,0.1), transparent 34%), linear-gradient(180deg, #0d1624 0%, #111b2b 50%, #0f1724 100%)'
            : 'radial-gradient(circle at 10% 20%, rgba(63,111,183,0.14), transparent 36%), radial-gradient(circle at 88% 84%, rgba(123,167,223,0.16), transparent 34%), linear-gradient(180deg, #f4f8ff 0%, #edf4ff 45%, #e6f0ff 100%)',
        }}
      />
      <div
        className={`absolute -top-24 -right-20 h-96 w-96 rounded-full blur-3xl ${
          darkMode ? 'bg-sky-400/10' : 'bg-blue-300/25'
        }`}
      />
      <div
        className={`absolute -bottom-24 -left-20 h-80 w-80 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-200/10' : 'bg-sky-200/28'
        }`}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

export default DynamicBackground;
