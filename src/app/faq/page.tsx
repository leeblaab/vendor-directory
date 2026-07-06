import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - ServiceFinder UAE | Frequently Asked Questions',
  description: 'Find answers to common questions about ServiceFinder UAE. Learn how to find vendors, submit your business, leave reviews, and more.',
  keywords: 'FAQ, frequently asked questions, servicefinder help, UAE vendor directory support',
};

export default function FAQPage() {
  return <FAQClient />;
}