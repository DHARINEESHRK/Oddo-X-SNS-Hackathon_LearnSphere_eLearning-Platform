import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';

interface AccessRestrictedProps {
    onBack: () => void;
    message?: string;
}

export function AccessRestricted({ onBack, message = "This course is invitation only." }: AccessRestrictedProps) {
    return (
        <div className="min-h-screen bg-[#F1F2F4] flex flex-col items-center justify-center p-6">
            <motion.div
                className="text-center max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-[#202732] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Access Restricted
                    </h2>

                    <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {message} <br />
                        Please contact the instructor for an invitation link.
                    </p>

                    <button
                        onClick={onBack}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#6E5B6A] text-white rounded-xl font-medium hover:bg-[#5d4d59] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Courses
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
