'use client';

import { track } from '@/lib/track';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
}

interface ContactCardProps {
  items: ContactItem[];
  /** Vendor + category for the contact CTA click event (Phase 2.2). */
  vendorName?: string;
  vendorCategory?: string;
}

/** Derive a stable method from the href — used as the GA4 `method` param. */
function methodFromHref(href: string): string {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  if (/wa\.me|whatsapp/i.test(href)) return 'whatsapp';
  if (href.startsWith('http://') || href.startsWith('https://')) return 'website';
  return 'other';
}

export default function ContactCard({ items, vendorName, vendorCategory }: ContactCardProps) {
  if (items.length === 0) {
    return (
      <div className="p-6 bg-brass/[0.07] border border-brass/30 rounded-xl text-center">
        <span className="material-symbols-outlined text-brass-deep text-3xl mb-2">
          info
        </span>
        <p className="text-ink/70 text-sm">
          Contact information not available
        </p>
      </div>
    );
  }

  const handleContactClick = (item: ContactItem) => {
    track('contact_click', {
      vendor_name: vendorName || undefined,
      vendor_category: vendorCategory || undefined,
      method: methodFromHref(item.href),
    });
    // Let the native link / tel: / mailto: / wa.me navigation proceed.
    // No preventDefault — we want the dialer, mail app, or WhatsApp to open.
  };

  return (
    <div className="border border-ink/10 rounded-xl p-6">
      <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">contact_phone</span>
        Contact Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => handleContactClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] ${item.color}`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink/50">{item.label}</div>
              <div className="text-sm font-medium truncate">{item.value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
