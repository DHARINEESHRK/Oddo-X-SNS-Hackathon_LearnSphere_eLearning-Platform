import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, CheckCircle, Copy } from 'lucide-react';

interface InviteAttendeesModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    onInvite: (emails: string[]) => void;
}

export function InviteAttendeesModal({
    isOpen,
    onClose,
    courseTitle,
    onInvite,
}: InviteAttendeesModalProps) {
    const [emailInput, setEmailInput] = useState('');
    const [emails, setEmails] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [invitationToken, setInvitationToken] = useState('');

    const generateToken = () => {
        // Generate a mock invitation token
        const randomString = Math.random().toString(36).substring(2, 15);
        const timestamp = Date.now().toString(36);
        return `INV-${randomString}-${timestamp}`.toUpperCase();
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const addEmail = () => {
        const trimmed = emailInput.trim();
        if (trimmed && isValidEmail(trimmed) && !emails.includes(trimmed)) {
            setEmails([...emails, trimmed]);
            setEmailInput('');
        }
    };

    const removeEmail = (emailToRemove: string) => {
        setEmails(emails.filter(e => e !== emailToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addEmail();
        }
    };

    const handleInvite = () => {
        if (emails.length === 0) return;

        const token = generateToken();
        setInvitationToken(token);
        onInvite(emails);
        setShowSuccess(true);
    };

    const handleClose = () => {
        setEmailInput('');
        setEmails([]);
        setShowSuccess(false);
        setInvitationToken('');
        onClose();
    };

    const copyToken = () => {
        navigator.clipboard.writeText(invitationToken);
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
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
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
                                            Invite Learners
                                        </h2>
                                        <p
                                            className="text-sm text-gray-600 mt-1"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            {courseTitle}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Email Addresses
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter email address"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E5B6A] focus:border-transparent outline-none"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            />
                                        </div>
                                        <button
                                            onClick={addEmail}
                                            className="px-4 py-2 bg-[#6E5B6A] text-white rounded-lg hover:bg-[#5a4a56] transition-colors"
                                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* Email List */}
                                {emails.length > 0 && (
                                    <div className="mb-6 max-h-48 overflow-y-auto">
                                        <p
                                            className="text-sm text-gray-600 mb-2"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            {emails.length} learner{emails.length !== 1 ? 's' : ''} to invite:
                                        </p>
                                        <div className="space-y-2">
                                            {emails.map((email, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <span
                                                        className="text-sm text-gray-700"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                                    >
                                                        {email}
                                                    </span>
                                                    <button
                                                        onClick={() => removeEmail(email)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

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
                                        onClick={handleInvite}
                                        disabled={emails.length === 0}
                                        className="flex-1 px-4 py-3 bg-[#6E5B6A] text-white rounded-xl hover:bg-[#5a4a56] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Invitations
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Success View */
                            <div className="text-center py-6">
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
                                    Invitations Sent!
                                </h3>

                                <p
                                    className="text-gray-600 mb-6"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {emails.length} invitation{emails.length !== 1 ? 's' : ''} sent successfully
                                </p>

                                {/* Mock Invitation Token */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <p
                                        className="text-xs text-gray-500 mb-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        Mock Invitation Token:
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <code
                                            className="flex-1 text-sm font-mono bg-white px-3 py-2 rounded border border-gray-200"
                                            style={{ fontFamily: 'monospace' }}
                                        >
                                            {invitationToken}
                                        </code>
                                        <button
                                            onClick={copyToken}
                                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                                            title="Copy token"
                                        >
                                            <Copy className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

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
