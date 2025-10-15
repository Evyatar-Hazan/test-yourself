import type { Comment, Post, TestEntity, User } from "../types";
import type { TestComment } from "../types/test";
import {
  getUsers,
  getPosts,
  getComments,
  getPaginatedTests,
} from "../utils/helpers";

const API_BASE_URL = "http://localhost:3001/api";

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

// Follow system API
export async function followUser(
  targetUserId: string,
  token: string,
): Promise<{ me: User; target: User } | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${targetUserId}/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      let message = "Failed to follow";
      try {
        const data = await response.json();
        message = data.message || data.error || message;
      } catch {
        // ignore json parse errors
      }
      throw new Error(message);
    }
    const data = await response.json();
    return { me: data.me, target: data.target } as { me: User; target: User };
  } catch (error) {
    console.error("Error following user:", error);
    throw error instanceof Error ? error : new Error("Failed to follow");
  }
}

export async function unfollowUser(
  targetUserId: string,
  token: string,
): Promise<{ me: User; target: User } | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${targetUserId}/follow`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      let message = "Failed to unfollow";
      try {
        const data = await response.json();
        message = data.message || data.error || message;
      } catch {
        // ignore json parse errors
      }
      throw new Error(message);
    }
    const data = await response.json();
    return { me: data.me, target: data.target } as { me: User; target: User };
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error instanceof Error ? error : new Error("Failed to unfollow");
  }
}

export async function fetchUserById(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) return null;
    return (await response.json()) as User;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
}

export async function fetchFollowers(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/followers`);
    if (!response.ok) throw new Error("Failed to fetch followers");
    return await response.json();
  } catch (error) {
    console.error("Error fetching followers:", error);
    return [];
  }
}

export async function fetchFollowing(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/following`);
    if (!response.ok) throw new Error("Failed to fetch following");
    return await response.json();
  } catch (error) {
    console.error("Error fetching following:", error);
    return [];
  }
}

// Test Comments API
export async function fetchTestComments(
  testId: string,
): Promise<TestComment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tests/${testId}/comments`);
    if (!response.ok) {
      throw new Error("Failed to fetch test comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching test comments:", error);
    return [];
  }
}

export async function addTestComment(
  testId: string,
  authorId: string,
  body: string,
  parentId?: string,
): Promise<TestComment | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/tests/${testId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId, body, parentId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add test comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding test comment:", error);
    return null;
  }
}

export async function updateTestComment(
  testId: string,
  commentId: string,
  body: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tests/${testId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Error updating test comment:", error);
    return false;
  }
}

export async function deleteTestComment(
  testId: string,
  commentId: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tests/${testId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Error deleting test comment:", error);
    return false;
  }
}

export async function toggleTestCommentLike(
  testId: string,
  commentId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tests/${testId}/comments/${commentId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return false;
  }
}

export async function toggleTestLike(
  testId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/tests/${testId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error toggling test like:", error);
    return false;
  }
}

export const api = {
  fetchUsers,
  fetchPosts,
  fetchTests,
  fetchComments,
  fetchTestComments,
  addTestComment,
  updateTestComment,
  deleteTestComment,
  toggleTestCommentLike,
  toggleTestLike,
  followUser,
  unfollowUser,
  fetchFollowers,
  fetchFollowing,
  fetchUserById,
};

export default api;
