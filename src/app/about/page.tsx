import React from 'react';
import { Mail, Code, Globe, Coffee, GitBranch, Link, AtSign, Briefcase, User, Heart, ExternalLink } from 'lucide-react';
import Image from 'next/image';
export const metadata = {
  title: 'About EasyFinder UAE - Trusted Vendor Directory',
  description: 'EasyFinder UAE connects you with verified local service providers. Find trusted plumbers, electricians, movers and more across Dubai, Abu Dhabi, and UAE.',
  keywords: 'about EasyFinder, UAE vendor directory, trusted service providers',
}
const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#B4D4FF] dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200">
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B4D4FF]/10 to-[#176B87]/10 dark:from-indigo-900/20 dark:to-purple-900/20 -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#176B87] to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-[#B4D4FF]/30 text-[#176B87] rounded-full text-sm font-medium">
            About the Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#176B87] via-[#86B6F6] to-[#B4D4FF] bg-clip-text text-transparent">
            About EasyFinder UAE
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Connecting people with trusted local service providers across the UAE. A modern platform designed to simplify finding and hiring the right professionals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Platform Info Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700 sticky top-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-48 w-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="EasyFinder UAE Logo"
                      width={200}
                      height={200}
                      className="h-48 w-48 object-contain"
                      priority
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">EasyFinder UAE</h2>
                <p className="text-[#176B87] font-medium mb-4">Local Services Marketplace</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-[#B4D4FF] dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Region</span>
                    <span className="font-medium">United Arab Emirates</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#B4D4FF] dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Type</span>
                    <span className="font-medium">Online Marketplace</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 dark:text-slate-400">Status</span>
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="text-[#176B87]" />
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                EasyFinder UAE was created to solve a common problem: finding reliable, local service providers you can trust. 
                Whether you need a plumber, electrician, cleaner, or any other service, we connect you with verified professionals 
                across the United Arab Emirates.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our platform is built with modern technology to ensure a seamless experience for both service providers and customers, 
                making it easier than ever to find and hire the right help.
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="text-[#176B87]" />
                Key Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Verified Providers', 'Easy Search', 'Reviews & Ratings', 
                  'Secure Platform', 'Mobile Friendly', 'Real-time Updates',
                  'Direct Contact', 'Multiple Categories', 'UAE Focused'
                ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="px-4 py-3 bg-[#EEF5FF] dark:bg-slate-700/50 rounded-xl text-center text-sm font-medium hover:bg-[#B4D4FF] dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-[#B4D4FF] dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Heart className="text-[#176B87]" />
                Our Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe in building connections that matter. Trust, transparency, and quality are at the core of everything we do. 
                Every interaction on our platform is designed to be fair, reliable, and beneficial for both parties involved.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                Our approach combines cutting-edge technology with a deep understanding of local needs, ensuring that EasyFinder UAE 
                not only works flawlessly but also truly serves the community.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-[#176B87] to-[#86B6F6] rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="mb-6 max-w-lg">
                Have questions or want to learn more about EasyFinder UAE? We'd love to hear from you!
              </p>
              <a
                href="mailto:easyfinderuae@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#176B87] font-bold rounded-full hover:bg-[#EEF5FF] transition-all"
              >
                <Mail size={18} />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-[#B4D4FF] dark:border-slate-800 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} EasyFinder UAE. Connecting communities across the United Arab Emirates.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default AboutPage;