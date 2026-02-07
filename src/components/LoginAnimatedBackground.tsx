import React from 'react';
import { motion } from 'motion/react';

export function LoginAnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#F1F2F4] via-[#e8e9f0] to-[#dde0eb] overflow-hidden">
      {/* Floating Gradient Orbs */}
      {/* Purple Orb - Top Left */}
      <motion.div
        className="absolute -top-32 -left-32 w-72 h-72 rounded-full"
        style={{
          background: 'rgba(110, 91, 106, 0.1)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Yellow Orb - Top Right */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
        style={{
          background: 'rgba(245, 174, 53, 0.1)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blue Orb - Bottom Left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
        style={{
          background: 'rgba(154, 172, 182, 0.1)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D Rotating Cubes */}
      {/* Cube 1 - Top Right */}
      <motion.div
        className="absolute top-32 right-40 w-16 h-16 rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(110, 91, 106, 0.2), rgba(110, 91, 106, 0.05))',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Cube 2 - Bottom Right */}
      <motion.div
        className="absolute bottom-40 right-32 w-12 h-12 rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 174, 53, 0.2), rgba(245, 174, 53, 0.05))',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: [0, -360],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Cube 3 - Middle Left */}
      <motion.div
        className="absolute top-1/2 left-40 w-20 h-20 rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(154, 172, 182, 0.2), rgba(154, 172, 182, 0.05))',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: [0, 360],
          rotateZ: [0, -360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{
            opacity: 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
