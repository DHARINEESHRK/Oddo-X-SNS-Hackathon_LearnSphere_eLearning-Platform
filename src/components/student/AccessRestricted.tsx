import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft, Mail } from 'lucide-react';

interface AccessRestrictedProps {
  courseName?: string;
  onBackToCourses: () => void;
  onRequestAccess: () => void;
}

export function AccessRestricted({
  courseName = 'this course',
  onBackToCourses,
  onRequestAccess,
}: AccessRestrictedProps) {
  // Floating orbs animation
  const orbVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    },
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orb 1 */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(110, 91, 106, 0.4) 0%, rgba(110, 91, 106, 0) 70%)',
            filter: 'blur(40px)',
          }}
          variants={orbVariants}
          animate="animate"
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient Orb 2 */}
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 174, 53, 0.4) 0%, rgba(245, 174, 53, 0) 70%)',
            filter: 'blur(40px)',
          }}
          variants={orbVariants}
          animate="animate"
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Gradient Orb 3 */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(154, 172, 182, 0.4) 0%, rgba(154, 172, 182, 0) 70%)',
            filter: 'blur(40px)',
          }}
          variants={orbVariants}
          animate="animate"
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Rotating Cube 1 */}
        <motion.div
          className="absolute top-32 right-20 w-24 h-24 border-2 border-[#6E5B6A]/20"
          style={{
            background: 'linear-gradient(135deg, rgba(110, 91, 106, 0.05) 0%, rgba(110, 91, 106, 0.1) 100%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Rotating Cube 2 */}
        <motion.div
          className="absolute bottom-40 left-20 w-16 h-16 border-2 border-[#F5AE35]/20"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 174, 53, 0.05) 0%, rgba(245, 174, 53, 0.1) 100%)',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-12"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Lock Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: 0.2,
            stiffness: 200,
          }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] flex items-center justify-center shadow-lg shadow-[#6E5B6A]/30">
              <Lock className="w-10 h-10 text-white" />
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#6E5B6A]/30 blur-xl"
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

        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-6xl text-gray-800 text-center mb-4"
          style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          This course is invite-only
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          className="text-center text-gray-600 mb-8 text-lg"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Please contact the instructor or administrator to request access to{' '}
          <span className="font-semibold text-gray-800">{courseName}</span>.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Primary Button - Back to Courses */}
          <motion.button
            onClick={onBackToCourses}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold shadow-lg shadow-[#6E5B6A]/30 hover:shadow-xl hover:shadow-[#6E5B6A]/40 transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </motion.button>

          {/* Secondary Button - Request Access */}
          <motion.button
            onClick={onRequestAccess}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-[#6E5B6A]/30 hover:bg-gray-50 transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5" />
            Request Access
          </motion.button>
        </motion.div>

        {/* Additional Help Text */}
        <motion.p
          className="text-center text-sm text-gray-500 mt-6"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Need help?{' '}
          <button className="text-[#6E5B6A] hover:text-[#8b7d8e] font-medium underline underline-offset-2 transition-colors">
            Contact Support
          </button>
        </motion.p>

        {/* Decorative accent at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6E5B6A]/50 to-transparent rounded-b-3xl"></div>
      </motion.div>
    </div>
  );
}
