'use client';

import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <main className="bg-bone text-text">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-3xl px-5 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-faint">
            Contact — 01
          </p>
          <div className="mx-auto mt-4 h-px w-16" style={{ background: 'var(--color-brass)' }} />
          <h1
            className="mt-7 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            Say hello.
            <span className="block text-brass-deep">We read everything.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            A question about a listing, a partner idea, or just feedback — one
            email does it all.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Email */}
          <div className="rounded-3xl border border-border-soft bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'var(--color-brass-fog)' }}
            >
              <span aria-hidden="true" className="text-xl text-brass-deep">✉</span>
            </div>
            <h2
              className="mt-6 text-xl text-ink"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              Email us
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              For general inquiries, corrections, or partnerships.
            </p>
            <a
              href="mailto:easyfinderuae@gmail.com"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
            >
              easyfinderuae@gmail.com
              <span aria-hidden="true" className="text-brass-soft">→</span>
            </a>
          </div>

          {/* Submit a business */}
          <div className="rounded-3xl border border-border-soft bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'var(--color-verified-soft)' }}
            >
              <span aria-hidden="true" className="text-xl text-verified">+</span>
            </div>
            <h2
              className="mt-6 text-xl text-ink"
              style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
            >
              Own a business?
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Get listed for free in minutes — most requests are verified
              within two business days.
            </p>
            <Link
              href="/submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-soft px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-bone"
            >
              Submit your vendor
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid gap-3 rounded-3xl border border-border-soft bg-white p-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Not finding a pro?
            </p>
            <Link href="/vendors" className="mt-1.5 inline-block text-sm font-medium text-brass-deep hover:underline">
              Browse all services →
            </Link>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Have a question?
            </p>
            <Link href="/faq" className="mt-1.5 inline-block text-sm font-medium text-brass-deep hover:underline">
              Read the FAQ →
            </Link>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              How we work
            </p>
            <Link href="/about" className="mt-1.5 inline-block text-sm font-medium text-brass-deep hover:underline">
              About EasyFinder →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
