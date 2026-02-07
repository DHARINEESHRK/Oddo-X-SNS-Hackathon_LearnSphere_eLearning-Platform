import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PointsBadgePopup } from './PointsBadgePopup';
import { Star, Award } from 'lucide-react';

export function PointsPopupDemo() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F2F4] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl text-gray-800 mb-4"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
          >
            Points & Badge Popup Demo
          </h1>
          <p
            className="text-lg text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Click the buttons below to preview different popup states
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Progress to Next Badge */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F5AE35]/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#F5AE35]" />
              </div>
              <h3
                className="text-2xl text-gray-800"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
              >
                Progress State
              </h3>
            </div>
            <p
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Shows points earned with progress toward the next badge
            </p>
            <ul
              className="text-sm text-gray-500 mb-6 space-y-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <li>• Points earned: +150</li>
              <li>• Total points: 450</li>
              <li>• Progress bar: 50%</li>
              <li>• 50 points to next badge</li>
            </ul>
            <motion.button
              onClick={() => setShowPopup1(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold"
              style={{ fontFamily: 'Inter, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Preview Progress State
            </motion.button>
          </motion.div>

          {/* Card 2: Badge Unlocked */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#6E5B6A]/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#6E5B6A]" />
              </div>
              <h3
                className="text-2xl text-gray-800"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
              >
                Badge Unlocked
              </h3>
            </div>
            <p
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Shows points earned with a newly unlocked badge
            </p>
            <ul
              className="text-sm text-gray-500 mb-6 space-y-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <li>• Points earned: +200</li>
              <li>• Total points: 500</li>
              <li>• Badge: "Quick Learner"</li>
              <li>• Badge icon: 🚀</li>
            </ul>
            <motion.button
              onClick={() => setShowPopup2(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold"
              style={{ fontFamily: 'Inter, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Preview Badge Unlocked
            </motion.button>
          </motion.div>
        </div>

        {/* Design Notes */}
        <motion.div
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3
            className="text-2xl text-gray-800 mb-4"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
          >
            Design Features
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Animations</h4>
              <ul className="text-sm space-y-1">
                <li>• Scale-in popup entrance</li>
                <li>• Points count-up effect</li>
                <li>• Subtle confetti particles (#F5AE35)</li>
                <li>• Smooth progress bar fill</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Design</h4>
              <ul className="text-sm space-y-1">
                <li>• White card on dark overlay</li>
                <li>• Caveat font for headlines</li>
                <li>• Encouraging, not gamified-heavy</li>
                <li>• Professional tone throughout</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popups */}
      <PointsBadgePopup
        isOpen={showPopup1}
        onClose={() => setShowPopup1(false)}
        pointsEarned={150}
        totalPoints={450}
        badgeUnlocked={undefined}
        onContinue={() => {
          setShowPopup1(false);
          console.log('Continue learning clicked');
        }}
        onBackToCourse={() => {
          setShowPopup1(false);
          console.log('Back to course clicked');
        }}
      />

      <PointsBadgePopup
        isOpen={showPopup2}
        onClose={() => setShowPopup2(false)}
        pointsEarned={200}
        totalPoints={500}
        badgeUnlocked={{
          name: 'Quick Learner',
          icon: '🚀',
        }}
        onContinue={() => {
          setShowPopup2(false);
          console.log('Continue learning clicked');
        }}
        onBackToCourse={() => {
          setShowPopup2(false);
          console.log('Back to course clicked');
        }}
      />
    </div>
  );
}
