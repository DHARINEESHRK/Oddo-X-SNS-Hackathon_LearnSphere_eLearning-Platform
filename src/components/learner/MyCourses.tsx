import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BookOpen, CheckCircle, Clock, Award } from 'lucide-react';
import { EmptyState } from '../EmptyState';

export function MyCourses() {
  const { currentUser, getUserEnrollments, getCourseById } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleContinueLearning = (courseId: string, completedLessonIds: string[]) => {
    const course = getCourseById(courseId);
    if (!course) return;

    // Find the first incomplete lesson
    const nextLesson = course.lessons.find(l => !completedLessonIds.includes(l.id));
    if (nextLesson) {
      navigate(`/player/${courseId}/${nextLesson.id}`);
    } else {
      // All lessons done — go to course detail
      navigate(`/course/${courseId}`);
    }
  };

  const userEnrollments = getUserEnrollments(currentUser.id);

  if (userEnrollments.length === 0) {
    return <EmptyState variant="enrollments" />;
  }

  return (
    <div className="space-y-6">
      {userEnrollments.map((enrollment) => {
        const course = getCourseById(enrollment.courseId);
        if (!course) return null;

        return (
          <motion.div
            key={enrollment.id}
            className="bg-white rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-6">
              {/* Course Thumbnail */}
              <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#202732] mb-1">
                      {course.title}
                    </h3>
                    <p className="text-[#9AACB6]">
                      By {course.instructorName}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    enrollment.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {enrollment.status === 'completed' ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#9AACB6]">Progress</span>
                    <span className="text-sm font-semibold text-[#6E5B6A]">
                      {Math.round(enrollment.progress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F1F2F4] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#6E5B6A]"
                      initial={{ width: 0 }}
                      animate={{ width: `${enrollment.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-[#9AACB6]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {enrollment.completedLessons.length} / {course.lessons.length} lessons
                    </span>
                  </div>
                  {enrollment.quizAttempts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>
                        {enrollment.quizAttempts.filter(a => a.passed).length} quizzes passed
                      </span>
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <div className="mt-4">
                  <motion.button
                    onClick={() => handleContinueLearning(course.id, enrollment.completedLessons)}
                    className="bg-[#6E5B6A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5a4a56] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
