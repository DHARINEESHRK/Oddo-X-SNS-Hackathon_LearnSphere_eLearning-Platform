import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AppIcons } from './components/AppIcons';
import { LoginPage } from './components/LoginPage';
import { CoursesPage } from './components/learnhub/CoursesPage';

function AppContent() {
  const { currentUser } = useApp();
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home');

  // If user is logged in, show the LearnHub Courses Page
  if (currentUser) {
    return <CoursesPage />;
  }

  // If on login page
  if (currentPage === 'login') {
    return <LoginPage onBackToHome={() => setCurrentPage('home')} />;
  }

  // Default homepage (guest view)
  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      <Navigation onSignIn={() => setCurrentPage('login')} />
      <HeroSection onStartLearning={() => setCurrentPage('login')} />
      <AppIcons />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}