'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import SubmitVendorForm from './SubmitVendorForm';
import Link from 'next/link';

export default function SubmitPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with return URL
      router.push('/login?redirect=/submit');
    } else if (!isLoading && isAuthenticated) {
      setChecked(true);
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading state while checking auth
  if (isLoading || !checked) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-blue-500 text-5xl animate-spin mb-4 block">
            progress_activity
          </span>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-base">chevron_right</span>
        <span className="text-gray-900 dark:text-white font-medium">Submit a Vendor</span>
      </nav>

      <SubmitVendorForm />
    </div>
  );
}