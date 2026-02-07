import React, { useState } from 'react';
import { motion } from 'motion/react';

export function DescriptionTab() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState('Beginner');
  const [learningObjectives, setLearningObjectives] = useState<string[]>([
    'Build modern web applications',
    'Understand core concepts',
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Description */}
      <div className="lg:col-span-2">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-3xl text-[#202732] mb-2"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
          >
            Course Description
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tell students what they'll learn and why it matters
          </p>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a compelling description of your course. What will students learn? What problems will they solve? What makes this course unique?"
            className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
          />

          <div className="mt-4 text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            {description.length} / 2000 characters
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Course Details */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3
            className="text-xl text-[#202732] mb-4"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
          >
            Course Details
          </h3>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-[#202732] mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
                <option>Data Science</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#202732] mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Difficulty Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>All Levels</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Learning Objectives */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3
            className="text-xl text-[#202732] mb-4"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
          >
            Learning Objectives
          </h3>

          <div className="space-y-3">
            {learningObjectives.map((objective, index) => (
              <div
                key={index}
                className="p-3 bg-[#F5AE35]/10 rounded-lg border-l-4 border-[#F5AE35]"
              >
                <p className="text-sm text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {objective}
                </p>
              </div>
            ))}

            <button
              className="w-full py-2 text-sm text-[#6E5B6A] hover:bg-[#6E5B6A]/5 rounded-lg transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              + Add Objective
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
