import React from 'react';
import SocialIcons from '../ui/SocialIcons';

const Footer = () => {
  return (
    <footer className="mt-4 border-t border-[var(--border-color)] py-8">
      <div className="portfolio-main px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Sreevaatsav Bavana</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Hyderabad, India</p>
          </div>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
