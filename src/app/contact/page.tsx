'use client';
import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, AtSign, Link as LinkIcon, GitBranch, ArrowLeft } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF5FF] to-[#B4D4FF] dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#176B87] to-[#86B6F6] mb-6 shadow-lg">
            <Mail className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#176B87] via-[#86B6F6] to-[#B4D4FF] bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF5FF] dark:bg-slate-700 text-[#176B87] dark:text-indigo-400 mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Email Us</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">For general inquiries</p>
            <a
              href="mailto:easyfinderuae@gmail.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#176B87] hover:bg-[#86B6F6] text-white font-semibold rounded-full transition-all shadow-lg">
              easyfinderuae@gmail.com
            </a>
          </div>

          {/* Social Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF5FF] dark:bg-slate-700 text-[#176B87] dark:text-indigo-400 mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Connect With Us</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Follow us on social media</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/EasyFinderuae" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-[#EEF5FF] dark:bg-slate-700 rounded-full text-[#176B87] dark:text-indigo-400 hover:bg-[#B4D4FF] transition-all">
                  <AtSign size={24} />
                </a>
              <a
                href="https://instagram.com/EasyFinderuae" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-[#EEF5FF] dark:bg-slate-700 rounded-full text-[#176B87] dark:text-indigo-400 hover:bg-[#B4D4FF] transition-all">
                  <GitBranch size={24} />
                </a>
              <a
                href="https://linkedin.com/company/EasyFinderuae" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-[#EEF5FF] dark:bg-slate-700 rounded-full text-[#176B87] dark:text-indigo-400 hover:bg-[#B4D4FF] transition-all">
                  <LinkIcon size={24} />
                </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#176B87] to-[#86B6F6] rounded-3xl p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust EasyFinder UAE
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#176B87] font-bold rounded-full hover:bg-[#EEF5FF] transition-all shadow-lg"
          >
            <ArrowLeft size={20} className="rotate-180" />
            Browse Services
          </Link>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium rounded-full transition-all border border-[#B4D4FF] dark:border-slate-700 shadow-md"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-[#B4D4FF] dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} EasyFinder UAE. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
