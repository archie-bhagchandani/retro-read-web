import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen,Sparkles, Users,ShoppingBag, RefreshCw, Award, ArrowRight, LogIn,UserPlus,Star,TrendingUp,BookMarked, Quote,Crown,ChevronRight,CheckCircle} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Read Anywhere, Anytime",
      description: "Access thousands of ebooks from your favorite authors and dive into stories that captivate your imagination.",
      color: "#D8472F"
    },
    {
      icon: RefreshCw,
      title: "Book Exchange Network",
      description: "Connect with readers near you, exchange physical books, and build your personal library without spending a dime.",
      color: "#00B894"
    },
    {
      icon: ShoppingBag,
      title: "Buy & Sell Marketplace",
      description: "List your pre-loved books for sale or discover hidden gems at unbeatable prices from fellow book lovers.",
      color: "#6C5CE7"
    },
    {
      icon: Award,
      title: "Earn Rewards & KOINS",
      description: "Read daily, maintain streaks, and earn KOINS that unlock exclusive content, badges, and premium features.",
      color: "#FDCB6E"
    },
    {
      icon: Users,
      title: "Thriving Community",
      description: "Join reading clubs, participate in discussions, share reviews, and connect with like-minded bibliophiles.",
      color: "#0984E3"
    },
    {
      icon: BookMarked,
      title: "Smart Book Discovery",
      description: "Discover books tailored to your taste and explore curated collections from fellow readers.",
      color: "#E17055"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Books Available" },
    { value: "50,000+", label: "Active Readers" },
    { value: "100,000+", label: "KOINS Earned" },
    { value: "5,000+", label: "Book Exchanges" }
  ];


  const marqueeItemsRow1 = [
    { book: "The Great Gatsby", rating: "4.8", reader: "Aarav" },
    { book: "1984", rating: "4.7", reader: "Priya" },
    { book: "To Kill a Mockingbird", rating: "4.9", reader: "Rahul" },
    { book: "Pride and Prejudice", rating: "4.8", reader: "Sneha" },
    { book: "The Hobbit", rating: "4.6", reader: "Vikram" },
    { book: "Fahrenheit 451", rating: "4.7", reader: "Ananya" },
    { book: "Jane Eyre", rating: "4.8", reader: "Arjun" },
    { book: "Wuthering Heights", rating: "4.6", reader: "Kavya" },
    { book: "The Alchemist", rating: "4.7", reader: "Rohan" },
    { book: "The Book Thief", rating: "4.9", reader: "Meera" }
  ];

  const marqueeItemsRow2 = [
    { book: "Atomic Habits", rating: "4.9", reader: "Neha" },
    { book: "Sapiens", rating: "4.8", reader: "Rahul" },
    { book: "The Psychology of Money", rating: "4.8", reader: "Priya" },
    { book: "Thinking Fast and Slow", rating: "4.7", reader: "Vikram" },
    { book: "Deep Work", rating: "4.6", reader: "Ananya" },
    { book: "Rich Dad Poor Dad", rating: "4.6", reader: "Karan" },
    { book: "The 7 Habits", rating: "4.7", reader: "Shreya" },
    { book: "How to Win Friends", rating: "4.8", reader: "Sneha" },
    { book: "The Art of War", rating: "4.6", reader: "Amit" },
    { book: "The 4-Hour Work Week", rating: "4.5", reader: "Ritika" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-quote { font-family: 'Playfair Display', serif; }
        
        .text-gradient {
          background: linear-gradient(135deg, #D8472F, #B23522, #1E2A42);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .text-gradient-gold {
          background: linear-gradient(135deg, #FDCB6E, #F39C12);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Marquee Animations */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-left {
          animation: scroll-left 35s linear infinite;
          display: flex;
          width: max-content;
        }

        .marquee-right {
          animation: scroll-right 40s linear infinite;
          display: flex;
          width: max-content;
        }

        .marquee-container {
          overflow: hidden;
          background: rgba(216,71,47,0.04);
          border-top: 1px solid rgba(216,71,47,0.08);
          border-bottom: 1px solid rgba(216,71,47,0.08);
          padding: 12px 0;
        }

        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          white-space: nowrap;
          color: #4A5568;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .marquee-item .book-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #D8472F;
          font-size: 14px;
          flex-shrink: 0;
        }

        .marquee-item .book-name {
          color: #1E2A42;
          font-weight: 600;
          font-style: italic;
          font-size: 13px;
        }

        .marquee-item .rating-badge {
          background: #FDCB6E;
          color: #1E2A42;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .marquee-item .reader-name {
          color: #8A7F6B;
          font-size: 11px;
          font-weight: 400;
        }

        .marquee-item .separator {
          color: #D9C7A3;
          font-weight: 300;
          font-size: 10px;
        }

        .marquee-item .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00B894;
          display: inline-block;
          box-shadow: 0 0 8px rgba(0,184,148,0.4);
          flex-shrink: 0;
        }

        /* Review Card Animation */
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .review-card {
          animation: float-up 0.8s ease forwards;
          opacity: 0;
        }

        .review-card:nth-child(1) { animation-delay: 0.1s; }
        .review-card:nth-child(2) { animation-delay: 0.2s; }
        .review-card:nth-child(3) { animation-delay: 0.3s; }
        .review-card:nth-child(4) { animation-delay: 0.4s; }
        .review-card:nth-child(5) { animation-delay: 0.5s; }
        .review-card:nth-child(6) { animation-delay: 0.6s; }

        /* Pulsing glow for CTA */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(216,71,47,0.3); }
          50% { box-shadow: 0 0 50px rgba(216,71,47,0.5); }
        }

        .btn-primary {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .star-filled {
          color: #FDCB6E;
        }

        /* Step number styling */
        .step-number {
          background: linear-gradient(135deg, #D8472F, #B23522);
          box-shadow: 0 8px 30px rgba(216,71,47,0.3);
        }
      `}</style>

      <div className="marquee-container">
        <div className="marquee-left">
          {[...marqueeItemsRow1, ...marqueeItemsRow1].map((item, index) => (
            <span key={`row1-${index}`} className="marquee-item">
              <span className="book-icon">📖</span>
              <span className="book-name">"{item.book}"</span>
              <span className="rating-badge">⭐ {item.rating}</span>
              <span className="separator">✦</span>
              <span className="reader-name">by {item.reader}</span>
              <span className="status-dot"></span>
            </span>
          ))}
        </div>
      </div>

      
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
            alt="Library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F0]/88 via-[#F8F6F0]/80 to-[#F8F6F0]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D8472F]/5 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
     
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full mb-8 border border-[#E2D5BC] shadow-sm">
            <Sparkles size={16} className="text-[#D8472F]" />
            <span className="text-sm font-medium text-[#4A5568] font-body">✨ Discover Your Next Favorite Book</span>
          </div>
          
      
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#1E2A42] mb-5 leading-[1.05] tracking-wide">
            Your Gateway to <br />
            <span className="text-gradient">Reading & Rewards</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#5B6478] max-w-2xl mx-auto mb-10 leading-relaxed font-body font-light">
            Join <span className="font-semibold text-[#D8472F]">50,000+</span> readers who are discovering, exchanging, 
            and falling in love with books every day.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/register">
              <button className="btn-primary px-10 py-4.5 bg-[#D8472F] text-white rounded-2xl font-semibold hover:bg-[#B23522] transition-all duration-300 shadow-2xl shadow-[#D8472F]/30 hover:shadow-[#D8472F]/50 flex items-center gap-3 text-lg tracking-wide">
                <UserPlus size={22} />
                Start Your Journey
                <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/login">
              <button className="px-10 py-4.5 bg-white text-[#1E2A42] rounded-2xl font-semibold border-2 border-[#E2D5BC] hover:border-[#D8472F] hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg">
                <LogIn size={22} />
                Sign In
              </button>
            </Link>
          </div>

          <p className="text-sm text-[#8A7F6B] mt-6 font-body tracking-wider">
            ✦ Trusted by readers worldwide ✦ 
          </p>

         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center border border-[#E2D5BC] hover:shadow-xl hover:border-[#D8472F]/30 transition-all duration-300 hover:-translate-y-1">
                <p className="text-2xl md:text-3xl font-display font-bold text-[#D8472F]">{stat.value}</p>
                <p className="text-xs text-[#5B6478] font-body mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <div className="marquee-container" style={{ background: 'rgba(216,71,47,0.02)' }}>
        <div className="marquee-right">
          {[...marqueeItemsRow2, ...marqueeItemsRow2].map((item, index) => (
            <span key={`row2-${index}`} className="marquee-item" style={{ color: '#3D4A5C' }}>
              <span className="book-icon" style={{ color: '#6C5CE7' }}>📚</span>
              <span className="book-name" style={{ color: '#6C5CE7' }}>"{item.book}"</span>
              <span className="rating-badge" style={{ background: '#6C5CE7', color: 'white' }}>⭐ {item.rating}</span>
              <span className="separator">✦</span>
              <span className="reader-name">by {item.reader}</span>
              <span className="status-dot" style={{ background: '#FDCB6E' }}></span>
            </span>
          ))}
        </div>
      </div>

      <section className="py-24 px-4 bg-white/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-6 py-2.5 rounded-full mb-5">
              <Sparkles size={16} className="text-[#D8472F]" />
              <span className="text-sm font-medium text-[#D8472F] font-body tracking-wider">FEATURES</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1E2A42] mb-4">
              Everything You <span className="text-gradient">Need</span>
            </h2>
            <p className="text-lg text-[#5B6478] max-w-2xl mx-auto font-body font-light">
              Discover the features that make RetroRead the ultimate reading companion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-7 border border-[#E2D5BC] hover:shadow-2xl hover:border-[#D8472F]/30 transition-all duration-500 hover:-translate-y-2 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 mx-auto" style={{ background: `${feature.color}15` }}>
                    <Icon size={26} style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-[#1E2A42] text-xl mb-2">{feature.title}</h3>
                  <p className="text-[#5B6478] text-sm leading-relaxed font-body">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="py-24 px-4 bg-[#F8F6F0]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-6 py-2.5 rounded-full mb-5">
              <TrendingUp size={16} className="text-[#D8472F]" />
              <span className="text-sm font-medium text-[#D8472F] font-body tracking-wider">HOW IT WORKS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1E2A42] mb-4">
              Get Started in <span className="text-gradient">4 Steps</span>
            </h2>
            <p className="text-lg text-[#5B6478] max-w-2xl mx-auto font-body font-light">
              Start your reading journey in four simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Create Account", description: "Sign up for free and set up your reading profile in minutes." },
              { number: "02", title: "Explore Books", description: "Browse thousands of books and find your next favorite read." },
              { number: "03", title: "Read & Exchange", description: "Read ebooks or exchange physical books with the community." },
              { number: "04", title: "Earn Rewards", description: "Collect KOINS, unlock badges, and level up your reading game!" }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-[#E2D5BC] hover:shadow-2xl hover:border-[#D8472F]/30 transition-all duration-500 hover:-translate-y-2 text-center group">
                <div className="w-20 h-20 rounded-full step-number text-white text-2xl font-display font-bold flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-300">
                  {step.number}
                </div>
                <h4 className="font-display font-semibold text-[#1E2A42] text-xl mb-3">{step.title}</h4>
                <p className="text-sm text-[#5B6478] font-body leading-relaxed">{step.description}</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-[#D8472F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* <span>Get started </span> */}
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <div className="marquee-container" style={{ background: 'rgba(30,42,66,0.02)' }}>
        <div className="marquee-left" style={{ animationDuration: '45s' }}>
          {[...marqueeItemsRow1.reverse(), ...marqueeItemsRow1.reverse()].map((item, index) => (
            <span key={`row3-${index}`} className="marquee-item" style={{ color: '#3D4A5C' }}>
              <span className="book-icon" style={{ color: '#00B894' }}>📖</span>
              <span className="book-name" style={{ color: '#00B894' }}>"{item.book}"</span>
              <span className="rating-badge" style={{ background: '#00B894', color: 'white' }}>⭐ {item.rating}</span>
              <span className="separator">✦</span>
              <span className="reader-name">by {item.reader}</span>
              <span className="status-dot" style={{ background: '#D8472F' }}></span>
            </span>
          ))}
        </div>
      </div>


      <section className="py-24 px-4 bg-[#1E2A42] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D8472F]/10 to-transparent" />
    
      </section>
    </div>
  );
};

export default LandingPage;