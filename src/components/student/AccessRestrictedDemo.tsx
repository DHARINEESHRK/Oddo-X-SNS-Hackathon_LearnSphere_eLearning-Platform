import React, { useState } from 'react';
import { AccessRestricted } from './AccessRestricted';
import { motion } from 'motion/react';

export function AccessRestrictedDemo() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<'back' | 'request'>('back');

  const handleBackToCourses = () => {
    setMessageType('back');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleRequestAccess = () => {
    setMessageType('request');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="relative">
      <AccessRestricted
        courseName="Advanced React Patterns"
        onBackToCourses={handleBackToCourses}
        onRequestAccess={handleRequestAccess}
      />

      {/* Demo Message Toast */}
      {showMessage && (
        <motion.div
          className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-sm border-2 border-gray-200 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2FBF71]/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#2FBF71]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3
                className="font-semibold text-gray-800 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {messageType === 'back'
                  ? 'Navigating Back'
                  : 'Request Sent'}
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {messageType === 'back'
                  ? 'Returning to your courses...'
                  : 'Your access request has been sent to the instructor.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
