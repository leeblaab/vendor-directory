import Link from 'next/link';

const REASONS = [
  ['Identity', 'Business name, trade licence, and emirate base — checked before publish.'],
  ['Reach', 'Live phone and WhatsApp on every listing, both tested by hand.'],
  ['Proof', 'Real Google reviews. No synthetic ratings, ever.'],
  ['Refresh', 'Every verified listing re-checked every 30 days.'],
];

export default function TrustEngine() {
  return (
    <section className="bg-bone" aria-label="Why EasyFinder">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-16 md:py-24">
        <div className="grid gap-5 lg:grid-cols-[1.08fr_1fr]">
          {/* ——— Left: why + stats + CTAs (on white over bone) ——— */}
          <div className="rounded-3xl border border-border-soft bg-white p-7 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
              Why EasyFinder — 03
            </p>
            <div className="mt-3 h-px w-16" style={{ background: 'var(--color-brass)' }} />
            <h2
              className="mt-6 text-2xl leading-tight tracking-[-0.01em] text-ink sm:text-3xl md:text-[2.5rem]"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              Trust, in numbers — <span className="text-brass-deep">and in proof.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
              We don&rsquo;t just list. We vet, verify, and keep only the pros who actually
              answer the phone for you.
            </p>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                ['60', 'real categories', 'every one live'],
                ['17k+', 'verified vendors', 'contact-checked'],
                ['4.5★', 'our Elite floor', 'rating + reviews'],
                ['7', 'Emirates covered', 'UAE nationwide'],
              ].map(([n, label, sub]) => (
                <li key={label} className="border-t border-border-soft pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-2xl font-medium text-ink">{n}</span>
                    <span className="text-right">
                      <span className="block text-sm text-text-muted">{label}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-faint">
                        {sub}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/vendors"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-ink-soft"
              >
                Browse all pros
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-border-soft px-6 py-3.5 text-sm text-text-muted transition-colors hover:border-ink hover:text-ink"
              >
                Add your business →
              </Link>
            </div>
          </div>

          {/* ——— Right: what verified means (ink + brass) ——— */}
          <div className="rounded-3xl bg-ink p-7 text-white sm:p-10">
            <span className="block text-5xl leading-none" aria-hidden="true">✓</span>
            <h3
              className="mt-6 text-2xl leading-tight sm:text-3xl"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              What <span className="text-brass-soft">“Verified”</span> actually means
            </h3>
            <ul className="mt-7 grid gap-4 text-sm">
              {REASONS.map(([h, d]) => (
                <li
                  key={h}
                  className="grid grid-cols-[88px_1fr] gap-4 border-b border-ink-edge pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="self-start pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brass-soft/70">
                    {h}
                  </span>
                  <p className="text-white/75">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
