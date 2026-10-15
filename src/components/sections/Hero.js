import React from 'react';
import { Link } from 'react-router-dom';
import { RESUME_PATH } from '../../constants/links';

// The three-part FR5 write-up is the main robotics work, so it gets a
// featured block right under the intro.
const FR5_POSTS = [
  { part: 1, slug: 'fr5-part-1-setup-and-data', title: 'Hardware, teleoperation and data' },
  { part: 2, slug: 'fr5-part-2-policies-and-results', title: 'Why pretrained policies failed on our robot, and what fine-tuning fixed' },
  { part: 3, slug: 'fr5-part-3-flow-matching', title: 'Flow matching from scratch' },
];

const FR5_STATS = [
  { value: '1,021', label: 'teleoperated demos' },
  { value: '80%', label: 'sanding (π0, 20 trials)' },
  { value: '65%', label: 'colour sorting (π0, 20 trials)' },
];

// `featured`: the FR5 card only belongs on the home (About) view, not above every section.
const Hero = ({ featured = true }) => {
  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="portfolio-main px-4 md:px-0">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[var(--border-color)] flex-shrink-0">
            <img
              src={process.env.PUBLIC_URL + "/images/profile/profile-photo.jpg"}
              alt="Sreevaatsav B"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/300/300";
              }}
            />
          </div>
          <div>
            <h1 className="page-title text-[var(--text-primary)]">Sreevaatsav Bavana</h1>
            <p className="meta-text mt-1.5">
              Robot Learning · Multimodal AI
            </p>
          </div>
        </div>

        <p className="text-base md:text-[1.05rem] leading-relaxed text-[var(--text-secondary)] max-w-2xl mb-5">
          I work on robot learning, training vision-language-action policies that run on a real
          industrial arm. Before that I worked on multimodal AI and grounded vision-language models.
          Gold medalist, B.Tech in Artificial Intelligence.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/blog"
            className="text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            Read my robotics work →
          </Link>
          <a
            href={RESUME_PATH}
            download="SreevaatsavB_Resume.pdf"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Download CV →
          </a>
        </div>

        {/* Featured robotics work */}
        {featured && <article className="mt-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-subtle)] overflow-hidden">
          <div className="grid md:grid-cols-5">
            <Link to="/blog/fr5-part-2-policies-and-results" className="md:col-span-2 block bg-black/5">
              <img
                src={process.env.PUBLIC_URL + "/blog/posts/figures/part1/task-sanding.jpg"}
                alt="The Fairino FR5 holding a metal block against sandpaper"
                className="w-full h-48 md:h-full object-cover object-[71%_45%]"
                loading="lazy"
              />
            </Link>

            <div className="md:col-span-3 p-5 md:p-6 min-w-0">
              <p className="eyebrow-label mb-2">Featured · Robot learning</p>
              <h2 className="entry-title mb-2">
                <Link to="/blog" className="hover:text-[var(--accent)] transition-colors">
                  Teaching a Fairino FR5 from demonstrations
                </Link>
              </h2>
              <p className="text-[0.93rem] leading-relaxed text-[var(--text-secondary)] mb-4">
                A three-part write-up of training imitation-learning policies on a 6-DOF industrial
                cobot: collecting our own data, tracking down why the first policies failed, and the
                maths behind π0's action generation.
              </p>

              <dl className="grid grid-cols-3 gap-3 mb-5">
                {FR5_STATS.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <dt className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">{s.value}</dt>
                    <dd className="text-xs leading-snug text-[var(--text-muted)]">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <ol className="space-y-1.5 text-sm mb-4">
                {FR5_POSTS.map((p) => (
                  <li key={p.slug} className="flex gap-2">
                    <span className="text-[var(--text-muted)] tabular-nums whitespace-nowrap">Part {p.part}</span>
                    <Link
                      to={`/blog/${p.slug}`}
                      className="text-[var(--accent)] hover:opacity-80 transition-opacity"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ol>

              <p className="text-sm mb-4">
                <a
                  href="https://drive.google.com/file/d/1DdxDHoI8O3pMmKbs-rLw_dxHNOTk3dWV/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:opacity-80 transition-opacity"
                >
                  My handwritten flow-matching notes (PDF) ↗
                </a>
              </p>

              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">Now:</span> collecting
                data for screwing, a custom handheld gripper for data collection is on the way, and
                I'm adapting XR-1 to our datasets.
              </p>
            </div>
          </div>
        </article>}
      </div>
    </section>
  );
};

export default Hero;
