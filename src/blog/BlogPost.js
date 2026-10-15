import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { SERIES_LENGTH } from '../content/blogPosts';
import Markdown from './Markdown';
import { formatDate } from './posts';

// The last heading scrolled past the sticky header is the current section.
function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    if (!headings.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0].id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el || el.getBoundingClientRect().top > 140) break;
        current = id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);
  return activeId;
}

// Buttons rather than #anchors, because HashRouter owns the URL hash.
const Toc = ({ headings, activeId, onJump }) => (
  <ol className="toc-list">
    {headings.map((h) => (
      <li key={h.id} className={h.level === 3 ? 'toc-sub' : undefined}>
        <button type="button" onClick={() => onJump(h.id)} aria-current={h.id === activeId ? 'location' : undefined}>
          {h.text}
        </button>
      </li>
    ))}
  </ol>
);

const BlogPost = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const publishedSlugs = useMemo(() => posts.map((p) => p.slug), [posts]);
  const bodyRef = useRef(null);
  const mobileTocRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const activeId = useActiveHeading(headings);

  useEffect(() => {
    if (!post) return undefined;
    const previous = document.title;
    document.title = `${post.title} | Sreevaatsav B`;
    return () => {
      document.title = previous;
    };
  }, [post]);

  useEffect(() => {
    const nodes = bodyRef.current ? bodyRef.current.querySelectorAll('h2[id], h3[id]') : [];
    setHeadings([...nodes].map((h) => ({ id: h.id, text: h.textContent, level: h.tagName === 'H2' ? 2 : 3 })));
  }, [post]);

  if (!post) {
    return (
      <div className="blog-column">
        <h1 className="page-title">Post not found</h1>
        <p className="index-intro"><Link className="minimal-link" to="/blog">Back to all posts</Link></p>
      </div>
    );
  }

  const series = post.series
    ? posts.filter((p) => p.series === post.series).sort((a, b) => a.part - b.part)
    : [];
  const index = series.indexOf(post);
  const prev = series[index - 1];
  const next = series[index + 1];
  const total = SERIES_LENGTH[post.series] || series.length;
  // Every planned part, with unpublished ones marked as coming soon.
  const seriesSlots = Array.from({ length: Math.max(total, series.length) }, (_, i) =>
    series.find((p) => p.part === i + 1) || { part: i + 1, pending: true }
  );

  const jumpTo = (id) => {
    if (mobileTocRef.current) mobileTocRef.current.open = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="post-layout">
      <article className="post">
        <p className="post-back"><Link to="/blog">← All posts</Link></p>
        <header className="post-header">
          {post.series && (
            <p className="eyebrow-label">
              {post.series}
              {post.part && <span className="whitespace-nowrap">{` · Part ${post.part} of ${total}`}</span>}
            </p>
          )}
          <h1 className="post-title">{post.title}</h1>
          <div className="post-byline">
            {post.byline ? <ReactMarkdown>{post.byline}</ReactMarkdown> : <p>{post.author}</p>}
          </div>
          <p className="meta-text">
            <time dateTime={post.date?.replace(/-XX$/i, '')}>{formatDate(post.date)}</time>
          </p>
        </header>

        {seriesSlots.length > 1 && (
          <nav className="series-box" aria-label="Posts in this series">
            <p className="eyebrow-label">This series</p>
            <ol>
              {seriesSlots.map((p) => (
                <li key={p.part}>
                  <span className="series-num">Part {p.part}</span>
                  {p.pending ? (
                    <span className="series-pending">Coming soon</span>
                  ) : p === post ? (
                    <span aria-current="page">{p.title}</span>
                  ) : (
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {headings.length > 0 && (
          <details className="toc-mobile" ref={mobileTocRef}>
            <summary>Contents</summary>
            <Toc headings={headings} activeId={activeId} onJump={jumpTo} />
          </details>
        )}

        <div className="post-body" ref={bodyRef}>
          <Markdown publishedSlugs={publishedSlugs} wideFigures={post.wideFigures}>{post.content}</Markdown>
        </div>

        {(prev || next) && (
          <nav className="post-pager" aria-label="Previous and next posts">
            {prev && (
              <Link to={`/blog/${prev.slug}`} className="pager-prev">
                <span className="eyebrow-label">← Previous · Part {prev.part}</span>
                <span className="pager-title">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link to={`/blog/${next.slug}`} className="pager-next">
                <span className="eyebrow-label">Next · Part {next.part} →</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>

      {headings.length > 0 && (
        <aside className="post-toc">
          <nav aria-label="Table of contents">
            <p className="eyebrow-label">Contents</p>
            <Toc headings={headings} activeId={activeId} onJump={jumpTo} />
          </nav>
        </aside>
      )}
    </div>
  );
};

export default BlogPost;
