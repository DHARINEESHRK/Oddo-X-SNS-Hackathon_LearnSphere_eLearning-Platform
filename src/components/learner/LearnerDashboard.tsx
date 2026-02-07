import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Award, TrendingUp, LogOut } from 'lucide-react';
import { CourseCatalog } from './CourseCatalog';
import { MyCourses } from './MyCourses';
import { MyProgress } from './MyProgress';
import { useNavigate } from 'react-router-dom';

type TabType = 'catalog' | 'my-courses' | 'progress';

export function LearnerDashboard() {
  const { currentUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;

  const tabs = [
    { id: 'catalog' as TabType, label: 'Course Catalog', icon: BookOpen },
    { id: 'my-courses' as TabType, label: 'My Courses', icon: BookOpen },
    { id: 'progress' as TabType, label: 'My Progress', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-[#202732]" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}>
                Learn Sphere
              </h1>
              <p className="text-sm text-[#9AACB6]">Learner Dashboard</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Points and Badges */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#F5AE35]/10 px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5 text-[#F5AE35]" />
                  <span className="font-semibold text-[#202732]">{currentUser.points} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  {currentUser.badges.slice(0, 3).map(badge => (
                    <div key={badge.id} title={badge.name} className="text-2xl">
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-[#202732]">{currentUser.name}</p>
                  <p className="text-sm text-[#9AACB6]">{currentUser.email}</p>
                </div>
                {currentUser.avatar && (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-[#F1F2F4] rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-[#9AACB6]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-[#6E5B6A] text-[#6E5B6A]'
                      : 'border-transparent text-[#9AACB6] hover:text-[#202732]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'catalog' && <CourseCatalog />}
        {activeTab === 'my-courses' && <MyCourses />}
        {activeTab === 'progress' && <MyProgress />}
      </main>
    </div>
  );
}
