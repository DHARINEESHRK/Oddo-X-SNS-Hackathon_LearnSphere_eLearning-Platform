import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User } from 'lucide-react';
import { LoginAnimatedBackground } from './LoginAnimatedBackground';
import { useApp } from '../context/AppContext';

export function LoginPage({ onBackToHome }: { onBackToHome: () => void }) {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'signin') {
      const success = login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
      // If successful, the app will automatically show the dashboard
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const success = register(name, email, password);
      if (!success) {
        setError('Email already registered');
      }
      // If successful, the app will automatically show the dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <LoginAnimatedBackground />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <h1 
            className="text-5xl text-[#202732] mb-2 cursor-pointer"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
            onClick={onBackToHome}
          >
            Learn Sphere
          </h1>
          <p className="text-[#9AACB6]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Expand your knowledge, explore new horizons
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
        >
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-6 bg-[#F1F2F4] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2.5 rounded-lg transition-all duration-300 ${
                mode === 'signin'
                  ? 'bg-[#6E5B6A] text-white shadow-md'
                  : 'text-[#202732] hover:bg-white/50'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-lg transition-all duration-300 ${
                mode === 'signup'
                  ? 'bg-[#6E5B6A] text-white shadow-md'
                  : 'text-[#202732] hover:bg-white/50'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-3xl text-[#202732] mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            {mode === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input - Only for Sign Up */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AACB6]" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-[#F1F2F4] border-2 border-transparent rounded-xl transition-all duration-200 focus:bg-white focus:border-[#6E5B6A] focus:outline-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AACB6]" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#F1F2F4] border-2 border-transparent rounded-xl transition-all duration-200 focus:bg-white focus:border-[#6E5B6A] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AACB6]" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[#F1F2F4] border-2 border-transparent rounded-xl transition-all duration-200 focus:bg-white focus:border-[#6E5B6A] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input - Only for Sign Up */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AACB6]" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-[#F1F2F4] border-2 border-transparent rounded-xl transition-all duration-200 focus:bg-white focus:border-[#6E5B6A] focus:outline-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Forgot Password Link - Only for Sign In */}
            {mode === 'signin' && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#6E5B6A] hover:text-[#5a4a56] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-[#6E5B6A] text-white py-3.5 rounded-xl transition-all duration-200 hover:bg-[#5a4a56] hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </motion.button>

            {/* Alternate Action Link */}
            <div className="text-center mt-4">
              <span className="text-sm text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-[#6E5B6A] hover:text-[#5a4a56] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {mode === 'signin' ? 'Create an account' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {error}
            </p>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-[#9AACB6] mt-6"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
        >
          By {mode === 'signin' ? 'signing in' : 'signing up'}, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
}