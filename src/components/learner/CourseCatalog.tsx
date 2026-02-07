import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Star, Clock, Users, Lock } from 'lucide-react';
import { Course } from '../../types';

export function CourseCatalog() {
  const { currentUser, getPublishedCourses, enrollInCourse, enrollments } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const publishedCourses = getPublishedCourses();
  
  // Filter courses based on search and filters
  const filteredCourses = publishedCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = ['all', ...Array.from(new Set(publishedCourses.map(c => c.category)))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.userId === currentUser?.id && e.courseId === courseId);
  };

  const handleEnroll = (courseId: string) => {
    if (!currentUser) return;
    enrollInCourse(currentUser.id, courseId);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AACB6]" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F1F2F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E5B6A]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-[#F1F2F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E5B6A]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 bg-[#F1F2F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E5B6A] capitalize"
          >
            {levels.map(level => (
              <option key={level} value={level} className="capitalize">
                {level === 'all' ? 'All Levels' : level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={isEnrolled(course.id)}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#9AACB6] text-lg">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ 
  course, 
  isEnrolled, 
  onEnroll 
}: { 
  course: Course; 
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
}) {
  const { currentUser } = useApp();
  const canStartLearning = currentUser !== null;

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#6E5B6A] capitalize">
          {course.level}
        </div>
        {!course.allowGuests && !canStartLearning && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Login required</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-[#9AACB6]">{course.category}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-[#202732] mb-2">{course.title}</h3>
        <p className="text-[#9AACB6] text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <p className="text-sm text-[#202732] mb-4">
          By <span className="font-semibold">{course.instructorName}</span>
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#9AACB6]">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#F5AE35] text-[#F5AE35]" />
            <span>{course.rating}</span>
            <span>({course.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#6E5B6A]">
              ${course.price}
            </span>
          </div>
          
          {isEnrolled ? (
            <button
              className="bg-[#9AACB6] text-white px-6 py-2 rounded-lg cursor-default"
              disabled
            >
              Enrolled
            </button>
          ) : (
            <motion.button
              onClick={() => onEnroll(course.id)}
              disabled={!canStartLearning}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                canStartLearning
                  ? 'bg-[#6E5B6A] text-white hover:bg-[#5a4a56]'
                  : 'bg-[#F1F2F4] text-[#9AACB6] cursor-not-allowed'
              }`}
              whileHover={canStartLearning ? { scale: 1.05 } : {}}
              whileTap={canStartLearning ? { scale: 0.95 } : {}}
            >
              {canStartLearning ? 'Enroll Now' : 'Login to Enroll'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
