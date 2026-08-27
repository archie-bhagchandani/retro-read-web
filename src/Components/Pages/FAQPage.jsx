import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // ← ADD THIS IMPORT
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is RetroRead?",
      answer: "RetroRead is an AI-powered social reading platform where you can read ebooks, exchange physical books, buy and sell books, and earn rewards through gamification."
    },
    {
      question: "How do I start reading?",
      answer: "Simply create an account, browse our library, and click on any book to start reading. You can bookmark pages, highlight text, and track your progress."
    },
    {
      question: "What are KOINS?",
      answer: "KOINS are our platform currency. You earn them by reading books, maintaining streaks, completing challenges, and participating in the community. You can use KOINS to unlock special features."
    },
    {
      question: "How does book exchange work?",
      answer: "List your physical books for exchange, find nearby readers, and send exchange requests. You can chat with other users to arrange the exchange securely."
    },
    {
      question: "What is a Premium account?",
      answer: "Premium accounts get unlimited book exchanges, access to premium ebooks, advanced AI recommendations, reading analytics, exclusive rewards, and priority support."
    },
    {
      question: "How do I earn badges?",
      answer: "Badges are earned by achieving milestones like reading your first book, maintaining a 7-day streak, completing 10 exchanges, writing reviews, and more."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted, and we use JWT authentication to protect your account. We never share your personal information."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us through the Contact Us page, or email us at support@retroread.com. We typically respond within 24-48 hours."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
     
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-[#D8472F]">FAQ</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#1E2A42] mb-3">Frequently Asked Questions</h1>
          <p className="text-[#5B6478] max-w-2xl mx-auto">
            Find answers to the most common questions about RetroRead.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E2D5BC] overflow-hidden transition-all duration-300 hover:border-[#D8472F]/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F6EFE3]/50 transition-colors"
              >
                <span className="font-semibold text-[#1E2A42]">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-[#D8472F] shrink-0 ml-4" />
                ) : (
                  <ChevronDown size={20} className="text-[#A89B8A] shrink-0 ml-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 border-t border-[#E2D5BC]">
                  <p className="text-[#5B6478] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl border border-[#E2D5BC] p-8 text-center">
          <h3 className="font-serif text-xl font-bold text-[#1E2A42] mb-2">Still have questions?</h3>
          <p className="text-[#5B6478] mb-4">We're here to help you with any other questions.</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-[#D8472F] text-white rounded-lg font-semibold hover:bg-[#B23522] transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;