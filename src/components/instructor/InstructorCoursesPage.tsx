import React, { useState } from 'react';
import { CourseEditorFlow } from './CourseEditorFlow';
import { InstructorDashboardCourses } from './InstructorDashboardCourses';

export function InstructorCoursesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleBackFromEditor = () => {
    setSelectedCourseId(null);
    setIsCreatingNew(false);
  };

  // If a course is selected or creating new, show the editor
  if (selectedCourseId || isCreatingNew) {
    return (
      <CourseEditorFlow
        courseId={selectedCourseId || 'new'}
        onBack={handleBackFromEditor}
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
