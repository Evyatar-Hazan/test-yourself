export type ID = string;

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
  followers?: ID[];
  following?: ID[];
}

// Types for backward compatibility with existing code
export interface UserOld {
  id: ID;
  name: string;
  username: string;
  avatarUrl?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  message?: string;
}

export interface AuthError {
  error: string;
  message: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  token: string;
  newPassword: string;
}

export interface Post {
  id: ID;
  authorId: ID;
  title: string;
  body: string;
  createdAt: string; // ISO string
}

export interface TestEntity {
  id: ID;
  ownerId: ID;
  subject: string;
  score: number; // 0-100
  takenAt: string; // ISO string
  questionsCount: number;
  respondentsCount: number;
  averageScore: number;
}

export interface Comment {
  id: ID;
  postId: ID;
  authorId: ID;
  body: string;
  createdAt: string; // ISO string
}

export interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type UsersState = AsyncState<User[]>;
export type PostsState = AsyncState<Post[]>;
export type TestsState = AsyncState<TestEntity[]>;
export type CommentsState = AsyncState<Comment[]>;
