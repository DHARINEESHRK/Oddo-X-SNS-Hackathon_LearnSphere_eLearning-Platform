import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  PlayCircle,
  Volume2,
  Maximize,
  Settings,
  Star,
  PanelRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PointsBadgePopup } from './PointsBadgePopup';
import { QuizEngine } from './QuizEngine';
import { Quiz } from '../../types';

interface LessonPlayerProps {
  lessonId: string;
  courseId: string;
  onBack: () => void;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isCourseCompleted?: boolean;
  onViewCourses?: () => void;
  onLeaveReview?: () => void;
  isLastLesson?: boolean;
  onCompleteCourse?: () => void;
}

export function LessonPlayer({
  lessonId,
  courseId,
  onBack,
  onComplete,
  onNext,
  onPrevious,
  isCourseCompleted = false,
  onViewCourses,
  onLeaveReview,
  isLastLesson,
  onCompleteCourse,
}: LessonPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionState, setShowCompletionState] = useState(isCourseCompleted);
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  // Sidebar state with session persistence
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('lessonPlayerSidebarOpen');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const { currentUser, newlyEarnedBadge, clearNewlyEarnedBadge, getCourseById } = useApp() || {
    currentUser: { id: 'guest' },
    newlyEarnedBadge: null,
    clearNewlyEarnedBadge: () => { },
    getCourseById: () => null
  };

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    sessionStorage.setItem('lessonPlayerSidebarOpen', String(newState));
  };

  // ESC key handler to close lesson player (unless popup is open)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showPointsPopup) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onBack, showPointsPopup]);

  // Get actual course and lesson data
  const course = getCourseById(courseId);
  const actualLesson = course?.lessons?.find(l => l.id === lessonId);

  // Build lesson object - use actual data or fallback to sample
  type LessonType = 'video' | 'image' | 'quiz' | 'document';

  const lesson: {
    id: string;
    title: string;
    courseTitle: string;
    type: LessonType;
    videoUrl: string | null;
    pdfUrl: string | null;
    duration: string;
    description: string;
    allowDownload: boolean;
    questions: unknown[];
    passingScore: number;
    rewardPoints: { firstAttempt: number; secondAttempt: number; thirdAttempt: number; fourthAttempt: number };
  } = actualLesson ? {
    id: actualLesson.id,
    title: actualLesson.title,
    courseTitle: course?.title || 'Course',
    type: 'video',
    videoUrl: actualLesson.videoUrl || null,
    pdfUrl: null,
    duration: actualLesson.duration || '10 min',
    description: actualLesson.description || actualLesson.content || 'Learn the concepts covered in this lesson.',
    allowDownload: false,
    questions: [],
    passingScore: 0,
    rewardPoints: { firstAttempt: 50, secondAttempt: 25, thirdAttempt: 10, fourthAttempt: 5 }
  } : {
      id: lessonId,
      title: 'Introduction to the Course',
      courseTitle: course?.title || 'Sample Course',
      type: 'video',
      videoUrl: null,
      pdfUrl: null,
      duration: '10 min',
      description: 'Welcome to this course! In this lesson, you will learn the foundational concepts.',
      allowDownload: false,
      questions: [],
      passingScore: 0,
      rewardPoints: { firstAttempt: 50, secondAttempt: 25, thirdAttempt: 10, fourthAttempt: 5 }
    };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // Save progress to localStorage
    const userId = currentUser?.id || 'guest';
    const storageKey = `progress_${userId}_${courseId}`;
    localStorage.setItem(storageKey, lessonId);

    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#202732] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#1a1f2e] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Course
          </motion.button>

          {/* Course Title */}
          <div className="text-center">
            <p
              className="text-sm text-gray-400 mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {lesson.courseTitle}
            </p>
            <h2
              className="text-xl text-white"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
            >
              {lesson.title}
            </h2>
          </div>

          {/* Mark Complete Button or Show Completion Button */}
          <div className="flex items-center gap-4">
            {!showCompletionState ? (
              <motion.button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${isCompleted
                  ? 'bg-[#2FBF71] text-white cursor-default'
                  : 'bg-[#6E5B6A] text-white hover:bg-[#5d4d59]'
                  }`}
                whileHover={!isCompleted ? { scale: 1.05 } : {}}
                whileTap={!isCompleted ? { scale: 0.98 } : {}}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <CheckCircle2 className="w-5 h-5" />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowCompletionState(false)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Back to Lesson
              </motion.button>
            )}

            {/* Sidebar Toggle Button */}
            <motion.button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-colors ${isSidebarOpen ? 'bg-[#202732] text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <PanelRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {showCompletionState ? (
          /* Course Completion State */
          <motion.div
            className="flex items-center justify-center min-h-[calc(100vh-200px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl w-full text-center">
              {/* Completion Badge */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  {/* Badge Circle */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F5AE35] to-[#FFD580] flex items-center justify-center shadow-2xl shadow-[#F5AE35]/30">
                    <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Decorative rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#F5AE35]/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#F5AE35]/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-6xl md:text-7xl text-white mb-4"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Course Completed!
              </motion.h1>

              {/* Success Message */}
              <motion.p
                className="text-xl text-gray-300 mb-8"
                style={{ fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                You've successfully completed this course
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                className="bg-[#1a1f2e] rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-sm text-gray-400 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Course Progress
                  </span>
                  <span
                    className="text-2xl font-bold text-[#2FBF71]"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    100%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-[#2FBF71] h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p
                  className="text-sm text-gray-400 mt-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  All 12 lessons completed
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {/* Primary Button */}
                <motion.button
                  onClick={onViewCourses}
                  className="px-8 py-4 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold shadow-lg shadow-[#6E5B6A]/30 hover:shadow-xl hover:shadow-[#6E5B6A]/40 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View My Courses
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  onClick={onLeaveReview}
                  className="px-8 py-4 bg-[#1a1f2e] text-white rounded-xl font-semibold border-2 border-[#F5AE35]/30 hover:border-[#F5AE35] hover:bg-[#F5AE35]/5 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Leave a Review
                </motion.button>
              </motion.div>

              {/* Subtle accent decoration */}
              <motion.div
                className="mt-12 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#F5AE35]/50"></div>
                <div className="w-2 h-2 rounded-full bg-[#F5AE35]"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#F5AE35]/50"></div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Regular Lesson Content */
          <div className="flex flex-col lg:flex-row gap-8 relative">
            {/* Media Player Section */}
            <motion.div
              className="flex-1 min-w-0"
              layout
            >
              {/* Media Player */}
              <motion.div
                className={`bg-[#1a1f2e] rounded-2xl overflow-hidden mb-6 relative ${lesson.type === 'quiz' ? 'min-h-[600px]' : 'aspect-video bg-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Render based on lesson type */}
                {lesson.type === 'image' ? (
                  /* Image Display */
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <img
                      src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200"
                      alt={lesson.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : lesson.type === 'quiz' ? (
                  /* Quiz Engine */
                  <div className="absolute inset-0 bg-[#1a1f2e]">
                    <QuizEngine
                      quiz={lesson as unknown as Quiz} // Casting as mock lesson structure matches Quiz interface
                      onComplete={(score, points) => {
                        handleMarkComplete();
                        if (points > 0) {
                          setEarnedPoints(points);
                          setShowPointsPopup(true);
                        }
                      }}
                    />
                  </div>
                ) : (
                  /* Video/Document Placeholder */
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#6E5B6A] to-[#202732]">
                    <div className="text-center">
                      <PlayCircle className="w-24 h-24 text-white/50 mx-auto mb-4" />
                      <p
                        className="text-white/70 text-lg"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {lesson.type === 'document' ? 'Document' : 'Video'} Player Placeholder
                      </p>
                      <p
                        className="text-white/50 text-sm mt-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Duration: {lesson.duration}
                      </p>
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay (Bottom) - Only for video type */}
                {lesson.type === 'video' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <div className="flex items-center gap-4">
                      <button className="text-white hover:text-[#F5AE35] transition-colors">
                        <PlayCircle className="w-8 h-8" />
                      </button>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-[#F5AE35]"></div>
                      </div>
                      <span
                        className="text-sm text-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        4:32 / {lesson.duration}
                      </span>
                      <button className="text-white hover:text-[#F5AE35] transition-colors">
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <button className="text-white hover:text-[#F5AE35] transition-colors">
                        <Settings className="w-6 h-6" />
                      </button>
                      <button className="text-white hover:text-[#F5AE35] transition-colors">
                        <Maximize className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Lesson Description */}
              <motion.div
                className="bg-[#1a1f2e] rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3
                  className="text-2xl text-white mb-4"
                  style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                >
                  About this Lesson
                </h3>
                <p
                  className="text-gray-300 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {lesson.description}
                </p>

                {/* Resources - Only show if downloadable */}
                {lesson.allowDownload && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4
                      className="text-lg text-white mb-3 flex items-center gap-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <Download className="w-5 h-5 text-[#F5AE35]" />
                      Downloadable Resources
                    </h4>
                    <div className="space-y-2">
                      <motion.button
                        className="flex items-center gap-3 w-full bg-[#202732] hover:bg-[#2a3142] px-4 py-3 rounded-lg transition-colors text-left"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F5AE35]/10 flex items-center justify-center flex-shrink-0">
                          <Download className="w-5 h-5 text-[#F5AE35]" />
                        </div>
                        <div className="flex-1">
                          <p
                            className="font-medium text-white"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Lesson Notes.pdf
                          </p>
                          <p
                            className="text-sm text-gray-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            2.4 MB
                          </p>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Sidebar - Navigation */}
            <AnimatePresence initial={false} mode="popLayout">
              {isSidebarOpen && (
                <motion.div
                  className="lg:w-80 flex-shrink-0"
                  initial={{ width: 0, opacity: 0, x: 20 }}
                  animate={{ width: 320, opacity: 1, x: 0 }}
                  exit={{ width: 0, opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0, opacity: { duration: 0.2 } }}
                >
                  <motion.div
                    className="bg-[#1a1f2e] rounded-2xl p-6 sticky top-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3
                      className="text-2xl text-white mb-6"
                      style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                    >
                      Lesson Navigation
                    </h3>

                    {/* Previous/Next Buttons */}
                    <div className="space-y-3">
                      {onPrevious && (
                        <motion.button
                          onClick={onPrevious}
                          className="w-full flex items-center gap-3 bg-[#202732] hover:bg-[#2a3142] px-4 py-3 rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ChevronLeft className="w-5 h-5 text-[#F5AE35]" />
                          <span
                            className="text-white font-medium"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Previous Lesson
                          </span>
                        </motion.button>
                      )}

                      {isLastLesson ? (
                        <motion.button
                          onClick={onCompleteCourse}
                          className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-[#2FBF71] to-[#34D399] hover:from-[#25A05F] hover:to-[#2BBF7F] px-4 py-3 rounded-lg transition-colors shadow-lg shadow-[#2FBF71]/30"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span
                            className="text-white font-medium"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Complete Course
                          </span>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.button>
                      ) : (
                        onNext && (
                          <motion.button
                            onClick={onNext}
                            className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] hover:from-[#5d4d59] hover:to-[#7a6c7f] px-4 py-3 rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span
                              className="text-white font-medium"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Next Lesson
                            </span>
                            <ChevronRight className="w-5 h-5 text-white" />
                          </motion.button>
                        )
                      )}

                      {/* Demo: Test Completion State Button */}
                      <motion.button
                        onClick={() => setShowCompletionState(!showCompletionState)}
                        className="w-full flex items-center justify-center gap-2 bg-[#F5AE35]/10 hover:bg-[#F5AE35]/20 text-[#F5AE35] px-4 py-3 rounded-lg transition-colors border border-[#F5AE35]/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span
                          className="font-medium text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {showCompletionState ? 'Hide' : 'Preview'} Completion
                        </span>
                      </motion.button>

                      {/* Demo: Test Points Popup Button */}
                      <motion.button
                        onClick={() => setShowPointsPopup(true)}
                        className="w-full flex items-center justify-center gap-2 bg-[#6E5B6A]/10 hover:bg-[#6E5B6A]/20 text-[#6E5B6A] px-4 py-3 rounded-lg transition-colors border border-[#6E5B6A]/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Star className="w-4 h-4" />
                        <span
                          className="font-medium text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Preview Points Popup
                        </span>
                      </motion.button>
                    </div>

                    {/* Completion Status */}
                    {isCompleted && (
                      <motion.div
                        className="mt-6 p-4 bg-[#2FBF71]/10 border border-[#2FBF71]/30 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-[#2FBF71]" />
                          <div>
                            <p
                              className="font-semibold text-[#2FBF71]"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Lesson Completed!
                            </p>
                            <p
                              className="text-sm text-gray-300"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Great job! Keep going.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <h4
                        className="text-lg text-white mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                      >
                        Your Progress
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-gray-400 text-sm"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Lessons Completed
                          </span>
                          <span
                            className="text-white font-semibold"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            5 / 12
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-[#2FBF71] h-full w-5/12 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Points & Badge Popup */}
      <PointsBadgePopup
        isOpen={showPointsPopup}
        onClose={() => {
          setShowPointsPopup(false);
          clearNewlyEarnedBadge();
        }}
        pointsEarned={earnedPoints}
        totalPoints={(currentUser?.points || 0)}
        badgeUnlocked={newlyEarnedBadge ? { name: newlyEarnedBadge.name, icon: newlyEarnedBadge.icon } : undefined}
        onContinue={() => {
          setShowPointsPopup(false);
          clearNewlyEarnedBadge();
          onNext?.();
        }}
        onBackToCourse={() => {
          setShowPointsPopup(false);
          clearNewlyEarnedBadge();
          onBack();
        }}
      />
    </div>
  );
}
