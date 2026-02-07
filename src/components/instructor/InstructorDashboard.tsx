import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { InstructorCoursesPage } from './InstructorCoursesPage';

export function InstructorDashboard() {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  return <InstructorCoursesPage />;
}