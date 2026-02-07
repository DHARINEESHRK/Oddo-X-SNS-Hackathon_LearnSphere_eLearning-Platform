import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Award, Download, Share2 } from 'lucide-react';
import { BackButton } from '../ui/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface CertificatePageProps {
    courseName?: string;
    studentName?: string;
    completionDate?: string;
    onBack?: () => void;
}

export function CertificatePage(props: CertificatePageProps) {
    const params = useParams();
    const navigate = useNavigate();
    const { currentUser, getCourseById } = useApp();
    const courseId = params.courseId || '';
    const contextCourse = getCourseById(courseId);
    const courseName = props.courseName || contextCourse?.title || 'Course';
    const studentName = props.studentName || currentUser?.name || 'Student';
    const completionDate = props.completionDate || new Date().toISOString();
    const onBack = props.onBack || (() => navigate('/courses'));
    return (
        <div className="min-h-screen bg-[#F1F2F4] py-12">
            <div className="max-w-4xl mx-auto px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton onClick={onBack} />
                </div>

                {/* Certificate */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl p-12 border-8 border-[#F5AE35]"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-[#F5AE35]/20 rounded-full mb-6"
                        >
                            <Award className="w-12 h-12 text-[#F5AE35]" />
                        </motion.div>

                        <h1
                            className="text-6xl text-[#202732] mb-4"
                            style={{ fontFamily: 'Brush Script MT, cursive' }}
                        >
                            Certificate of Completion
                        </h1>

                        <div className="w-32 h-1 bg-[#6E5B6A] mx-auto rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-8 mb-12">
                        <p
                            className="text-xl text-gray-600"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            This is to certify that
                        </p>

                        <h2
                            className="text-5xl text-[#6E5B6A]"
                            style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                        >
                            {studentName}
                        </h2>

                        <p
                            className="text-xl text-gray-600"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            has successfully completed the course
                        </p>

                        <h3
                            className="text-4xl text-[#202732]"
                            style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                        >
                            {courseName}
                        </h3>

                        <p
                            className="text-lg text-gray-500"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            Completed on {new Date(completionDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-between items-end">
                        <div className="text-center">
                            <div className="w-48 h-0.5 bg-gray-300 mb-2" />
                            <p
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Instructor Signature
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-48 h-0.5 bg-gray-300 mb-2" />
                            <p
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Date of Issue
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center gap-4 mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#6E5B6A] text-white rounded-xl shadow-lg"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                        <Download className="w-5 h-5" />
                        Download Certificate
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-[#6E5B6A] text-[#6E5B6A] rounded-xl"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                        <Share2 className="w-5 h-5" />
                        Share
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
