import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Clock,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';

interface CourseOption {
  id: string;
  name: string;
}

interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  lastActivity: string;
  timeSpent: string;
}

export function ReportingDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress' | 'not-started'>('all');

  // Sample data
  const courses: CourseOption[] = [
    { id: '1', name: 'Introduction to React' },
    { id: '2', name: 'Advanced JavaScript' },
    { id: '3', name: 'UI/UX Design Fundamentals' },
    { id: '4', name: 'Data Structures & Algorithms' },
  ];

  const studentsData: Record<string, StudentProgress[]> = {
    '1': [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: '👩‍💻',
        progress: 100,
        status: 'completed',
        lastActivity: '2 hours ago',
        timeSpent: '12h 30m',
      },
      {
        id: '2',
        name: 'Michael Torres',
        avatar: '👨‍💼',
        progress: 75,
        status: 'in-progress',
        lastActivity: '1 day ago',
        timeSpent: '8h 15m',
      },
      {
        id: '3',
        name: 'Emily Roberts',
        avatar: '👩‍🎓',
        progress: 100,
        status: 'completed',
        lastActivity: '5 hours ago',
        timeSpent: '10h 45m',
      },
      {
        id: '4',
        name: 'James Wilson',
        avatar: '👨‍🔬',
        progress: 45,
        status: 'in-progress',
        lastActivity: '3 days ago',
        timeSpent: '5h 20m',
      },
      {
        id: '5',
        name: 'Olivia Martinez',
        avatar: '👩‍🏫',
        progress: 30,
        status: 'in-progress',
        lastActivity: '12 hours ago',
        timeSpent: '3h 10m',
      },
      {
        id: '6',
        name: 'Daniel Kim',
        avatar: '👨‍💻',
        progress: 100,
        status: 'completed',
        lastActivity: '1 day ago',
        timeSpent: '14h 00m',
      },
      {
        id: '7',
        name: 'Sophia Anderson',
        avatar: '👩‍🔧',
        progress: 0,
        status: 'not-started',
        lastActivity: 'Never',
        timeSpent: '0m',
      },
      {
        id: '8',
        name: 'Lucas Brown',
        avatar: '👨‍🎨',
        progress: 15,
        status: 'in-progress',
        lastActivity: '2 days ago',
        timeSpent: '1h 45m',
      },
    ],
    '2': [
      {
        id: '1',
        name: 'Emma Davis',
        avatar: '👩‍💼',
        progress: 85,
        status: 'in-progress',
        lastActivity: '4 hours ago',
        timeSpent: '9h 20m',
      },
      {
        id: '2',
        name: 'Alexander Lee',
        avatar: '👨‍🎓',
        progress: 100,
        status: 'completed',
        lastActivity: '1 day ago',
        timeSpent: '15h 10m',
      },
    ],
  };

  const currentStudents = studentsData[selectedCourse] || studentsData['1'];
  const currentCourse =
    courses.find((c) => c.id === selectedCourse) || courses[0];

  // Filter students
  const filteredStudents = currentStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const totalLearners = currentStudents.length;
  const completedCount = currentStudents.filter(
    (s) => s.status === 'completed'
  ).length;
  const inProgressCount = currentStudents.filter(
    (s) => s.status === 'in-progress'
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#2FBF71] bg-[#2FBF71]/10 border-[#2FBF71]/30';
      case 'in-progress':
        return 'text-[#F5AE35] bg-[#F5AE35]/10 border-[#F5AE35]/30';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Yet to Start';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-5xl md:text-6xl text-gray-800 mb-2"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
          >
            Course Reports
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Track learner progress and engagement
          </p>
        </motion.div>

        {/* Course Selector */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Select Course
          </label>
          <div className="relative max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#6E5B6A]/30 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-gray-800 font-medium">
                {currentCourse.name}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-[#6E5B6A]/5 transition-colors ${course.id === selectedCourse
                      ? 'bg-[#6E5B6A]/10 text-[#6E5B6A] font-medium'
                      : 'text-gray-700'
                      }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {course.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Learners */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#9AACB6]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#9AACB6]" />
              </div>
            </div>
            <h3
              className="text-3xl font-bold text-gray-800 mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {totalLearners}
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Total Learners
            </p>
          </motion.div>

          {/* In Progress */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5AE35]/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#F5AE35]" />
              </div>
            </div>
            <h3
              className="text-3xl font-bold text-gray-800 mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {inProgressCount}
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              In Progress
            </p>
          </motion.div>

          {/* Completed */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2FBF71]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#2FBF71]" />
              </div>
            </div>
            <h3
              className="text-3xl font-bold text-gray-800 mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {completedCount}
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Completed
            </p>
          </motion.div>
        </div>

        {/* Insight Card */}
        <motion.div
          className="bg-gradient-to-r from-[#6E5B6A]/5 to-[#9AACB6]/5 rounded-2xl p-6 mb-8 border border-[#6E5B6A]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5AE35]/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#F5AE35]" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-gray-800 mb-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Insight
              </h3>
              <p
                className="text-gray-700"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Lesson 3 has the highest drop-off. Consider reviewing the
                content or adding more interactive elements to improve
                engagement.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Student Progress Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Table Header & Filters */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Learner Progress
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search student..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6E5B6A] w-full sm:w-48"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6E5B6A] bg-white appearance-none cursor-pointer w-full sm:w-40"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Yet to Start</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Student Name
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Progress
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Last Activity
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Time Spent
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  >
                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6E5B6A] to-[#8b7d8e] flex items-center justify-center text-xl">
                          {student.avatar}
                        </div>
                        <span
                          className="font-medium text-gray-800"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {student.name}
                        </span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[120px]">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#6E5B6A] to-[#8b7d8e] h-full rounded-full transition-all duration-500"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-sm font-semibold text-gray-700 min-w-[45px]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {student.progress}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          student.status
                        )}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {getStatusLabel(student.status)}
                      </span>
                    </td>

                    {/* Last Activity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>
                          {student.lastActivity}
                        </span>
                      </div>
                    </td>

                    {/* Time Spent */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>
                          {student.timeSpent}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
