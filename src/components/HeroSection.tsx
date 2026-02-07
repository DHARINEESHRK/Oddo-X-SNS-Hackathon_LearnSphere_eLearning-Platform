import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { BackgroundAnimation } from './BackgroundAnimation';

export function HeroSection({ onStartLearning }: { onStartLearning?: () => void }) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
      <BackgroundAnimation />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline with Animation */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="text-6xl md:text-7xl lg:text-8xl text-[#202732] mb-6"
            style={{ fontFamily: 'Brush Script MT, cursive' }}
          >
            All your learnings on{' '}
            <span className="relative inline-block">
              <span className="relative z-10">one platform</span>
              {/* Yellow brush stroke animation */}
              <motion.svg
                className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)]"
                style={{ zIndex: 0 }}
                viewBox="0 0 300 80"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
              >
                <motion.path
                  d="M10,40 Q75,20 150,35 T290,40"
                  stroke="#F5AE35"
                  strokeWidth="25"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </motion.svg>
            </span>
            .
          </h1>
        </motion.div>

        {/* Subheadline with Underline Animation */}
        <motion.div
          className="relative inline-block mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="text-2xl md:text-3xl text-[#202732]">
            Simple, efficient, yet{' '}
            <span className="relative inline-block">
              <span className="relative z-10">affordable</span>
              {/* Blue underline animation */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                style={{ zIndex: 0 }}
                viewBox="0 0 200 15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
              >
                <motion.path
                  d="M5,10 Q50,5 100,8 T195,10"
                  stroke="#9AACB6"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
            !
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.button
            onClick={onStartLearning}
            className="bg-[#6E5B6A] text-white px-8 py-4 rounded-xl text-lg shadow-lg"
            initial={{ y: 0 }}
            animate={{
              y: [0, -5, 0],
              boxShadow: [
                '0 10px 20px rgba(110, 91, 106, 0.2)',
                '0 15px 30px rgba(110, 91, 106, 0.3)',
                '0 10px 20px rgba(110, 91, 106, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              y: -8,
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(110, 91, 106, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            Let's start learning
          </motion.button>
        </motion.div>
      </div>

      {/* Curved Section Divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      >
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 Q360,20 720,60 T1440,80 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </section>
  );
}