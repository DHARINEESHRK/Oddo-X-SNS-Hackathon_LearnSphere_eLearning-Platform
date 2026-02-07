import React from 'react';
import { useApp } from '../context/AppContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { InstructorDashboard } from './instructor/InstructorDashboard';
import { LearnerDashboard } from './learner/LearnerDashboard';

export function Dashboard() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4]">
        <div className="text-center">
          <h2 className="text-2xl text-[#202732] mb-4">Please log in to access the dashboard</h2>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'learner':
      return <LearnerDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4]">
          <div className="text-center">
            <h2 className="text-2xl text-[#202732] mb-4">Unknown user role</h2>
          </div>
        </div>
      );
  }
}
