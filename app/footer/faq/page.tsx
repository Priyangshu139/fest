"use client";

import { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are Festival Packs?",
    answer: "Festival Packs are curated collections of items specifically assembled for different festivals. Each pack contains all the essential items you need to celebrate your festival, saving you time and effort in gathering individual items."
  },
  {
    question: "How do I know which pack is right for me?",
    answer: "Each pack comes with a detailed description of its contents and the festival it's designed for. You can choose based on your specific festival needs, family size, and preferences. We also offer customization options for some packs."
  },
  {
    question: "What about delivery times?",
    answer: "We ensure delivery at least 3-5 days before your chosen festival date. During peak festival seasons, we recommend ordering 2 weeks in advance to guarantee timely delivery."
  },
  {
    question: "Can I customize my festival pack?",
    answer: "Yes! Many of our packs offer customization options. You can add or remove certain items based on your preferences while maintaining the pack's core essentials."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 24 hours of delivery if the items are unopened and in their original packaging. However, during festival seasons, we encourage checking your order immediately upon receipt."
  },
  {
    question: "Do you offer bulk ordering for events?",
    answer: "Yes, we offer special bulk ordering options for events and large gatherings. Please contact our customer service for custom quotes and special arrangements."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl md:w-2/3 mx-auto">
            Find answers to common questions about our festival packs and services
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full text-left p-6 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              <div
                className={`px-6 transition-[max-height,opacity] duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            We're here to help! Contact our support team for assistance.
          </p>
          <a
            href="mailto:support@festpacks.com"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}