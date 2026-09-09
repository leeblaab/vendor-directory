import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About EasyFinder UAE - Trusted Vendor Directory',
  description:
    'EasyFinder UAE connects you with verified local service providers. Find trusted plumbers, electricians, movers and more across Dubai, Abu Dhabi, and the UAE.',
  keywords: 'about EasyFinder, UAE vendor directory, trusted service providers',
};

const PILLARS = [
  {
    tag: '01 · Verify',
    title: 'We check before we publish',
    body: 'Business name, trade licence and emirate base — verified by hand before a single listing goes live. If it doesn’t check out, it isn’t listed.',
  },
  {
    tag: '02 · Reach',
    title: 'Real numbers, not dead ends',
    body: 'Every listing carries a phone and a WhatsApp that a human actually answers. We test the contact details — we don’t just scrape them.',
  },
  {
    tag: '03 · Refresh',
    title: 'Fresh, every 30 days',
    body: 'Local service providers change. We re-verify every listing on a 30-day cycle so the directory stays honest, not just archived.',
  },
];

const FEATURES = [
  'Verified providers',
  '10k+ listings',
  'Direct WhatsApp',
  '60 categories',
  'Reviews & ratings',
  'Mobile built-in',
  '7 Emirates',
  'Hand-checked',
  'No synthetic data',
];

export default function AboutPage() {
  return (
    <main className="bg-bone text-text">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--color-brass), transparent)',
          }}
        />
        <div className="mx-auto max-w-3xl px-5 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-faint">
            About the platform — 01
          </p>
          <div className="mx-auto mt-4 h-px w-16" style={{ background: 'var(--color-brass)' }} />
          <h1
            className="mt-7 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            A directory people
            <span className="text-brass-deep"> actually reach</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            EasyFinder UAE exists for one reason: finding a local pro you can
            trust shouldn’t be a lottery. We hand-check plumbers, electricians,
            cleaners and every service in between — then put a working phone
            number in front of you to call or WhatsApp them directly.
          </p>
        </div>
      </section>

      {/* Main: info card + story */}
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: profile card (sticky) */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl border border-border-soft bg-white p-8 lg:sticky lg:top-24">
              <div className="flex justify-center">
                <div className="h-36 w-36 overflow-hidden rounded-2xl border border-border-soft bg-bone">
                  <Image
                    src="/logo.png"
                    alt="EasyFinder UAE logo"
                    width={144}
                    height={144}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>
              <h2
                className="mt-5 text-center text-2xl text-ink"
                style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
              >
                EasyFinder UAE
              </h2>
              <p className="mt-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint">
                Verified local services
              </p>

              <dl className="mt-7 space-y-3 text-sm">
                {[
                  ['Region', 'United Arab Emirates'],
                  ['Type', 'Vendor directory'],
                  ['Coverage', '7 Emirates'],
                  ['Status', 'Active'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-t border-border-soft pt-3"
                  >
                    <dt className="text-text-faint">{k}</dt>
                    <dd className="font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right: story + values */}
          <div className="space-y-8 lg:col-span-2">
            {/* Mission */}
            <section className="rounded-3xl border border-border-soft bg-white p-7 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
                Mission
              </p>
              <div className="mt-3 h-px w-16" style={{ background: 'var(--color-brass)' }} />
              <h2
                className="mt-6 text-2xl leading-tight text-ink sm:text-3xl"
                style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
              >
                Find the right help, the first time.
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted sm:text-[15px]">
                We build a directory the way we’d want to use one — small,
                verified, and honest. No paid placements hiding the good pros,
                no fake 5-star walls. Just real companies, real reviews, and a
                number that works.
              </p>
            </section>

            {/* Pillars */}
            <div className="grid gap-5 sm:grid-cols-3">
              {PILLARS.map((p) => (
                <div
                  key={p.tag}
                  className="rounded-3xl border border-border-soft bg-white p-6 transition-colors hover:border-brass-soft"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                    {p.tag}
                  </p>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <section className="rounded-3xl border border-border-soft bg-white p-7 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-faint">
                What you get
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 rounded-xl border border-border-soft bg-bone/60 px-3.5 py-3 text-[13px] font-medium text-text"
                  >
                    <span aria-hidden="true" className="text-brass-deep">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact CTA */}
            <section className="rounded-3xl bg-ink p-7 text-white sm:p-10">
              <h2
                className="text-2xl leading-tight sm:text-3xl"
                style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
              >
                A question about the platform?
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                We read every message. Drop a line and a real person will get
                back to you.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="mailto:easyfinderuae@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-soft"
                >
                  <span aria-hidden="true">✉</span>
                  easyfinderuae@gmail.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-white/90 transition-colors hover:border-brass-soft hover:text-brass-soft"
                >
                  Contact page →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
