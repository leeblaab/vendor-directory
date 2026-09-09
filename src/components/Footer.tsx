import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/vendors', label: 'Browse Services' },
  { href: '/categories', label: 'Categories' },
  { href: '/submit', label: 'Add Your Business' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const SERVICES = [
  { href: '/vendors?category=plumbing', label: 'Plumbing' },
  { href: '/vendors?category=electrical-services', label: 'Electrical' },
  { href: '/vendors?category=ac-repair', label: 'AC Repair' },
  { href: '/vendors?category=cleaning-services', label: 'Cleaning' },
  { href: '/vendors?category=car-repair', label: 'Car Repair' },
  { href: '/vendors?category=interior-design', label: 'Interior Design' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto overflow-hidden rounded-lg border border-ink-edge bg-white p-0.5">
                <Image
                  src="/logo.png"
                  alt="EasyFinder UAE"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div>
                <div
                  className="text-lg leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
                >
                  EasyFinder
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-brass-soft/70">
                  UAE
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              The UAE&rsquo;s hand-checked directory of local service providers —
              plumbers, electricians, AC technicians, cleaners and every pro in
              between.
            </p>
            <a
              href="mailto:easyfinderuae@gmail.com"
              className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-brass-soft underline-offset-4 hover:text-brass hover:underline"
            >
              <span aria-hidden="true">✉</span>
              easyfinderuae@gmail.com
            </a>
          </div>

          {/* Site */}
          <nav aria-label="Footer">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass-soft/70">
              Site
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/70 transition-colors hover:text-brass-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular */}
          <nav aria-label="Popular services">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass-soft/70">
              Popular services
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/70 transition-colors hover:text-brass-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-ink-edge">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} EasyFinder UAE — All rights reserved</span>
          <span>Made in the UAE</span>
        </div>
      </div>
    </footer>
  );
}
