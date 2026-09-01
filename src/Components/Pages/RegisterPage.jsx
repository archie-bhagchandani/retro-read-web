import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, BookOpen, Sparkles, ArrowRight, Phone, UserCircle } from 'lucide-react';

const quote = { text: "Books are a uniquely portable magic.", author: "Stephen King" };

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  // ✅ Validation Functions
  const validateFullName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // ✅ Password Validation - Min 7, Max 12, Uppercase, Lowercase, Number, Special
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Full Name Validation - Only Letters
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!validateFullName(formData.fullName)) {
      setError('Full name should only contain letters and spaces');
      return;
    }

    // Email Validation
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      return;
    }

    // Username Validation
    if (!formData.username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!validateUsername(formData.username)) {
      setError('Username must be 3-20 characters and can only contain letters, numbers, and underscores');
      return;
    }

    // Phone Validation - Exactly 10 digits
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Phone number must be exactly 10 digits (numbers only)');
      return;
    }

    // Password Validation - Min 7, Max 12
    if (!formData.password) {
      setError('Please create a password');
      return;
    }
    if (!validatePassword(formData.password)) {
      setError('Password must be 7-12 characters and include: uppercase, lowercase, number, and special character (@$!%*?&)');
      return;
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Agree to Terms
    if (!agree) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setError('');

    // Store user data
    localStorage.setItem('token', 'dummy-token-' + Date.now());
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.fullName);
    localStorage.setItem('userPhone', formData.phone);
    
    console.log('✅ Registration Successful!');
    console.log('👤 Name:', formData.fullName);
    console.log('📧 Email:', formData.email);
    console.log('👤 Username:', formData.username);
    console.log('📱 Phone:', formData.phone);
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Newsreader:ital,wght@1,400;1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-quote { font-family: 'Newsreader', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        @keyframes float-in { 0% { opacity: 0; transform: translateY(24px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .float-in { animation: float-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); transition: transform 0.6s ease; }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        .input-field {
          display: flex;
          align-items: center;
          background: rgba(255,251,243,0.5);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 14px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          height: 52px;
        }
        .input-field:focus-within {
          background: rgba(255,251,243,0.9);
          border-color: #D8472F;
          box-shadow: 0 0 0 4px rgba(216,71,47,0.08), 0 8px 24px rgba(216,71,47,0.06);
          transform: translateY(-2px);
        }
        .input-field .icon {
          transition: all 0.3s ease;
          color: #8A7F6B;
          padding-left: 16px;
          flex-shrink: 0;
        }
        .input-field:focus-within .icon { color: #D8472F; transform: scale(1.1); }
        .input-field input {
          background: transparent;
          width: 100%;
          padding: 0 14px;
          height: 100%;
          font-size: 15px;
          color: #1E2A42;
          outline: none;
          border: none;
          font-family: 'Work Sans', sans-serif;
        }
        .input-field input::placeholder { color: #A89B8A; }
        .input-field .toggle-btn {
          padding-right: 16px;
          flex-shrink: 0;
          color: #8A7F6B;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .input-field .toggle-btn:hover { color: #D8472F; }

        .glass-card {
          background: rgba(255,251,243,0.78);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
          border-radius: 32px;
          max-width: 480px;
          width: 100%;
        }

        .btn-submit { height: 52px; border-radius: 14px; font-size: 15px; font-weight: 600; margin-top: 8px; }
        
        .error-message {
          background: rgba(225,112,85,0.1);
          border: 1px solid #E17055;
          color: #E17055;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .password-hint {
          font-size: 11px;
          color: #8A7F6B;
          padding: 4px 14px;
          margin-top: 4px;
        }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
        alt="Library shelves"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-8 md:p-10 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D8472F]/20 blur-xl animate-pulse" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
              <BookOpen size={22} className="text-[#D8472F]" />
            </div>
          </div>
          <span className="font-display font-semibold text-xl text-[#1E2A42] tracking-wide mt-3">RetroRead</span>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D8472F]/20 bg-white/40 px-3 py-1 text-[10px] tracking-wide text-[#5B6478] mt-2">
            <Sparkles size={11} className="text-[#D8472F]" /> A new line, every visit
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-[#1E2A42] text-center">Create Account</h2>
        <p className="text-[#5B6478] text-sm mt-1.5 mb-6 text-center">Choose your role and start your journey.</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* Full Name - Only Letters */}
          <div className="mb-4">
            <div className={`input-field ${focused === 'fullName' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <User size={18} className="icon" />
              <input
                type="text"
                placeholder="Full Name (Letters only)"
                value={formData.fullName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                  setFormData({ ...formData, fullName: value });
                }}
                onFocus={() => setFocused('fullName')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className={`input-field ${focused === 'email' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Mail size={18} className="icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <div className={`input-field ${focused === 'username' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <UserCircle size={18} className="icon" />
              <input
                type="text"
                placeholder="Username (3-20 chars, letters/numbers/_)"
                value={formData.username}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z0-9_]/g, '');
                  setFormData({ ...formData, username: value });
                }}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Phone Number - Exactly 10 digits */}
          <div className="mb-4">
            <div className={`input-field ${focused === 'phone' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Phone size={18} className="icon" />
              <input
                type="tel"
                placeholder="Phone Number (10 digits only)"
                maxLength="10"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className={`input-field ${focused === 'password' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Lock size={18} className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (7-12 chars)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="toggle-btn">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="password-hint">
              Min 7, Max 12 chars: uppercase, lowercase, number, special (@$!%*?&)
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <div className={`input-field ${focused === 'confirmPassword' ? 'ring-2 ring-[#D8472F]/10' : ''}`}>
              <Lock size={18} className="icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                onFocus={() => setFocused('confirmPassword')}
                onBlur={() => setFocused(null)}
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="toggle-btn">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded border-[#D9C7A3] accent-[#D8472F] cursor-pointer transition-all duration-200 mt-1 shrink-0"
            />
            <label className="text-sm text-[#5B6478] cursor-pointer select-none">
              I agree to the{' '}
              <Link to="/terms" className="text-[#D8472F] hover:underline font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-[#D8472F] hover:underline font-medium">Privacy Policy</Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="seal-btn w-full btn-submit bg-[#D8472F] text-[#FFFBF3] font-semibold shadow-[0_12px_28px_-10px_rgba(216,71,47,0.5)] hover:bg-[#B23522] hover:shadow-[0_16px_32px_-12px_rgba(216,71,47,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Create Account</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D9C7A3]" />
            <span className="text-xs text-[#5B6478] font-medium whitespace-nowrap">or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D9C7A3]" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-[#5B6478]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D8472F] font-semibold hover:underline hover:text-[#B23522] transition">
              Sign In
            </Link>
          </p>
        </form>

        {/* Quote */}
        <p className="font-quote italic text-center text-sm text-[#5B6478]/60 mt-6 leading-relaxed">
          "{quote.text}" <span className="not-italic text-xs text-[#8A7F6B]">— {quote.author}</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;