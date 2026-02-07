// User roles
export type UserRole = 'admin' | 'instructor' | 'learner' | 'guest';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  points: number;
  badges: Badge[];
  enrolledCourses: string[]; // Course IDs
}

// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "4 hours"
  price: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  published: boolean;
  allowGuests: boolean; // Whether guests can view this course
  lessons: Lesson[];
  quizzes: Quiz[];
  createdAt: string;
  updatedAt: string;
}

// Lesson interface
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: string; // e.g., "15 min"
  order: number;
  completed?: boolean; // For learner progress
}

// Quiz interface
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  order: number;
}

// Question interface
export interface Question {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  points: number;
}

// Quiz attempt interface
export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  courseId: string;
  answers: number[]; // Array of selected option indices
  score: number;
  passed: boolean;
  attemptedAt: string;
}

// Badge interface
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Review interface
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Enrollment interface
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // Percentage
  completedLessons: string[]; // Lesson IDs
  quizAttempts: QuizAttempt[];
  status: 'in-progress' | 'completed';
}

// Course invite interface
export interface CourseInvite {
  id: string;
  courseId: string;
  email: string;
  invitedBy: string; // Instructor ID
  invitedAt: string;
  status: 'pending' | 'accepted' | 'declined';
}
