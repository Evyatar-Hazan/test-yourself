export type ID = string;

export interface User {
  id: ID;
  name: string;
  username: string;
  avatarUrl?: string;
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

export type UsersState = AsyncState<User[]>;
export type PostsState = AsyncState<Post[]>;
export type TestsState = AsyncState<TestEntity[]>;
export type CommentsState = AsyncState<Comment[]>;
