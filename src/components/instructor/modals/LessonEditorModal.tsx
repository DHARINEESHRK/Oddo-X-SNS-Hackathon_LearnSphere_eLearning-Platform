import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Paperclip, Image } from 'lucide-react';

type LessonTab = 'content' | 'description' | 'attachments';

export interface LessonData {
  title: string;
  type: 'video' | 'document' | 'image' | 'quiz';
  videoFile?: File | null;
  imageFile?: File | null;
  attachments?: File[];
  allowDownload?: boolean;
}

interface LessonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: LessonData) => void;
  lessonId: string | null;
  initialData?: Partial<LessonData>;
}

export function LessonEditorModal({ isOpen, onClose, onSave, lessonId, initialData }: LessonEditorModalProps) {
  const [activeTab, setActiveTab] = useState<LessonTab>('content');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'document' | 'image' | 'quiz'>('video');
  const [allowDownload, setAllowDownload] = useState(true);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setLessonTitle(initialData.title || '');
        setLessonType(initialData.type || 'video');
        setAllowDownload(initialData.allowDownload ?? true);
        // Files cannot be restored from generic object easily without backend URL
        // But if we had them in memory (state), we could restore.
        // For now, title/type restoration is key.
      } else {
        // Reset for new lesson
        setLessonTitle('');
        setLessonType('video');
        setAllowDownload(true);
        setVideoFile(null);
        setImageFile(null);
        setAttachments([]);
        setActiveTab('content');
      }
    }
  }, [isOpen, initialData]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'description', label: 'Description' },
    { id: 'attachments', label: 'Attachments' },
  ] as const;

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      title: lessonTitle,
      type: lessonType,
      videoFile,
      imageFile,
      attachments,
      allowDownload
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-4xl text-[#202732]"
                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                  >
                    {lessonId ? 'Edit Lesson' : 'Add New Lesson'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 relative">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 text-sm font-medium relative transition-colors ${activeTab === tab.id
                        ? 'text-[#6E5B6A]'
                        : 'text-gray-500 hover:text-[#6E5B6A]'
                        }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tab.label}
                    </button>
                  ))}

                  {/* Active Tab Indicator */}
                  {tabs.map((tab) =>
                    activeTab === tab.id ? (
                      <motion.div
                        key={tab.id}
                        className="absolute bottom-0 left-0"
                        layoutId="lessonModalTab"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <div className="h-0.5 w-20 bg-[#F5AE35] rounded-full" />
                      </motion.div>
                    ) : null
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'content' && (
                      <div className="space-y-6">
                        {/* Lesson Title */}
                        <div>
                          <label
                            className="block text-sm font-medium text-[#202732] mb-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Lesson Title
                          </label>
                          <input
                            type="text"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            placeholder="e.g., Introduction to Components"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>

                        {/* Lesson Type */}
                        <div>
                          <label
                            className="block text-sm font-medium text-[#202732] mb-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Lesson Type
                          </label>
                          <div className="grid grid-cols-4 gap-3">
                            {(['video', 'document', 'image', 'quiz'] as const).map((type) => (
                              <button
                                key={type}
                                onClick={() => setLessonType(type)}
                                className={`py-3 px-4 rounded-lg border-2 transition-all ${lessonType === type
                                  ? 'border-[#6E5B6A] bg-[#6E5B6A]/5 text-[#6E5B6A]'
                                  : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Video Upload (if video type) */}
                        {lessonType === 'video' && (
                          <div>
                            <label
                              className="block text-sm font-medium text-[#202732] mb-2"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Video URL or Upload
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleVideoUpload}
                              className="hidden"
                              id="lesson-video-upload"
                            />
                            <label
                              htmlFor="lesson-video-upload"
                              className="block border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                            >
                              {videoFile ? (
                                <div className="flex items-center justify-center gap-3">
                                  <div className="bg-[#6E5B6A] text-white p-3 rounded-lg">
                                    <Upload className="w-6 h-6" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-sm font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {videoFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      Click to change video
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p
                                    className="text-gray-600 mb-1"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    Click to upload video or paste URL
                                  </p>
                                  <p
                                    className="text-xs text-gray-500"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    Supports MP4, MOV, or YouTube/Vimeo links
                                  </p>
                                </>
                              )}
                            </label>
                          </div>
                        )}

                        {/* Image Upload (if image type) */}
                        {lessonType === 'image' && (
                          <div>
                            <label
                              className="block text-sm font-medium text-[#202732] mb-2"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Image Upload
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="lesson-image-upload"
                            />
                            <label
                              htmlFor="lesson-image-upload"
                              className="block border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                            >
                              {imageFile ? (
                                <div className="flex items-center justify-center gap-3">
                                  <div className="bg-[#F5AE35] text-white p-3 rounded-lg">
                                    <Image className="w-6 h-6" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-sm font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {imageFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      Click to change image
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p
                                    className="text-gray-600 mb-1"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    Click to upload image or paste URL
                                  </p>
                                  <p
                                    className="text-xs text-gray-500"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    Supports JPG, PNG, GIF, or image URLs
                                  </p>
                                </>
                              )}
                            </label>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'description' && (
                      <div>
                        <label
                          className="block text-sm font-medium text-[#202732] mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Lesson Description
                        </label>
                        <textarea
                          placeholder="Describe what students will learn in this lesson..."
                          className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>
                    )}

                    {activeTab === 'attachments' && (
                      <div>
                        <label
                          className="block text-sm font-medium text-[#202732] mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Resource Files
                        </label>
                        <input
                          type="file"
                          multiple
                          onChange={handleAttachmentUpload}
                          className="hidden"
                          id="lesson-attachments-upload"
                        />
                        <label
                          htmlFor="lesson-attachments-upload"
                          className="block border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                        >
                          <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p
                            className="text-gray-600 mb-1"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Upload files for students
                          </p>
                          <p
                            className="text-xs text-gray-500"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            PDFs, slides, code files, etc.
                          </p>
                        </label>

                        {/* Uploaded Attachments List */}
                        {attachments.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-[#6E5B6A]" />
                                  <span className="text-sm text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeAttachment(index)}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Download Permission Toggle */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-1"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Allow Downloads
                              </label>
                              <p
                                className="text-xs text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Students can download lesson resources
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setAllowDownload(!allowDownload)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6E5B6A] focus:ring-offset-2 ${allowDownload ? 'bg-[#6E5B6A]' : 'bg-gray-300'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${allowDownload ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 px-8 py-6 flex justify-end gap-3">
                <motion.button
                  onClick={onClose}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-[#6E5B6A] text-white rounded-full hover:bg-[#5a4a56] transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(110, 91, 106, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {lessonId ? 'Update Lesson' : 'Create Lesson'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
