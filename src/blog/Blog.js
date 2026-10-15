import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './blog.css';
import { useTheme } from '../context/ThemeContext';
import DynamicBackground from '../components/ui/DynamicBackground';
import Header from '../components/layout/Header';
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

const Blog = () => {
  const { darkMode } = useTheme();
  const { list, error } = usePosts();
  useBlogFonts();

  return (
    <div className={`portfolio-shell blog-root relative ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <DynamicBackground />
      <Header />
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
