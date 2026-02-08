// User roles
export type UserRole = 'admin' | 'instructor' | 'learner' | 'guest';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
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
  // Analytics fields
  viewCount?: number; // Number of times course detail page was viewed
  totalDuration?: number; // Total duration in minutes (calculated from lessons)
  invitedAttendees?: string[]; // Array of invited email addresses
  isInvitationOnly?: boolean; // Whether the course requires an invitation
}

// Lesson interface
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type?: 'video' | 'document' | 'image' | 'quiz'; // Lesson type
  videoUrl?: string;
  imageUrl?: string; // For image type lessons
  duration: string; // e.g., "15 min"
  order: number;
  completed?: boolean; // For learner progress
  allowDownload?: boolean; // Permission to download lesson resources
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
  // Attempt-based rewards
  rewardPoints?: {
    firstAttempt: number;   // Points for passing on 1st try (X)
    secondAttempt: number;  // Points for passing on 2nd try (Y)
    thirdAttempt: number;   // Points for passing on 3rd try (Z)
    fourthAttempt: number;  // Points for passing on 4th+ try (W)
  };
}

// Question interface
export interface Question {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswers: number[]; // Indices of correct options (supports multiple)
  points: number;
  explanation?: string; // Optional explanation for the answer
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
  completedAt?: string;
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
