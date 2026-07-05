// src/app/contact/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Feel free to reach out to us via email or social media.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mb-12">
          <Link href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <Image src="/icons/facebook.svg" alt="Facebook" width={32} height={32} />
          </Link>
          <Link href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <Image src="/icons/twitter.svg" alt="Twitter" width={32} height={32} />
          </Link>
          <Link href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <Image src="/icons/instagram.svg" alt="Instagram" width={32} height={32} />
          </Link>
        </div>

        {/* Email Link */}
        <div className="text-center mb-8">
          <a href="mailto:contact@example.com" className="text-blue-500 hover:text-blue-700 underline">
            contact@example.com
          </a>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}