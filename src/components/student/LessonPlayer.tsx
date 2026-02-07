import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  PlayCircle,
  Volume2,
  Maximize,
  Settings,
  Star,
  HelpCircle,
} from 'lucide-react';
import { PointsBadgePopup } from './PointsBadgePopup';
import { BackButton } from '../ui/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface LessonPlayerProps {
  lessonId?: string;
  onBack?: () => void;
}

export function LessonPlayer(props: LessonPlayerProps) {
  const params = useParams();
  const navigate = useNavigate();
  const { getCourseById, completeLesson, getEnrollmentForCourse, currentUser } = useApp();
  const lessonId = props.lessonId || params.lessonId || '';
  const courseId = params.courseId || '';
  const onBack = props.onBack || (() => navigate(courseId ? `/course/${courseId}` : '/courses'));

  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionState, setShowCompletionState] = useState(false);
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const [completionResult, setCompletionResult] = useState<{
    pointsEarned: number;
    totalPoints: number;
    newBadge?: { name: string; icon: string };
    isCourseCompleted: boolean;
  } | null>(null);

  // Pull course & lesson data from context
  const contextCourse = getCourseById(courseId);
  const enrollment = getEnrollmentForCourse(courseId);

  const sortedLessons = useMemo(() => {
    if (!contextCourse) return [];
    return [...contextCourse.lessons].sort((a, b) => a.order - b.order);
  }, [contextCourse]);

  const currentIndex = useMemo(() => {
    return sortedLessons.findIndex(l => l.id === lessonId);
  }, [sortedLessons, lessonId]);

  const contextLesson = currentIndex >= 0 ? sortedLessons[currentIndex] : undefined;
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : undefined;
  const isLastLesson = currentIndex === sortedLessons.length - 1;

  // Check if a quiz exists for this course
  const courseQuiz = contextCourse?.quizzes?.[0];

  // Track completed lessons count
  const completedCount = enrollment?.completedLessons?.length ?? 0;
  const totalCount = sortedLessons.length;

  // Check if this lesson was already completed
  useEffect(() => {
    if (enrollment?.completedLessons?.includes(lessonId)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
    setShowCompletionState(false);
    setCompletionResult(null);
  }, [lessonId, enrollment]);

  const lesson = {
    id: lessonId,
    title: contextLesson?.title || 'Lesson Not Found',
    courseTitle: contextCourse?.title || 'Course',
    type: contextLesson?.videoUrl ? 'video' : 'pdf',
    videoUrl: contextLesson?.videoUrl || '',
    duration: contextLesson?.duration || '—',
    description: contextLesson?.description || contextLesson?.content || '',
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showPointsPopup) {
        onBack();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onBack, showPointsPopup]);

  const handleMarkComplete = useCallback(() => {
    if (isCompleted) return;

    const result = completeLesson(courseId, lessonId);
    if (!result) return;

    setIsCompleted(true);
    setCompletionResult(result);

    // Show points popup
    if (result.pointsEarned > 0) {
      setShowPointsPopup(true);
    }

    // If last lesson and course completed, show completion state after popup
    if (result.isCourseCompleted) {
      if (result.pointsEarned === 0) {
        setShowCompletionState(true);
      }
      // Otherwise completion state will show when popup closes
    }
  }, [isCompleted, completeLesson, courseId, lessonId]);

  const handleGoToNext = useCallback(() => {
    if (nextLesson) {
      navigate(`/player/${courseId}/${nextLesson.id}`);
    }
  }, [nextLesson, navigate, courseId]);

  const handleGoToPrevious = useCallback(() => {
    if (prevLesson) {
      navigate(`/player/${courseId}/${prevLesson.id}`);
    }
  }, [prevLesson, navigate, courseId]);

  const handlePointsPopupContinue = useCallback(() => {
    setShowPointsPopup(false);
    if (completionResult?.isCourseCompleted) {
      // Redirect to certificate page
      navigate(`/certificate/${courseId}`);
    } else if (nextLesson) {
      handleGoToNext();
    }
  }, [completionResult, nextLesson, handleGoToNext, navigate, courseId]);

  const handlePointsPopupBack = useCallback(() => {
    setShowPointsPopup(false);
    if (completionResult?.isCourseCompleted) {
      setShowCompletionState(true);
    } else {
      onBack();
    }
  }, [completionResult, onBack]);

  return (
    <div className="min-h-screen bg-[#202732] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#1a1f2e] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          <BackButton onClick={onBack} label="Back to Course" />

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
                  All {totalCount} lessons completed
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
                  onClick={() => navigate(`/certificate/${courseId}`)}
                  className="px-8 py-4 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] text-white rounded-xl font-semibold shadow-lg shadow-[#6E5B6A]/30 hover:shadow-xl hover:shadow-[#6E5B6A]/40 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Certificate
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  onClick={() => navigate('/courses')}
                  className="px-8 py-4 bg-[#1a1f2e] text-white rounded-xl font-semibold border-2 border-[#F5AE35]/30 hover:border-[#F5AE35] hover:bg-[#F5AE35]/5 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse More Courses
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <motion.div
                className="bg-black rounded-2xl overflow-hidden mb-6 aspect-video relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Placeholder Video Player */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#6E5B6A] to-[#202732]">
                  <div className="text-center">
                    <PlayCircle className="w-24 h-24 text-white/50 mx-auto mb-4" />
                    <p
                      className="text-white/70 text-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Video Player Placeholder
                    </p>
                    <p
                      className="text-white/50 text-sm mt-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Duration: {lesson.duration}
                    </p>
                  </div>
                </div>

                {/* Video Controls Overlay (Bottom) */}
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

                {/* Resources */}
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
              </motion.div>
            </div>

            {/* Sidebar - Navigation */}
            <div className="lg:col-span-1">
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
                  {prevLesson && (
                    <motion.button
                      onClick={handleGoToPrevious}
                      className="w-full flex items-center gap-3 bg-[#202732] hover:bg-[#2a3142] px-4 py-3 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-[#F5AE35]" />
                      <div className="text-left flex-1">
                        <span className="text-white font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Previous Lesson
                        </span>
                        <p className="text-gray-400 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {prevLesson.title}
                        </p>
                      </div>
                    </motion.button>
                  )}

                  {nextLesson && (
                    <motion.button
                      onClick={handleGoToNext}
                      className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] hover:from-[#5d4d59] hover:to-[#7a6c7f] px-4 py-3 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-left flex-1">
                        <span className="text-white font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Next Lesson
                        </span>
                        <p className="text-white/70 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {nextLesson.title}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                  )}

                  {/* Start Quiz button — visible when a quiz exists */}
                  {courseQuiz && (
                    <motion.button
                      onClick={() => {
                        // For now, treat quiz as auto-pass: mark all remaining lessons complete, trigger course completion
                        handleMarkComplete();
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-[#F5AE35] hover:bg-[#e09e2a] text-white px-4 py-3 rounded-lg transition-colors font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Start Quiz: {courseQuiz.title}
                      </span>
                    </motion.button>
                  )}

                  {/* View Certificate — only when course is completed */}
                  {isLastLesson && isCompleted && completionResult?.isCourseCompleted && (
                    <motion.button
                      onClick={() => navigate(`/certificate/${courseId}`)}
                      className="w-full flex items-center justify-center gap-2 bg-[#2FBF71] hover:bg-[#27a862] text-white px-4 py-3 rounded-lg transition-colors font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        View Certificate
                      </span>
                    </motion.button>
                  )}
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
                        {completedCount} / {totalCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#2FBF71] h-full rounded-full transition-all duration-500"
                        style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Points & Badge Popup */}
      <PointsBadgePopup
        isOpen={showPointsPopup}
        onClose={() => setShowPointsPopup(false)}
        pointsEarned={completionResult?.pointsEarned ?? 0}
        totalPoints={completionResult?.totalPoints ?? currentUser?.points ?? 0}
        badgeUnlocked={completionResult?.newBadge}
        onContinue={handlePointsPopupContinue}
        onBackToCourse={handlePointsPopupBack}
      />
    </div>
  );
}
