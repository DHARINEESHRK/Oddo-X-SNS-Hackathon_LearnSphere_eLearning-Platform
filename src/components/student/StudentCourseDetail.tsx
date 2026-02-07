import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
  Star,
  TrendingUp,
} from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface StudentCourseDetailProps {
  courseId: string;
  onBack: () => void;
  onLessonClick: (lessonId: string) => void;
}

export function StudentCourseDetail({
  courseId,
  onBack,
  onLessonClick,
}: StudentCourseDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  // Sample course data
  const course = {
    title: 'React Fundamentals',
    description:
      'Master the fundamentals of React and build modern, interactive web applications with confidence.',
    instructor: 'Sarah Martinez',
    totalLessons: 12,
    completedLessons: 5,
    progress: 42,
    rating: 4.8,
    reviewCount: 324,
  };

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to React',
      type: 'video',
      duration: '12 min',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '2',
      title: 'JSX Fundamentals',
      type: 'video',
      duration: '18 min',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '3',
      title: 'Components Deep Dive',
      type: 'pdf',
      duration: '15 min',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '4',
      title: 'Quiz: React Basics',
      type: 'quiz',
      duration: '10 min',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '5',
      title: 'Props and State',
      type: 'video',
      duration: '22 min',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '6',
      title: 'Event Handling',
      type: 'video',
      duration: '16 min',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: '7',
      title: 'Lifecycle Methods',
      type: 'pdf',
      duration: '20 min',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: '8',
      title: 'Hooks Introduction',
      type: 'video',
      duration: '25 min',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: '9',
      title: 'useState and useEffect',
      type: 'video',
      duration: '30 min',
      isCompleted: false,
      isLocked: true,
    },
    {
      id: '10',
      title: 'Custom Hooks',
      type: 'video',
      duration: '20 min',
      isCompleted: false,
      isLocked: true,
    },
    {
      id: '11',
      title: 'Context API',
      type: 'pdf',
      duration: '18 min',
      isCompleted: false,
      isLocked: true,
    },
    {
      id: '12',
      title: 'Final Quiz',
      type: 'quiz',
      duration: '15 min',
      isCompleted: false,
      isLocked: true,
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Emily Chen',
      userAvatar: 'EC',
      rating: 5,
      date: 'Feb 3, 2026',
      comment:
        'Excellent course! The instructor explains everything clearly and the examples are very practical. Highly recommended for beginners.',
    },
    {
      id: '2',
      userName: 'Michael Brown',
      userAvatar: 'MB',
      rating: 5,
      date: 'Feb 1, 2026',
      comment:
        'Great structure and pacing. I went from zero React knowledge to building my first app in just two weeks!',
    },
    {
      id: '3',
      userName: 'Sarah Johnson',
      userAvatar: 'SJ',
      rating: 4,
      date: 'Jan 28, 2026',
      comment:
        'Very informative course. The only improvement would be to add more advanced topics, but overall fantastic content.',
    },
    {
      id: '4',
      userName: 'David Lee',
      userAvatar: 'DL',
      rating: 5,
      date: 'Jan 25, 2026',
      comment:
        'Perfect for beginners! The step-by-step approach made learning React much less intimidating.',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: 'Reviews' },
  ] as const;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'pdf':
        return FileText;
      case 'quiz':
        return HelpCircle;
      default:
        return PlayCircle;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-[#6E5B6A]/10 text-[#6E5B6A]';
      case 'pdf':
        return 'bg-[#F5AE35]/10 text-[#F5AE35]';
      case 'quiz':
        return 'bg-[#9AACB6]/10 text-[#9AACB6]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <BackgroundAnimation />

      {/* Content */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="px-6 py-6 max-w-6xl mx-auto">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6E5B6A] hover:bg-white px-4 py-2 rounded-lg transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </motion.button>
        </div>

        {/* Course Header */}
        <motion.div
          className="px-6 max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title & Description */}
          <div className="mb-6">
            <h1
              className="text-5xl md:text-6xl text-[#202732] mb-4"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
            >
              {course.title}
            </h1>
            <p
              className="text-lg text-gray-600 max-w-3xl"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {course.description}
            </p>
          </div>

          {/* Instructor & Rating */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] flex items-center justify-center text-white font-semibold">
                SM
              </div>
              <div>
                <p
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Instructor
                </p>
                <p
                  className="font-semibold text-[#202732]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {course.instructor}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#F5AE35] text-[#F5AE35]" />
              <span
                className="font-semibold text-[#202732]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {course.rating}
              </span>
              <span
                className="text-gray-500 text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                ({course.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2FBF71]" />
                <span
                  className="font-semibold text-[#202732]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Your Progress
                </span>
              </div>
              <span
                className="text-2xl font-bold text-[#2FBF71]"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                {course.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <motion.div
                className="bg-[#2FBF71] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-[#6E5B6A]" />
                  <span
                    className="text-2xl font-bold text-[#6E5B6A]"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    {course.totalLessons}
                  </span>
                </div>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Total Lessons
                </p>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#2FBF71]" />
                  <span
                    className="text-2xl font-bold text-[#2FBF71]"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    {course.completedLessons}
                  </span>
                </div>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Completed
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#F5AE35]" />
                  <span
                    className="text-2xl font-bold text-[#F5AE35]"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    {course.totalLessons - course.completedLessons}
                  </span>
                </div>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Remaining
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="px-6 max-w-6xl mx-auto mb-8">
          <div className="flex gap-8 border-b border-gray-300 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-4"
              >
                <span
                  className={`text-lg transition-colors ${activeTab === tab.id
                      ? 'text-[#6E5B6A] font-semibold'
                      : 'text-gray-500 hover:text-[#6E5B6A]'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    layoutId="activeTab"
                  >
                    <svg
                      width="100%"
                      height="2"
                      viewBox="0 0 100 2"
                      preserveAspectRatio="none"
                      className="absolute bottom-0 left-0"
                    >
                      <motion.path
                        d="M0,1 Q25,0 50,1 T100,1"
                        stroke="#F5AE35"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />
                    </svg>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6 max-w-6xl mx-auto pb-12">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-3xl text-[#202732] mb-6"
                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                  >
                    Course Content
                  </h3>

                  {/* Lessons List */}
                  <div className="space-y-3">
                    {lessons.map((lesson, index) => {
                      const TypeIcon = getTypeIcon(lesson.type);
                      return (
                        <motion.button
                          key={lesson.id}
                          onClick={() =>
                            !lesson.isLocked && onLessonClick(lesson.id)
                          }
                          disabled={lesson.isLocked}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${lesson.isLocked
                              ? 'bg-gray-100 cursor-not-allowed opacity-60'
                              : lesson.isCompleted
                                ? 'bg-[#2FBF71]/5 hover:bg-[#2FBF71]/10'
                                : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                            }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={
                            !lesson.isLocked ? { scale: 1.01, x: 5 } : {}
                          }
                        >
                          {/* Status Icon */}
                          <div className="flex-shrink-0">
                            {lesson.isLocked ? (
                              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-gray-500" />
                              </div>
                            ) : lesson.isCompleted ? (
                              <div className="w-10 h-10 rounded-full bg-[#2FBF71] flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#6E5B6A]/10 flex items-center justify-center">
                                <TypeIcon className="w-5 h-5 text-[#6E5B6A]" />
                              </div>
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 text-left">
                            <h4
                              className="font-semibold text-[#202732] mb-1"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeBadgeColor(
                                  lesson.type
                                )}`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {lesson.type.toUpperCase()}
                              </span>
                              <span
                                className="text-sm text-gray-500 flex items-center gap-1"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          {!lesson.isLocked && (
                            <div className="flex-shrink-0">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="text-[#6E5B6A]"
                              >
                                <path
                                  d="M7 4l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-3xl text-[#202732] mb-6"
                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                  >
                    Student Reviews
                  </h3>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {review.userAvatar}
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4
                                className="font-semibold text-[#202732]"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {review.userName}
                              </h4>
                              <span
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {review.date}
                              </span>
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating
                                      ? 'fill-[#F5AE35] text-[#F5AE35]'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>

                            {/* Comment */}
                            <p
                              className="text-gray-600 leading-relaxed"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
