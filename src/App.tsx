import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/ui/toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageLoadingFallback } from './components/LoadingSpinner';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AppIcons } from './components/AppIcons';
import { LoginPage } from './components/LoginPage';
import { ProtectedRoute, getRoleDashboardPath } from './components/ProtectedRoute';

// Lazy-load heavier route components
const CoursesPage = lazy(() => import('./components/learnhub/CoursesPage').then(m => ({ default: m.CoursesPage })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const InstructorCoursesPage = lazy(() => import('./components/instructor/InstructorCoursesPage').then(m => ({ default: m.InstructorCoursesPage })));
const LearnerDashboard = lazy(() => import('./components/learner/LearnerDashboard').then(m => ({ default: m.LearnerDashboard })));
const StudentCourseDetail = lazy(() => import('./components/student/StudentCourseDetail').then(m => ({ default: m.StudentCourseDetail })));
const LessonPlayer = lazy(() => import('./components/student/LessonPlayer').then(m => ({ default: m.LessonPlayer })));
const CertificatePage = lazy(() => import('./components/student/CertificatePage').then(m => ({ default: m.CertificatePage })));
const RewardsPage = lazy(() => import('./components/student/RewardsPage').then(m => ({ default: m.RewardsPage })));

function HomePage() {
  const { currentUser } = useApp();

  if (currentUser) {
    return <Navigate to={getRoleDashboardPath(currentUser.role)} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      <Navigation />
      <HeroSection />
      <AppIcons />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Shared protected route — any logged-in user */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <ProtectedRoute>
            <StudentCourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/player/:courseId/:lessonId"
        element={
          <ProtectedRoute>
            <LessonPlayer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificate/:courseId"
        element={
          <ProtectedRoute>
            <CertificatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rewards"
        element={
          <ProtectedRoute>
            <RewardsPage />
          </ProtectedRoute>
        }
      />

      {/* Role-specific dashboards */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor"
        element={
          <ProtectedRoute allowedRoles={['instructor']}>
            <InstructorCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learner"
        element={
          <ProtectedRoute allowedRoles={['learner']}>
            <LearnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ToastProvider>
          <Suspense fallback={<PageLoadingFallback />}>
            <AppRoutes />
          </Suspense>
        </ToastProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}