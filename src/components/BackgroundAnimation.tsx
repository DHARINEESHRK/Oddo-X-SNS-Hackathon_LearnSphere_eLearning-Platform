import React from 'react';
import { motion } from 'motion/react';

export function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Odoo Logo Background - Large and Subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.03, 0.05, 0.03],
          scale: [1, 1.05, 1],
          rotateY: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        <svg
          width="800"
          height="800"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Odoo-inspired logo design */}
          <circle cx="100" cy="100" r="80" fill="#6E5B6A" opacity="0.8" />
          <circle cx="100" cy="100" r="60" fill="#F5AE35" opacity="0.6" />
          <path
            d="M100 40 C127.614 40 150 62.386 150 90 C150 117.614 127.614 140 100 140 C72.386 140 50 117.614 50 90 C50 62.386 72.386 40 100 40 Z"
            fill="#9AACB6"
            opacity="0.5"
          />
          <circle cx="100" cy="90" r="25" fill="#F1F2F4" opacity="0.9" />
          <path
            d="M85 90 Q100 75 115 90 T130 90"
            stroke="#6E5B6A"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Secondary smaller Odoo logo - Top Right */}
      <motion.div
        className="absolute top-20 right-20"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.04"
        >
          <circle cx="100" cy="100" r="60" fill="#6E5B6A" />
          <circle cx="100" cy="100" r="40" fill="#F5AE35" />
          <circle cx="100" cy="100" r="20" fill="#9AACB6" />
        </svg>
      </motion.div>

      {/* Third Odoo logo - Bottom Left */}
      <motion.div
        className="absolute bottom-32 left-20"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 0.9, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.05"
        >
          <circle cx="100" cy="100" r="70" fill="#9AACB6" />
          <circle cx="100" cy="100" r="50" fill="#F5AE35" />
          <path
            d="M70 100 L130 100 M100 70 L100 130"
            stroke="#6E5B6A"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Floating geometric shapes inspired by Odoo */}
      
      {/* Large Circle - Top Right */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(110, 91, 106, 0.05) 0%, rgba(154, 172, 182, 0.08) 100%)',
          filter: 'blur(40px)',
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Medium Circle - Left */}
      <motion.div
        className="absolute top-40 -left-32 w-80 h-80 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 174, 53, 0.06) 0%, rgba(110, 91, 106, 0.04) 100%)',
          filter: 'blur(35px)',
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D Cube Shape - Top Left */}
      <motion.div
        className="absolute top-32 left-1/4 w-32 h-32"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(110, 91, 106, 0.08), rgba(154, 172, 182, 0.06))',
            borderRadius: '12px',
            transform: 'translateZ(20px)',
          }}
        />
      </motion.div>

      {/* 3D Cube Shape - Bottom Right */}
      <motion.div
        className="absolute bottom-40 right-1/4 w-40 h-40"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: [360, 0],
          rotateZ: [0, 180, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 174, 53, 0.07), rgba(110, 91, 106, 0.05))',
            borderRadius: '16px',
            transform: 'translateZ(30px)',
          }}
        />
      </motion.div>

      {/* Small floating dots/particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: i % 2 === 0 ? 'rgba(110, 91, 106, 0.15)' : 'rgba(245, 174, 53, 0.15)',
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Abstract shape - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(154, 172, 182, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Geometric rings */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-48 h-48 rounded-full border-2"
        style={{
          borderColor: 'rgba(110, 91, 106, 0.08)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className="absolute inset-4 rounded-full border-2"
          style={{
            borderColor: 'rgba(245, 174, 53, 0.1)',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </div>
  );
}