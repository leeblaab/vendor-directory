'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    category: 'General',
    items: [
      {
        question: "What is EasyFinder UAE?",
        answer: "EasyFinder UAE is a directory that connects customers with trusted local service providers across the UAE. From plumbers and electricians to wedding planners and IT support, we help you find reliable professionals for all your service needs.",
      },
      {
        question: "How does EasyFinder UAE work?",
        answer: "Browse a category, search for a service, or filter by emirate — then call or WhatsApp the provider directly. Every listed provider is verified so you're reaching a real business, not a dead number.",
      },
      {
        question: "Is EasyFinder UAE free to use?",
        answer: "Yes — browsing listings and contacting providers is completely free for customers.",
      },
    ],
  },
  {
    category: 'For customers',
    items: [
      {
        question: "How do I find a service provider?",
        answer: "Use the search bar, browse a category, or filter by emirate. Each profile carries contact details, ratings, and customer reviews so you can compare before you call.",
      },
      {
        question: "Can I leave reviews for providers?",
        answer: "Yes. After a service, sign in and leave a rating and review — your feedback is what keeps the whole directory honest for the next person.",
      },
      {
        question: "What if a number isn't working?",
        answer: "Let us know by email — we re-check contact details and act on anything that's genuinely broken. Your report is how we keep listings current.",
      },
    ],
  },
  {
    category: "For service providers",
    items: [
      {
        question: "How do I list my business on EasyFinder UAE?",
        answer: "Use the 'Submit a business' form. Our team reviews the submission, verifies the details, and your listing goes live once it checks out.",
      },
      {
        question: "What information do I need to provide?",
        answer: "Business name, a working phone and WhatsApp, the emirates you serve, and a short description of what you do. Clear contact details are the most important part — they're what customers use to hire you.",
      },
      {
        question: "How quickly does a listing go live?",
        answer: "Most submissions are verified within two business days. You'll be contacted if anything is missing or needs a quick correction.",
      },
    ],
  },
  {
    category: 'Trust & verification',
    items: [
      {
        question: "Are the providers verified?",
        answer: "We check business name, trade and emirate base before a listing is published, and we re-verify on a rolling schedule. The 'Verified' badge marks a provider that has passed that check.",
      },
      {
        question: "How do ratings and reviews work?",
        answer: "Ratings come from reviews left by people who actually used the service on our platform — they're never imported from elsewhere, so what you see is specific to EasyFinder.",
      },
      {
        question: "Is my information shared with providers?",
        answer: "No. Contacting a provider is direct and private — we don't sell or broker your personal data.",
      },
    ],
  },
];

const FACTS = [
  { stat: '13,000+', label: 'Verified listings' },
  { stat: '60', label: 'Service categories' },
  { stat: '7', label: 'Emirates covered' },
  { stat: '30-day', label: 'Re-check cycle' },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  let global = 0;

  return (
    <main className="bg-bone text-text">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-3xl px-5 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-faint">
            FAQ — 01
          </p>
          <div className="mx-auto mt-4 h-px w-16" style={{ background: 'var(--color-brass)' }} />
          <h1
            className="mt-7 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            Straight answers,
            <span className="block text-brass-deep">no fine print.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            The things people ask before they hire, listed in plain words.
          </p>
        </div>
      </section>

      {/* Facts strip */}
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-border-soft bg-white px-5 py-5 text-center"
            >
              <p
                className="text-2xl tracking-tight text-ink"
                style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
              >
                {f.stat}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-14">
        <div className="space-y-10">
          {FAQS.map((group, catIndex) => (
            <div key={group.category}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] text-ink"
                  style={{ background: 'var(--color-brass-fog)' }}
                >
                  {String(catIndex + 1).padStart(2, '0')}
                </span>
                <h2
                  className="text-xl text-ink"
                  style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
                >
                  {group.category}
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {group.items.map((faq) => {
                  const idx = global++;
                  const open = openIndex === idx;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-border-soft bg-white transition-colors"
                    >
                      <button
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-bone/50 sm:p-6"
                        onClick={() => toggle(idx)}
                        aria-expanded={open}
                      >
                        <span className="text-sm font-medium leading-snug text-ink sm:text-base">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-sm transition-transform duration-300 ${open ? 'rotate-45 border-brass text-brass-deep' : 'border-border-soft text-text-faint'}`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="border-t border-border-soft px-5 py-5 text-sm leading-relaxed text-text-muted sm:px-6">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-ink p-7 text-white sm:p-10">
          <h2
            className="text-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            Still looking for an answer?
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
            Ask us directly — a real person reads every message.
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
        </div>
      </div>
    </main>
  );
}
