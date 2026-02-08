import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, BookOpen, Clock, MoreVertical, Edit, BarChart3, Copy, Trash2, LayoutGrid, List, Eye, UserPlus, Mail, ArrowLeft } from 'lucide-react';
import { DeleteConfirmationModal } from './modals/DeleteConfirmationModal';
import { InviteAttendeesModal } from './modals/InviteAttendeesModal';
import { ContactAttendeesModal } from './modals/ContactAttendeesModal';
import { ReportingDashboard } from './ReportingDashboard';

type CourseStatus = 'draft' | 'published' | 'archived';

interface Course {
  id: string;
  title: string;
  tags: string[];
  status: CourseStatus;
  isPublished: boolean; // Keep for backward compatibility
  lessons: number;
  duration: string;
  thumbnail: string;
  viewCount?: number;
  totalDuration?: number; // in minutes
  invitedAttendees?: string[]; // Invited learner emails
}

interface InstructorDashboardCoursesProps {
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
  onBack?: () => void;
}


const sampleCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Web Development Fundamentals',
    tags: ['Web Development', 'HTML', 'JavaScript'],
    status: 'published',
    isPublished: true,
    lessons: 24,
    duration: '4h 30m',
    thumbnail: 'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 2450,
    totalDuration: 270
  },
  {
    id: 'course-2',
    title: 'Advanced React Patterns',
    tags: ['React', 'Hooks', 'Advanced'],
    status: 'published',
    isPublished: true,
    lessons: 18,
    duration: '3h 15m',
    thumbnail: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 1820,
    totalDuration: 195
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Principles',
    tags: ['Design', 'Figma', 'UX'],
    status: 'published',
    isPublished: true,
    lessons: 12,
    duration: '2h 45m',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 1250,
    totalDuration: 165
  },
  {
    id: 'course-4',
    title: 'Digital Marketing Masterclass',
    tags: ['Marketing', 'SEO', 'Social Media'],
    status: 'published',
    isPublished: true,
    lessons: 22,
    duration: '4h 10m',
    thumbnail: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 3120,
    totalDuration: 250
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    tags: ['Mobile', 'Flutter', 'Cross-platform'],
    status: 'draft',
    isPublished: false,
    lessons: 28,
    duration: '5h 20m',
    thumbnail: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 89,
    totalDuration: 320
  },
  {
    id: '6',
    title: 'Advanced JavaScript Concepts',
    tags: ['JavaScript', 'Web Development', 'Advanced'],
    status: 'archived',
    isPublished: true,
    lessons: 12,
    duration: '2h 30m',
    thumbnail: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    viewCount: 560,
    totalDuration: 150
  }
];

export function InstructorDashboardCourses({ onCreateCourse, onEditCourse, onBack }: InstructorDashboardCoursesProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [showReporting, setShowReporting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedCourseForAction, setSelectedCourseForAction] = useState<Course | null>(null);

  // Helper function to format duration from minutes
  const formatDuration = (minutes?: number): string => {
    if (!minutes) return '0 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const handleMenuToggle = (courseId: string) => {
    setOpenMenuId(openMenuId === courseId ? null : courseId);
  };

  const handleEdit = (courseId: string) => {
    setOpenMenuId(null);
    onEditCourse(courseId);
  };

  const handleViewAnalytics = (courseId: string) => {
    setOpenMenuId(null);
    setShowReporting(true);
  };

  const handleDeleteClick = (courseId: string) => {
    setOpenMenuId(null);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setCourseToDelete(course);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      setDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  // Invite and Contact handlers
  const handleInviteClick = (courseId: string) => {
    setOpenMenuId(null);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForAction(course);
      setInviteModalOpen(true);
    }
  };

  const handleContactClick = (courseId: string) => {
    setOpenMenuId(null);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForAction(course);
      setContactModalOpen(true);
    }
  };

  const handleInvite = (emails: string[]) => {
    if (selectedCourseForAction) {
      // Update course with invited emails
      setCourses(courses.map(c =>
        c.id === selectedCourseForAction.id
          ? { ...c, invitedAttendees: [...(c.invitedAttendees || []), ...emails] }
          : c
      ));
    }
  };

  const handleSendMessage = (message: string) => {
    // In a real app, this would send the message via API
    console.log('Sending message to attendees:', message);
  };


  // Drag and drop handlers
  const handleDragStart = (course: Course) => {
    setDraggedCourse(course);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: CourseStatus) => {
    if (draggedCourse) {
      setCourses(courses.map(c =>
        c.id === draggedCourse.id
          ? { ...c, status, isPublished: status === 'published' }
          : c
      ));
      setDraggedCourse(null);
    }
  };

  const getCoursesByStatus = (status: CourseStatus) => {
    return courses.filter(c => c.status === status);
  };

  // If showing reporting dashboard, render it
  if (showReporting) {
    return (
      <div className="min-h-screen bg-[#F1F2F4]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <button
            onClick={() => setShowReporting(false)}
            className="mb-4 flex items-center gap-2 text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            ← Back to Courses
          </button>
          <ReportingDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F2F4] py-12">
      <div className="max-w-7xl mx-auto px-8">
        {/* Back Button */}
        {onBack && (
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6E5B6A] hover:bg-white px-4 py-2 rounded-lg transition-colors mb-4"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </motion.button>
        )}

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

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${viewMode === 'list'
                ? 'bg-[#6E5B6A] text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${viewMode === 'kanban'
                ? 'bg-[#6E5B6A] text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <LayoutGrid className="w-4 h-4" />
              Kanban
            </button>
          </div>
        </div>

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Draft Column */}
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('draft')}
              className="bg-gray-50 rounded-2xl p-4 min-h-[500px]"
            >
              <h3
                className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                Draft ({getCoursesByStatus('draft').length})
              </h3>
              <div className="space-y-3">
                {getCoursesByStatus('draft').map((course) => (
                  <motion.div
                    key={course.id}
                    draggable
                    onDragStart={() => handleDragStart(course)}
                    className="bg-white rounded-xl border border-gray-200 p-4 cursor-move hover:shadow-md transition-shadow relative"
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {course.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuToggle(course.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.lessons}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.totalDuration ? formatDuration(course.totalDuration) : course.duration}
                        </span>
                      </div>
                      {course.viewCount !== undefined && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span>{course.viewCount.toLocaleString()} views</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Menu Dropdown */}
                    {openMenuId === course.id && (
                      <div className="absolute right-4 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Edit className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Edit</span>
                        </button>
                        <button
                          onClick={() => handleViewAnalytics(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <BarChart3 className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">View Analytics</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-600">Delete</span>
                        </button>
                        <button
                          onClick={() => handleInviteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <UserPlus className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Invite Attendees</span>
                        </button>
                        <button
                          onClick={() => handleContactClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Mail className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Contact Attendees</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Published Column */}
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('published')}
              className="bg-green-50 rounded-2xl p-4 min-h-[500px]"
            >
              <h3
                className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Published ({getCoursesByStatus('published').length})
              </h3>
              <div className="space-y-3">
                {getCoursesByStatus('published').map((course) => (
                  <motion.div
                    key={course.id}
                    draggable
                    onDragStart={() => handleDragStart(course)}
                    className="bg-white rounded-xl border border-green-200 p-4 cursor-move hover:shadow-md transition-shadow relative"
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {course.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuToggle(course.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.lessons}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.totalDuration ? formatDuration(course.totalDuration) : course.duration}
                        </span>
                      </div>
                      {course.viewCount !== undefined && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span>{course.viewCount.toLocaleString()} views</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Menu Dropdown */}
                    {openMenuId === course.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Edit className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Edit</span>
                        </button>
                        <button
                          onClick={() => handleViewAnalytics(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <BarChart3 className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">View Analytics</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-600">Delete</span>
                        </button>
                        <button
                          onClick={() => handleInviteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <UserPlus className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Invite Attendees</span>
                        </button>
                        <button
                          onClick={() => handleContactClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Mail className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Contact Attendees</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Archived Column */}
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('archived')}
              className="bg-orange-50 rounded-2xl p-4 min-h-[500px]"
            >
              <h3
                className="text-xl font-semibold text-orange-700 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Archived ({getCoursesByStatus('archived').length})
              </h3>
              <div className="space-y-3">
                {getCoursesByStatus('archived').map((course) => (
                  <motion.div
                    key={course.id}
                    draggable
                    onDragStart={() => handleDragStart(course)}
                    className="bg-white rounded-xl border border-orange-200 p-4 cursor-move hover:shadow-md transition-shadow relative"
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {course.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuToggle(course.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Menu Dropdown */}
                    {openMenuId === course.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Edit className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Edit</span>
                        </button>
                        <button
                          onClick={() => handleViewAnalytics(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <BarChart3 className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">View Analytics</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-600">Delete</span>
                        </button>
                        <button
                          onClick={() => handleInviteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <UserPlus className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Invite Attendees</span>
                        </button>
                        <button
                          onClick={() => handleContactClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Mail className="w-4 h-4 text-[#6E5B6A]" />
                          <span className="text-gray-700">Contact Attendees</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View (Original Course Grid) */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course, index) => (
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
                            onClick={() => handleDeleteClick(course.id)}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            <span className="text-red-600">Delete</span>
                          </button>

                          <button
                            onClick={() => handleInviteClick(course.id)}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <UserPlus className="w-4 h-4 text-[#6E5B6A]" />
                            <span className="text-[#202732]">Invite Attendees</span>
                          </button>

                          <button
                            onClick={() => handleContactClick(course.id)}
                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <Mail className="w-4 h-4 text-[#6E5B6A]" />
                            <span className="text-[#202732]">Contact Attendees</span>
                          </button>

                          <div className="border-t border-gray-200 my-1"></div>

                          <button
                            onClick={() => handleDeleteClick(course.id)}
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
                        {course.totalDuration ? formatDuration(course.totalDuration) : course.duration}
                      </span>
                    </div>

                    {course.viewCount !== undefined && (
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {course.viewCount.toLocaleString()} views
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          courseTitle={courseToDelete?.title || ''}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />

        {/* Empty State (if no courses) */}
        {courses.length === 0 && (
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

        {/* Invite Attendees Modal */}
        <InviteAttendeesModal
          isOpen={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          courseTitle={selectedCourseForAction?.title || ''}
          onInvite={handleInvite}
        />

        {/* Contact Attendees Modal */}
        <ContactAttendeesModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          courseTitle={selectedCourseForAction?.title || ''}
          attendeeCount={selectedCourseForAction?.invitedAttendees?.length || 0}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
