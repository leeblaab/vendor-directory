'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { Hub } from '@/lib/hub-data';
import { slugLabel } from '@/lib/hub-data';

const CHEVRON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Desktop + tablet: 3x2 hover-expand card grid. */
function HubCard({ hub }: { hub: Hub }) {
  const all = [...hub.slugPreview, ...hub.moreSlugs];
  return (
    <article
      className="group relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 ease-out hover:border-brass hover:shadow-[0_18px_40px_-18px_rgba(199,154,77,0.35)] sm:p-7"
      style={{ borderColor: 'var(--color-border-soft)' }}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl leading-none" aria-hidden="true">{hub.icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint transition-colors group-hover:text-brass-deep">
          {String(all.length).padStart(2, '0')}
        </span>
      </div>

      <h3
        className="mt-6 text-[1.55rem] leading-tight transition-colors group-hover:text-brass-deep"
        style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
      >
        {hub.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{hub.tagline}</p>

      <div className="mt-6 grid flex-1 grid-cols-2 content-start gap-x-4 gap-y-2">
        {hub.slugPreview.map((slug) => (
          <Link
            key={slug}
            href={`/categories/${slug}`}
            className="flex items-center gap-1.5 truncate text-xs text-text-faint transition-colors hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: 'var(--color-brass)' }}
            />
            <span className="truncate">{slugLabel(slug)}</span>
          </Link>
        ))}
        <Link
          href={`/categories/${all[all.length - 1]}`}
          className="text-xs font-medium text-brass-deep transition-colors hover:text-ink"
          aria-label={`More in ${hub.name}`}
        >
          +{hub.moreSlugs.length} more →
        </Link>
      </div>

      {/* brass underline sweep on hover */}
      <span
        aria-hidden="true"
        className="mt-6 block h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
        style={{ background: 'var(--color-brass)' }}
      />
    </article>
  );
}

/** Mobile: accessible accordion — aria-expanded / aria-controls / labelled panels. */
function HubRow({ hub }: { hub: Hub }) {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const panelId = `hub-${hub.name.toLowerCase().replace(/\s+/g, '-')}-${uid}`;
  const buttonId = `${panelId}-trigger`;
  const all = [...hub.slugPreview, ...hub.moreSlugs];

  return (
    <div className="py-0.5">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-4 py-4 pr-2 text-left"
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bone-dim text-2xl"
            aria-hidden="true"
          >
            {hub.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span
              className="block text-lg leading-snug text-ink"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              {hub.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              {all.length} sub-categories
            </span>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-brass-deep transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          >
            {CHEVRON}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-wrap gap-2 px-1 pb-5">
          {all.map((slug) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className="rounded-full border bg-bone px-3.5 py-2 text-xs text-text-muted active:bg-bone-dim"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              {slugLabel(slug)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HubGrid({ hubs }: { hubs: Hub[] }) {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
              Browse by domain — 01
            </p>
            <div className="mt-3 h-px w-16" style={{ background: 'var(--color-brass)' }} />
            <h2
              className="mt-5 text-3xl tracking-[-0.01em] text-ink sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              Six hubs. <span className="text-brass-deep">Sixty</span> living categories.
            </h2>
          </div>
          <Link
            href="/categories"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-ink"
          >
            All categories
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Desktop / tablet: card grid */}
        <div className="mt-10 hidden gap-4 md:mt-12 md:grid md:grid-cols-3">
          {hubs.map((hub) => (
            <HubCard key={hub.id} hub={hub} />
          ))}
        </div>

        {/* Mobile: accessible accordion */}
        <div
          className="mt-8 divide-y border-y border-border-soft md:hidden"
          role="list"
        >
          {hubs.map((hub) => (
            <HubRow key={hub.id} hub={hub} />
          ))}
        </div>
      </div>
    </section>
  );
}
