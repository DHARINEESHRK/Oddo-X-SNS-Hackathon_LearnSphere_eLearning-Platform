import React from 'react';
import { motion } from 'motion/react';

export function LearnHubBackgroundAnimations() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large Floating Gradient Blobs - More Prominent */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #6B5B7B 0%, #8B7B9B 30%, transparent 70%)',
          top: '5%',
          left: '-10%',
        }}
        animate={{
          y: [0, 80, 0],
          x: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #F4B860 0%, #FFD580 30%, transparent 70%)',
          top: '50%',
          right: '-5%',
        }}
        animate={{
          y: [0, -60, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #6B5B7B 0%, #9B8BAB 30%, transparent 70%)',
          bottom: '10%',
          left: '35%',
        }}
        animate={{
          y: [0, 70, 0],
          x: [0, -50, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #F4B860 20%, #6B5B7B 60%, transparent 80%)',
          top: '30%',
          left: '60%',
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rotating Geometric Shapes - Enhanced */}
      {/* Large Diamond */}
      <motion.div
        className="absolute w-32 h-32 opacity-15"
        style={{
          top: '15%',
          right: '20%',
        }}
        animate={{
          rotate: 360,
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
          y: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-full h-full rotate-45 bg-gradient-to-br from-[#6B5B7B] to-[#F4B860] blur-sm rounded-lg" />
      </motion.div>

      {/* Triangle */}
      <motion.div
        className="absolute opacity-12"
        style={{
          top: '65%',
          left: '15%',
        }}
        animate={{
          rotate: -360,
          y: [0, 50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          y: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div
          className="w-0 h-0 blur-sm"
          style={{
            borderLeft: '60px solid transparent',
            borderRight: '60px solid transparent',
            borderBottom: '104px solid #F4B860',
          }}
        />
      </motion.div>

      {/* Square */}
      <motion.div
        className="absolute w-28 h-28 opacity-12"
        style={{
          top: '40%',
          left: '75%',
        }}
        animate={{
          rotate: [0, 180, 360],
          y: [0, -60, 0],
          x: [0, 40, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          y: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#6B5B7B] to-purple-400 blur-sm rounded-2xl" />
      </motion.div>

      {/* Circle */}
      <motion.div
        className="absolute w-24 h-24 rounded-full opacity-18 blur-md"
        style={{
          background: 'linear-gradient(135deg, #F4B860 0%, #6B5B7B 100%)',
          top: '55%',
          left: '10%',
        }}
        animate={{
          y: [0, -70, 0],
          x: [0, 50, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small floating particles */}
      <motion.div
        className="absolute w-16 h-16 rounded-full opacity-10 blur-lg"
        style={{
          background: '#6B5B7B',
          top: '25%',
          left: '45%',
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-12 h-12 rounded-full opacity-10 blur-lg"
        style={{
          background: '#F4B860',
          top: '80%',
          left: '70%',
        }}
        animate={{
          y: [0, 80, 0],
          x: [0, 40, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hexagon shape */}
      <motion.div
        className="absolute opacity-10"
        style={{
          top: '10%',
          left: '30%',
        }}
        animate={{
          rotate: 360,
          y: [0, 45, 0],
          x: [0, -35, 0],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          y: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 17, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" className="blur-sm">
          <polygon
            points="50,5 90,30 90,70 50,95 10,70 10,30"
            fill="url(#hexGradient)"
          />
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B5B7B" />
              <stop offset="100%" stopColor="#F4B860" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Star shape */}
      <motion.div
        className="absolute opacity-10"
        style={{
          top: '75%',
          right: '30%',
        }}
        animate={{
          rotate: -360,
          y: [0, -55, 0],
          x: [0, 45, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
          y: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 19, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="60" height="60" viewBox="0 0 100 100" className="blur-sm">
          <polygon
            points="50,10 61,35 89,35 67,52 77,77 50,60 23,77 33,52 11,35 39,35"
            fill="#F4B860"
          />
        </svg>
      </motion.div>
    </div>
  );
}