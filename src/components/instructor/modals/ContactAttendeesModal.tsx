import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactAttendeesModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    attendeeCount: number;
    onSendMessage: (message: string) => void;
}

export function ContactAttendeesModal({
    isOpen,
    onClose,
    courseTitle,
    attendeeCount,
    onSendMessage,
}: ContactAttendeesModalProps) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSend = () => {
        if (!subject.trim() || !message.trim()) return;

        onSendMessage(message);
        setShowSuccess(true);
    };

    const handleClose = () => {
        setSubject('');
        setMessage('');
        setShowSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!showSuccess ? (
                            <>
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2
                                            className="text-2xl font-bold text-gray-800"
                                            style={{ fontFamily: 'Caveat, cursive' }}
                                        >
                                            Contact Attendees
                                        </h2>
                                        <p
                                            className="text-sm text-gray-600 mt-1"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            {courseTitle} • {attendeeCount} attendee{attendeeCount !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Subject Input */}
                                <div className="mb-4">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter message subject"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E5B6A] focus:border-transparent outline-none"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div className="mb-6">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Message
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Write your message to attendees..."
                                            rows={8}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E5B6A] focus:border-transparent outline-none resize-none"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        />
                                    </div>
                                    <p
                                        className="text-xs text-gray-500 mt-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        This message will be sent to all {attendeeCount} enrolled learner{attendeeCount !== 1 ? 's' : ''}.
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleClose}
                                        className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={!subject.trim() || !message.trim()}
                                        className="flex-1 px-4 py-3 bg-[#6E5B6A] text-white rounded-xl hover:bg-[#5a4a56] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Success View */
                            <div className="text-center py-8">
                                <motion.div
                                    className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                >
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </motion.div>

                                <h3
                                    className="text-2xl font-bold text-gray-800 mb-2"
                                    style={{ fontFamily: 'Caveat, cursive' }}
                                >
                                    Message Sent!
                                </h3>

                                <p
                                    className="text-gray-600 mb-2"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Your message has been successfully sent to {attendeeCount} attendee{attendeeCount !== 1 ? 's' : ''}.
                                </p>

                                <p
                                    className="text-sm text-gray-500 mb-8"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Subject: <span className="font-medium">{subject}</span>
                                </p>

                                <button
                                    onClick={handleClose}
                                    className="px-6 py-3 bg-[#6E5B6A] text-white rounded-xl hover:bg-[#5a4a56] transition-colors"
                                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
