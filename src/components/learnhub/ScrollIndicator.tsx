import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <motion.div
        className="text-sm text-[#718096]"
        style={{ fontFamily: 'Inter, sans-serif' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll to explore
      </motion.div>
      <motion.div
        className="w-8 h-12 border-2 border-[#6B5B7B]/30 rounded-full flex items-start justify-center p-2"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-[#6B5B7B] rounded-full"
          animate={{
            y: [0, 16, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
