import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, BookOpen, Clock, Users, MoreVertical } from 'lucide-react';
import { BackgroundAnimation } from '../BackgroundAnimation';
import { CourseEditorFlow } from './CourseEditorFlow';
import { InstructorDashboardCourses } from './InstructorDashboardCourses';
import { useToast } from '../ui/toast';

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

interface InstructorCoursesPageProps {
  onBack?: () => void;
  initialCourseId?: string | null;
}

export function InstructorCoursesPage({ onBack, initialCourseId }: InstructorCoursesPageProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(initialCourseId || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const { showToast } = useToast();

  const handleCourseSaved = (isNewCourse: boolean) => {
    if (isNewCourse) {
      showToast('Course created successfully');
    }
    setSelectedCourseId(null);
    setIsCreatingNew(false);
  };

  // If a course is selected or creating new, show the editor
  if (selectedCourseId || isCreatingNew) {
    return (
      <CourseEditorFlow
        courseId={selectedCourseId || 'new'}
        onBack={() => handleCourseSaved(isCreatingNew)}
      />
    );
  }

  return (
    <InstructorDashboardCourses
      onCreateCourse={() => setIsCreatingNew(true)}
      onEditCourse={(courseId) => setSelectedCourseId(courseId)}
      onBack={onBack}
    />
  );
}
