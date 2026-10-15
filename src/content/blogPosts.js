// Published blog posts. Each file lives in public/blog/posts/ and its slug
// must match the `slug` in the file's frontmatter. `wideFigures` lists image or video
// files that may break out wider than the text column. See docs/blog.md.
export const BLOG_POSTS = [
  { file: '01-setup-and-data.md', slug: 'fr5-part-1-setup-and-data', order: 1 },
  {
    file: '02-policies-and-results.md',
    slug: 'fr5-part-2-policies-and-results',
    order: 2,
    wideFigures: ['pi0-sanding-joint-predictions.mp4', 'colour-sorting-gripper-waits.png', 'colour-sorting-six-trials.mp4'],
  },
  {
    file: '03-flow-matching.md',
    slug: 'fr5-part-3-flow-matching',
    order: 3,
    wideFigures: ['exp-moons-euler-steps.jpg', 'exp-mnist-euler-steps.jpg', 'exp-fm-vs-rectified-mnist.jpg'],
  },
];

// Planned number of parts per series, for "Part 2 of 3" labels.
// Series not listed here fall back to the number of published parts.
export const SERIES_LENGTH = {
  'Imitation Learning on a Fairino FR5': 3,
};
