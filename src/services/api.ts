import type { Comment, Post, TestEntity, User } from "../types";
import {
  getUsers,
  getPosts,
  getComments,
  getPaginatedTests,
} from "../utils/helpers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers(): Promise<User[]> {
  await delay(300);
  return await getUsers();
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(350);
  return await getPosts();
}

export async function fetchTests(): Promise<TestEntity[]> {
  await delay(400);
  // מביא את כל המבחנים (עמוד 1 עם pageSize גדול)
  const { tests } = await getPaginatedTests(1, 1000);
  return tests as TestEntity[];
}

export async function fetchComments(): Promise<Comment[]> {
  await delay(250);
  return await getComments();
}

export const api = {
  fetchUsers,
  fetchPosts,
  fetchTests,
  fetchComments,
};

export default api;
