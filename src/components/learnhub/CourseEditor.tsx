import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Upload, ImageIcon, Plus, FileText, HelpCircle, BarChart3, Save, Video, FileUp, Trash2, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';

type TabType = 'content' | 'description' | 'quiz' | 'insights';

interface Lesson {
  id: string;
  title: string;
  videoFile: File | null;
  videoUrl: string | null;
  pdfFile: File | null;
  pdfUrl: string | null;
  hasQuiz: boolean;
  isExpanded: boolean;
}

interface CourseEditorProps {
  onBack: () => void;
}

export function CourseEditor({ onBack }: CourseEditorProps) {
  const [courseTitle, setCourseTitle] = useState('Untitled Course');
  const [isPublished, setIsPublished] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState('Beginner');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ] as const;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call
    setTimeout(() => {
      // Collect all course data
      const courseData = {
        title: courseTitle,
        description,
        category,
        level,
        coverImage,
        isPublished,
        lessons: lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          hasVideo: !!lesson.videoUrl,
          hasPdf: !!lesson.pdfUrl,
          hasQuiz: lesson.hasQuiz,
        })),
        savedAt: new Date().toISOString(),
      };

      console.log('Saving course:', courseData);
      
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F1F2F4] relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <motion.button
              onClick={onBack}
              className="text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors font-medium"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Back
            </motion.button>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="text-4xl md:text-5xl text-[#202732] bg-transparent border-none outline-none flex-1"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
              placeholder="Enter course title..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            {/* Status Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#202732] font-medium">
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

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-colors ${
                saveSuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-[#6E5B6A] text-white hover:bg-[#5a4a56]'
              } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={!isSaving ? { scale: 1.05 } : {}}
              whileTap={!isSaving ? { scale: 0.98 } : {}}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Course'}
            </motion.button>

            {/* Preview Button */}
            <motion.button
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#6E5B6A] text-[#6E5B6A] rounded-full hover:bg-[#6E5B6A] hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-[#202732] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Course Cover
              </h3>
              
              <div className="relative aspect-video mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className={`absolute inset-0 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    coverImage
                      ? 'border-gray-300 hover:border-[#6E5B6A]'
                      : 'border-gray-300 hover:border-[#F5AE35] bg-gray-50'
                  }`}
                >
                  {coverImage ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={coverImage}
                        alt="Course cover"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload</span>
                    </div>
                  )}
                </label>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Recommended: 1280x720px (16:9)
              </p>
            </motion.div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Tabs */}
              <div className="border-b border-gray-200 px-8">
                <div className="flex gap-8 relative">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 text-sm font-medium relative transition-colors ${
                        activeTab === tab.id
                          ? 'text-[#6E5B6A]'
                          : 'text-gray-500 hover:text-[#6E5B6A]'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  ))}
                  
                  {/* Animated underline with SVG brush stroke */}
                  {tabs.map((tab) =>
                    activeTab === tab.id ? (
                      <motion.div
                        key={tab.id}
                        className="absolute bottom-0 left-0"
                        layoutId="activeTabUnderline"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <svg className="h-2 w-32" viewBox="0 0 128 8">
                          <motion.path
                            d="M2,4 Q32,2 64,4 T126,4"
                            stroke="#F5AE35"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                          />
                        </svg>
                      </motion.div>
                    ) : null
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {activeTab === 'content' && (
                      <ContentTab lessons={lessons} setLessons={setLessons} />
                    )}
                    {activeTab === 'description' && (
                      <DescriptionTab
                        courseTitle={courseTitle}
                        setCourseTitle={setCourseTitle}
                        description={description}
                        setDescription={setDescription}
                        category={category}
                        setCategory={setCategory}
                        level={level}
                        setLevel={setLevel}
                      />
                    )}
                    {activeTab === 'quiz' && <QuizTab />}
                    {activeTab === 'insights' && <InsightsTab />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Content Tab
function ContentTab({ 
  lessons, 
  setLessons 
}: { 
  lessons: Lesson[]; 
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>> 
}) {
  const addLesson = () => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: `Lesson ${lessons.length + 1}`,
      videoFile: null,
      videoUrl: null,
      pdfFile: null,
      pdfUrl: null,
      hasQuiz: false,
      isExpanded: true,
    };
    setLessons([...lessons, newLesson]);
  };

  const deleteLesson = (id: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const toggleLesson = (id: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, isExpanded: !lesson.isExpanded } : lesson
    ));
  };

  const updateLessonTitle = (id: string, title: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, title } : lesson
    ));
  };

  const handleVideoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLessons(lessons.map(lesson => 
        lesson.id === id ? { ...lesson, videoFile: file, videoUrl: url } : lesson
      ));
    }
  };

  const handlePdfUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLessons(lessons.map(lesson => 
        lesson.id === id ? { ...lesson, pdfFile: file, pdfUrl: url } : lesson
      ));
    }
  };

  const toggleQuiz = (id: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, hasQuiz: !lesson.hasQuiz } : lesson
    ));
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
        Course Content
      </h3>
      <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        Upload videos, PDFs, and quizzes for each lesson
      </p>
      
      <div className="space-y-4">
        {lessons.length === 0 ? (
          <motion.div
            className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              No lessons added yet. Start by adding your first lesson!
            </p>
          </motion.div>
        ) : (
          lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="border-2 border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Lesson Header */}
              <div className="bg-gray-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className="text-[#6E5B6A] hover:bg-gray-200 p-2 rounded-lg transition-colors"
                  >
                    {lesson.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => updateLessonTitle(lesson.id, e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-lg font-semibold text-[#202732]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    placeholder="Lesson title..."
                  />
                  
                  <div className="flex items-center gap-2">
                    {lesson.videoUrl && (
                      <span className="text-xs bg-[#6E5B6A] text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    )}
                    {lesson.pdfUrl && (
                      <span className="text-xs bg-[#F5AE35] text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <FileText className="w-3 h-3" /> PDF
                      </span>
                    )}
                    {lesson.hasQuiz && (
                      <span className="text-xs bg-[#9AACB6] text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> Quiz
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors ml-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Lesson Content */}
              <AnimatePresence>
                {lesson.isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-6">
                      {/* Video Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-[#202732] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Video Lecture
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleVideoUpload(lesson.id, e)}
                          className="hidden"
                          id={`video-${lesson.id}`}
                        />
                        <label
                          htmlFor={`video-${lesson.id}`}
                          className="block border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-6 cursor-pointer transition-all bg-gray-50"
                        >
                          {lesson.videoUrl ? (
                            <div className="flex items-center gap-4">
                              <div className="bg-[#6E5B6A] text-white p-3 rounded-lg">
                                <Play className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {lesson.videoFile?.name || 'Video uploaded'}
                                </p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  Click to change video
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Click to upload video
                              </p>
                              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                MP4, MOV, AVI (max 500MB)
                              </p>
                            </div>
                          )}
                        </label>
                      </div>

                      {/* PDF Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-[#202732] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Lesson Notes (PDF)
                        </label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(lesson.id, e)}
                          className="hidden"
                          id={`pdf-${lesson.id}`}
                        />
                        <label
                          htmlFor={`pdf-${lesson.id}`}
                          className="block border-2 border-dashed border-gray-300 hover:border-[#F5AE35] rounded-lg p-6 cursor-pointer transition-all bg-gray-50"
                        >
                          {lesson.pdfUrl ? (
                            <div className="flex items-center gap-4">
                              <div className="bg-[#F5AE35] text-white p-3 rounded-lg">
                                <FileText className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {lesson.pdfFile?.name || 'PDF uploaded'}
                                </p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  Click to change PDF
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Click to upload PDF notes
                              </p>
                              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                PDF format only (max 50MB)
                              </p>
                            </div>
                          )}
                        </label>
                      </div>

                      {/* Quiz Toggle */}
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-[#202732] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Add Quiz
                          </h4>
                          <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Test students' understanding after this lesson
                          </p>
                        </div>
                        
                        <button
                          onClick={() => toggleQuiz(lesson.id)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            lesson.hasQuiz ? 'bg-[#9AACB6]' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                            animate={{ x: lesson.hasQuiz ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
        
        {/* Add New Lesson Button */}
        <motion.button
          onClick={addLesson}
          className="w-full py-4 border-2 border-dashed border-[#6E5B6A] text-[#6E5B6A] rounded-lg hover:bg-[#6E5B6A] hover:text-white transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          Add New Lesson
        </motion.button>
      </div>
    </div>
  );
}

// Description Tab
function DescriptionTab({
  courseTitle,
  setCourseTitle,
  description,
  setDescription,
  category,
  setCategory,
  level,
  setLevel,
}: {
  courseTitle: string;
  setCourseTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
        Course Details
      </h3>
      <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        Tell students what they'll learn in this course
      </p>
      
      {/* Course Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Course Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="e.g., Complete Web Development Bootcamp"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Course Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Course Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter course description..."
          className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>Web Development</option>
            <option>Design</option>
            <option>Business</option>
            <option>Marketing</option>
            <option>Data Science</option>
            <option>Photography</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Level <span className="text-red-500">*</span>
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Quiz Tab
function QuizTab() {
  return (
    <motion.div 
      className="text-center py-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📝
      </motion.div>
      <h3 className="text-2xl font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
        No quizzes yet
      </h3>
      <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
        Create quizzes to test your students' knowledge
      </p>
      
      <motion.button
        className="px-8 py-3 bg-[#6E5B6A] text-white rounded-full hover:bg-[#5a4a56] transition-colors shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(110, 91, 106, 0.3)' }}
        whileTap={{ scale: 0.98 }}
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        Create Quiz
      </motion.button>
    </motion.div>
  );
}

// Insights Tab
function InsightsTab() {
  const stats = [
    { label: 'Total Students', value: '1,247', gradient: 'from-[#6E5B6A] to-[#8b7d8e]' },
    { label: 'Completion Rate', value: '68%', gradient: 'from-[#F5AE35] to-[#f9d998]' },
    { label: 'Avg. Rating', value: '4.7', gradient: 'from-[#9AACB6] to-[#b5c4ce]' },
  ];

  const activities = [
    { text: 'John Doe completed the course', time: '2 hours ago' },
    { text: 'Sarah Smith left a 5-star review', time: '5 hours ago' },
    { text: 'Mike Johnson enrolled in the course', time: '1 day ago' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#202732] mb-6" style={{ fontFamily: 'Caveat, cursive' }}>
        Course Insights
      </h3>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {stat.value}
            </div>
            <div className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-[#202732] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Recent Activity
        </h4>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {activity.text}
              </span>
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
