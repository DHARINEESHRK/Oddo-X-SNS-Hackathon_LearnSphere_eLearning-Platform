import React, { ReactNode } from 'react';
import { BookOpen, Search, Award, FolderOpen } from 'lucide-react';

type EmptyVariant = 'courses' | 'search' | 'enrollments' | 'general';

interface EmptyStateProps {
  variant?: EmptyVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const defaults: Record<EmptyVariant, { icon: ReactNode; title: string; description: string }> = {
  courses: {
    icon: <BookOpen className="w-10 h-10 text-[#9AACB6]" />,
    title: 'No courses yet',
    description: 'Courses will appear here once they are created.',
  },
  search: {
    icon: <Search className="w-10 h-10 text-[#9AACB6]" />,
    title: 'No results found',
    description: 'Try adjusting your search or filters.',
  },
  enrollments: {
    icon: <FolderOpen className="w-10 h-10 text-[#9AACB6]" />,
    title: 'No enrolled courses',
    description: 'Start learning by enrolling in a course from the catalog!',
  },
  general: {
    icon: <Award className="w-10 h-10 text-[#9AACB6]" />,
    title: 'Nothing here yet',
    description: 'Content will appear here soon.',
  },
};

export function EmptyState({ variant = 'general', title, description, icon, action }: EmptyStateProps) {
  const d = defaults[variant];
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-[#F1F2F4] rounded-full flex items-center justify-center mb-5">
        {icon || d.icon}
      </div>
      <h3
        className="text-2xl text-[#202732] mb-2"
        style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
      >
        {title || d.title}
      </h3>
      <p
        className="text-[#9AACB6] max-w-sm mb-6"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {description || d.description}
      </p>
      {action}
    </div>
  );
}
