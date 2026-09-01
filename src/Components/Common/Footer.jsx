import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2013] text-[#EDE2CE] border-t border-[#4A3423]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D8472F] to-[#B23522] flex items-center justify-center shadow-lg shadow-[#D8472F]/30">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-serif text-xl font-semibold text-[#EDE2CE]">
                RetroRead
              </span>
            </div>
            
            <p className="text-sm text-[#A89B8A] leading-relaxed max-w-xs">
              AI-powered social reading platform where you can read, exchange, 
              and discover books while earning rewards.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-[#EDE2CE] text-lg mb-4 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#D8472F] rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Home</Link></li>
              <li><Link to="/library" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Library</Link></li>
              <li><Link to="/marketplace" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Marketplace</Link></li>
              <li><Link to="/exchange" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Book Exchange</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-[#EDE2CE] text-lg mb-4 relative">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#D8472F] rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Help Center</Link></li>
              <li><Link to="/faq" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/contact" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-[#A89B8A] hover:text-[#D8472F] transition-colors duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#D8472F]/30 to-transparent"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8A7F6B]">
            © {currentYear} RetroRead. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#6B5F4F]">
            <Link to="/privacy" className="hover:text-[#A89B8A] transition-colors duration-300">Privacy</Link>
            <Link to="/terms" className="hover:text-[#A89B8A] transition-colors duration-300">Terms</Link>
            <Link to="/cookies" className="hover:text-[#A89B8A] transition-colors duration-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;