'use client';

import React, { useState } from 'react';
import { ChevronDown, LifeBuoy, Phone, Mail, Building2, Star, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: 'General',
      items: [
        {
          question: "What is EasyFinder UAE?",
          answer: "EasyFinder UAE is a comprehensive platform that connects customers with trusted local service providers across the UAE. From plumbers and electricians to wedding planners and IT support, we help you find reliable professionals for all your service needs."
        },
        {
          question: "How does EasyFinder UAE work?",
          answer: "Simply browse our categories, search for services, or contact providers directly via WhatsApp or phone. All our listed providers are verified to ensure quality and reliability."
        },
        {
          question: "Is EasyFinder UAE free to use?",
          answer: "Yes, browsing and contacting service providers is completely free for customers. Service providers pay a fee to be listed on our platform."
        }
      ]
    },
    {
      category: 'For Customers',
      items: [
        {
          question: "How do I find a service provider?",
          answer: "You can browse by category, use our search bar, or filter by location. Each provider's profile includes contact information, ratings, and customer reviews to help you make an informed decision."
        },
        {
          question: "Can I leave reviews for service providers?",
          answer: "Absolutely! After receiving a service, you can leave a review and rating to help other customers make informed decisions. Your feedback helps maintain quality standards across our platform."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach our customer support team through our contact page, by email at support@easyfinder.ae, or by using the chat feature available on our website during business hours."
        }
      ]
    },
    {
      category: 'For Service Providers',
      items: [
        {
          question: "How do I list my business on EasyFinder UAE?",
          answer: "Click on the 'List Your Business' button on our homepage and complete the simple registration form. Our team will review your submission and contact you within 24-48 hours."
        },
        {
          question: "What information do I need to provide?",
          answer: "You'll need to provide your business name, contact information, service areas, business description, and proof of credentials. Verification documents help build trust with potential customers."
        },
        {
          question: "How much does it cost to be listed?",
          answer: "We offer various pricing plans depending on your business needs. Basic listings start at an affordable monthly rate, with premium packages offering enhanced visibility and additional features."
        }
      ]
    },
    {
      category: 'Safety & Security',
      items: [
        {
          question: "Are the service providers verified?",
          answer: "Yes, all our listed providers go through a verification process that includes credential checks and background verification where applicable. Look for the 'Verified' badge on provider profiles."
        },
        {
          question: "How is my personal information protected?",
          answer: "We use industry-standard security measures to protect your personal information. We never share your contact details with third parties without your consent."
        },
        {
          question: "What if I have a bad experience with a provider?",
          answer: "We encourage customers to report any issues through our platform. Our team investigates complaints and takes appropriate action to maintain quality standards. You can also leave honest reviews to warn other customers."
        }
      ]
    }
  ];

  const quickFacts = [
    { icon: <Star className="w-6 h-6" />, title: "1000+ Providers", description: "Verified professionals across UAE" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Verified Services", description: "All providers undergo verification" },
    { icon: <LifeBuoy className="w-6 h-6" />, title: "24/7 Support", description: "Customer service assistance" },
    { icon: <Building2 className="w-6 h-6" />, title: "60+ Categories", description: "Covering all service needs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF5FF] to-[#B4D4FF] dark:from-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B4D4FF]/10 to-[#176B87]/10 dark:from-indigo-900/20 dark:to-purple-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#176B87] to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 bg-[#B4D4FF]/30 text-[#176B87] rounded-full text-sm font-medium">
              <HelpCircle className="inline mr-2" size={16} />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#176B87] via-[#86B6F6] to-[#B4D4FF] bg-clip-text text-transparent">
              Everything You Need to Know
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Find answers to common questions about using EasyFinder UAE and connecting with trusted service providers.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="container mx-auto px-4 -mt-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickFacts.map((fact, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-[#B4D4FF] dark:border-slate-700 text-center hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EEF5FF] dark:bg-indigo-900/30 text-[#176B87] dark:text-indigo-400 rounded-xl mb-4">
                {fact.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{fact.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-[#176B87] rounded-full"></span>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.items.map((faq, index) => {
                  const globalIndex = catIndex * 100 + index;
                  return (
                    <div 
                      key={globalIndex} 
                      className="bg-white dark:bg-slate-800 rounded-xl border border-[#B4D4FF] dark:border-slate-700 overflow-hidden transition-all duration-300"
                    >
                      <button
                        className="w-full flex justify-between items-center p-6 text-left hover:bg-[#EEF5FF] dark:hover:bg-slate-700/50 transition-colors"
                        onClick={() => toggleAccordion(globalIndex)}
                        aria-expanded={openIndex === globalIndex}
                      >
                        <span className="text-lg font-medium text-slate-800 dark:text-slate-200">
                          {faq.question}
                        </span>
                        <ChevronDown 
                          className={`transform transition-transform duration-300 ${
                            openIndex === globalIndex ? 'rotate-180' : ''
                          }`} 
                          size={20} 
                        />
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 border-t border-[#B4D4FF] dark:border-slate-700">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-[#176B87] to-[#86B6F6] rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Reach out to our friendly support team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:easyfinderuae@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#176B87] font-bold rounded-full hover:bg-[#EEF5FF] transition-all"
            >
              <Mail size={18} />
              Email Us
            </a>
            <a
              href="tel:+971000000000"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              <Phone size={18} />
              Call Support
            </a>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="container mx-auto px-4 pb-12">
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
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
    </div>
  );
}