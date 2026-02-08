import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, ChevronRight, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quiz, Question } from '../../types';

interface QuizEngineProps {
    quiz: Quiz;
    onComplete: (score: number, pointsEarned: number) => void;
    userId?: string; // Optional, defaults to 'current-user'
}

interface QuizAttempt {
    timestamp: number;
    score: number;
    passed: boolean;
}

export function QuizEngine({ quiz, onComplete, userId = 'current-user' }: QuizEngineProps) {
    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({}); // questionId -> selectedOptionIndices
    const [quizState, setQuizState] = useState<'intro' | 'active' | 'result'>('intro');
    const [lastScore, setLastScore] = useState(0);
    const [lastPassed, setLastPassed] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const [attemptHistory, setAttemptHistory] = useState<QuizAttempt[]>([]);

    // Load attempt history
    useEffect(() => {
        const saved = localStorage.getItem(`quiz_attempts_${userId}_${quiz.id}`);
        if (saved) {
            setAttemptHistory(JSON.parse(saved));
        }
    }, [quiz.id, userId]);

    // Handle option selection
    const handleOptionSelect = (questionId: string, optionIndex: number, allowMultiple: boolean) => {
        setSelectedAnswers(prev => {
            const current = prev[questionId] || [];
            if (allowMultiple) {
                if (current.includes(optionIndex)) {
                    return { ...prev, [questionId]: current.filter(i => i !== optionIndex) };
                } else {
                    return { ...prev, [questionId]: [...current, optionIndex] };
                }
            } else {
                // Single choice
                return { ...prev, [questionId]: [optionIndex] };
            }
        });
    };

    // Submit Quiz
    const handleSubmit = () => {
        let totalPoints = 0;
        let earnedScore = 0;

        quiz.questions.forEach(q => {
            totalPoints += q.points;

            const selected = selectedAnswers[q.id] || [];
            const correct = q.correctAnswers || [];

            // Exact match required for points
            const isCorrect =
                selected.length === correct.length &&
                selected.every(s => correct.includes(s));

            if (isCorrect) {
                earnedScore += q.points;
            }
        });

        const scorePercentage = Math.round((earnedScore / totalPoints) * 100);
        const passed = scorePercentage >= quiz.passingScore;

        // Calculate Reward Points based on attempt
        let reward = 0;
        if (passed) {
            // Logic: If previously passed, maybe 0 points? Or re-earning?
            // Usually you only earn points once.
            // But user requirement says "Calculate score based on attempt number".
            // We will assume "attempt number" refers to the count of attempts *made so far*.
            // If the user already passed, they shouldn't earn points again presumably, but let's calculate what "this attempt" is worth.

            const attemptNum = attemptHistory.length + 1;
            const rewards = quiz.rewardPoints || {
                firstAttempt: 100,
                secondAttempt: 75,
                thirdAttempt: 50,
                fourthAttempt: 25
            };

            if (attemptNum === 1) reward = rewards.firstAttempt;
            else if (attemptNum === 2) reward = rewards.secondAttempt;
            else if (attemptNum === 3) reward = rewards.thirdAttempt;
            else reward = rewards.fourthAttempt;
        }

        // Update history
        const newAttempt: QuizAttempt = {
            timestamp: Date.now(),
            score: scorePercentage,
            passed
        };

        const newHistory = [...attemptHistory, newAttempt];
        setAttemptHistory(newHistory);
        localStorage.setItem(`quiz_attempts_${userId}_${quiz.id}`, JSON.stringify(newHistory));

        setLastScore(scorePercentage);
        setLastPassed(passed);
        setPointsEarned(reward);
        setQuizState('result');

        if (passed) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F5AE35', '#6E5B6A', '#2FBF71']
            });

            // Delay callback slightly for effect
            setTimeout(() => {
                onComplete(scorePercentage, reward);
            }, 1000);
        }
    };

    // Navigation
    const nextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(curr => curr + 1);
        } else {
            handleSubmit();
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(curr => curr - 1);
        }
    };

    // Render Helpers
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    if (quizState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                <div className="w-20 h-20 bg-[#F5AE35]/10 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-10 h-10 text-[#F5AE35]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                    {quiz.title}
                </h2>
                <p className="text-gray-300 mb-8 max-w-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {quiz.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div className="bg-[#202732] p-4 rounded-lg border border-gray-700">
                        <span className="block text-gray-400 mb-1">Questions</span>
                        <span className="text-white text-lg font-semibold">{quiz.questions.length}</span>
                    </div>
                    <div className="bg-[#202732] p-4 rounded-lg border border-gray-700">
                        <span className="block text-gray-400 mb-1">Passing Score</span>
                        <span className="text-white text-lg font-semibold">{quiz.passingScore}%</span>
                    </div>
                </div>

                <motion.button
                    onClick={() => setQuizState('active')}
                    className="px-8 py-3 bg-[#F5AE35] text-white rounded-full font-semibold shadow-lg shadow-[#F5AE35]/20 hover:bg-[#e09d25] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Quiz
                </motion.button>

                {attemptHistory.length > 0 && (
                    <p className="mt-6 text-sm text-gray-500">
                        Previous Attempts: {attemptHistory.length} (Best: {Math.max(...attemptHistory.map(a => a.score))}%)
                    </p>
                )}
            </div>
        );
    }

    if (quizState === 'result') {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${lastPassed ? 'bg-[#2FBF71]/20' : 'bg-red-500/20'
                        }`}
                >
                    {lastPassed ? (
                        <CheckCircle2 className="w-12 h-12 text-[#2FBF71]" />
                    ) : (
                        <XCircle className="w-12 h-12 text-red-500" />
                    )}
                </motion.div>

                <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                    {lastPassed ? 'Quiz Passed!' : 'Nice Try!'}
                </h2>

                <div className="text-6xl font-bold text-white mb-4 my-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {lastScore}%
                </div>

                <p className="text-gray-300 mb-8">
                    {lastPassed
                        ? `Congratulations! You've earned ${pointsEarned} points.`
                        : `You need ${quiz.passingScore}% to pass. Give it another shot!`}
                </p>

                <div className="flex gap-4">
                    <motion.button
                        onClick={() => {
                            setQuizState('intro');
                            setCurrentQuestionIndex(0);
                            setSelectedAnswers({});
                        }}
                        className="px-6 py-3 bg-[#202732] border border-gray-700 text-white rounded-full font-semibold hover:bg-[#2a3142] transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Retry Quiz
                    </motion.button>

                    {lastPassed && (
                        <motion.button
                            onClick={() => onComplete(lastScore, pointsEarned)} // Calls parent to proceed
                            className="px-6 py-3 bg-[#2FBF71] text-white rounded-full font-semibold hover:bg-[#25a05e] transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            </div>
        );
    }

    // Active State
    return (
        <div className="h-full flex flex-col p-8 max-w-4xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#F5AE35]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                >
                    <h3 className="text-2xl font-semibold text-white mb-6 leading-relaxed">
                        {currentQuestion.question}
                    </h3>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = (selectedAnswers[currentQuestion.id] || []).includes(idx);
                            const allowMultiple = (currentQuestion.correctAnswers || []).length > 1;

                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleOptionSelect(currentQuestion.id, idx, allowMultiple)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isSelected
                                        ? 'border-[#F5AE35] bg-[#F5AE35]/10'
                                        : 'border-gray-700 bg-[#202732] hover:border-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#F5AE35] bg-[#F5AE35]' : 'border-gray-500'
                                        }`}>
                                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={`text-lg ${isSelected ? 'text-[#F5AE35]' : 'text-gray-300'}`}>
                                        {option}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {selectedAnswers[currentQuestion.id]?.length === 0 && (
                        <div className="mt-4 flex items-center gap-2 text-yellow-500/80 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Select an answer to proceed
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Footer Navigation */}
            <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-6">
                <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`text-gray-400 hover:text-white transition-colors ${currentQuestionIndex === 0 ? 'invisible' : ''
                        }`}
                >
                    Previous
                </button>

                <motion.button
                    onClick={nextQuestion}
                    disabled={!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id]?.length === 0}
                    className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id]?.length === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : isLastQuestion
                            ? 'bg-[#2FBF71] text-white hover:bg-[#25a05e]'
                            : 'bg-[#6E5B6A] text-white hover:bg-[#5d4d59]'
                        }`}
                    whileHover={selectedAnswers[currentQuestion.id] ? { scale: 1.05 } : {}}
                    whileTap={selectedAnswers[currentQuestion.id] ? { scale: 0.95 } : {}}
                >
                    {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
                    {isLastQuestion ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </motion.button>
            </div>
        </div>
    );
}
