import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Clock,
  AlertCircle,
  Sparkles,
  Star,
} from 'lucide-react';

export function InsightsTab() {
  const stats = [
    {
      label: 'Total Enrollments',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      gradient: 'from-[#6E5B6A] to-[#8b7d8e]',
    },
    {
      label: 'Completion Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      gradient: 'from-[#F5AE35] to-[#f9d998]',
    },
    {
      label: 'Avg. Time to Complete',
      value: '14.5 hrs',
      change: '-2 hrs',
      trend: 'up',
      gradient: 'from-[#9AACB6] to-[#b5c4ce]',
    },
    {
      label: 'Student Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      trend: 'up',
      gradient: 'from-[#6E5B6A] to-[#8b7d8e]',
    },
  ];

  const aiInsights = [
    {
      type: 'warning',
      title: 'High Drop-off Detected',
      message: 'Lesson 3 has a 32% drop-off rate - consider breaking it into smaller sections',
      icon: AlertCircle,
      color: 'yellow',
    },
    {
      type: 'success',
      title: 'Strong Engagement',
      message: 'Students spend 18% more time on your video lessons than average',
      icon: Sparkles,
      color: 'purple',
    },
    {
      type: 'tip',
      title: 'Add More Quizzes',
      message: 'Courses with 5+ quizzes see 23% higher completion rates',
      icon: Star,
      color: 'blue',
    },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', progress: 100, score: 98, avatar: 'SJ' },
    { name: 'Michael Chen', progress: 95, score: 94, avatar: 'MC' },
    { name: 'Emily Davis', progress: 90, score: 92, avatar: 'ED' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {stat.value}
            </div>
            <div className="text-sm opacity-90 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              {stat.label}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span style={{ fontFamily: 'Inter, sans-serif' }}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#F5AE35] to-[#f9d998] rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3
              className="text-2xl text-[#202732]"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
            >
              AI Insights
            </h3>
          </div>

          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.color === 'yellow'
                    ? 'bg-yellow-50 border-yellow-400'
                    : insight.color === 'purple'
                    ? 'bg-purple-50 border-[#6E5B6A]'
                    : 'bg-blue-50 border-[#9AACB6]'
                }`}
              >
                <div className="flex gap-3">
                  <insight.icon
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      insight.color === 'yellow'
                        ? 'text-yellow-600'
                        : insight.color === 'purple'
                        ? 'text-[#6E5B6A]'
                        : 'text-[#9AACB6]'
                    }`}
                  />
                  <div>
                    <h4
                      className="font-semibold text-[#202732] mb-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {insight.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3
              className="text-2xl text-[#202732]"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
            >
              Top Performers
            </h3>
          </div>

          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] flex items-center justify-center text-white font-semibold">
                  {student.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4
                    className="font-semibold text-[#202732]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {student.name}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>
                      {student.progress}% complete
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Score: {student.score}%</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    #{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Engagement Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h3
          className="text-2xl text-[#202732] mb-6"
          style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
        >
          Recent Activity
        </h3>

        <div className="space-y-4">
          {[
            { action: 'John Doe completed the course', time: '2 hours ago', type: 'completion' },
            { action: 'Sarah Smith enrolled in the course', time: '5 hours ago', type: 'enrollment' },
            { action: 'Mike Johnson left a 5-star review', time: '1 day ago', type: 'review' },
            { action: '15 new students enrolled', time: '2 days ago', type: 'enrollment' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'completion'
                      ? 'bg-green-500'
                      : activity.type === 'review'
                      ? 'bg-yellow-500'
                      : 'bg-[#6E5B6A]'
                  }`}
                />
                <span className="text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {activity.action}
                </span>
              </div>
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
