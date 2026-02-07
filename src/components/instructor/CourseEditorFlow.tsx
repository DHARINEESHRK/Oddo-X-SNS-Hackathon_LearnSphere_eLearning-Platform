import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowLeft, FileText, Settings, HelpCircle, Book, Save, Check } from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';
import { ContentTab } from './tabs/ContentTab';
import { DescriptionTab } from './tabs/DescriptionTab';
import { OptionsTab } from './tabs/OptionsTab';
import { QuizTab } from './tabs/QuizTab';
import { useApp } from '../../context/AppContext';
import { useToast } from '../ui/toast';
import type { Lesson, Quiz } from '../../types';

type TabType = 'content' | 'description' | 'options' | 'quiz';

interface EditorLesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration?: string;
  order: number;
}

interface CourseEditorFlowProps {
  courseId: string;
  onBack: () => void;
}

export function CourseEditorFlow({ courseId, onBack }: CourseEditorFlowProps) {
  const { createCourse, updateCourse, getCourseById, currentUser } = useApp();
  const { showToast } = useToast();

  const existingCourse = courseId !== 'new' ? getCourseById(courseId) : undefined;

  // ─── Course state ───
  const [courseTitle, setCourseTitle] = useState(
    existingCourse?.title || (courseId === 'new' ? 'Untitled Course' : 'Introduction to React')
  );
  const [isPublished, setIsPublished] = useState(existingCourse?.published ?? false);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [isSaving, setIsSaving] = useState(false);
  const [savedCourseId, setSavedCourseId] = useState<string | null>(courseId !== 'new' ? courseId : null);

  // Content tab state
  const [lessons, setLessons] = useState<EditorLesson[]>(
    existingCourse?.lessons.map((l, i) => ({
      id: l.id,
      title: l.title,
      type: l.videoUrl ? 'video' as const : l.title.toLowerCase().includes('quiz') ? 'quiz' as const : 'document' as const,
      duration: l.duration,
      order: l.order || i + 1,
    })) ?? [
      { id: '1', title: 'Introduction to the Course', type: 'video', duration: '5:30', order: 1 },
      { id: '2', title: 'Setting Up Your Environment', type: 'document', order: 2 },
      { id: '3', title: 'Your First Component', type: 'video', duration: '12:45', order: 3 },
      { id: '4', title: 'Quick Knowledge Check', type: 'quiz', order: 4 },
    ]
  );

  // Description tab state
  const [description, setDescription] = useState(existingCourse?.description ?? '');
  const [category, setCategory] = useState(existingCourse?.category ?? 'Web Development');
  const [level, setLevel] = useState<string>(existingCourse?.level ?? 'beginner');
  const [learningObjectives, setLearningObjectives] = useState<string[]>(
    existingCourse ? ['Build modern web applications', 'Understand core concepts'] : ['Build modern web applications', 'Understand core concepts']
  );

  // Options tab state
  const [isPublicCourse, setIsPublicCourse] = useState(existingCourse?.allowGuests ?? true);
  const [requiresEnrollment, setRequiresEnrollment] = useState(false);
  const [enableComments, setEnableComments] = useState(true);
  const [enableCertificate, setEnableCertificate] = useState(true);
  const [enableDownloads, setEnableDownloads] = useState(false);
  const [maxStudents, setMaxStudents] = useState('');

  // Quiz tab state
  const [quizzes, setQuizzes] = useState<Quiz[]>(existingCourse?.quizzes ?? []);

  // ─── Save handler ───
  const handleSaveCourse = useCallback(() => {
    if (!currentUser) return;

    setIsSaving(true);

    // Map editor lessons → Course.lessons shape
    const courseLessons: Lesson[] = lessons.map((l, i) => ({
      id: l.id.startsWith('lesson-') ? l.id : `lesson-${Date.now()}-${i}`,
      courseId: savedCourseId || '',
      title: l.title,
      description: '',
      content: '',
      videoUrl: l.type === 'video' ? `https://example.com/video-${i}` : undefined,
      duration: l.duration || '10 min',
      order: l.order,
    }));

    const normalizedLevel = level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';
    const validLevel = ['beginner', 'intermediate', 'advanced'].includes(normalizedLevel)
      ? normalizedLevel
      : 'beginner';

    if (savedCourseId && savedCourseId !== 'new') {
      // Update existing
      updateCourse(savedCourseId, {
        title: courseTitle,
        description,
        category,
        level: validLevel,
        published: isPublished,
        allowGuests: isPublicCourse,
        lessons: courseLessons,
        quizzes,
      });
      showToast('Course updated successfully');
    } else {
      // Create new
      const newCourse = createCourse({
        title: courseTitle,
        description,
        thumbnail: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        instructorId: currentUser.id,
        instructorName: currentUser.name,
        category,
        tags: [category],
        level: validLevel,
        duration: `${lessons.length * 15} min`,
        price: 0,
        rating: 0,
        reviewsCount: 0,
        studentsCount: 0,
        published: isPublished,
        allowGuests: isPublicCourse,
        lessons: courseLessons,
        quizzes,
      });
      setSavedCourseId(newCourse.id);
      showToast('Course created successfully');
    }

    setTimeout(() => setIsSaving(false), 600);
  }, [
    currentUser, courseTitle, description, category, level, isPublished, isPublicCourse,
    lessons, quizzes, savedCourseId, createCourse, updateCourse, showToast,
  ]);

  const tabs = [
    { id: 'content', label: 'Content', icon: Book },
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'options', label: 'Options', icon: Settings },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <BackgroundAnimation />

      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>

              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="text-4xl md:text-5xl text-[#202732] bg-transparent border-none outline-none flex-1 min-w-0"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                placeholder="Enter course title..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Publish Toggle */}
              <div className="flex items-center gap-3">
                <span
                  className="text-sm text-[#202732] font-medium whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isPublished ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={() => setIsPublished(!isPublished)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    isPublished ? 'bg-[#6E5B6A]' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                    animate={{ x: isPublished ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Preview Button */}
              <motion.button
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#6E5B6A] text-[#6E5B6A] rounded-full hover:bg-[#6E5B6A] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <Eye className="w-4 h-4" />
                Preview
              </motion.button>

              {/* Save Button */}
              <motion.button
                onClick={handleSaveCourse}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2FBF71] text-white rounded-full hover:bg-[#27a862] transition-colors shadow-lg disabled:opacity-60"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isSaving ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Course
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-8 relative border-t border-gray-100 pt-4">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium relative transition-colors ${
                  activeTab === tab.id ? 'text-[#6E5B6A]' : 'text-gray-500 hover:text-[#6E5B6A]'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}

            {/* Animated Underline */}
            {tabs.map((tab) =>
              activeTab === tab.id ? (
                <motion.div
                  key={tab.id}
                  className="absolute bottom-0 left-0"
                  layoutId="activeTabUnderline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <svg className="h-2 w-24" viewBox="0 0 96 8">
                    <motion.path
                      d="M2,4 Q24,2 48,4 T94,4"
                      stroke="#F5AE35"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </svg>
                </motion.div>
              ) : null
            )}
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeTab === 'content' && (
              <ContentTab
                lessons={lessons}
                onLessonsChange={setLessons}
                onQuizLessonAdded={(lessonTitle, questionCount) => {
                  // Auto-create a placeholder quiz with empty question slots
                  const quizId = `quiz-${Date.now()}`;
                  const placeholderQuestions: import('../../types').Question[] = Array.from({ length: questionCount }, (_, i) => ({
                    id: `q-${quizId}-${i + 1}`,
                    quizId,
                    question: `Question ${i + 1}`,
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctAnswer: 0,
                    points: 10,
                  }));
                  const newQuiz: import('../../types').Quiz = {
                    id: quizId,
                    courseId: savedCourseId || courseId,
                    title: lessonTitle,
                    description: '',
                    questions: placeholderQuestions,
                    passingScore: 70,
                    order: quizzes.length + 1,
                  };
                  setQuizzes(prev => [...prev, newQuiz]);
                  showToast(`Quiz "${lessonTitle}" created with ${questionCount} placeholder questions — edit them in the Quiz tab`);
                }}
              />
            )}
            {activeTab === 'description' && (
              <DescriptionTab
                description={description}
                onDescriptionChange={setDescription}
                category={category}
                onCategoryChange={setCategory}
                level={level}
                onLevelChange={setLevel}
                learningObjectives={learningObjectives}
                onLearningObjectivesChange={setLearningObjectives}
              />
            )}
            {activeTab === 'options' && (
              <OptionsTab
                isPublic={isPublicCourse}
                onPublicChange={setIsPublicCourse}
                requiresEnrollment={requiresEnrollment}
                onRequiresEnrollmentChange={setRequiresEnrollment}
                enableComments={enableComments}
                onEnableCommentsChange={setEnableComments}
                enableCertificate={enableCertificate}
                onEnableCertificateChange={setEnableCertificate}
                enableDownloads={enableDownloads}
                onEnableDownloadsChange={setEnableDownloads}
                maxStudents={maxStudents}
                onMaxStudentsChange={setMaxStudents}
              />
            )}
            {activeTab === 'quiz' && (
              <QuizTab
                quizzes={quizzes}
                onQuizzesChange={setQuizzes}
                courseId={savedCourseId || courseId}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
