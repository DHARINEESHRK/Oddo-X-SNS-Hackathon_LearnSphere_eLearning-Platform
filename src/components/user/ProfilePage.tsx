import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, BookOpen, Award, Camera, Save, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProfilePageProps {
    onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
    const { currentUser, updateUser } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [bio, setBio] = useState(currentUser?.bio || 'Passionate learner exploring new horizons.');
    const [avatar, setAvatar] = useState(currentUser?.avatar || '');

    const handleSave = () => {
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            if (currentUser && updateUser) {
                updateUser({
                    ...currentUser,
                    name,
                    email,
                    bio,
                    avatar,
                });
            }
            setIsSaving(false);
            setSaveSuccess(true);
            setIsEditing(false);

            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const getRoleLabel = () => {
        switch (currentUser?.role) {
            case 'instructor': return 'Instructor';
            case 'admin': return 'Administrator';
            default: return 'Learner';
        }
    };

    const getRoleColor = () => {
        switch (currentUser?.role) {
            case 'instructor': return 'bg-[#F5AE35] text-white';
            case 'admin': return 'bg-red-500 text-white';
            default: return 'bg-[#6E5B6A] text-white';
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F2F4] py-8">
            <div className="max-w-3xl mx-auto px-6">
                {/* Back Button */}
                <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#6E5B6A] hover:bg-white px-4 py-2 rounded-lg transition-colors mb-6"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </motion.button>

                {/* Profile Card */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-[#6E5B6A] via-[#8b7d8e] to-[#F5AE35]" />

                    {/* Profile Content */}
                    <div className="px-8 pb-8 relative">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                {avatar ? (
                                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#6E5B6A] text-white text-4xl font-bold">
                                        {name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <label className="absolute bottom-0 right-0 p-2 bg-[#F5AE35] rounded-full cursor-pointer hover:bg-[#e4a030] transition-colors shadow-lg">
                                    <Camera className="w-5 h-5 text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Role Badge */}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getRoleColor()}`}>
                            {getRoleLabel()}
                        </span>

                        {/* Profile Form */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <User className="w-4 h-4 text-[#6E5B6A]" />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                ) : (
                                    <p className="text-lg text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <Mail className="w-4 h-4 text-[#6E5B6A]" />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                ) : (
                                    <p className="text-lg text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {email}
                                    </p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <BookOpen className="w-4 h-4 text-[#6E5B6A]" />
                                    Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none resize-none transition-colors"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {bio}
                                    </p>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#6E5B6A]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {currentUser?.points || 0}
                                    </div>
                                    <div className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Points
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#F5AE35]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {currentUser?.badges?.length || 0}
                                    </div>
                                    <div className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Badges
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {currentUser?.enrolledCourses?.length || 0}
                                    </div>
                                    <div className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Courses
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                {isEditing ? (
                                    <>
                                        <motion.button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors ${saveSuccess
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-[#6E5B6A] text-white hover:bg-[#5a4a56]'
                                                } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            whileHover={!isSaving ? { scale: 1.02 } : {}}
                                            whileTap={!isSaving ? { scale: 0.98 } : {}}
                                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                        >
                                            {isSaving ? (
                                                'Saving...'
                                            ) : saveSuccess ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    Saved!
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Save Changes
                                                </>
                                            )}
                                        </motion.button>
                                    </>
                                ) : (
                                    <motion.button
                                        onClick={() => setIsEditing(true)}
                                        className="flex-1 px-6 py-3 bg-[#6E5B6A] text-white rounded-xl hover:bg-[#5a4a56] transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                                    >
                                        Edit Profile
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
