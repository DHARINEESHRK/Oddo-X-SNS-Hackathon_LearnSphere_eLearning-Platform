import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Course, Enrollment, Review, UserRole } from '../types';
import { mockUsers, mockCourses, mockEnrollments, mockReviews } from '../data/mockData';

interface AppContextType {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Authentication
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  
  // Courses
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  getPublishedCourses: () => Course[];
  getCoursesForGuest: () => Course[];
  getInstructorCourses: (instructorId: string) => Course[];
  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  publishCourse: (id: string) => void;
  unpublishCourse: (id: string) => void;
  
  // Enrollments
  enrollments: Enrollment[];
  getUserEnrollments: (userId: string) => Enrollment[];
  enrollInCourse: (userId: string, courseId: string) => void;
  updateProgress: (enrollmentId: string, lessonId: string) => void;
  
  // Reviews
  reviews: Review[];
  getCourseReviews: (courseId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  
  // Quiz attempts
  submitQuizAttempt: (enrollmentId: string, quizId: string, answers: number[]) => void;
  
  // User management (Admin only)
  users: User[];
  getAllUsers: () => User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  
  // Points and badges
  addPoints: (userId: string, points: number) => void;
  
  // Permissions
  canEditCourse: (courseId: string) => boolean;
  canViewCourse: (courseId: string) => boolean;
  canManageUsers: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Authentication
  const login = (email: string, password: string): boolean => {
    // In a real app, this would validate against a backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: `learner-${Date.now()}`,
      name,
      email,
      role: 'learner',
      points: 0,
      badges: [],
      enrolledCourses: [],
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  // Course management
  const getCourseById = (id: string) => courses.find(c => c.id === id);
  
  const getPublishedCourses = () => courses.filter(c => c.published);
  
  const getCoursesForGuest = () => courses.filter(c => c.published && c.allowGuests);
  
  const getInstructorCourses = (instructorId: string) => 
    courses.filter(c => c.instructorId === instructorId);

  const createCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const publishCourse = (id: string) => {
    updateCourse(id, { published: true });
  };

  const unpublishCourse = (id: string) => {
    updateCourse(id, { published: false });
  };

  // Enrollment management
  const getUserEnrollments = (userId: string) => 
    enrollments.filter(e => e.userId === userId);

  const enrollInCourse = (userId: string, courseId: string) => {
    const newEnrollment: Enrollment = {
      id: `enrollment-${Date.now()}`,
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLessons: [],
      quizAttempts: [],
      status: 'in-progress',
    };
    setEnrollments([...enrollments, newEnrollment]);
    
    // Update user's enrolled courses
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, enrolledCourses: [...u.enrolledCourses, courseId] }
        : u
    ));
  };

  const updateProgress = (enrollmentId: string, lessonId: string) => {
    setEnrollments(enrollments.map(e => {
      if (e.id === enrollmentId && !e.completedLessons.includes(lessonId)) {
        const course = getCourseById(e.courseId);
        if (!course) return e;
        
        const completedLessons = [...e.completedLessons, lessonId];
        const progress = (completedLessons.length / course.lessons.length) * 100;
        const status = progress === 100 ? 'completed' : 'in-progress';
        
        // Add points for completing a lesson
        if (currentUser) {
          addPoints(currentUser.id, 10);
        }
        
        return { ...e, completedLessons, progress, status };
      }
      return e;
    }));
  };

  // Review management
  const getCourseReviews = (courseId: string) => 
    reviews.filter(r => r.courseId === courseId);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReviews([...reviews, newReview]);
    
    // Update course rating and review count
    const courseReviews = [...reviews.filter(r => r.courseId === reviewData.courseId), newReview];
    const avgRating = courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length;
    updateCourse(reviewData.courseId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewsCount: courseReviews.length,
    });
  };

  // Quiz management
  const submitQuizAttempt = (enrollmentId: string, quizId: string, answers: number[]) => {
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    if (!enrollment) return;
    
    const course = getCourseById(enrollment.courseId);
    const quiz = course?.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += q.points;
      }
    });
    
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = (score / totalPoints) * 100;
    const passed = percentage >= quiz.passingScore;
    
    const attempt = {
      id: `attempt-${Date.now()}`,
      userId: enrollment.userId,
      quizId,
      courseId: enrollment.courseId,
      answers,
      score: percentage,
      passed,
      attemptedAt: new Date().toISOString(),
    };
    
    setEnrollments(enrollments.map(e => 
      e.id === enrollmentId 
        ? { ...e, quizAttempts: [...e.quizAttempts, attempt] }
        : e
    ));
    
    // Award points for passing
    if (passed && currentUser) {
      addPoints(currentUser.id, 50);
    }
  };

  // User management
  const getAllUsers = () => users;
  
  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
  };

  // Points and badges
  const addPoints = (userId: string, points: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newPoints = u.points + points;
        // Update current user if it's them
        if (currentUser?.id === userId) {
          setCurrentUser({ ...u, points: newPoints });
        }
        return { ...u, points: newPoints };
      }
      return u;
    }));
  };

  // Permissions
  const canEditCourse = (courseId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    
    const course = getCourseById(courseId);
    if (!course) return false;
    
    return currentUser.role === 'instructor' && course.instructorId === currentUser.id;
  };

  const canViewCourse = (courseId: string): boolean => {
    const course = getCourseById(courseId);
    if (!course) return false;
    
    // Guests can only view published courses that allow guests
    if (!currentUser) {
      return course.published && course.allowGuests;
    }
    
    // Admin and instructors can view all courses
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'instructor' && course.instructorId === currentUser.id) return true;
    
    // Learners can view published courses
    return course.published;
  };

  const canManageUsers = (): boolean => {
    return currentUser?.role === 'admin';
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    register,
    courses,
    getCourseById,
    getPublishedCourses,
    getCoursesForGuest,
    getInstructorCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse,
    enrollments,
    getUserEnrollments,
    enrollInCourse,
    updateProgress,
    reviews,
    getCourseReviews,
    addReview,
    submitQuizAttempt,
    users,
    getAllUsers,
    updateUserRole,
    addPoints,
    canEditCourse,
    canViewCourse,
    canManageUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
