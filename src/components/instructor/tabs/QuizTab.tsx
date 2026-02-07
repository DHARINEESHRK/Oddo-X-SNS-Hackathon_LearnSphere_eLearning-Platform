import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, HelpCircle, Edit, Trash2, Award } from 'lucide-react';
import { QuizBuilderPage } from '../QuizBuilderPage';
import { useToast } from '../../ui/toast';

interface Quiz {
  id: string;
  title: string;
  questions: number;
  passingScore: number;
  points: number;
}

const mockQuizzes: Quiz[] = [
  { id: '1', title: 'Introduction Knowledge Check', questions: 5, passingScore: 80, points: 50 },
  { id: '2', title: 'Final Assessment', questions: 15, passingScore: 70, points: 150 },
];

export function QuizTab() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const { showToast } = useToast();

  const handleQuizSaved = () => {
    showToast('Quiz added successfully');
    setEditingQuizId(null);
    setIsCreatingQuiz(false);
  };

  // If editing or creating, show the quiz builder
  if (editingQuizId || isCreatingQuiz) {
    return (
      <QuizBuilderPage
        quizId={editingQuizId || 'new'}
        onBack={handleQuizSaved}
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <h2
            className="text-3xl text-[#202732] mb-2"
            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
          >
            Quizzes & Assessments
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Test your students' knowledge and track their progress
          </p>
        </div>

        {/* Quizzes List */}
        {quizzes.length > 0 ? (
          <div className="space-y-4 mb-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 bg-[#F5AE35]/10 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-[#F5AE35]" />
                  </div>

                  {/* Quiz Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-xl text-[#202732] mb-2"
                      style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                    >
                      {quiz.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>
                          {quiz.questions} questions
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>
                          {quiz.points} points
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif' }}>
                        Passing: {quiz.passingScore}%
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => setEditingQuizId(quiz.id)}
                      className="p-2 text-[#6E5B6A] hover:bg-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => setQuizzes(quizzes.filter((q) => q.id !== quiz.id))}
                      className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3
              className="text-2xl text-[#202732] mb-2"
              style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
            >
              No quizzes yet
            </h3>
            <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Create quizzes to test your students' knowledge
            </p>
          </motion.div>
        )}

        {/* Add Quiz Button */}
        <motion.button
          onClick={() => setIsCreatingQuiz(true)}
          className="w-full py-4 border-2 border-dashed border-[#6E5B6A] text-[#6E5B6A] rounded-lg hover:bg-[#6E5B6A] hover:text-white transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          Create Quiz
        </motion.button>
      </div>
    </div>
  );
}
