'use client';

import SearchBar from '@/components/SearchBar';

const TRUST_CHIPS = [
  { dot: 'var(--color-verified)', label: '100% verified providers' },
  { dot: 'var(--color-brass)', label: 'Real phone & WhatsApp' },
  { dot: 'rgba(255,255,255,.55)', label: 'Live Google reviews' },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%)' }}
    >
      {/* faint brass radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(820px 520px at 50% -12%, rgba(199,154,77,0.16), transparent 70%)' }}
      />
      {/* subtle diagonal texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 24px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:py-24 md:py-32">
        {/* verified pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ borderColor: 'rgba(199,154,77,.45)', background: 'rgba(199,154,77,.10)', color: 'var(--color-brass-soft)' }}
        >
          <span aria-hidden="true">✓</span> EasyFinder verified directory
        </div>

        {/* stat strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
          <span>
            <b className="font-medium" style={{ color: 'var(--color-brass-soft)' }}>17,000+</b> verified pros
          </span>
          <span aria-hidden="true">/</span>
          <span>
            <b className="font-medium" style={{ color: 'var(--color-brass-soft)' }}>60</b> real categories
          </span>
          <span aria-hidden="true">/</span>
          <span>7 Emirates</span>
        </div>

        {/* headline */}
        <h1
          className="mx-auto mt-7 max-w-3xl text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
        >
          Find Trusted, <span style={{ color: 'var(--color-brass-soft)' }}>Verified</span>
          <br />
          Pros in the UAE
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base font-light text-white/70 sm:text-lg">
          Every provider on EasyFinder is human-verified, locally based, and contact-ready by
          phone or WhatsApp. No guesswork. No spam.
        </p>

        {/* search */}
        <div className="mx-auto mt-10 max-w-2xl sm:mt-12">
          <SearchBar />
        </div>

        {/* trust chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-white/55">
          {TRUST_CHIPS.map((chip) => (
            <span key={chip.label} className="relative flex items-center">
              <span
                aria-hidden="true"
                className="absolute -left-3.5 h-1.5 w-1.5 rounded-full"
                style={{ background: chip.dot }}
              />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
