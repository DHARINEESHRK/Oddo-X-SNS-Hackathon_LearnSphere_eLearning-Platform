import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Award, TrendingUp, Target, Trophy } from 'lucide-react';

export function MyProgress() {
  const { currentUser, getUserEnrollments, getCourseById } = useApp();

  if (!currentUser) return null;

  const userEnrollments = getUserEnrollments(currentUser.id);
  
  // Calculate stats
  const totalCourses = userEnrollments.length;
  const completedCourses = userEnrollments.filter(e => e.status === 'completed').length;
  const totalLessonsCompleted = userEnrollments.reduce((sum, e) => sum + e.completedLessons.length, 0);
  const totalQuizzesPassed = userEnrollments.reduce(
    (sum, e) => sum + e.quizAttempts.filter(a => a.passed).length, 
    0
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Trophy}
          label="Total Points"
          value={currentUser.points.toString()}
          color="text-[#F5AE35]"
          bgColor="bg-[#F5AE35]/10"
        />
        <StatCard
          icon={Award}
          label="Badges Earned"
          value={currentUser.badges.length.toString()}
          color="text-[#6E5B6A]"
          bgColor="bg-[#6E5B6A]/10"
        />
        <StatCard
          icon={Target}
          label="Courses Completed"
          value={`${completedCourses} / ${totalCourses}`}
          color="text-[#9AACB6]"
          bgColor="bg-[#9AACB6]/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Quizzes Passed"
          value={totalQuizzesPassed.toString()}
          color="text-green-600"
          bgColor="bg-green-100"
        />
      </div>

      {/* Badges Section */}
      {currentUser.badges.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#202732] mb-4">My Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUser.badges.map((badge) => (
              <motion.div
                key={badge.id}
                className="flex items-start gap-3 p-4 bg-[#F1F2F4] rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#202732] mb-1">{badge.name}</h4>
                  <p className="text-sm text-[#9AACB6] mb-1">{badge.description}</p>
                  <p className="text-xs text-[#9AACB6]">
                    Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#202732] mb-4">Learning Activity</h3>
        
        {userEnrollments.length === 0 ? (
          <p className="text-[#9AACB6] text-center py-8">
            No learning activity yet. Start a course to see your progress!
          </p>
        ) : (
          <div className="space-y-4">
            {userEnrollments.map((enrollment) => {
              const course = getCourseById(enrollment.courseId);
              if (!course) return null;

              return (
                <div key={enrollment.id} className="flex items-center gap-4 p-4 bg-[#F1F2F4] rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#202732] mb-1">{course.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-[#9AACB6]">
                      <span>{enrollment.completedLessons.length} lessons completed</span>
                      <span>•</span>
                      <span>{Math.round(enrollment.progress)}% complete</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      enrollment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {enrollment.status === 'completed' ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  bgColor 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: string;
  bgColor: string;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-sm text-[#9AACB6] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#202732]">{value}</p>
    </motion.div>
  );
}
