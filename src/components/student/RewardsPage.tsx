import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Star, Zap, Crown, Target } from 'lucide-react';
import { BackButton } from '../ui/BackButton';

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
}

interface Certificate {
    id: string;
    courseName: string;
    completedAt: string;
    instructorName: string;
}

interface RewardsPageProps {
    studentName: string;
    points: number;
    badges: Badge[];
    certificates: Certificate[];
    onBack: () => void;
    onViewCertificate: (certificateId: string) => void;
}

export function RewardsPage({
    studentName,
    points,
    badges,
    certificates,
    onBack,
    onViewCertificate,
}: RewardsPageProps) {
    const badgeIcons: Record<string, any> = {
        trophy: Trophy,
        star: Star,
        zap: Zap,
        crown: Crown,
        target: Target,
        award: Award,
    };

    return (
        <div className="min-h-screen bg-[#F1F2F4] py-12">
            <div className="max-w-6xl mx-auto px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton onClick={onBack} />
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1
                        className="text-6xl text-[#202732] mb-4"
                        style={{ fontFamily: 'Brush Script MT, cursive' }}
                    >
                        Your Rewards
                    </h1>
                    <p
                        className="text-xl text-gray-600"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Track your achievements and celebrate your progress
                    </p>
                </motion.div>

                {/* Points Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#6E5B6A] to-[#8E7B8A] rounded-3xl p-8 mb-8 text-white shadow-2xl"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p
                                className="text-lg opacity-90 mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Total Points Earned
                            </p>
                            <h2
                                className="text-6xl font-bold"
                                style={{ fontFamily: 'Caveat, cursive' }}
                            >
                                {points.toLocaleString()} pts
                            </h2>
                        </div>
                        <div className="bg-white/20 p-6 rounded-full">
                            <Star className="w-16 h-16" />
                        </div>
                    </div>
                </motion.div>

                {/* Badges Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2
                        className="text-4xl text-[#202732] mb-6"
                        style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                    >
                        Earned Badges
                    </h2>

                    {badges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {badges.map((badge, index) => {
                                const IconComponent = badgeIcons[badge.icon] || Award;
                                return (
                                    <motion.div
                                        key={badge.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-4 bg-[#F5AE35]/20 rounded-xl">
                                                <IconComponent className="w-8 h-8 text-[#F5AE35]" />
                                            </div>
                                            <div className="flex-1">
                                                <h3
                                                    className="text-xl text-[#202732] mb-2"
                                                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                                                >
                                                    {badge.name}
                                                </h3>
                                                <p
                                                    className="text-sm text-gray-600 mb-2"
                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    {badge.description}
                                                </p>
                                                <p
                                                    className="text-xs text-gray-400"
                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="text-6xl mb-4">🏆</div>
                            <p
                                className="text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                No badges yet. Keep learning to earn your first badge!
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Certificates Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2
                        className="text-4xl text-[#202732] mb-6"
                        style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                    >
                        My Certificates
                    </h2>

                    {certificates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#F5AE35] cursor-pointer"
                                    onClick={() => onViewCertificate(cert.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[#6E5B6A]/10 rounded-lg">
                                            <Award className="w-6 h-6 text-[#6E5B6A]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3
                                                className="text-xl text-[#202732] mb-2"
                                                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
                                            >
                                                {cert.courseName}
                                            </h3>
                                            <p
                                                className="text-sm text-gray-600 mb-1"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Instructor: {cert.instructorName}
                                            </p>
                                            <p
                                                className="text-xs text-gray-400"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                Completed {new Date(cert.completedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="text-6xl mb-4">📜</div>
                            <p
                                className="text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                No certificates yet. Complete a course to earn your first certificate!
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
