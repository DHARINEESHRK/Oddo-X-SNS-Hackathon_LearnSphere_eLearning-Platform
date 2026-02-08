import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Moon, Globe, Lock, Eye, EyeOff, Save, Check, Shield, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SettingsPageProps {
    onBack: () => void;
}

interface SettingsState {
    notifications: {
        email: boolean;
        push: boolean;
        courseUpdates: boolean;
        promotions: boolean;
    };
    appearance: {
        darkMode: boolean;
        compactView: boolean;
    };
    privacy: {
        showProfile: boolean;
        showProgress: boolean;
    };
    language: string;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
    const { currentUser } = useApp();
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [settings, setSettings] = useState<SettingsState>({
        notifications: {
            email: true,
            push: true,
            courseUpdates: true,
            promotions: false,
        },
        appearance: {
            darkMode: false,
            compactView: false,
        },
        privacy: {
            showProfile: true,
            showProgress: true,
        },
        language: 'English',
    });

    const handleToggle = (category: keyof SettingsState, setting: string) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...(prev[category] as Record<string, boolean>),
                [setting]: !(prev[category] as Record<string, boolean>)[setting],
            },
        }));
    };

    const handleSave = () => {
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Settings saved:', settings);
            setIsSaving(false);
            setSaveSuccess(true);

            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters!');
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            console.log('Password changed');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-[#6E5B6A]' : 'bg-gray-300'}`}
        >
            <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                animate={{ x: enabled ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </button>
    );

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

                {/* Page Title */}
                <motion.h1
                    className="text-4xl text-[#202732] mb-8"
                    style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Settings
                </motion.h1>

                <div className="space-y-6">
                    {/* Notifications Section */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#6E5B6A]/10 rounded-lg">
                                <Bell className="w-5 h-5 text-[#6E5B6A]" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Notifications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Email Notifications</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Receive updates via email</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.notifications.email}
                                    onChange={() => handleToggle('notifications', 'email')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Push Notifications</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Get notified in your browser</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.notifications.push}
                                    onChange={() => handleToggle('notifications', 'push')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Course Updates</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>New lessons and materials</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.notifications.courseUpdates}
                                    onChange={() => handleToggle('notifications', 'courseUpdates')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Promotional Emails</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Discounts and special offers</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.notifications.promotions}
                                    onChange={() => handleToggle('notifications', 'promotions')}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Appearance Section */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#F5AE35]/10 rounded-lg">
                                <Palette className="w-5 h-5 text-[#F5AE35]" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Appearance
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Dark Mode</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Reduce eye strain in low light</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.appearance.darkMode}
                                    onChange={() => handleToggle('appearance', 'darkMode')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Compact View</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Show more content on screen</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.appearance.compactView}
                                    onChange={() => handleToggle('appearance', 'compactView')}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Language Section */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#9AACB6]/20 rounded-lg">
                                <Globe className="w-5 h-5 text-[#6E5B6A]" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Language
                            </h2>
                        </div>

                        <select
                            value={settings.language}
                            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Hindi</option>
                            <option>Tamil</option>
                        </select>
                    </motion.div>

                    {/* Privacy Section */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#6E5B6A]/10 rounded-lg">
                                <Shield className="w-5 h-5 text-[#6E5B6A]" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Privacy
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Show Profile Publicly</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Others can view your profile</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.privacy.showProfile}
                                    onChange={() => handleToggle('privacy', 'showProfile')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="font-medium text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>Show Learning Progress</p>
                                    <p className="text-sm text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>Display your course progress</p>
                                </div>
                                <ToggleSwitch
                                    enabled={settings.privacy.showProgress}
                                    onChange={() => handleToggle('privacy', 'showProgress')}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Change Password Section */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Lock className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Change Password
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors pr-12"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6E5B6A]"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    New Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#202732] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Confirm New Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <motion.button
                                onClick={handlePasswordChange}
                                disabled={!currentPassword || !newPassword || !confirmPassword}
                                className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                            >
                                Update Password
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Save Button */}
                    <motion.button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-colors ${saveSuccess
                                ? 'bg-green-500 text-white'
                                : 'bg-[#6E5B6A] text-white hover:bg-[#5a4a56]'
                            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        whileHover={!isSaving ? { scale: 1.02 } : {}}
                        whileTap={!isSaving ? { scale: 0.98 } : {}}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {isSaving ? (
                            'Saving...'
                        ) : saveSuccess ? (
                            <>
                                <Check className="w-5 h-5" />
                                Settings Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save All Settings
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
