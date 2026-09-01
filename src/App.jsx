import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

// ✅ Landing Page (Public)
import LandingPage from './Components/Pages/LandingPage';

// Public Pages
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import SellerLoginPage from './Components/Pages/SellerLoginPage';
import UserLoginPage from './Components/Pages/UserLoginPage';
import SellerSignupPage from './Components/Pages/SellerSignupPage';
import HelpCenter from './Components/Pages/HelpCenter';
import FAQPage from './Components/Pages/FAQPage';
import ContactPage from './Components/Pages/ContactPage';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';

// Protected Pages (Require Authentication)
import HomePage from './Components/Pages/HomePage';
import LibraryPage from './Components/Pages/LibraryPage';
import MarketplacePage from './Components/Pages/MarketplacePage';
import ExchangePage from './Components/Pages/ExchangePage';
import CommunityPage from './Components/Pages/CommunityPage';
import ProfilePage from './Components/Pages/ProfilePage';
import SearchPage from './Components/Pages/SearchPage';
import BookDetailsPage from './Components/Pages/BookDetailsPage';
import ClaimBookPage from './Components/Pages/ClaimBookPage';
import SellBookPage from './Components/Pages/SellBookPage';

// Gamification Pages
import GamificationPage from './Components/Pages/GamificationPage';
import BadgesPage from './Components/Pages/BadgesPage';
import KoinsPage from './Components/Pages/KoinsPage';
import TriviaPage from './Components/Pages/TriviaPage';
import GuessPage from './Components/Pages/GuessPage';
import StreakPage from './Components/Pages/StreakPage';
import ScratchPage from './Components/Pages/ScratchPage';
import ProgressPage from './Components/Pages/ProgressPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    console.log('🔐 Auth Check - Token:', token ? 'Exists' : 'None');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
    setLoading(false);
  }, []);

  // ✅ Protected Route Component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      console.log('🔒 Not authenticated, redirecting to login');
      return <Navigate to="/login" replace />;
    }
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0f0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#D4A017]/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* ✅ PUBLIC ROUTES - No Authentication Required */}
          {/* Landing Page - ALWAYS accessible, no redirects */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Other Public Pages */}
          <Route path="/seller-login" element={<SellerLoginPage />} />
          <Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/seller-signup" element={<SellerSignupPage />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* 🔒 PROTECTED ROUTES - Require Authentication */}
          <Route path="/home" element={
            <ProtectedRoute><HomePage /></ProtectedRoute>
          } />
          <Route path="/library" element={
            <ProtectedRoute><LibraryPage /></ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute><MarketplacePage /></ProtectedRoute>
          } />
          <Route path="/claim-book" element={
            <ProtectedRoute><ClaimBookPage /></ProtectedRoute>
          } />
          <Route path="/sell-book" element={
            <ProtectedRoute><SellBookPage /></ProtectedRoute>
          } />
          <Route path="/exchange" element={
            <ProtectedRoute><ExchangePage /></ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute><CommunityPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute><SearchPage /></ProtectedRoute>
          } />
          <Route path="/book/:bookId" element={
            <ProtectedRoute><BookDetailsPage /></ProtectedRoute>
          } />

          {/* 🎮 GAMIFICATION ROUTES */}
          <Route path="/gamification" element={
            <ProtectedRoute><GamificationPage /></ProtectedRoute>
          } />
          <Route path="/gamification/badges" element={
            <ProtectedRoute><BadgesPage /></ProtectedRoute>
          } />
          <Route path="/gamification/koins" element={
            <ProtectedRoute><KoinsPage /></ProtectedRoute>
          } />
          <Route path="/gamification/trivia" element={
            <ProtectedRoute><TriviaPage /></ProtectedRoute>
          } />
          <Route path="/gamification/guess" element={
            <ProtectedRoute><GuessPage /></ProtectedRoute>
          } />
          <Route path="/gamification/streak" element={
            <ProtectedRoute><StreakPage /></ProtectedRoute>
          } />
          <Route path="/gamification/scratch" element={
            <ProtectedRoute><ScratchPage /></ProtectedRoute>
          } />
          <Route path="/gamification/progress" element={
            <ProtectedRoute><ProgressPage /></ProtectedRoute>
          } />

          {/* 404 - Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;