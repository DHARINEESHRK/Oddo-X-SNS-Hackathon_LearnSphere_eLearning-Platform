import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export function InstructorBanner() {
  return (
    <motion.div
      className="mb-8 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="relative">
        {/* Hand-drawn scribbled border background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'drop-shadow(0 10px 25px rgba(244, 184, 96, 0.15))' }}
        >
          {/* Scribbled marker border */}
          <path
            d="M 15 8 Q 20 5, 30 7 L 95% 6 Q 98% 4, 99% 10 L 99.5% 85% Q 100% 90%, 98% 92% L 25 95% Q 15 96%, 12 90% L 8 15 Q 7 10, 15 8 Z"
            fill="none"
            stroke="#F4B860"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              paintOrder: 'stroke fill',
            }}
          />
          {/* Second scribbled layer for hand-drawn effect */}
          <path
            d="M 16 9 Q 21 6, 31 8 L 94.5% 7 Q 97.5% 5, 98.5% 11 L 99% 84% Q 99.5% 89%, 97.5% 91.5% L 26 94.5% Q 16 95.5%, 13 89.5% L 9 16 Q 8 11, 16 9 Z"
            fill="none"
            stroke="#F4B860"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            style={{
              paintOrder: 'stroke fill',
            }}
          />
        </svg>

        {/* Main content box */}
        <div className="relative bg-gradient-to-r from-[#F4B860] to-[#FFD580] rounded-2xl p-6 mx-2 my-1.5">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
          </div>

          {/* Floating Icon */}
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <GraduationCap className="w-20 h-20 text-white/20" />
          </motion.div>

          <div className="relative z-10 flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30"
              style={{
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
              }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                Instructor Dashboard
              </h3>
              <p className="text-white/90 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Create, edit, and manage your courses
              </p>
            </div>
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </div>

        {/* Decorative scribbled highlights */}
        <motion.div
          className="absolute -top-2 -right-2 w-16 h-16 pointer-events-none"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <path
              d="M 25 5 L 30 15 L 35 12 L 32 20 L 40 22 L 33 27 L 38 35 L 28 32 L 25 40 L 22 32 L 12 35 L 17 27 L 10 22 L 18 20 L 15 12 L 20 15 Z"
              fill="none"
              stroke="#F4B860"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Bottom left scribble accent */}
        <motion.svg
          className="absolute -bottom-1 left-4 w-24 h-8 pointer-events-none"
          viewBox="0 0 100 30"
          animate={{ scaleX: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path
            d="M 5 15 Q 15 10, 25 15 T 45 15 T 65 15 T 85 15 Q 92 15, 95 20"
            fill="none"
            stroke="#F4B860"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}