import React from 'react';
import { motion } from 'motion/react';

export function Navigation({ onSignIn }: { onSignIn: () => void }) {
  const menuItems = ['Courses', 'Categories', 'Community', 'Pricing', 'Help'];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl text-[#6E5B6A]" style={{ fontFamily: 'Brush Script MT, cursive' }}>
              LearnHub
            </span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-[#202732] relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6E5B6A] group-hover:w-full transition-all duration-300 ease-out" />
              </motion.a>
            ))}
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