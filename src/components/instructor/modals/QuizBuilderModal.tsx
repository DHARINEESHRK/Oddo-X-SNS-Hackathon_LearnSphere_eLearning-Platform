import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    Plus,
    Trash2,
    GripVertical,
    CheckCircle,
    Circle,
    Award,
    HelpCircle,
} from 'lucide-react';
import { Quiz, Question } from '../../../types';

interface QuizBuilderModalProps {
    isOpen: boolean;
    onClose: () => void;
    quiz?: Quiz | null;
    onSave: (quiz: Partial<Quiz>) => void;
}

export function QuizBuilderModal({
    isOpen,
    onClose,
    quiz,
    onSave,
}: QuizBuilderModalProps) {
    // Quiz metadata
    const [title, setTitle] = useState(quiz?.title || '');
    const [description, setDescription] = useState(quiz?.description || '');
    const [passingScore, setPassingScore] = useState(quiz?.passingScore || 70);

    // Attempt-based rewards
    const [rewardPoints, setRewardPoints] = useState({
        firstAttempt: quiz?.rewardPoints?.firstAttempt || 100,
        secondAttempt: quiz?.rewardPoints?.secondAttempt || 75,
        thirdAttempt: quiz?.rewardPoints?.thirdAttempt || 50,
        fourthAttempt: quiz?.rewardPoints?.fourthAttempt || 25,
    });

    // Questions
    const [questions, setQuestions] = useState<Partial<Question>[]>(
        quiz?.questions || []
    );

    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

    // Add new question
    const addQuestion = () => {
        const newQuestion: Partial<Question> = {
            id: Date.now().toString(),
            question: '',
            options: ['', '', '', ''],
            correctAnswers: [],
            points: 10,
            explanation: '',
        };
        setQuestions([...questions, newQuestion]);
        setEditingQuestionIndex(questions.length);
    };

    // Update question
    const updateQuestion = (index: number, field: keyof Question, value: any) => {
        const updated = [...questions];
        updated[index] = { ...updated[index], [field]: value };
        setQuestions(updated);
    };

    // Delete question
    const deleteQuestion = (index: number) => {
        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
        if (editingQuestionIndex === index) {
            setEditingQuestionIndex(null);
        }
    };

    // Toggle correct answer
    const toggleCorrectAnswer = (questionIndex: number, optionIndex: number) => {
        const question = questions[questionIndex];
        if (!question) return;

        const correctAnswers = question.correctAnswers || [];
        const isCorrect = correctAnswers.includes(optionIndex);

        const updated = isCorrect
            ? correctAnswers.filter(i => i !== optionIndex)
            : [...correctAnswers, optionIndex];

        updateQuestion(questionIndex, 'correctAnswers', updated);
    };

    // Update option text
    const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
        const question = questions[questionIndex];
        if (!question.options) return;

        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        updateQuestion(questionIndex, 'options', updatedOptions);
    };

    // Add option to question
    const addOption = (questionIndex: number) => {
        const question = questions[questionIndex];
        if (!question.options) return;

        const updatedOptions = [...question.options, ''];
        updateQuestion(questionIndex, 'options', updatedOptions);
    };

    // Remove option from question
    const removeOption = (questionIndex: number, optionIndex: number) => {
        const question = questions[questionIndex];
        if (!question.options || question.options.length <= 2) return;

        const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
        const updatedCorrectAnswers = (question.correctAnswers || [])
            .filter(i => i !== optionIndex)
            .map(i => (i > optionIndex ? i - 1 : i));

        const updated = [...questions];
        updated[questionIndex] = {
            ...updated[questionIndex],
            options: updatedOptions,
            correctAnswers: updatedCorrectAnswers,
        };
        setQuestions(updated);
    };

    // Save quiz
    const handleSave = () => {
        const quizData: Partial<Quiz> = {
            title,
            description,
            passingScore,
            questions: questions as Question[],
            rewardPoints,
        };
        onSave(quizData);
        onClose();
    };

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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="border-b border-gray-200 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2
                                            className="text-4xl text-[#202732]"
                                            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                                        >
                                            {quiz ? 'Edit Quiz' : 'Create Quiz'}
                                        </h2>
                                        <p
                                            className="text-sm text-gray-600 mt-1"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            Build your quiz with questions and configure rewards
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 py-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                                <div className="space-y-6">
                                    {/* Quiz Metadata */}
                                    <div className="space-y-4">
                                        {/* Title */}
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-[#202732] mb-2"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Quiz Title
                                            </label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g., Module 1 Assessment"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-[#202732] mb-2"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Describe what this quiz covers..."
                                                rows={3}
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            />
                                        </div>

                                        {/* Passing Score */}
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-[#202732] mb-2"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Passing Score (%)
                                            </label>
                                            <input
                                                type="number"
                                                value={passingScore}
                                                onChange={(e) => setPassingScore(Number(e.target.value))}
                                                min="0"
                                                max="100"
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Attempt-based Rewards */}
                                    <div className="p-6 bg-gradient-to-br from-[#F5AE35]/10 to-[#F5AE35]/5 rounded-xl border-2 border-[#F5AE35]/30">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Award className="w-5 h-5 text-[#F5AE35]" />
                                            <h3
                                                className="text-lg font-semibold text-[#202732]"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Reward Points Configuration
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { key: 'firstAttempt', label: '1st Attempt (X)' },
                                                { key: 'secondAttempt', label: '2nd Attempt (Y)' },
                                                { key: 'thirdAttempt', label: '3rd Attempt (Z)' },
                                                { key: 'fourthAttempt', label: '4th+ Attempt (W)' },
                                            ].map(({ key, label }) => (
                                                <div key={key}>
                                                    <label
                                                        className="block text-sm font-medium text-[#202732] mb-2"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                                    >
                                                        {label}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={rewardPoints[key as keyof typeof rewardPoints]}
                                                        onChange={(e) =>
                                                            setRewardPoints({
                                                                ...rewardPoints,
                                                                [key]: Number(e.target.value),
                                                            })
                                                        }
                                                        min="0"
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#F5AE35] focus:outline-none transition-colors"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Questions Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3
                                                className="text-xl font-semibold text-[#202732]"
                                                style={{ fontFamily: 'Caveat, cursive' }}
                                            >
                                                Questions ({questions.length})
                                            </h3>
                                            <button
                                                onClick={addQuestion}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#6E5B6A] text-white rounded-lg hover:bg-[#5a4a56] transition-colors"
                                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Question
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {questions.map((question, qIndex) => (
                                                <motion.div
                                                    key={question.id || qIndex}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200"
                                                >
                                                    {/* Question Header */}
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-grab" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span
                                                                    className="text-sm font-semibold text-gray-600"
                                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                                >
                                                                    Question {qIndex + 1}
                                                                </span>
                                                                <input
                                                                    type="number"
                                                                    value={question.points || 10}
                                                                    onChange={(e) =>
                                                                        updateQuestion(qIndex, 'points', Number(e.target.value))
                                                                    }
                                                                    min="1"
                                                                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:border-[#6E5B6A] focus:outline-none"
                                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                                    placeholder="Points"
                                                                />
                                                                <span
                                                                    className="text-xs text-gray-500"
                                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                                >
                                                                    pts
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={question.question || ''}
                                                                onChange={(e) =>
                                                                    updateQuestion(qIndex, 'question', e.target.value)
                                                                }
                                                                placeholder="Enter your question..."
                                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none"
                                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => deleteQuestion(qIndex)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Options */}
                                                    <div className="space-y-2 ml-8">
                                                        {question.options?.map((option, oIndex) => (
                                                            <div key={oIndex} className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => toggleCorrectAnswer(qIndex, oIndex)}
                                                                    className="flex-shrink-0"
                                                                >
                                                                    {question.correctAnswers?.includes(oIndex) ? (
                                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                                    ) : (
                                                                        <Circle className="w-5 h-5 text-gray-400" />
                                                                    )}
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    value={option}
                                                                    onChange={(e) =>
                                                                        updateOption(qIndex, oIndex, e.target.value)
                                                                    }
                                                                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none"
                                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                                />
                                                                {(question.options?.length || 0) > 2 && (
                                                                    <button
                                                                        onClick={() => removeOption(qIndex, oIndex)}
                                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => addOption(qIndex)}
                                                            className="flex items-center gap-2 px-4 py-2 text-sm text-[#6E5B6A] hover:bg-[#6E5B6A]/10 rounded-lg transition-colors"
                                                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            Add Option
                                                        </button>
                                                    </div>

                                                    {/* Explanation (Optional) */}
                                                    <div className="mt-4 ml-8">
                                                        <label
                                                            className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2"
                                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                                        >
                                                            <HelpCircle className="w-4 h-4" />
                                                            Explanation (Optional)
                                                        </label>
                                                        <textarea
                                                            value={question.explanation || ''}
                                                            onChange={(e) =>
                                                                updateQuestion(qIndex, 'explanation', e.target.value)
                                                            }
                                                            placeholder="Explain why this is the correct answer..."
                                                            rows={2}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none"
                                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {questions.length === 0 && (
                                                <div className="text-center py-12">
                                                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <p
                                                        className="text-gray-500"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                                    >
                                                        No questions yet. Click "Add Question" to get started.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-200 px-8 py-6 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!title || questions.length === 0}
                                    className="px-6 py-2.5 bg-[#6E5B6A] text-white rounded-full hover:bg-[#5a4a56] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
                                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                >
                                    {quiz ? 'Update Quiz' : 'Create Quiz'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
