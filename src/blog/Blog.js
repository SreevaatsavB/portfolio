import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './blog.css';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import DynamicBackground from '../components/ui/DynamicBackground';
import Footer from '../components/layout/Footer';
import { usePosts } from './posts';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';

// Reading fonts (regular and italic serif, monospace) are only needed here,
// so they load with the blog instead of changing the home page's fonts.
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&family=Source+Code+Pro:wght@400;500&display=swap';

function useBlogFonts() {
  useEffect(() => {
    if (document.getElementById('blog-fonts')) return;
    const link = document.createElement('link');
    link.id = 'blog-fonts';
    link.rel = 'stylesheet';
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

const navClass = (active) =>
  `text-sm uppercase tracking-[0.06em] font-medium transition-colors pb-0.5 border-b-2 ${
    active
      ? 'text-[var(--accent)] border-[var(--accent)]'
      : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
  }`;

function BlogHeader() {
  const { pathname } = useLocation();
  return (
    <header className="bg-[var(--bg-subtle)] sticky top-0 z-50 border-b border-[var(--border-color)]">
      <div className="portfolio-main px-4 py-6 flex justify-between items-center gap-4">
        <Link
          to="/"
          className="text-xl md:text-2xl tracking-tight"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          <span className="text-[var(--text-primary)]">Sreevaatsav</span>{' '}
          <span className="text-[var(--accent)]">B</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-7">
          <nav aria-label="Site" className="flex items-center gap-5 md:gap-7">
            <Link to="/" className={navClass(false)}>Portfolio</Link>
            <Link to="/blog" className={navClass(true)} aria-current={pathname === '/blog' ? 'page' : undefined}>
              Blog
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const Blog = () => {
  const { darkMode } = useTheme();
  const { list, error } = usePosts();
  useBlogFonts();

  return (
    <div className={`portfolio-shell blog-root relative ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <DynamicBackground />
      <BlogHeader />
      <main className="blog-main relative z-10">
        {error ? (
          <p className="blog-status">Posts could not be loaded. Please refresh the page.</p>
        ) : !list ? (
          <p className="blog-status">Loading…</p>
        ) : (
          <Routes>
            <Route index element={<BlogIndex posts={list} />} />
            <Route path=":slug" element={<BlogPost posts={list} />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
