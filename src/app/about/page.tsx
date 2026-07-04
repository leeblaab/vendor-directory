'use client';

import React from 'react';
import { Mail, Target, Users, Shield, Lightbulb, MessageCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-500/10 -z-10" />
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Welcome to ServiceFinder
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            We are dedicated to connecting individuals and businesses with the perfect local services. 
            Our platform bridges the gap between expertise and need, ensuring quality is just a click away.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl mb-6">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our mission is to simplify the process of finding and booking local services. We believe everyone deserves access to high-quality, reliable services at a fair price. By leveraging technology and community-driven reviews, we strive to create a platform built on trust.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 bg-indigo-500 rounded-2xl flex items-end p-4 text-white font-bold text-xl">Reliable</div>
              <div className="h-40 bg-blue-500 rounded-2xl flex items-end p-4 text-white font-bold text-xl">Local</div>
              <div className="h-40 bg-slate-800 rounded-2xl flex items-end p-4 text-white font-bold text-xl">Trusted</div>
              <div className="h-40 bg-indigo-400 rounded-2xl flex items-end p-4 text-white font-bold text-xl">Fast</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-slate-100 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users />, title: "Customer First", desc: "We prioritize our users' needs and strive for exceptional service." },
              { icon: <Shield />, title: "Transparency", desc: "Our processes are open, keeping you informed every step of the way." },
              { icon: <Lightbulb />, title: "Innovation", desc: "We continuously seek new ways to improve our platform." },
              { icon: <MessageCircle />, title: "Community", desc: "Building a strong community where trust and support thrive." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "John Doe", role: "CEO & Co-founder" },
              { name: "Jane Smith", role: "CTO & Co-founder" },
              { name: "Alice Johnson", role: "Head of Marketing" }
            ].map((member, idx) => (
              <div key={idx} className="group">
                <div className="w-32 h-32 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-6 ring-4 ring-white dark:ring-slate-900 shadow-lg group-hover:scale-105 transition-transform" />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl bg-indigo-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-indigo-100 mb-10 text-lg max-w-2xl mx-auto">
            If you have any questions or would like to collaborate, feel free to reach out to us. We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@servicefinder.com"
              className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Mail size={20} />
              Email Us
            </a>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800">
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} ServiceFinder. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default AboutPage;