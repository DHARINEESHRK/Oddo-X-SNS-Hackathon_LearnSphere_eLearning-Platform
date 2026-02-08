import React from 'react';
import { motion } from 'motion/react';

export function Navigation({ onSignIn }: { onSignIn: () => void }) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl text-[#6E5B6A]" style={{ fontFamily: 'Brush Script MT, cursive' }}>
              Learn Sphere
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onSignIn}
              className="bg-[#6E5B6A] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-[#5a4a56]"
              whileHover={{ scale: 1.05 }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              Sign in
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}