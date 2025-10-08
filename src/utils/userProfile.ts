import type { TestEntity, User } from "../types";

export interface UserStatistics {
  testsTaken: number;
  averageScore: number;
  testsCreated: number;
}

/**
 * חישוב סטטיסטיקות של משתמש
 * @param userId מזהה המשתמש
 * @param tests רשימת כל המבחנים
 * @returns סטטיסטיקות המשתמש
 */
export const calculateUserStatistics = (
  userId: string,
  tests: TestEntity[],
): UserStatistics => {
  // מבחנים שהמשתמש ענה עליהם (לא המבחנים שהוא יצר)
  const userTakenTests = tests.filter((test) => test.ownerId !== userId);
  // מבחנים שהמשתמש יצר
  const userCreatedTests = tests.filter((test) => test.ownerId === userId);

  const testsTaken = userTakenTests.length;
  const averageScore =
    testsTaken > 0
      ? Math.round(
          userTakenTests.reduce((sum, test) => sum + test.score, 0) /
            testsTaken,
        )
      : 0;

  return {
    testsTaken,
    averageScore,
    testsCreated: userCreatedTests.length,
  };
};

/**
 * מציאת המשתמש לפי מזהה
 * @param userId מזהה המשתמש
 * @param users רשימת המשתמשים
 * @returns המשתמש או undefined אם לא נמצא
 */
export const findUserById = (
  userId: string,
  users: User[],
): User | undefined => {
  return users.find((user) => user.id === userId);
};

/**
 * מציאת מבחנים של משתמש לפי סוג
 * @param userId מזהה המשתמש
 * @param tests רשימת המבחנים
 * @param type סוג המבחנים - 'created' למבחנים שיצר, 'taken' למבחנים שענה עליהם
 * @returns רשימת המבחנים המסוננת
 */
export const getUserTests = (
  userId: string,
  tests: TestEntity[],
  type: "created" | "taken",
): TestEntity[] => {
  if (type === "created") {
    return tests.filter((test) => test.ownerId === userId);
  }
  return tests.filter((test) => test.ownerId !== userId);
};
