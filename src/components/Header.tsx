'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setIsMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '?';
    const first = user.first_name?.charAt(0) || '';
    const last = user.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/vendors', label: 'Browse Services' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ];

  // Helper to check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* ============ LEFT: LOGO ============ */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="h-9 w-auto flex-shrink-0 overflow-hidden rounded-lg border border-border-soft bg-white group-hover:border-brass-soft transition-colors">
              <Image
                src="/logo.png"
                alt="EasyFinder UAE Logo"
                width={160}
                height={160}
                className="h-9 w-auto"
                priority
              />
            </div>
            <div className="hidden sm:block leading-none">
              <div
                className="text-[17px] font-medium tracking-tight text-ink"
                style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
              >
                EasyFinder
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-text-faint">
                UAE
              </div>
            </div>
          </Link>

          {/* ============ CENTER: NAV LINKS (Desktop) ============ */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'font-medium text-ink'
                    : 'text-text-muted hover:bg-bone hover:text-ink'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full"
                    style={{ background: 'var(--color-brass)' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ============ RIGHT: AUTH + MOBILE MENU ============ */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Add business CTA — always visible (logged in or out) */}
            <Link
              href="/submit"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-bone"
            >
              <span aria-hidden="true" className="text-brass-deep">+</span>
              <span>Add business</span>
            </Link>

            {isLoading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-bone" aria-hidden="true" />
            ) : !isAuthenticated ? (
              <>
                {/* Sign in (desktop, ghost) */}
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-bone hover:text-ink"
                >
                  Sign In
                </Link>
                {/* Register (primary) */}
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-soft sm:px-5 sm:py-2.5"
                >
                  <span aria-hidden="true" className="text-brass-soft">+</span>
                  <span className="hidden sm:inline">Register</span>
                  <span className="sm:hidden">Sign Up</span>
                </Link>
              </>
            ) : user ? (
              <>
                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-1.5 transition-colors sm:pr-3 ${
                      isMenuOpen ? 'bg-bone' : 'hover:bg-bone'
                    }`}
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-semibold text-brass-soft">
                      {getUserInitials()}
                    </span>
                    <span className="hidden sm:block max-w-[140px] truncate text-sm font-medium text-ink">
                      {user.first_name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden sm:inline-block text-text-faint transition-transform ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-xl shadow-ink/10">
                      <div className="border-b border-border-soft px-4 py-3">
                        <div className="truncate text-sm font-medium text-ink">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="truncate text-xs text-text-faint">{user.email}</div>
                      </div>
                      <div className="py-1.5">
                        <Link
                          href="/submit"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-bone hover:text-ink"
                        >
                          <span aria-hidden="true" className="text-brass-deep">↑</span>
                          Submit a vendor
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-bone hover:text-ink"
                        >
                          <span aria-hidden="true">◍</span>
                          My account
                        </Link>
                      </div>
                      <div className="border-t border-border-soft">
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full px-4 py-2.5 text-left text-sm text-brass-deep transition-colors hover:bg-bone disabled:opacity-50"
                        >
                          {isLoggingOut ? 'Signing out…' : 'Sign out'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            {/* Mobile Menu Button */}
            <div className="lg:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-bone"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span aria-hidden="true">{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>

              {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-16 border-b border-border-soft bg-white shadow-lg">
                  <nav className="mx-auto max-w-7xl space-y-0.5 px-4 py-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-colors ${
                          isActive(link.href)
                            ? 'bg-bone font-medium text-ink'
                            : 'text-text-muted hover:bg-bone hover:text-ink'
                        }`}
                      >
                        {link.label}
                        {isActive(link.href) && <span aria-hidden="true" className="text-brass-deep">→</span>}
                      </Link>
                    ))}

                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] text-brass-deep transition-colors hover:bg-bone disabled:opacity-50"
                      >
                        {isLoggingOut ? 'Signing out…' : 'Sign out'}
                      </button>
                    ) : (
                      <div className="mt-2 flex gap-2 border-t border-border-soft pt-4">
                        <Link
                          href="/login"
                          className="flex-1 rounded-full border border-border-soft px-4 py-2.5 text-center text-sm font-medium text-text-muted transition-colors hover:border-ink hover:text-ink"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-ink-soft"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
