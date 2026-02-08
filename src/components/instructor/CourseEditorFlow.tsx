import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowLeft, FileText, Settings, HelpCircle, Book } from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';
import { ContentTab } from './tabs/ContentTab';
import { DescriptionTab } from './tabs/DescriptionTab';
import { OptionsTab } from './tabs/OptionsTab';
import { QuizTab } from './tabs/QuizTab';

type TabType = 'content' | 'description' | 'options' | 'quiz';

interface CourseEditorFlowProps {
  courseId: string;
  onBack: () => void;
}

import { useApp } from '../../context/AppContext';

export function CourseEditorFlow({ courseId, onBack }: CourseEditorFlowProps) {
  const { getCourseById } = useApp();
  const course = courseId === 'new' ? null : getCourseById(courseId);

  const [courseTitle, setCourseTitle] = useState(
    course ? course.title : (courseId === 'new' ? 'Untitled Course' : 'Course Not Found')
  );
  const [isPublished, setIsPublished] = useState(course?.published || false);
  const [activeTab, setActiveTab] = useState<TabType>('content');

  const tabs = [
    { id: 'content', label: 'Content', icon: Book },
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'options', label: 'Options', icon: Settings },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <BackgroundAnimation />

      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>

              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="text-4xl md:text-5xl text-[#202732] bg-transparent border-none outline-none flex-1 min-w-0"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                placeholder="Enter course title..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Publish Toggle */}
              <div className="flex items-center gap-3">
                <span
                  className="text-sm text-[#202732] font-medium whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isPublished ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={() => setIsPublished(!isPublished)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isPublished ? 'bg-[#6E5B6A]' : 'bg-gray-300'
                    }`}
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                    animate={{ x: isPublished ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Preview Button */}
              <motion.button
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#6E5B6A] text-[#6E5B6A] rounded-full hover:bg-[#6E5B6A] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <Eye className="w-4 h-4" />
                Preview
              </motion.button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-8 relative border-t border-gray-100 pt-4">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium relative transition-colors ${activeTab === tab.id ? 'text-[#6E5B6A]' : 'text-gray-500 hover:text-[#6E5B6A]'
                  }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}

            {/* Animated Underline */}
            {tabs.map((tab) =>
              activeTab === tab.id ? (
                <motion.div
                  key={tab.id}
                  className="absolute bottom-0 left-0"
                  layoutId="activeTabUnderline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <svg className="h-2 w-24" viewBox="0 0 96 8">
                    <motion.path
                      d="M2,4 Q24,2 48,4 T94,4"
                      stroke="#F5AE35"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </svg>
                </motion.div>
              ) : null
            )}
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeTab === 'content' && <ContentTab courseId={courseId} />}
            {activeTab === 'description' && <DescriptionTab />}
            {activeTab === 'options' && <OptionsTab />}
            {activeTab === 'quiz' && <QuizTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
