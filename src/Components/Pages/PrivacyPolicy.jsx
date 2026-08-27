import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Account Information: Name, email address, username, and phone number",
        "Reading Activity: Books you read, reading progress, bookmarks, and highlights",
        "Usage Data: Pages visited, features used, and time spent on the platform",
        "Community Activity: Reviews, comments, ratings, and forum posts",
        "Transaction Data: Book purchases, sales, and exchange history"
      ]
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "Provide personalized reading recommendations using AI",
        "Track your reading progress and gamification achievements",
        "Facilitate book exchanges and marketplace transactions",
        "Send notifications about new books, features, and events",
        "Improve our platform and user experience"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "All data is encrypted using industry-standard encryption",
        "JWT authentication for secure API access",
        "Regular security audits and vulnerability assessments",
        "Secure data storage with MongoDB Atlas"
      ]
    },
    {
      icon: Eye,
      title: "Data Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Data is shared only with your consent for book exchanges",
        "Aggregated anonymous data may be used for analytics",
        "Third-party services (Google Books API, Cloudinary) process data securely"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal data at any time",
        "Request correction or deletion of your data",
        "Export your reading history and data",
        "Opt-out of non-essential communications",
        "Delete your account and all associated data"
      ]
    },
    {
      icon: FileText,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to improve user experience",
        "Preference cookies to remember your settings",
        "You can manage cookie preferences in your browser settings"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-4 py-2 rounded-full mb-4">
            <Shield size={18} className="text-[#D8472F]" />
            <span className="text-sm font-medium text-[#D8472F]">Privacy Policy</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#1E2A42] mb-3">Privacy Policy</h1>
          <p className="text-[#5B6478] max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl border border-[#E2D5BC] p-8 mb-8">
          <p className="text-[#5B6478] leading-relaxed">
            At RetroRead, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            and protect your personal information when you use our platform. By using RetroRead, you agree 
            to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-[#E2D5BC] p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D8472F]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#D8472F]" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#1E2A42]">{section.title}</h2>
                </div>
                <ul className="space-y-2 text-[#5B6478] leading-relaxed">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D8472F] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact */}
        <div className="mt-8 bg-white rounded-xl border border-[#E2D5BC] p-8 text-center">
          <h3 className="font-serif text-xl font-bold text-[#1E2A42] mb-2">Questions About Privacy?</h3>
          <p className="text-[#5B6478] mb-4">
            If you have any questions about our privacy practices, please contact us.
          </p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-[#D8472F] text-white rounded-lg font-semibold hover:bg-[#B23522] transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;