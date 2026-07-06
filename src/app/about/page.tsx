'use client';

import React from 'react';
import { Mail, Code, Globe, Coffee, GitBranch, Link, AtSign, Briefcase, User, Heart, ExternalLink } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200">
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium">
            Creator Profile
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Yasser Awadein
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Passionate developer crafting digital solutions with modern technologies. Creator of ServiceFinder UAE, connecting people with trusted local service providers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 sticky top-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  YA
                </div>
                <h2 className="text-2xl font-bold mb-2">Yasser Awadein</h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">Full Stack Developer</p>
                
                <div className="flex justify-center gap-4 mb-6">
                  <a 
                    href="#" 
                    className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    aria-label="GitHub"
                  >
                    <GitBranch size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Link size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    aria-label="Twitter"
                  >
                    <AtSign size={18} />
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Location</span>
                    <span className="font-medium">UAE</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Specialty</span>
                    <span className="font-medium">Full Stack</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 dark:text-slate-400">Currently</span>
                    <span className="font-medium">Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Coffee className="text-indigo-500" />
                About Me
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                I'm Yasser Awadein, a passionate full-stack developer with expertise in modern web technologies. 
                My journey began with a curiosity for solving real-world problems through code, and has evolved 
                into a career focused on creating meaningful digital experiences.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ServiceFinder UAE represents my commitment to bridging the gap between service providers 
                and customers in the UAE market, using cutting-edge technology to create a seamless experience.
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="text-indigo-500" />
                Technologies & Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Next.js', 'TypeScript', 'React', 'Node.js',
                  'Directus CMS', 'Tailwind CSS', 'PostgreSQL', 'Docker',
                  'Vercel', 'API Design', 'UI/UX', 'DevOps'
                ].map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-center text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="text-indigo-500" />
                My Philosophy
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                I believe in building solutions that matter - technology should enhance human experiences, 
                not complicate them. Every project I work on aims to solve real problems for real people, 
                with a focus on usability, performance, and scalability. 
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                My approach combines technical excellence with user-centered design, ensuring that the 
                final product not only works flawlessly but also delights users at every interaction.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="mb-6 max-w-lg">
                Interested in collaborating or learning more about my work? Feel free to reach out!
              </p>
              <a
                href="mailto:yasser@servicefinder.ae"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all"
              >
                <Mail size={18} />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} ServiceFinder UAE. Crafted with passion by Yasser Awadein.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default AboutPage;