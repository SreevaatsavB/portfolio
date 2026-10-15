# Blog

The blog lives at `/#/blog` (for example https://sreevaatsavb.github.io/portfolio/#/blog).
Routing uses `HashRouter`, so deep links work on GitHub Pages without a 404 page.

## Where things live

| path | what |
|---|---|
| `public/blog/posts/*.md` | Post sources (Markdown + YAML frontmatter). These are what the site loads. |
| `src/content/blogPosts.js` | Manifest: which files are published, their slugs, order and wide figures. Also the planned length of each series (missing parts show as "Coming soon"). |
| `public/blog/posts/figures/` | Images and videos, referenced from the Markdown with paths relative to `public/blog/posts/` (e.g. `figures/part3/p03.jpg`). |
| `src/blog/` | Blog code: `Blog.js` (layout and routes), `BlogIndex.js`, `BlogPost.js`, `Markdown.js` (renderer), `posts.js` (loading, frontmatter), `blog.css`. |

`blog-drafts/` is local only (excluded from git). Copy a post into `public/blog/posts/` to publish it.

## Adding a post

1. Put the Markdown file in `public/blog/posts/`, with frontmatter like:

   ```yaml
   ---
   title: "My post"
   slug: my-post
   series: "Imitation Learning on a Fairino FR5"   # optional
   part: 4                                          # optional, order within the series
   author: Sreevaatsav B
   date: 2026-11-02                                 # a date containing XX shows as "Draft"
   tags: [robotics, notes]
   summary: "One or two sentences for the index page."
   ---
   ```

2. Add it to `BLOG_POSTS` in `src/content/blogPosts.js`. The `slug` there must match the frontmatter slug.
   If it starts a new series, you can add the planned number of parts to `SERIES_LENGTH`.
3. Run `npm start` and open `http://localhost:3000/portfolio/#/blog/<slug>`.

Writing notes:

- A leading `# Title` line and a bold author line under it (`**Name** · with ...`) become the post header.
- `## Abstract`, `## A note on AI tools` and `## References` get their own styling, matched by heading text.
- Maths: `$...$` inline, `$$...$$` on their own lines for display (KaTeX).
- Link to another post with `./<slug>`. If that slug isn't in the manifest yet, the link text shows as plain text until it is published.
- `<!-- comments -->` are kept in the file but never rendered.
- Fenced code blocks with a language (```` ```python ````) get syntax highlighting.

## Figures

Write an image on its own line, with an optional italic caption on the next line:

```markdown
![Control-volume derivation of the continuity equation](figures/part3/p03-continuity-control-volume.jpg)
*Figure 1. Deriving the continuity equation (my notes, p. 3).*
```

The pair renders as one `<figure>` with a `<figcaption>`. Paths are relative to `public/blog/posts/`.
Put two or more image lines directly above one caption to show them side by side (they stack on phones and break out to 900px on desktop).
Images sit on a white card in both themes and open full size in a new tab when clicked.
To let a wide plot break out to 900px on desktop, add its file name to that post's `wideFigures` in `src/content/blogPosts.js`.

Videos work the same way: an `.mp4` or `.webm` path renders as a video player with controls.
Add the title `"loop"` (`![alt](figures/part2/clip.mp4 "loop")`) to make it play like a GIF: muted, looping and autoplaying (except for readers who prefer reduced motion).
`wideFigures` works for videos too.
Keep videos small (H.264 MP4, a few MB) since they are served from GitHub Pages.

## Replacing a media placeholder

Placeholders are blockquotes like:

```markdown
> **[Video 2: ACT rollout, closing the gripper in mid-air]**
```

Put the file under `public/blog/posts/figures/` and replace the blockquote with an image line plus caption, as above:

```markdown
![ACT rollout on the FR5](figures/part2/act-rollout.mp4)
*Video 2: ACT rollout, closing the gripper in mid-air*
```
