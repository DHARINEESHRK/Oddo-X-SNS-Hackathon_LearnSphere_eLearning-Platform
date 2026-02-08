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
import { RewardsPage } from '../student/RewardsPage';
import { CertificatePage } from '../student/CertificatePage';
import { ProfilePage } from '../user/ProfilePage';
import { SettingsPage } from '../user/SettingsPage';

const categories = [
  'All Courses',
  'Web Development',
  'Design',
];

const coursesData: CourseData[] = [
  {
    id: 'course-1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites. Master the foundations of web development.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['HTML', 'CSS', 'JavaScript'],
    rating: 4.8,
    reviewCount: 234,
    category: 'Web Development',
  },
  {
    id: 'course-2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including custom hooks, context API, and performance optimization techniques.',
    image: 'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React', 'Hooks', 'Advanced'],
    rating: 4.9,
    reviewCount: 156,
    category: 'Web Development',
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design. Master design thinking and prototyping.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Figma', 'UI/UX', 'Design'],
    rating: 4.7,
    reviewCount: 189,
    category: 'Design',
  },
];

export function CoursesPage() {
  // ALL HOOKS MUST BE DECLARED FIRST - React Rules of Hooks
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showInstructorDashboard, setShowInstructorDashboard] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showRewards, setShowRewards] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { currentUser, getCourseById, completeCourse, getUserEnrollments } = useApp();

  const isInstructor = currentUser?.role === 'instructor';

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory =
        activeCategory === 'All Courses' || course.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // === CONDITIONAL RENDERING (AFTER ALL HOOKS) ===

  // If showing lesson player, render it
  if (selectedLessonId) {
    const course = selectedCourseId ? getCourseById(selectedCourseId) : null;
    const isLastLesson = course?.lessons && course.lessons.length > 0
      ? course.lessons[course.lessons.length - 1].id === selectedLessonId
      : false;

    return (
      <LessonPlayer
        lessonId={selectedLessonId}
        courseId={selectedCourseId || 'demo-course'}
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
        isLastLesson={isLastLesson}
        onCompleteCourse={() => {
          if (selectedCourseId) {
            completeCourse(selectedCourseId);
            setShowCertificate(true);
            setSelectedLessonId(null); // Exit player
          }
        }}
      />
    );
  }

  // If showing certificate, render it
  if (showCertificate && selectedCourseId && currentUser) {
    const course = getCourseById(selectedCourseId);
    return (
      <CertificatePage
        courseName={course?.title || 'Course Completion'}
        studentName={currentUser.name}
        completionDate={new Date().toISOString()}
        onBack={() => {
          setShowCertificate(false);
          setSelectedCourseId(null); // Go back to list
        }}
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
    return (
      <InstructorCoursesPage
        onBack={() => {
          setShowInstructorDashboard(false);
          setSelectedCourseForEdit(null);
        }}
        initialCourseId={selectedCourseForEdit}
      />
    );
  }

  // If showing editor, render editor
  if (showEditor) {
    return <CourseEditor onBack={() => setShowEditor(false)} />;
  }

  // If showing rewards, render rewards
  if (showRewards && currentUser) {
    const userEnrollments = getUserEnrollments(currentUser.id);
    const completedEnrollments = userEnrollments.filter(e => e.status === 'completed');
    const certificates = completedEnrollments.map(e => {
      const course = getCourseById(e.courseId);
      return {
        id: e.courseId,
        courseName: course?.title || 'Unknown Course',
        completedAt: e.completedAt || new Date().toISOString(),
        instructorName: course?.instructorName || 'LearnSphere Instructor',
      };
    });

    return (
      <RewardsPage
        studentName={currentUser.name}
        points={currentUser.points}
        badges={currentUser.badges}
        certificates={certificates}
        onBack={() => setShowRewards(false)}
        onViewCertificate={(courseId) => {
          setShowRewards(false);
          setSelectedCourseId(courseId);
          setShowCertificate(true);
        }}
      />
    );
  }

  // If showing profile, render profile
  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />;
  }

  // If showing settings, render settings
  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  // === MAIN COURSES PAGE RENDER ===

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <LearnHubBackgroundAnimations />
      <FloatingElements />

      <LearnHubNavigation
        onShowRewards={() => setShowRewards(true)}
        onShowYourCourses={() => setShowInstructorDashboard(true)}
        onShowProfile={() => setShowProfile(true)}
        onShowSettings={() => setShowSettings(true)}
      />

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
              onClick={() => {
                if (isInstructor) {
                  setSelectedCourseForEdit(course.id);
                  setShowInstructorDashboard(true);
                } else {
                  setSelectedCourseId(course.id);
                }
              }}
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