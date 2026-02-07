import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Award,
  X,
  CheckCircle,
  Circle,
  Save,
  Check,
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  points: number;
}

interface QuizBuilderPageProps {
  quizId: string;
  onBack: () => void;
  onSave?: (quizData: { title: string; questions: Question[] }) => void;
}

export function QuizBuilderPage({ quizId, onBack, onSave }: QuizBuilderPageProps) {
  const [quizTitle, setQuizTitle] = useState(
    quizId === 'new' ? 'Untitled Quiz' : 'Introduction Knowledge Check'
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>('1');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What is React?',
      type: 'multiple-choice',
      options: ['A library', 'A framework', 'A language', 'An IDE'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: '2',
      text: 'React uses a virtual DOM',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 0,
      points: 5,
    },
  ]);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Course
              </motion.button>

              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="text-3xl md:text-4xl text-[#202732] bg-transparent border-none outline-none flex-1 min-w-0"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                placeholder="Quiz title..."
              />
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowRewardModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#F5AE35] text-white rounded-full hover:bg-[#e09d25] transition-colors shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(245, 174, 53, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <Award className="w-5 h-5" />
                Reward Logic
              </motion.button>

              {onSave && (
                <motion.button
                  onClick={() => onSave({ title: quizTitle, questions })}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#2FBF71] text-white rounded-full hover:bg-[#27a862] transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  <Save className="w-5 h-5" />
                  Save Quiz
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Question List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3
                className="text-2xl text-[#202732] mb-4"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
              >
                Questions
              </h3>

              <div className="space-y-2 mb-4">
                {questions.map((question, index) => (
                  <motion.button
                    key={question.id}
                    onClick={() => setSelectedQuestionId(question.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedQuestionId === question.id
                        ? 'bg-[#6E5B6A] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-[#202732]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 opacity-50" />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Q{index + 1}: {question.text}
                        </div>
                        <div
                          className="text-xs opacity-75"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {question.points} points
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  const newQuestion: Question = {
                    id: String(Date.now()),
                    text: 'New question',
                    type: 'multiple-choice',
                    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                    correctAnswer: 0,
                    points: 10,
                  };
                  setQuestions([...questions, newQuestion]);
                  setSelectedQuestionId(newQuestion.id);
                }}
                className="w-full py-3 border-2 border-dashed border-[#6E5B6A] text-[#6E5B6A] rounded-lg hover:bg-[#6E5B6A] hover:text-white transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                Add Question
              </motion.button>
            </div>
          </div>

          {/* Right Panel - Question Editor */}
          <div className="lg:col-span-2">
            {selectedQuestion ? (
              <motion.div
                key={selectedQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="space-y-6">
                  {/* Question Text */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#202732] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Question
                    </label>
                    <textarea
                      value={selectedQuestion.text}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((q) =>
                            q.id === selectedQuestion.id ? { ...q, text: e.target.value } : q
                          )
                        )
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      rows={3}
                      placeholder="Enter your question..."
                    />
                  </div>

                  {/* Question Type */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#202732] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Question Type
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          setQuestions(
                            questions.map((q) =>
                              q.id === selectedQuestion.id ? { ...q, type: 'multiple-choice' } : q
                            )
                          )
                        }
                        className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                          selectedQuestion.type === 'multiple-choice'
                            ? 'border-[#6E5B6A] bg-[#6E5B6A]/5 text-[#6E5B6A]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Multiple Choice
                      </button>
                      <button
                        onClick={() =>
                          setQuestions(
                            questions.map((q) =>
                              q.id === selectedQuestion.id ? { ...q, type: 'true-false' } : q
                            )
                          )
                        }
                        className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                          selectedQuestion.type === 'true-false'
                            ? 'border-[#6E5B6A] bg-[#6E5B6A]/5 text-[#6E5B6A]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        True/False
                      </button>
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#202732] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Answer Options
                    </label>
                    <div className="space-y-3">
                      {selectedQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            selectedQuestion.correctAnswer === index
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <button
                            onClick={() =>
                              setQuestions(
                                questions.map((q) =>
                                  q.id === selectedQuestion.id ? { ...q, correctAnswer: index } : q
                                )
                              )
                            }
                          >
                            {selectedQuestion.correctAnswer === index ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>

                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...selectedQuestion.options];
                              newOptions[index] = e.target.value;
                              setQuestions(
                                questions.map((q) =>
                                  q.id === selectedQuestion.id ? { ...q, options: newOptions } : q
                                )
                              );
                            }}
                            className="flex-1 bg-transparent border-none outline-none"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Click the circle to mark the correct answer
                    </p>
                  </div>

                  {/* Points */}
                  <div>
                    <label
                      className="block text-sm font-medium text-[#202732] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Points
                    </label>
                    <input
                      type="number"
                      value={selectedQuestion.points}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((q) =>
                            q.id === selectedQuestion.id
                              ? { ...q, points: Number(e.target.value) }
                              : q
                          )
                        )
                      }
                      className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      min="1"
                    />
                  </div>

                  {/* Delete Question */}
                  <motion.button
                    onClick={() => {
                      setQuestions(questions.filter((q) => q.id !== selectedQuestion.id));
                      setSelectedQuestionId(questions[0]?.id || null);
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Question
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Select a question to edit or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Reward Logic Modal */}
      <RewardModal isOpen={showRewardModal} onClose={() => setShowRewardModal(false)} />
    </div>
  );
}

function RewardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [points, setPoints] = useState(100);
  const [badge, setBadge] = useState('Quiz Master');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#F5AE35] to-[#f9d998] px-8 py-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className="text-3xl"
                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                  >
                    Quiz Rewards
                  </h2>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif' }}>
                  Configure points and badges for completion
                </p>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-[#202732] mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Points Awarded
                  </label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5AE35] focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-[#202732] mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Badge Name
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5AE35] focus:outline-none transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    placeholder="e.g., Quiz Master"
                  />
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-full py-3 bg-[#F5AE35] text-white rounded-full hover:bg-[#e09d25] transition-colors shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Save Rewards
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
