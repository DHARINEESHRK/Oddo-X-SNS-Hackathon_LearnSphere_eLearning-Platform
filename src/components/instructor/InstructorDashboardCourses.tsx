import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, BookOpen, Clock, MoreVertical, Edit, BarChart3, Copy, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  tags: string[];
  isPublished: boolean;
  lessons: number;
  duration: string;
  thumbnail: string;
}

interface InstructorDashboardCoursesProps {
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Bootcamp',
    tags: ['Web Development', 'React', 'JavaScript'],
    isPublished: true,
    lessons: 24,
    duration: '4h 30m',
    thumbnail: 'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    tags: ['Design', 'Figma', 'User Experience'],
    isPublished: true,
    lessons: 18,
    duration: '3h 15m',
    thumbnail: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Python for Data Science',
    tags: ['Programming', 'Python', 'Data Science'],
    isPublished: false,
    lessons: 30,
    duration: '5h 45m',
    thumbnail: 'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    tags: ['Marketing', 'SEO', 'Social Media'],
    isPublished: true,
    lessons: 22,
    duration: '4h 10m',
    thumbnail: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    tags: ['Mobile', 'Flutter', 'Cross-platform'],
    isPublished: false,
    lessons: 28,
    duration: '5h 20m',
    thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: '6',
    title: 'Advanced JavaScript Concepts',
    tags: ['JavaScript', 'Web Development', 'Advanced'],
    isPublished: true,
    lessons: 12,
    duration: '2h 30m',
    thumbnail: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }
];

export function InstructorDashboardCourses({ onCreateCourse, onEditCourse }: InstructorDashboardCoursesProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMenuToggle = (courseId: string) => {
    setOpenMenuId(openMenuId === courseId ? null : courseId);
  };

  const handleEdit = (courseId: string) => {
    setOpenMenuId(null);
    onEditCourse(courseId);
  };

  const handleViewAnalytics = (courseId: string) => {
    setOpenMenuId(null);
    console.log('View analytics for course:', courseId);
  };

  const handleDuplicate = (courseId: string) => {
    setOpenMenuId(null);
    console.log('Duplicate course:', courseId);
  };

  const handleDelete = (courseId: string) => {
    setOpenMenuId(null);
    console.log('Delete course:', courseId);
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4] py-12">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h1 
              className="text-[36px] font-bold text-[#202732] mb-2 relative inline-block"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Courses
              {/* Animated Yellow Brush Underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-4" 
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2,8 Q50,4 100,8 T198,8"
                  stroke="#F5AE35"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </motion.h1>
          </div>

          {/* Create Course Button */}
          <motion.button
            onClick={onCreateCourse}
            className="flex items-center gap-2 px-6 py-3 bg-[#6E5B6A] text-white rounded-xl font-medium shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Create Course
          </motion.button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Three-dot Menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleMenuToggle(course.id)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors shadow-md"
                  >
                    <MoreVertical className="w-5 h-5 text-[#202732]" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openMenuId === course.id && (
                      <motion.div
                        className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 z-10"
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Edit className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-[#202732]">Edit Course</span>
                        </button>
                        
                        <button
                          onClick={() => handleViewAnalytics(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <BarChart3 className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-[#202732]">View Analytics</span>
                        </button>
                        
                        <button
                          onClick={() => handleDuplicate(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Copy className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-[#202732]">Duplicate</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Published/Draft Badge */}
                <div className="absolute bottom-4 left-4">
                  {course.isPublished ? (
                    <span 
                      className="px-3 py-1 bg-[#2FBF71] text-white text-xs font-semibold rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Published
                    </span>
                  ) : (
                    <span 
                      className="px-3 py-1 bg-gray-50 text-[#9CA3AF] border border-[#9CA3AF] text-xs font-semibold rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 
                  className="text-[20px] font-medium text-[#202732] mb-3 line-clamp-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {course.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {course.lessons} lessons
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State (if no courses) */}
        {sampleCourses.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 
              className="text-2xl font-semibold text-[#202732] mb-2"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              No courses yet
            </h3>
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Start creating your first course and share your knowledge!
            </p>
            <motion.button
              onClick={onCreateCourse}
              className="px-8 py-3 bg-[#6E5B6A] text-white rounded-xl font-medium shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Your First Course
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
