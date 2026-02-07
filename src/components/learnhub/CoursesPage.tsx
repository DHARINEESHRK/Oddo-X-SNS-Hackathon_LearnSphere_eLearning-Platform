import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LearnHubNavigation } from './LearnHubNavigation';
import { LearnHubSearchBar } from './LearnHubSearchBar';
import { FilterChip } from './FilterChip';
import { CourseCard, CourseData } from './CourseCard';
import { LearnHubBackgroundAnimations } from './LearnHubBackgroundAnimations';
import { FloatingElements } from './FloatingElements';
import { ScrollIndicator } from './ScrollIndicator';
import { CourseEditor } from './CourseEditor';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';
import { InstructorCoursesPage } from '../instructor/InstructorCoursesPage';
import { StudentCourseDetail } from '../student/StudentCourseDetail';
import { LessonPlayer } from '../student/LessonPlayer';

const categories = [
  'All Courses',
  'Web Development',
  'Data Science',
  'Design',
  'Business',
  'Marketing',
  'Photography',
];

const coursesData: CourseData[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the essentials of React including components, hooks, state management, and modern React patterns for building dynamic web applications.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React', 'JavaScript', 'Frontend'],
    rating: 4.8,
    reviewCount: 1234,
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Learn Python programming and data analysis with pandas, numpy, and visualization libraries to extract insights from complex datasets.',
    image: 'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Python', 'Data Analysis', 'ML'],
    rating: 4.9,
    reviewCount: 987,
    category: 'Data Science',
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Design beautiful and intuitive user interfaces with Figma. Learn design systems, prototyping, and user research methodologies.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Figma', 'UI/UX', 'Design Systems'],
    rating: 4.7,
    reviewCount: 756,
    category: 'Design',
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Build effective marketing campaigns across social media, email, and content marketing to grow your brand and reach your target audience.',
    image: 'https://images.unsplash.com/photo-1547621008-d6d6d2e28e81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['SEO', 'Social Media', 'Content'],
    rating: 4.6,
    reviewCount: 543,
    category: 'Marketing',
  },
  {
    id: '5',
    title: 'Business Analytics',
    description: 'Transform data into actionable business insights using analytics tools, statistical methods, and data-driven decision making frameworks.',
    image: 'https://images.unsplash.com/photo-1737703638422-2cfa152cdcb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Analytics', 'Excel', 'Data Viz'],
    rating: 4.5,
    reviewCount: 432,
    category: 'Business',
  },
  {
    id: '6',
    title: 'Photography Basics',
    description: 'Master camera settings, composition techniques, lighting fundamentals, and post-processing to capture stunning professional photographs.',
    image: 'https://images.unsplash.com/photo-1714196543225-accf8ea205a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Camera', 'Composition', 'Editing'],
    rating: 4.8,
    reviewCount: 612,
    category: 'Photography',
  },
];

export function CoursesPage() {
  // ALL HOOKS MUST BE DECLARED FIRST - React Rules of Hooks
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showInstructorDashboard, setShowInstructorDashboard] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const { currentUser } = useApp();

  const isInstructor = currentUser?.role === 'instructor';

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        activeCategory === 'All Courses' || course.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // === CONDITIONAL RENDERING (AFTER ALL HOOKS) ===

  // If showing lesson player, render it
  if (selectedLessonId) {
    return (
      <LessonPlayer
        lessonId={selectedLessonId}
        onBack={() => setSelectedLessonId(null)}
        onComplete={() => {
          console.log('Lesson completed');
        }}
        onNext={() => console.log('Next lesson')}
        onPrevious={() => console.log('Previous lesson')}
        isCourseCompleted={false}
        onViewCourses={() => {
          setSelectedLessonId(null);
          setSelectedCourseId(null);
        }}
        onLeaveReview={() => console.log('Leave review')}
      />
    );
  }

  // If showing course detail, render it
  if (selectedCourseId) {
    return (
      <StudentCourseDetail
        courseId={selectedCourseId}
        onBack={() => setSelectedCourseId(null)}
        onLessonClick={(lessonId) => setSelectedLessonId(lessonId)}
      />
    );
  }

  // If showing instructor dashboard, render it
  if (showInstructorDashboard) {
    return <InstructorCoursesPage />;
  }

  // If showing editor, render editor
  if (showEditor) {
    return <CourseEditor onBack={() => setShowEditor(false)} />;
  }

  // === MAIN COURSES PAGE RENDER ===

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <LearnHubBackgroundAnimations />
      <FloatingElements />

      <LearnHubNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl text-[#202732] relative z-10 px-4"
              style={{ fontFamily: 'Brush Script MT, cursive' }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              Explore Courses
            </motion.h1>

            {/* Animated yellow highlight - using SVG like hero page */}
            <motion.svg
              className="absolute -bottom-3 left-0 w-full h-12 -z-10"
              viewBox="0 0 400 50"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            >
              <motion.path
                d="M10,25 Q100,15 200,20 T390,25"
                stroke="#F5AE35"
                strokeWidth="25"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </motion.svg>

            {/* Decorative sparkles around title */}
            <motion.div
              className="absolute -top-4 -right-4 text-[#F5AE35]"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 text-[#6E5B6A]"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              💫
            </motion.div>
          </div>

          <motion.p
            className="text-xl md:text-2xl text-[#202732] max-w-2xl mx-auto mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover our curated collection of courses designed to help you master new skills and advance your career
          </motion.p>

          <ScrollIndicator />
        </div>

        {/* Search Bar */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <LearnHubSearchBar onSearch={setSearchQuery} />
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          className="mb-16 overflow-x-auto pb-4 scrollbar-hide"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="flex gap-3 min-w-max">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <FilterChip
                  label={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Title for Courses */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-[#6B5B7B]/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
            />
            <motion.h2
              className="text-2xl font-bold text-[#2D3748]"
              style={{ fontFamily: 'Caveat, cursive' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 1.3 }}
            >
              {activeCategory}
            </motion.h2>
            <motion.div
              className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-[#6B5B7B]/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
            />
          </div>
        </motion.div>

        {/* Add Course Button for Instructors */}
        {isInstructor && (
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-[#F4B860] to-[#FFD580] text-white font-bold rounded-2xl shadow-xl shadow-[#F4B860]/40 overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
              onClick={() => setShowInstructorDashboard(true)}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  boxShadow: '0 0 30px rgba(244, 184, 96, 0.6)',
                }}
              />

              <span className="relative z-10 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
                Your Courses
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onClick={() => setSelectedCourseId(course.id)}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <p className="text-[#718096] text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              No courses found matching your criteria.
            </p>
            <p className="text-[#A0AEC0] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}