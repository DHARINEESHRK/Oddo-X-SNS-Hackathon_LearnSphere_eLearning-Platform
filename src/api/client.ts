import axios from 'axios';

// In development, Vite proxy forwards /api → http://localhost:5000
// In production, set VITE_API_URL to your backend origin
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// Axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally (token expired, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ───────────────────────────────────────────────

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

/** Register a new user */
export async function signupUser(data: SignupPayload): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/signup', data);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
}

/** Log in an existing user */
export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/login', data);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
}

/** Remove stored token */
export function logoutUser(): void {
  localStorage.removeItem('token');
}

/** Check if a token exists */
export function getStoredToken(): string | null {
  return localStorage.getItem('token');
}

// ─── File Upload API ────────────────────────────────────────

export interface UploadResponse {
  message: string;
  file: {
    url: string;
    publicId: string;
    fileType: string;
  };
}

/** Upload an image file */
export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('image', file);
  const res = await apiClient.post<UploadResponse>('/uploadimage', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

/** Upload a video file */
export async function uploadVideo(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('video', file);
  const res = await apiClient.post<UploadResponse>('/uploadvideo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

/** Upload a PDF file */
export async function uploadPdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('pdf', file);
  const res = await apiClient.post<UploadResponse>('/uploadpdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

// ─── Course API ─────────────────────────────────────────────

import type { Course } from '../types';

/** Fetch all courses (optionally filter) */
export async function fetchCourses(params?: {
  published?: boolean;
  instructorId?: string;
}): Promise<Course[]> {
  const query = new URLSearchParams();
  if (params?.published !== undefined) query.set('published', String(params.published));
  if (params?.instructorId) query.set('instructorId', params.instructorId);
  const res = await apiClient.get<Course[]>(`/courses?${query.toString()}`);
  return res.data;
}

/** Fetch a single course by ID */
export async function fetchCourseById(id: string): Promise<Course> {
  const res = await apiClient.get<Course>(`/courses/${id}`);
  return res.data;
}

/** Create a new course */
export async function createCourseApi(
  data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Course> {
  const res = await apiClient.post<Course>('/courses', data);
  return res.data;
}

/** Update an existing course */
export async function updateCourseApi(
  id: string,
  data: Partial<Course>
): Promise<Course> {
  const res = await apiClient.put<Course>(`/courses/${id}`, data);
  return res.data;
}

/** Delete a course */
export async function deleteCourseApi(id: string): Promise<void> {
  await apiClient.delete(`/courses/${id}`);
}

export default apiClient;
