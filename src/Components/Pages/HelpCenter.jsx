import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, BookOpen, Users, ShoppingBag, RefreshCw, Award, MessageCircle, Shield } from 'lucide-react';

const HelpCenter = () => {
  const helpTopics = [
    {
      icon: BookOpen,
      title: "Reading & Library",
      description: "How to read books, bookmark pages, and track your reading progress.",
      link: "/help/reading"
    },
    {
      icon: ShoppingBag,
      title: "Buying Books",
      description: "Learn how to purchase books from the marketplace.",
      link: "/help/buying"
    },
    {
      icon: RefreshCw,
      title: "Book Exchange",
      description: "How to exchange books with other readers.",
      link: "/help/exchange"
    },
    {
      icon: Award,
      title: "Gamification & Rewards",
      description: "Understanding KOINS, badges, streaks, and leaderboards.",
      link: "/help/gamification"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join reading clubs, discussions, and connect with other readers.",
      link: "/help/community"
    },
    {
      icon: Shield,
      title: "Account & Security",
      description: "Manage your account, privacy settings, and security.",
      link: "/help/account"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
       
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle size={18} className="text-[#D8472F]" />
            <span className="text-sm font-medium text-[#D8472F]">Help Center</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#1E2A42] mb-3">How can we help you?</h1>
          <p className="text-[#5B6478] max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of RetroRead.
          </p>
        </div>

        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full px-6 py-4 rounded-xl bg-white border border-[#E2D5BC] focus:outline-none focus:border-[#D8472F] focus:ring-2 focus:ring-[#D8472F]/20 text-[#1E2A42] placeholder:text-[#A89B8A]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#D8472F] text-white rounded-lg hover:bg-[#B23522] transition">
              Search
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Link
                key={index}
                to={topic.link}
                className="bg-white rounded-xl p-6 border border-[#E2D5BC] hover:shadow-xl hover:border-[#D8472F] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#D8472F]/10 flex items-center justify-center mb-4 group-hover:bg-[#D8472F] transition-colors duration-300">
                  <Icon size={22} className="text-[#D8472F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1E2A42] mb-2">{topic.title}</h3>
                <p className="text-sm text-[#5B6478] leading-relaxed">{topic.description}</p>
                <span className="inline-block mt-3 text-[#D8472F] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-xl border border-[#E2D5BC] p-8">
          <h2 className="font-serif text-xl font-bold text-[#1E2A42] mb-4">Quick Answers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/faq" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F6EFE3] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#D8472F]/10 flex items-center justify-center">
                <MessageCircle size={16} className="text-[#D8472F]" />
              </div>
              <span className="text-[#1E2A42]">View all FAQs</span>
            </Link>
            <Link to="/contact" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F6EFE3] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#D8472F]/10 flex items-center justify-center">
                <MessageCircle size={16} className="text-[#D8472F]" />
              </div>
              <span className="text-[#1E2A42]">Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;