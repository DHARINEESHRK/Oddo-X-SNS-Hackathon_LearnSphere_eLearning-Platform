import React, { useState } from 'react';
import { User, GraduationCap, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';
import { ProfileMenu } from '../ui/ProfileMenu';

interface LearnHubNavigationProps {
  onShowRewards?: () => void;
  onShowYourCourses?: () => void;
  onShowMyCourses?: () => void;
  onShowProfile?: () => void;
  onShowSettings?: () => void;
}

export function LearnHubNavigation({ onShowRewards, onShowYourCourses, onShowMyCourses, onShowProfile, onShowSettings }: LearnHubNavigationProps) {
  const { logout, currentUser } = useApp();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getRoleIcon = () => {
    if (currentUser?.role === 'instructor') {
      return <GraduationCap className="w-5 h-5 text-white" />;
    } else if (currentUser?.role === 'learner') {
      return <BookOpen className="w-5 h-5 text-white" />;
    }
    return <User className="w-5 h-5 text-white" />;
  };

  const getRoleColor = () => {
    if (currentUser?.role === 'instructor') {
      return 'bg-[#F4B860] hover:bg-[#E4A850]';
    } else if (currentUser?.role === 'learner') {
      return 'bg-[#6B5B7B] hover:bg-[#5a4a69]';
    }
    return 'bg-[#6B5B7B] hover:bg-[#5a4a69]';
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'your-courses':
        if (onShowYourCourses) onShowYourCourses();
        break;
      case 'my-courses':
        if (onShowMyCourses) onShowMyCourses();
        break;
      case 'profile':
        if (onShowProfile) onShowProfile();
        break;
      case 'settings':
        if (onShowSettings) onShowSettings();
        break;
      case 'dashboard':
        // Admin dashboard - could be implemented later
        console.log('Navigate to dashboard');
        break;
      default:
        console.log('Navigate to:', page);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div>
              <h1
                className="text-3xl text-[#6E5B6A]"
                style={{ fontFamily: 'Brush Script MT, Caveat, cursive', fontWeight: 600 }}
              >
                Learn Sphere
              </h1>
              {/* Role Label */}
              <p className="text-xs text-[#718096] capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentUser?.role || 'User'}
              </p>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Name - Hidden on mobile */}
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-[#202732]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentUser?.name}
              </p>
              <p className="text-xs text-[#718096]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentUser?.email}
              </p>
            </div>

            {/* Rewards Button */}
            <motion.button
              onClick={onShowRewards}
              className="p-2 text-[#6E5B6A] hover:bg-[#F1F2F4] rounded-lg transition-colors relative"
              title="Rewards"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                🏆
              </div>
            </motion.button>

            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${getRoleColor()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Profile Menu"
              >
                {getRoleIcon()}
              </motion.button>

              {/* Role Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm pointer-events-none">
                <div className={`w-3 h-3 rounded-full ${currentUser?.role === 'instructor' ? 'bg-[#F5AE35]' : 'bg-[#6E5B6A]'}`} />
              </div>

              {/* Profile Dropdown Menu */}
              <ProfileMenu
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
                userName={currentUser?.name || 'User'}
                userEmail={currentUser?.email || ''}
                userRole={currentUser?.role || 'learner'}
                onLogout={logout}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
