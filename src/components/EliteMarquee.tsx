import Link from 'next/link';
import type { Category, Vendor } from '@/lib/directus';

type EliteVendor = Vendor & { category?: Category };

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5 text-brass-soft">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < Math.round(rating) ? '' : 'opacity-30'}>★</span>
      ))}
    </span>
  );
}

function EliteCard({ v }: { v: EliteVendor }) {
  const category =
    v.category && typeof v.category === 'object' ? v.category.name : null;

  return (
    <Link
      href={`/vendors/${v.slug}`}
      className="group block w-[272px] shrink-0 rounded-2xl border bg-ink-soft p-6 transition-colors duration-300 hover:border-brass-soft/60"
      style={{ borderColor: 'var(--color-ink-edge)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="truncate text-xl text-white"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            {v.name}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            {category ?? 'UAE'}
          </p>
        </div>
        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] text-brass-soft"
          style={{ borderColor: 'rgba(226,183,102,.4)', background: 'rgba(199,154,77,.10)' }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6.5 4.8 9.3 10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Elite
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-medium tracking-tight text-brass-soft">
          {(v.google_review_rating ?? 0).toFixed(1)}
        </span>
        <Stars rating={v.google_review_rating ?? 0} />
        <span className="text-xs text-white/45">({v.google_review_count ?? 0})</span>
      </div>

      <div
        className="mt-5 flex items-center justify-between border-t pt-4"
        style={{ borderColor: 'var(--color-ink-edge)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
          Verified
        </span>
        <span className="text-xs font-medium text-brass-soft/80 transition-colors group-hover:text-brass-soft">
          View profile →
        </span>
      </div>
    </Link>
  );
}

export default function EliteMarquee({ vendors }: { vendors: EliteVendor[] }) {
  // Encouraging fallback (per design brief) — rail always renders, never an error state.
  if (vendors.length === 0) {
    return (
      <section className="bg-ink text-bone" aria-label="Verified Elite">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:py-20 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass-soft/70">
            The top tier — 02
          </p>
          <h2
            className="mt-5 text-3xl text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            The <span className="text-brass-soft">Verified Elite</span>
          </h2>
          <p className="mt-4 text-sm text-brass/80">
            <Link href="/vendors" className="underline underline-offset-4 hover:text-white">
              Elite vendors coming soon — verified pros with 4.5+ ratings.
            </Link>
          </p>
        </div>
      </section>
    );
  }

  /* Seamless CSS marquee: duplicate the set once, translate -50%. */
  const loop = [...vendors, ...vendors];

  return (
    <section className="relative overflow-hidden bg-ink text-bone" aria-label="Verified Elite">
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:pt-16 md:pt-20">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass-soft/70">
              The top tier — 02
            </p>
            <div className="mt-3 h-px w-16" style={{ background: 'rgba(226,183,102,.55)' }} />
            <h2
              className="mt-5 text-3xl tracking-[-0.01em] text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              The <span className="text-brass-soft">Verified Elite</span>
            </h2>
            <p className="mt-3 font-mono text-[11px] tracking-wide text-white/45">
              verified = true · rating ≥ 4.5 · ≥ 5 Google reviews
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: natural horizontal scroll (touch). Desktop: CSS marquee loop. */}
      <div className="px-3 py-10 md:py-0 [mask-image:linear-gradient(90deg,transparent,black_3%,black_97%,transparent)]">
        <ul
          className="ef-marquee-track flex w-max"
          aria-label="Elite vendors, scrolling"
        >
          {loop.map((v, i) => (
            <li key={i} className="pr-4 last:pr-0">
              <EliteCard v={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
