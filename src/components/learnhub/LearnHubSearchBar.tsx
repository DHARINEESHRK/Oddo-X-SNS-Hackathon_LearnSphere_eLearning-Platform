import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface LearnHubSearchBarProps {
  onSearch: (query: string) => void;
}

export function LearnHubSearchBar({ onSearch }: LearnHubSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <motion.div
        className="relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search Icon with Animation */}
        <motion.div
          className="absolute left-5 top-1/2 -translate-y-1/2"
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? '#6B5B7B' : '#A0AEC0',
          }}
          transition={{ duration: 0.3 }}
        >
          <Search className="w-5 h-5" />
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-14 pr-6 py-5 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-transparent focus:outline-none text-[#2D3748] placeholder:text-[#A0AEC0] shadow-lg shadow-[#6B5B7B]/5 transition-all duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />

        {/* Glow Effect on Focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              boxShadow: '0 0 20px rgba(107, 91, 123, 0.2)',
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>
      
      {/* Hand-drawn underline animation */}
      <motion.div
        className="absolute -bottom-1 left-0 h-1 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #6B5B7B 0%, #8B7B9B 50%, #6B5B7B 100%)',
        }}
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}