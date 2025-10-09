// פונקציות עוזרות לקריאת נתונים מהשרת
import type { Test } from "../types/test";

const API_BASE_URL = "http://localhost:3001/api";

// === TESTS API ===
export async function getPaginatedTests(page = 1, pageSize = 3) {
  try {
    // קבל את כל המבחנים מהשרת (סטטיים + משתמש)
    const response = await fetch(`${API_BASE_URL}/tests`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allTests = await response.json();

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      tests: allTests.slice(start, end),
      hasMore: end < allTests.length,
    };
  } catch (error) {
    console.error("Error fetching tests:", error);
    return {
      tests: [],
      hasMore: false,
    };
  }
}

// שמירת מבחן חדש לשרת
export async function saveTest(test: Omit<Test, "id">): Promise<Test> {
  try {
    const response = await fetch(`${API_BASE_URL}/user-tests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const savedTest = await response.json();
    console.log("Test saved to JSON file:", savedTest);
    return savedTest;
  } catch (error) {
    console.error("Error saving test to server:", error);
    throw error;
  }
}

// מחיקת מבחן
export async function deleteTest(testId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/user-tests/${testId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Test deleted from JSON file:", testId);
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
}

// חיפוש מבחן ספציפי בכל המקורות
export async function getTestById(testId: string): Promise<Test | undefined> {
  try {
    // קבל את כל המבחנים מהשרת
    const response = await fetch(`${API_BASE_URL}/tests`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allTests = await response.json();
    return allTests.find((test: Test) => test.id === testId);
  } catch (error) {
    console.error("Error finding test by ID:", error);
    return undefined;
  }
}

// === USERS API ===
export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// === POSTS API ===
export async function getPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// === COMMENTS API ===
export async function getComments() {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export {};
