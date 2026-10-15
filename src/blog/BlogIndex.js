import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, slugify } from './posts';

const PostSummary = ({ post }) => (
  <li className="index-post">
    {post.part && <p className="eyebrow-label">Part {post.part}</p>}
    <h3 className="entry-title">
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </h3>
    {post.summary && <p className="index-summary">{post.summary}</p>}
    <p className="meta-text">{formatDate(post.date)}</p>
  </li>
);

const BlogIndex = ({ posts }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Blog | Sreevaatsav B';
    return () => {
      document.title = previous;
    };
  }, []);

  // Group posts by series (in manifest order); posts without a series go last.
  const groups = [];
  for (const post of posts) {
    const key = post.series || null;
    let group = groups.find((g) => g.series === key);
    if (!group) groups.push((group = { series: key, posts: [] }));
    group.posts.push(post);
  }
  groups.sort((a, b) => (a.series === null) - (b.series === null));

  return (
    <div className="blog-column">
      <header className="index-header">
        <h1 className="page-title">Blog</h1>
        <p className="index-intro">
          Write-ups of projects I have worked on and notes from things I have studied, mostly on
          robot learning and machine learning. Each post links to its code and references.
        </p>
      </header>

      {groups.map((group) => (
        <section
          key={group.series || 'posts'}
          className="index-group surface-card"
          aria-labelledby={slugId(group.series)}
        >
          <p className="eyebrow-label">{group.series ? 'Series' : 'Posts'}</p>
          {group.series && <h2 id={slugId(group.series)} className="index-group-title">{group.series}</h2>}
          <ol className="index-list">
            {[...group.posts]
              .sort((a, b) => (a.part || 0) - (b.part || 0))
              .map((post) => <PostSummary key={post.slug} post={post} />)}
          </ol>
        </section>
      ))}
    </div>
  );
};

const slugId = (series) => (series ? `series-${slugify(series)}` : undefined);

export default BlogIndex;
