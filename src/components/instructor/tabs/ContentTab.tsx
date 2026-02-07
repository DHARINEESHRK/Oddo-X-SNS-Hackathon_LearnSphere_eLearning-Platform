import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Video, FileText, HelpCircle, MoreVertical, GripVertical, Edit, Trash2 } from 'lucide-react';
import { LessonEditorModal } from '../modals/LessonEditorModal';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration?: string;
  order: number;
}

const mockLessons: Lesson[] = [
  { id: '1', title: 'Introduction to the Course', type: 'video', duration: '5:30', order: 1 },
  { id: '2', title: 'Setting Up Your Environment', type: 'document', order: 2 },
  { id: '3', title: 'Your First Component', type: 'video', duration: '12:45', order: 3 },
  { id: '4', title: 'Quick Knowledge Check', type: 'quiz', order: 4 },
];

export function ContentTab() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return Video;
      case 'document':
        return FileText;
      case 'quiz':
        return HelpCircle;
    }
  };

  const getLessonTypeColor = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return 'bg-purple-100 text-purple-700';
      case 'document':
        return 'bg-blue-100 text-blue-700';
      case 'quiz':
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <h2
            className="text-3xl text-[#202732] mb-2"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
          >
            Course Content
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Organize your lessons in the order students will learn
          </p>
        </div>

        {/* Lessons List */}
        <div className="space-y-3 mb-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex items-center gap-4 transition-colors"
            >
              {/* Drag Handle */}
              <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                <GripVertical className="w-5 h-5 text-gray-400" />
              </button>

              {/* Lesson Icon */}
              <div className="flex-shrink-0">
                {React.createElement(getLessonIcon(lesson.type), {
                  className: 'w-5 h-5 text-[#6E5B6A]',
                })}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <h4
                  className="text-[#202732] font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {lesson.title}
                </h4>
                {lesson.duration && (
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {lesson.duration}
                  </p>
                )}
              </div>

              {/* Type Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getLessonTypeColor(
                  lesson.type
                )}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {lesson.type}
              </span>

              {/* Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === lesson.id ? null : lesson.id)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>

                <AnimatePresence>
                  {openMenuId === lesson.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10"
                    >
                      <button
                        onClick={() => {
                          setEditingLessonId(lesson.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Lesson
                      </button>
                      <button
                        onClick={() => {
                          setLessons(lessons.filter((l) => l.id !== lesson.id));
                          setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Lesson
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Lesson Button */}
        <motion.button
          onClick={() => setIsAddingLesson(true)}
          className="w-full py-4 border-2 border-dashed border-[#6E5B6A] text-[#6E5B6A] rounded-lg hover:bg-[#6E5B6A] hover:text-white transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          Add Lesson
        </motion.button>
      </div>

      {/* Lesson Editor Modal */}
      <LessonEditorModal
        isOpen={isAddingLesson || editingLessonId !== null}
        onClose={() => {
          setIsAddingLesson(false);
          setEditingLessonId(null);
        }}
        lessonId={editingLessonId}
      />
    </div>
  );
}
