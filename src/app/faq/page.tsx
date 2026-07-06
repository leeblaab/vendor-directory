import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - EasyFinder UAE | Frequently Asked Questions',
  description: 'Find answers to common questions about EasyFinder UAE. Learn how to find vendors, submit your business, leave reviews, and more.',
  keywords: 'FAQ, frequently asked questions, EasyFinder help, UAE vendor directory support',
};

export default function FAQPage() {
  return <FAQClient />;
}