import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    courseTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteConfirmationModal({
    isOpen,
    courseTitle,
    onConfirm,
    onCancel,
}: DeleteConfirmationModalProps) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (inputValue.trim() === courseTitle.trim()) {
            onConfirm();
            setInputValue('');
            setError('');
        } else {
            setError('Course title does not match. Please type the exact title.');
        }
    };

    const handleCancel = () => {
        setInputValue('');
        setError('');
        onCancel();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleCancel}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-100 rounded-full">
                            <AlertTriangle className="w-12 h-12 text-red-600" />
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleCancel}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Title */}
                    <h2
                        className="text-3xl text-[#202732] mb-4 text-center"
                        style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                    >
                        Delete Course?
                    </h2>

                    {/* Warning Message */}
                    <p
                        className="text-gray-600 mb-6 text-center"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        This action cannot be undone. To confirm deletion, please type the exact course title:
                    </p>

                    {/* Course Title Display */}
                    <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                        <p
                            className="text-center font-semibold text-[#202732]"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {courseTitle}
                        </p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setError('');
                        }}
                        placeholder="Type course title here"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none mb-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    />

                    {/* Error Message */}
                    {error && (
                        <p
                            className="text-red-500 text-sm mb-4"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConfirm}
                            disabled={!inputValue.trim()}
                            className={`flex-1 px-6 py-3 rounded-xl transition-colors ${inputValue.trim()
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                            Delete Course
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
