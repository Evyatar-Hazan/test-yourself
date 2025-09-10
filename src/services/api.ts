import comments from "../mocks/comments.json";
import posts from "../mocks/posts.json";
import tests from "../mocks/tests.json";
import users from "../mocks/users.json";
import type { Comment, Post, TestEntity, User } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers(): Promise<User[]> {
  await delay(300);
  return users as User[];
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(350);
  return posts as Post[];
}

export async function fetchTests(): Promise<TestEntity[]> {
  await delay(400);
  return tests as TestEntity[];
}

export async function fetchComments(): Promise<Comment[]> {
  await delay(250);
  return comments as Comment[];
}

export const api = {
  fetchUsers,
  fetchPosts,
  fetchTests,
  fetchComments,
};

export default api;
