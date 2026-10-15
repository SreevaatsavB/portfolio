import { useEffect, useState } from 'react';
import { BLOG_POSTS } from '../content/blogPosts';

const unquote = (s) => (/^(["']).*\1$/.test(s) ? s.slice(1, -1) : s);

// Minimal YAML frontmatter: `key: value`, quoted strings and `[a, b]` lists.
export function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const value = kv[2].trim();
    data[kv[1]] = value.startsWith('[') && value.endsWith(']')
      ? value.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter(Boolean)
      : unquote(value);
  }
  return { data, body: text.slice(match[0].length) };
}

// The post header is rendered from the leading "# Title" line and the bold
// author line under it, so pull those out of the body (and the rule after them).
function splitHeader(body) {
  let rest = body.replace(/^\s+/, '');
  let title = null;
  let byline = null;
  const h1 = /^# (.+)\n+/.exec(rest);
  if (h1) {
    title = h1[1].trim();
    rest = rest.slice(h1[0].length);
    const by = /^(\*\*.+)\n+/.exec(rest);
    if (by) {
      byline = by[1];
      rest = rest.slice(by[0].length);
    }
  }
  return { title, byline, content: rest.replace(/^---[ \t]*\n/, '') };
}

export const slugify = (text) =>
  text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

// "2026-10-15" -> "15 October 2026"; a date with XX in it isn't final yet -> "Draft".
export function formatDate(date) {
  if (/XX/i.test(date || '')) return 'Draft';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || '');
  if (!m) return date || '';
  const month = new Date(Date.UTC(+m[1], +m[2] - 1, 1))
    .toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
  return `${+m[3]} ${month} ${m[1]}`;
}

async function loadPost(entry) {
  const res = await fetch(`${process.env.PUBLIC_URL}/blog/posts/${entry.file}`);
  if (!res.ok) throw new Error(`Could not load ${entry.file} (${res.status})`);
  const { data, body } = parseFrontmatter(await res.text());
  const { title, byline, content } = splitHeader(body);
  return {
    ...data,
    file: entry.file,
    order: entry.order,
    slug: data.slug || entry.slug,
    part: Number(data.part) || null,
    wideFigures: entry.wideFigures || [],
    title: title || data.title,
    byline,
    content,
  };
}

let allPosts = null;

function loadPosts() {
  if (!allPosts) {
    allPosts = Promise.all(BLOG_POSTS.map(loadPost))
      .then((list) => list.sort((a, b) => a.order - b.order))
      .catch((error) => {
        allPosts = null;
        throw error;
      });
  }
  return allPosts;
}

export function usePosts() {
  const [state, setState] = useState({});
  useEffect(() => {
    let live = true;
    loadPosts().then(
      (list) => live && setState({ list }),
      (error) => live && setState({ error })
    );
    return () => {
      live = false;
    };
  }, []);
  return state;
}
