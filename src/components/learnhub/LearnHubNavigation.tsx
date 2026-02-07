import React from 'react';
import { User, LogOut, GraduationCap, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';

interface LearnHubNavigationProps {
  onShowRewards?: () => void;
}

export function LearnHubNavigation({ onShowRewards }: LearnHubNavigationProps) {
  const { logout, currentUser } = useApp();

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
                LearnHub
              </h1>
              {/* Role Label */}
              <p className="text-xs text-[#718096] capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentUser?.role || 'User'}
              </p>
            </div>

            {/* Profile Icon with Role Indicator */}
            <div className="relative ml-2">
              <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${getRoleColor()}`}>
                {getRoleIcon()}
              </button>

              {/* Role Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className={`w-3 h-3 rounded-full ${currentUser?.role === 'instructor' ? 'bg-[#F5AE35]' : 'bg-[#6E5B6A]'}`} />
              </div>
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            {/* User Name */}
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

            {/* Logout Button */}
            <motion.button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-[#6E5B6A] hover:bg-[#F1F2F4] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#6E5B6A] focus:ring-offset-2"
              title="Logout"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif' }}>
                Logout
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}