import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Star, X } from 'lucide-react';

interface PointsBadgePopupProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned: number;
  totalPoints: number;
  badgeUnlocked?: {
    name: string;
    icon: string;
  };
  onContinue: () => void;
  onBackToCourse: () => void;
}

export function PointsBadgePopup({
  isOpen,
  onClose,
  pointsEarned,
  totalPoints,
  badgeUnlocked,
  onContinue,
  onBackToCourse,
}: PointsBadgePopupProps) {
  const [displayPoints, setDisplayPoints] = useState(0);

  // Count-up animation for points
  useEffect(() => {
    if (isOpen) {
      setDisplayPoints(0);
      const duration = 1000; // 1 second
      const steps = 30;
      const increment = pointsEarned / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= pointsEarned) {
          setDisplayPoints(pointsEarned);
          clearInterval(timer);
        } else {
          setDisplayPoints(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isOpen, pointsEarned]);

  // Calculate badge progress
  const badgeProgress = Math.min((totalPoints % 100) / 100, 1) * 100;
  const nextBadgePoints = 100 - (totalPoints % 100);

  // Confetti particles
  const confettiParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Confetti */}
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full bg-[#F5AE35]"
              style={{
                left: `${particle.x}%`,
                top: '20%',
              }}
              initial={{ opacity: 0, y: 0, rotate: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [0, 100, 200, 300],
                rotate: [0, 180, 360],
                scale: [0, 1, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: 0.5 + particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Popup Card */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.6, delay: 0.1 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon/Star */}
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  duration: 0.8,
                  delay: 0.3,
                  stiffness: 200,
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5AE35] to-[#FFD580] flex items-center justify-center shadow-lg shadow-[#F5AE35]/30">
                    <Star className="w-10 h-10 text-white fill-white" />
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#F5AE35]/30 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="text-5xl md:text-6xl text-gray-800 mb-3"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Well Done!
              </motion.h2>

              {/* Points Earned */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p
                  className="text-lg text-gray-600 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  You earned
                </p>
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F5AE35]/10 to-[#FFD580]/10 rounded-2xl border-2 border-[#F5AE35]/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <span
                    className="text-4xl font-bold text-[#F5AE35]"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    +{displayPoints}
                  </span>
                  <span
                    className="text-lg text-gray-600 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    points
                  </span>
                </motion.div>
              </motion.div>

              {/* Badge Progress */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-6 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {badgeUnlocked ? (
                  /* Badge Unlocked */
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-[#6E5B6A]" />
                      <h3
                        className="text-xl text-gray-800"
                        style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                      >
                        Badge Unlocked!
                      </h3>
                    </div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] rounded-xl text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.8 }}
                    >
                      <span className="text-lg">{badgeUnlocked.icon}</span>
                      <span
                        className="font-semibold"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {badgeUnlocked.name}
                      </span>
                    </motion.div>
                  </div>
                ) : (
                  /* Progress to Next Badge */
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-sm text-gray-600 font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Next Badge
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {nextBadgePoints} points to go
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${badgeProgress}%` }}
                        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <p
                      className="text-xs text-gray-500 mt-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Total: {totalPoints} points
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {/* Primary Button */}
                <motion.button
                  onClick={onContinue}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold shadow-lg shadow-[#6E5B6A]/30 hover:shadow-xl hover:shadow-[#6E5B6A]/40 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Learning
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  onClick={onBackToCourse}
                  className="flex-1 px-6 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to Course
                </motion.button>
              </motion.div>
            </div>

            {/* Decorative accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#F5AE35]/50 to-transparent"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
