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
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Copy link"
      >
        <span className="material-symbols-outlined text-base">
          {copied ? 'check' : 'link'}
        </span>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <button
        onClick={handleShareWhatsApp}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
        title="Share on WhatsApp"
      >
        <span className="material-symbols-outlined text-base">share</span>
        Share
      </button>
    </div>
  );
}