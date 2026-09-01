import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGamificationMenu, setShowGamificationMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName') || 'User';
    console.log('📍 Navbar - Path:', location.pathname, 'Token:', token ? 'Exists' : 'None');
    if (token) {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Search', path: '/search' },
    { name: 'Library', path: '/library' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Exchange', path: '/exchange' },
    { name: 'Community', path: '/community' },
  ];

  const gamificationLinks = [
    { name: '🏅 Badges', path: '/gamification/badges' },
    { name: '⭐ KOINS', path: '/gamification/koins' },
    { name: '🧠 Trivia', path: '/gamification/trivia' },
    { name: '🎯 Guess The Book', path: '/gamification/guess' },
    { name: '🔥 Streak', path: '/gamification/streak' },
    { name: '🎰 Scratch Cards', path: '/gamification/scratch' },
    { name: '📊 Progress', path: '/gamification/progress' },
  ];

  const handleGamificationClick = (path) => {
    setShowGamificationMenu(false);
    setIsOpen(false);
    navigate(path);
  };

  // ============================================
  // LANDING PAGE NAVBAR (Public - No Auth Required)
  // ============================================
  if (isLandingPage) {
    return (
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4A017]/20">
                <span className="text-[#1a0f0a] font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#D4A017] to-[#8B6914] bg-clip-text text-transparent">
                RetroRead
              </span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/home">
                    <button className="px-4 py-1.5 text-[#D4A017] text-sm font-medium hover:bg-[#D4A017]/10 rounded-full transition">
                      Go to App
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-1.5 bg-[#D4A017]/20 text-[#D4A017] rounded-full text-sm font-medium hover:bg-[#D4A017]/30 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-1.5 text-[#D4A017] text-sm font-medium hover:bg-[#D4A017]/10 rounded-full transition">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-5 py-1.5 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold shadow-lg shadow-[#D4A017]/20 hover:shadow-[#D4A017]/40 transition">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ============================================
  // MAIN NAVBAR (Protected Pages - Auth Required)
  // ============================================
  return (
    <nav className="bg-[#1a0f0a]/95 backdrop-blur-md border-b border-[#D4A017]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Links to Home */}
          <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4A017]/20">
              <span className="text-[#1a0f0a] font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#D4A017] to-[#8B6914] bg-clip-text text-transparent">
              RetroRead
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#D4A017]'
                    : 'text-[#D4A017]/70 hover:text-[#D4A017]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Gamification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowGamificationMenu(!showGamificationMenu)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.includes('/gamification')
                    ? 'text-[#D4A017]'
                    : 'text-[#D4A017]/70 hover:text-[#D4A017]'
                }`}
              >
                🎮 Gamification
                <span className="text-[10px]">▼</span>
              </button>

              {showGamificationMenu && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-[#2d1a0e] rounded-xl shadow-2xl border border-[#D4A017]/10 py-2 z-50">
                  {gamificationLinks.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleGamificationClick(item.path)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#D4A017]/70 hover:text-[#D4A017] hover:bg-[#D4A017]/10 transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* KOINS Display */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/10">
              <span className="text-[#D4A017] text-sm">⭐</span>
              <span className="font-bold text-[#f5ede4] text-sm">2,450</span>
            </div>

            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4A017]/10 hover:bg-[#D4A017]/20 transition-colors cursor-pointer">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] flex items-center justify-center text-[#1a0f0a] text-xs font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-[#f5ede4] hidden lg:block">
                      {userName}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#D4A017]/70 hover:text-[#D4A017] text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="hidden md:block px-4 py-1.5 text-[#D4A017] text-sm font-medium hover:bg-[#D4A017]/10 rounded-full transition">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-1.5 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold shadow-lg shadow-[#D4A017]/20 hover:shadow-[#D4A017]/40 transition">
                    Get Started
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#D4A017]/10 transition"
            >
              <svg className="w-6 h-6 text-[#f5ede4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#D4A017]/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-[#D4A017]/70 hover:text-[#D4A017] hover:bg-[#D4A017]/5 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Gamification Section in Mobile */}
            <div className="px-4 py-2">
              <p className="text-[#D4A017]/50 text-xs font-semibold uppercase tracking-wider mb-2">🎮 Gamification</p>
              {gamificationLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleGamificationClick(item.path)}
                  className="block w-full text-left py-2.5 text-sm text-[#D4A017]/60 hover:text-[#D4A017] transition"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="px-4 pt-4 border-t border-[#D4A017]/10 mt-2">
              <div className="flex items-center gap-2 bg-[#D4A017]/10 px-4 py-2 rounded-full mb-3">
                <span className="text-[#D4A017]">⭐</span>
                <span className="font-bold text-[#f5ede4]">2,450 KOINS</span>
              </div>
              {isAuthenticated ? (
                <div className="flex gap-2">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex-1">
                    <button className="w-full py-2 text-[#D4A017] text-sm font-medium border border-[#D4A017]/20 rounded-full hover:bg-[#D4A017]/10 transition">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2 bg-[#D4A017]/20 text-[#D4A017] rounded-full text-sm font-medium hover:bg-[#D4A017]/30 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1">
                    <button className="w-full py-2 text-[#D4A017] text-sm font-medium border border-[#D4A017]/20 rounded-full hover:bg-[#D4A017]/10 transition">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1">
                    <button className="w-full py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;