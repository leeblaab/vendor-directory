// app/faq.tsx
'use client';

import Link from 'next/link';
import FlipCard from '@/components/animata/card/flip-card'; // Adjust the import path according to your project structure

export default function FAQ() {
  const faqData = [
    {
      question: "What is ServiceFinder?",
      answer:
        "ServiceFinder is a platform that connects users with local services. We offer a wide range of options to help you find the perfect service for any need."
    },
    {
      question: "How do I submit my business or service?",
      answer:
        "To submit your business or service, click on the 'Submit Vendor' button at the top right corner of the homepage and follow the instructions provided."
    },
    {
      question: "Can I edit or update my submitted information?",
      answer:
        "Yes, you can log in to your account and navigate to the 'My Account' section to edit or update your submitted business or service details."
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to our customer support team via email at support@servicefinder.com or by using the contact form on our website."
    },
    {
      question: "Is my data secure with ServiceFinder?",
      answer:
        "Yes, we take your privacy and security very seriously. We use industry-standard encryption and security measures to protect your personal information."
    }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">FAQ</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Here are some frequently asked questions and their answers.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqData.map((item, index) => (
            <FlipCard
              key={index}
              title={item.question}
              description={item.answer}
              rotate="y"
              className="bg-white dark:bg-gray-900 shadow-lg"
            />
          ))}
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