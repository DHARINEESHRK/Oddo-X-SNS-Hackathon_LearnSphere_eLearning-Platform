import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, Course, Enrollment, Review, UserRole, Badge } from '../types';
import { mockUsers, mockEnrollments, mockReviews } from '../data/mockData';
import { loginUser, signupUser, logoutUser, fetchCourses, createCourseApi, updateCourseApi, deleteCourseApi } from '../api/client';

// --------------- localStorage helpers ---------------
const LS_KEYS = {
  currentUser: 'ls_currentUser',
  courses: 'ls_courses',
  enrollments: 'ls_enrollments',
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // corrupted data — clear it
    localStorage.removeItem(key);
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

// Badge definitions — earned at point thresholds
const BADGE_THRESHOLDS: { points: number; badge: Omit<Badge, 'earnedAt'> }[] = [
  { points: 50,  badge: { id: 'badge-starter',     name: 'Quick Starter',    description: 'Earn your first 50 points',  icon: '🚀' } },
  { points: 150, badge: { id: 'badge-learner',      name: 'Eager Learner',    description: 'Earn 150 points',            icon: '📚' } },
  { points: 300, badge: { id: 'badge-scholar',      name: 'Scholar',          description: 'Earn 300 points',            icon: '🎓' } },
  { points: 500, badge: { id: 'badge-master',       name: 'Knowledge Master', description: 'Earn 500 points',            icon: '👑' } },
  { points: 1000,badge: { id: 'badge-legend',       name: 'Legend',           description: 'Earn 1000 points',           icon: '⭐' } },
];

interface LessonCompletionResult {
  pointsEarned: number;
  totalPoints: number;
  newBadge?: { name: string; icon: string };
  isCourseCompleted: boolean;
}

interface AppContextType {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Authentication
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  
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
  
  // Learning flow
  completeLesson: (courseId: string, lessonId: string) => LessonCompletionResult | null;
  getEnrollmentForCourse: (courseId: string) => Enrollment | undefined;
  
  // Permissions
  canEditCourse: (courseId: string) => boolean;
  canViewCourse: (courseId: string) => boolean;
  canManageUsers: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(
    () => loadFromStorage<User | null>(LS_KEYS.currentUser, null)
  );
  const [courses, setCourses] = useState<Course[]>(
    () => loadFromStorage<Course[]>(LS_KEYS.courses, [])
  );
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(
    () => loadFromStorage<Enrollment[]>(LS_KEYS.enrollments, mockEnrollments)
  );
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Persist to localStorage whenever tracked state changes
  useEffect(() => { saveToStorage(LS_KEYS.currentUser, currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage(LS_KEYS.courses, courses); }, [courses]);
  useEffect(() => { saveToStorage(LS_KEYS.enrollments, enrollments); }, [enrollments]);

  // Fetch courses from MongoDB on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const backendCourses = await fetchCourses();
        if (!cancelled && backendCourses.length > 0) {
          setCourses(backendCourses);
        }
      } catch {
        // Backend unavailable — keep whatever is in localStorage (or empty)
        console.warn('Could not fetch courses from backend, using cached data');
      } finally {
        if (!cancelled) setCoursesLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Authentication
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password' };
    }

    // Try the real backend first
    try {
      const res = await loginUser({ email, password });
      if (res.token && res.user) {
        const loggedInUser: User = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          password: '',
          role: (res.user.role as UserRole) || 'learner',
          points: 0,
          badges: [],
          enrolledCourses: [],
        };
        setCurrentUser(loggedInUser);
        return { success: true };
      }
    } catch {
      // Backend unavailable — fall back to local mock data
    }

    // Fallback: local mock validation
    const user = users.find(u => u.email === email);
    if (!user) {
      return { success: false, error: 'No account found with this email' };
    }
    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    localStorage.removeItem(LS_KEYS.currentUser);
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check locally first
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Try real backend
    try {
      const res = await signupUser({ name, email, password });
      if (res.token && res.user) {
        const newUser: User = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          password: '',
          role: (res.user.role as UserRole) || 'learner',
          points: 0,
          badges: [],
          enrolledCourses: [],
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        return { success: true };
      }
    } catch {
      // Backend unavailable — fall back to local
    }

    // Fallback: local registration
    const newUser: User = {
      id: `learner-${Date.now()}`,
      name,
      email,
      password,
      role: 'learner',
      points: 0,
      badges: [],
      enrolledCourses: [],
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  // Course management
  const getCourseById = (id: string) => courses.find(c => c.id === id);
  
  const getPublishedCourses = () => courses.filter(c => c.published);
  
  const getCoursesForGuest = () => courses.filter(c => c.published && c.allowGuests);
  
  const getInstructorCourses = (instructorId: string) => 
    courses.filter(c => c.instructorId === instructorId);

  const createCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
    const tempId = `course-${Date.now()}`;
    const newCourse: Course = {
      ...courseData,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCourses(prev => [...prev, newCourse]);

    // Persist to MongoDB in background
    createCourseApi(courseData)
      .then((saved) => {
        // Replace temp course with the one from DB (real _id)
        setCourses(prev => prev.map(c => c.id === tempId ? saved : c));
      })
      .catch((err) => console.warn('Failed to save course to backend:', err));

    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
    // Sync to MongoDB
    updateCourseApi(id, updates).catch((err) =>
      console.warn('Failed to update course in backend:', err)
    );
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    // Sync to MongoDB
    deleteCourseApi(id).catch((err) =>
      console.warn('Failed to delete course in backend:', err)
    );
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
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newPoints = u.points + points;
        if (currentUser?.id === userId) {
          setCurrentUser(cur => cur ? { ...cur, points: newPoints } : cur);
        }
        return { ...u, points: newPoints };
      }
      return u;
    }));
  };

  // Evaluate whether a user earned a new badge at their current point total
  const evaluateBadge = (user: User, newTotalPoints: number): Badge | undefined => {
    const earned = user.badges.map(b => b.id);
    for (const t of BADGE_THRESHOLDS) {
      if (newTotalPoints >= t.points && !earned.includes(t.badge.id)) {
        return { ...t.badge, earnedAt: new Date().toISOString() };
      }
    }
    return undefined;
  };

  // Award a badge to the user
  const awardBadge = (userId: string, badge: Badge) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, badges: [...u.badges, badge] };
        if (currentUser?.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
  };

  // Get enrollment for a course for the current user
  const getEnrollmentForCourse = (courseId: string): Enrollment | undefined => {
    if (!currentUser) return undefined;
    return enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
  };

  // Complete a lesson: update progress, award points, evaluate badge, check course completion
  const completeLesson = (courseId: string, lessonId: string): LessonCompletionResult | null => {
    if (!currentUser) return null;

    const course = getCourseById(courseId);
    if (!course) return null;

    let enrollment = enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
    if (!enrollment) {
      // Auto-enroll
      enrollInCourse(currentUser.id, courseId);
      enrollment = enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
      if (!enrollment) return null;
    }

    // Already completed this lesson
    if (enrollment.completedLessons.includes(lessonId)) {
      return { pointsEarned: 0, totalPoints: currentUser.points, isCourseCompleted: enrollment.status === 'completed' };
    }

    // Mark lesson complete via updateProgress (adds 10 pts internally)
    updateProgress(enrollment.id, lessonId);

    const LESSON_POINTS = 10;
    const newTotal = currentUser.points + LESSON_POINTS;

    // Check if course is now completed
    const completedCount = enrollment.completedLessons.length + 1; // +1 for the one we just added
    const isCourseCompleted = completedCount >= course.lessons.length;

    // If course completed, award bonus points
    const COURSE_BONUS = isCourseCompleted ? 100 : 0;
    if (COURSE_BONUS > 0) {
      addPoints(currentUser.id, COURSE_BONUS);
    }

    const finalTotal = newTotal + COURSE_BONUS;

    // Evaluate badge
    const user = users.find(u => u.id === currentUser.id) || currentUser;
    const newBadge = evaluateBadge(user, finalTotal);
    if (newBadge) {
      awardBadge(currentUser.id, newBadge);
    }

    return {
      pointsEarned: LESSON_POINTS + COURSE_BONUS,
      totalPoints: finalTotal,
      newBadge: newBadge ? { name: newBadge.name, icon: newBadge.icon } : undefined,
      isCourseCompleted,
    };
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
    completeLesson,
    getEnrollmentForCourse,
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
