import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Link } from 'react-router-dom';
import { FiImage, FiVideo } from 'react-icons/fi';
import { slugify } from './posts';

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');
const elementsOf = (node) => (node.children || []).filter((c) => c.type === 'element');
const hasText = (node) => (node.children || []).some((c) => c.type === 'text' && c.value.trim());
const walk = (node, fn) => {
  if (node.type === 'element') fn(node);
  (node.children || []).forEach((child) => walk(child, fn));
};
const addClass = (node, name) => {
  node.properties.className = [...(node.properties.className || []), name];
};

// A paragraph holding just image lines, optionally followed by an italic caption line,
// becomes <figure> with a <figcaption>. Several images sit side by side; a single image
// listed in `wide` may break out of the text column.
function rehypeFigures({ wide = [] } = {}) {
  const el = (tagName, className, children) => ({ type: 'element', tagName, properties: { className }, children });
  return (tree) => {
    tree.children = tree.children.map((node) => {
      if (node.type !== 'element' || node.tagName !== 'p') return node;
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      const imgs = [];
      while (kids[imgs.length] && kids[imgs.length].tagName === 'img') imgs.push(kids[imgs.length]);
      const caption = kids[imgs.length];
      if (!imgs.length || kids.length > imgs.length + 1 || (caption && caption.tagName !== 'em')) return node;
      const row = imgs.length > 1;
      const file = String(imgs[0].properties.src || '').split('/').pop();
      const classes = ['post-figure', (row || wide.includes(file)) && 'post-figure-wide', row && 'post-figure-row'];
      return el('figure', classes.filter(Boolean), [
        ...(row ? [el('div', ['figure-images'], imgs)] : imgs),
        ...(caption ? [el('figcaption', [], [caption])] : []),
      ]);
    });
  };
}

// Right-align table columns whose body cells are all numbers ("1,067", "< 0.01", "31.7%", "45×").
const NUMERIC = /^[<>≈~]?\s*[-−]?[\d.,]+\s*(%|×|°|s|ms)?$/;
function rehypeNumericColumns() {
  return (tree) => walk(tree, (table) => {
    if (table.tagName !== 'table') return;
    const rows = [];
    walk(table, (n) => n.tagName === 'tr' && rows.push(elementsOf(n)));
    const width = Math.max(0, ...rows.map((r) => r.length));
    for (let i = 0; i < width; i++) {
      const values = rows.slice(1).map((r) => r[i] && textOf(r[i]).trim()).filter(Boolean);
      if (values.length && values.every((v) => NUMERIC.test(v))) rows.forEach((r) => r[i] && addClass(r[i], 'num'));
    }
  });
}

const SECTION_CLASS = {
  abstract: 'post-abstract',
  references: 'post-references',
  'a-note-on-ai-tools': 'post-note',
};

// Wrap each h2 and everything after it in a <section>, give h2/h3 ids for the
// table of contents, and drop the --- rules that separate sections.
function rehypeSections() {
  return (tree) => {
    const out = [];
    const seen = {};
    let section = null;
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'hr') continue;
      if (node.type === 'element' && /^h[23]$/.test(node.tagName)) {
        let id = slugify(textOf(node));
        seen[id] = (seen[id] || 0) + 1;
        if (seen[id] > 1) id += `-${seen[id]}`;
        node.properties.id = id;
        if (node.tagName === 'h2') {
          section = {
            type: 'element',
            tagName: 'section',
            properties: { className: ['post-section', SECTION_CLASS[id]].filter(Boolean) },
            children: [],
          };
          out.push(section);
        }
      }
      (section ? section.children : out).push(node);
    }
    tree.children = out;
  };
}

const remarkPlugins = [remarkGfm, remarkMath];

// "> **[Video 2: ACT rollout]**" -> { kind: 'Video', label: 'Video 2: ACT rollout' }
function placeholderOf(p) {
  const kids = elementsOf(p);
  if (p.tagName !== 'p' || hasText(p) || kids.length !== 1 || kids[0].tagName !== 'strong') return null;
  const m = /^\[((Video|Figure)\b[^\]]*)\]$/.exec(textOf(kids[0]).trim());
  return m && { label: m[1], kind: m[2] };
}

function MediaPlaceholder({ kind, label }) {
  const Icon = kind === 'Video' ? FiVideo : FiImage;
  const colon = label.indexOf(':');
  return (
    <figure className="media-placeholder">
      <div className="media-placeholder-box" aria-hidden="true">
        <Icon />
        <span>{kind} placeholder</span>
      </div>
      <figcaption>
        {colon > 0 ? (
          <>
            <strong>{label.slice(0, colon + 1)}</strong>
            {label.slice(colon + 1)}
          </>
        ) : (
          <strong>{label}</strong>
        )}
      </figcaption>
    </figure>
  );
}

// Relative media paths resolve against the posts folder, like links in the Markdown file itself.
const mediaUrl = (src) =>
  /^([a-z]+:|\/)/i.test(src) ? src : `${process.env.PUBLIC_URL}/blog/posts/${src.replace(/^\.\//, '')}`;

const Markdown = ({ children, publishedSlugs, wideFigures }) => {
  const rehypePlugins = useMemo(
    () => [rehypeKatex, rehypeHighlight, [rehypeFigures, { wide: wideFigures }], rehypeSections, rehypeNumericColumns],
    [wideFigures]
  );

  const components = useMemo(() => ({
    img({ node, src = '', alt = '', title }) {
      const url = mediaUrl(src);
      if (/\.(mp4|webm)$/i.test(src)) {
        // ![alt](clip.mp4 "loop") plays like a GIF: muted, looping, autoplay unless the reader prefers reduced motion.
        const gif = title === 'loop' && { loop: true, muted: true, autoPlay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches };
        return <video src={`${url}#t=0.1`} controls playsInline preload="metadata" aria-label={alt} {...gif} />; // #t: show a first frame before play
      }
      return (
        <a className="figure-link" href={url} target="_blank" rel="noopener noreferrer" title="Open full size">
          <img src={url} alt={alt} loading="lazy" decoding="async" />
        </a>
      );
    },
    a({ node, href = '', children, ...props }) {
      const crossLink = /^\.\/([\w-]+)$/.exec(href);
      if (crossLink) {
        return publishedSlugs.includes(crossLink[1])
          ? <Link to={`/blog/${crossLink[1]}`}>{children}</Link>
          : <span className="post-link-pending" title="Not published yet">{children}</span>;
      }
      if (/^https?:/.test(href)) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
      }
      return <a href={href} {...props}>{children}</a>;
    },
    blockquote({ node, children, ...props }) {
      const items = elementsOf(node).map(placeholderOf);
      if (!items.length || items.some((item) => !item)) return <blockquote {...props}>{children}</blockquote>;
      return <>{items.map((item) => <MediaPlaceholder key={item.label} {...item} />)}</>;
    },
    table({ node, ...props }) {
      return (
        <div className="table-wrap" role="region" aria-label="Table" tabIndex={0}>
          <table {...props} />
        </div>
      );
    },
  }), [publishedSlugs]);

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
      skipHtml
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
