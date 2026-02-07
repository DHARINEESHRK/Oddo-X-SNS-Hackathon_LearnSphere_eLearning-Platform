import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, BookOpen, Clock, Users, MoreVertical } from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';
import { CourseEditorFlow } from './CourseEditorFlow';
import { InstructorDashboardCourses } from './InstructorDashboardCourses';

interface Course {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  tags: string[];
  students: number;
  lessons: number;
  thumbnail?: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn React fundamentals and build amazing web applications',
    status: 'published',
    tags: ['Web Development', 'JavaScript'],
    students: 245,
    lessons: 12,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master TypeScript and write type-safe code',
    status: 'draft',
    tags: ['TypeScript', 'Programming'],
    students: 0,
    lessons: 8,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and intuitive user experiences',
    status: 'published',
    tags: ['Design', 'UX'],
    students: 189,
    lessons: 15,
  },
];

export function InstructorCoursesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // If a course is selected or creating new, show the editor
  if (selectedCourseId || isCreatingNew) {
    return (
      <CourseEditorFlow
        courseId={selectedCourseId || 'new'}
        onBack={() => {
          setSelectedCourseId(null);
          setIsCreatingNew(false);
        }}
      />
    );
  }

  return (
    <InstructorDashboardCourses
      onCreateCourse={() => setIsCreatingNew(true)}
      onEditCourse={(courseId) => setSelectedCourseId(courseId)}
    />
  );
}
