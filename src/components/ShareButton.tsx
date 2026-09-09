'use client';

import { useState } from 'react';

interface ShareButtonProps {
  vendorName: string;
  vendorUrl: string;
}

export default function ShareButton({ vendorName, vendorUrl }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out ${vendorName} on EasyFinder UAE`;
  const fullUrl = typeof window !== 'undefined' ? window.location.origin + vendorUrl : vendorUrl;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`${shareText}\n${fullUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink bg-white border border-ink/10 rounded-lg hover:bg-bone transition-colors"
        title="Copy link"
      >
        <span className="material-symbols-outlined text-base">
          {copied ? 'check' : 'link'}
        </span>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <button
        onClick={handleShareWhatsApp}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-verified bg-verified-soft border border-verified/30 rounded-lg hover:bg-verified/20 transition-colors"
        title="Share on WhatsApp"
      >
        <span className="material-symbols-outlined text-base">share</span>
        Share
      </button>
    </div>
  );
}