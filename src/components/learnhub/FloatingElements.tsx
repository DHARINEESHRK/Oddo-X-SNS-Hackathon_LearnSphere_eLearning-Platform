import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, Zap, Star, Sparkles, Rocket } from 'lucide-react';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Icons */}
      <motion.div
        className="absolute opacity-10"
        style={{ top: '15%', left: '8%' }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BookOpen className="w-12 h-12 text-[#6E5B6A]" />
      </motion.div>

      <motion.div
        className="absolute opacity-10"
        style={{ top: '45%', right: '10%' }}
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Award className="w-14 h-14 text-[#F5AE35]" />
      </motion.div>

      <motion.div
        className="absolute opacity-10"
        style={{ top: '70%', left: '12%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 20, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Zap className="w-10 h-10 text-[#6E5B6A]" />
      </motion.div>

      <motion.div
        className="absolute opacity-10"
        style={{ top: '25%', right: '15%' }}
        animate={{
          y: [0, 35, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
        }}
      >
        <Star className="w-11 h-11 text-[#F5AE35] fill-[#F5AE35]" />
      </motion.div>

      <motion.div
        className="absolute opacity-10"
        style={{ top: '60%', right: '20%' }}
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className="w-12 h-12 text-[#F5AE35]" />
      </motion.div>

      <motion.div
        className="absolute opacity-10"
        style={{ top: '80%', left: '25%' }}
        animate={{
          y: [0, -40, 0],
          x: [0, 15, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Rocket className="w-13 h-13 text-[#6E5B6A]" />
      </motion.div>

      {/* Animated Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#6E5B6A] rounded-full opacity-20"
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + i * 11}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + i * 16}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeOut',
          }}
        >
          <Star className="w-3 h-3 text-[#F5AE35] fill-[#F5AE35]" />
        </motion.div>
      ))}
    </div>
  );
}