import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Paperclip, File, HelpCircle, ListChecks, CheckCircle, Trash2, Link, Loader2 } from 'lucide-react';
import { uploadVideo, uploadPdf, uploadImage, type UploadResponse } from '../../../api/client';

type LessonTab = 'content' | 'description' | 'attachments';

interface LessonData {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration?: string;
  order: number;
  videoUrl?: string;
  documentUrl?: string;
  attachmentUrls?: string[];
}

interface LessonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string | null;
  lesson?: LessonData;
  onSave?: (lesson: LessonData) => void;
  onQuizLessonCreated?: (lessonTitle: string, questionCount: number) => void;
}

export function LessonEditorModal({ isOpen, onClose, lessonId, lesson, onSave, onQuizLessonCreated }: LessonEditorModalProps) {
  const [activeTab, setActiveTab] = useState<LessonTab>('content');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'document' | 'quiz'>('video');
  const [lessonDuration, setLessonDuration] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [quizQuestionCount, setQuizQuestionCount] = useState('5');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);
  const [uploadedDocFile, setUploadedDocFile] = useState<File | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [uploadedDocUrl, setUploadedDocUrl] = useState('');
  const [uploadedAttachmentUrls, setUploadedAttachmentUrls] = useState<string[]>([]);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  // Sync state when the lesson prop changes (editing existing lesson)
  useEffect(() => {
    if (lesson) {
      setLessonTitle(lesson.title);
      setLessonType(lesson.type);
      setLessonDuration(lesson.duration || '');
    } else {
      setLessonTitle('');
      setLessonType('video');
      setLessonDuration('');
    }
    setDocumentContent('');
    setDescription('');
    setVideoUrl('');
    setUploadedVideoFile(null);
    setUploadedDocFile(null);
    setAttachmentFiles([]);
    setActiveTab('content');
    setIsUploading(false);
    setUploadProgress('');
    setUploadError('');
    setUploadedVideoUrl('');
    setUploadedDocUrl('');
    setUploadedAttachmentUrls([]);
  }, [lesson, isOpen]);

  const handleSave = async () => {
    setUploadError('');
    setIsUploading(true);

    try {
      let finalVideoUrl = videoUrl || uploadedVideoUrl;
      let finalDocUrl = uploadedDocUrl;
      let finalAttachmentUrls = [...uploadedAttachmentUrls];

      // Upload video file to backend if selected
      if (lessonType === 'video' && uploadedVideoFile) {
        setUploadProgress('Uploading video…');
        try {
          const res = await uploadVideo(uploadedVideoFile);
          finalVideoUrl = res.file.url;
          setUploadedVideoUrl(res.file.url);
        } catch (err: any) {
          console.warn('Video upload to backend failed, saving locally:', err.message);
          // Continue with local reference — backend may be offline
        }
      }

      // Upload document file to backend if selected
      if (lessonType === 'document' && uploadedDocFile) {
        setUploadProgress('Uploading document…');
        try {
          const res = await uploadPdf(uploadedDocFile);
          finalDocUrl = res.file.url;
          setUploadedDocUrl(res.file.url);
        } catch (err: any) {
          console.warn('Document upload to backend failed, saving locally:', err.message);
        }
      }

      // Upload attachment files to backend
      if (attachmentFiles.length > 0) {
        setUploadProgress(`Uploading ${attachmentFiles.length} attachment(s)…`);
        for (const file of attachmentFiles) {
          try {
            const res = await uploadImage(file);
            finalAttachmentUrls.push(res.file.url);
          } catch (err: any) {
            console.warn(`Attachment upload failed for ${file.name}:`, err.message);
          }
        }
        setUploadedAttachmentUrls(finalAttachmentUrls);
      }

      if (onSave && lesson) {
        onSave({
          ...lesson,
          title: lessonTitle || lesson.title,
          type: lessonType,
          duration: lessonType === 'video' ? (lessonDuration || lesson.duration) : lessonType === 'document' ? 'Reading' : 'Quiz',
          videoUrl: finalVideoUrl || undefined,
          documentUrl: finalDocUrl || undefined,
          attachmentUrls: finalAttachmentUrls.length > 0 ? finalAttachmentUrls : undefined,
        });
      }

      // If quiz type, notify parent to create quiz entry
      if (lessonType === 'quiz' && onQuizLessonCreated) {
        const count = parseInt(quizQuestionCount) || 5;
        onQuizLessonCreated(lessonTitle || lesson?.title || 'Quiz', count);
      }

      onClose();
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'description', label: 'Description' },
    { id: 'attachments', label: 'Attachments' },
  ] as const;

  if (!isOpen) return null;

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
                          <div className="grid grid-cols-3 gap-3">
                            {(['video', 'document', 'quiz'] as const).map((type) => (
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
                          <div className="space-y-4">
                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Video URL or Upload
                              </label>

                              {/* URL input */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="relative flex-1">
                                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="url"
                                    value={videoUrl}
                                    onChange={(e) => { setVideoUrl(e.target.value); setUploadedVideoFile(null); }}
                                    placeholder="Paste YouTube, Vimeo, or direct video URL"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mb-3">
                                <div className="h-px bg-gray-200 flex-1" />
                                <span className="text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>or</span>
                                <div className="h-px bg-gray-200 flex-1" />
                              </div>

                              {/* File upload */}
                              <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) { setUploadedVideoFile(file); setVideoUrl(''); }
                                }}
                              />
                              {uploadedVideoFile ? (
                                <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-green-800 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {uploadedVideoFile.name}
                                    </p>
                                    <p className="text-xs text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {(uploadedVideoFile.size / (1024 * 1024)).toFixed(1)} MB
                                    </p>
                                  </div>
                                  <button onClick={() => { setUploadedVideoFile(null); if (videoInputRef.current) videoInputRef.current.value = ''; }} className="p-1 hover:bg-green-100 rounded">
                                    <Trash2 className="w-4 h-4 text-green-700" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => videoInputRef.current?.click()}
                                  className="border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                                >
                                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Click to upload a video file</p>
                                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Supports MP4, MOV, WebM</p>
                                </div>
                              )}

                              {videoUrl && (
                                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
                                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <p className="text-sm text-blue-700 truncate flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>{videoUrl}</p>
                                  <button onClick={() => setVideoUrl('')} className="p-1 hover:bg-blue-100 rounded">
                                    <Trash2 className="w-3 h-3 text-blue-600" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Duration
                              </label>
                              <input
                                type="text"
                                value={lessonDuration}
                                onChange={(e) => setLessonDuration(e.target.value)}
                                placeholder="e.g., 12:45"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Document Upload (if document type) */}
                        {lessonType === 'document' && (
                          <div className="space-y-4">
                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Upload Document
                              </label>
                              <input
                                ref={docInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.pptx,.ppt,.txt,.md"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) setUploadedDocFile(file);
                                }}
                              />
                              {uploadedDocFile ? (
                                <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-green-800 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {uploadedDocFile.name}
                                    </p>
                                    <p className="text-xs text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {(uploadedDocFile.size / 1024).toFixed(0)} KB
                                    </p>
                                  </div>
                                  <button onClick={() => { setUploadedDocFile(null); if (docInputRef.current) docInputRef.current.value = ''; }} className="p-1 hover:bg-green-100 rounded">
                                    <Trash2 className="w-4 h-4 text-green-700" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => docInputRef.current?.click()}
                                  className="border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                                >
                                  <File className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Click to upload a document</p>
                                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Supports PDF, DOCX, PPTX, or TXT files</p>
                                </div>
                              )}
                            </div>
                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Or write content directly
                              </label>
                              <textarea
                                value={documentContent}
                                onChange={(e) => setDocumentContent(e.target.value)}
                                placeholder="Write your lesson content here using markdown or plain text..."
                                className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Quiz Configuration (if quiz type) */}
                        {lessonType === 'quiz' && (
                          <div className="space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                              <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p
                                  className="text-sm text-yellow-800 font-medium"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  Quiz lessons embed inline assessments
                                </p>
                                <p
                                  className="text-xs text-yellow-600 mt-1"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  Configure the full quiz with questions in the Quiz tab of the course editor.
                                </p>
                              </div>
                            </div>

                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Number of Questions
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="50"
                                value={quizQuestionCount}
                                onChange={(e) => setQuizQuestionCount(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </div>

                            <div>
                              <label
                                className="block text-sm font-medium text-[#202732] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Time Limit (minutes, optional)
                              </label>
                              <input
                                type="number"
                                min="1"
                                placeholder="No time limit"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                              <ListChecks className="w-5 h-5 text-[#6E5B6A]" />
                              <p
                                className="text-sm text-gray-600"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                Use the <strong>Quiz tab</strong> in the course editor to add and manage individual questions.
                              </p>
                            </div>
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
                          ref={attachmentInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.pptx,.ppt,.txt,.md,.zip,.js,.ts,.py,.css,.html,.jpg,.png,.csv"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) setAttachmentFiles(prev => [...prev, ...Array.from(files)]);
                          }}
                        />
                        <div
                          onClick={() => attachmentInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-300 hover:border-[#6E5B6A] rounded-lg p-8 text-center cursor-pointer transition-colors"
                        >
                          <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Click to upload files for students</p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>PDFs, slides, code files, images, etc.</p>
                        </div>

                        {/* Uploaded attachments list */}
                        {attachmentFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {attachmentFiles.length} file{attachmentFiles.length > 1 ? 's' : ''} selected
                            </p>
                            {attachmentFiles.map((file, i) => (
                              <div key={`${file.name}-${i}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <FileText className="w-4 h-4 text-[#6E5B6A] flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#202732] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{file.name}</p>
                                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{(file.size / 1024).toFixed(0)} KB</p>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setAttachmentFiles(prev => prev.filter((_, idx) => idx !== i)); }}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Trash2 className="w-3 h-3 text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Upload Status */}
              {(isUploading || uploadError) && (
                <div className="px-8 pb-2">
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-[#6E5B6A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{uploadProgress || 'Uploading…'}</span>
                    </div>
                  )}
                  {uploadError && (
                    <p className="text-sm text-red-600" style={{ fontFamily: 'Inter, sans-serif' }}>{uploadError}</p>
                  )}
                </div>
              )}

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
                  disabled={isUploading}
                  className={`px-6 py-2.5 rounded-full transition-colors shadow-lg flex items-center gap-2 ${
                    isUploading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#6E5B6A] text-white hover:bg-[#5a4a56]'
                  }`}
                  whileHover={isUploading ? {} : { scale: 1.05, boxShadow: '0 10px 30px rgba(110, 91, 106, 0.3)' }}
                  whileTap={isUploading ? {} : { scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isUploading ? 'Uploading…' : lessonId ? 'Update Lesson' : 'Create Lesson'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
