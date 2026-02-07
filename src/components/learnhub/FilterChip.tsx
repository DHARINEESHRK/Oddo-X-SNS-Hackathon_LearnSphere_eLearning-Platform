import React from 'react';
import { motion } from 'motion/react';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-7 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap overflow-hidden ${
        isActive
          ? 'bg-gradient-to-r from-[#6B5B7B] to-[#8B7B9B] text-white shadow-lg shadow-[#6B5B7B]/30'
          : 'bg-white/80 backdrop-blur-sm text-[#2D3748] shadow-md hover:shadow-lg border border-white/50'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Active state shine effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}

      {/* Glow effect on hover for inactive chips */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          whileHover={{ opacity: 1 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(107, 91, 123, 0.1), transparent 70%)',
          }}
        />
      )}

      <span className="relative z-10">{label}</span>

      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 right-3 w-1.5 h-1.5 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      )}
    </motion.button>
  );
}