interface TestStatistics {
  testId: string;
  scores: number[];
  averageScore: number;
  respondentsCount: number;
  averageCorrect: number;
}

interface TestResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
}

// מחזיר את הסטטיסטיקות הנוכחיות מה-localStorage
export const getTestStatistics = (testId: string): TestStatistics | null => {
  try {
    const stored = localStorage.getItem(`test_stats_${testId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error reading test statistics:", error);
    return null;
  }
};

// מעדכן את הסטטיסטיקות עם תוצאה חדשה
export const updateTestStatistics = (
  testId: string,
  result: TestResult,
): TestStatistics => {
  const existing = getTestStatistics(testId) || {
    testId,
    scores: [],
    averageScore: 0,
    respondentsCount: 0,
    averageCorrect: 0,
  };

  // הוספת הציון החדש
  const newScores = [...existing.scores, result.score];
  const newRespondentsCount = existing.respondentsCount + 1;

  // חישוב ממוצע ציונים חדש
  const newAverageScore = Math.round(
    newScores.reduce((sum, score) => sum + score, 0) / newScores.length,
  );

  // חישוב ממוצע תשובות נכונות חדש (מתוך מספר השאלות בבחינה)
  const correctAnswersTotal =
    existing.averageCorrect * existing.respondentsCount + result.correctAnswers;
  const newAverageCorrect = Number(
    (correctAnswersTotal / newRespondentsCount).toFixed(1),
  );

  const updatedStats: TestStatistics = {
    testId,
    scores: newScores,
    averageScore: newAverageScore,
    respondentsCount: newRespondentsCount,
    averageCorrect: newAverageCorrect,
  };

  // שמירה ב-localStorage
  try {
    localStorage.setItem(`test_stats_${testId}`, JSON.stringify(updatedStats));
  } catch (error) {
    console.error("Error saving test statistics:", error);
  }

  return updatedStats;
};

// מחזיר את כל הסטטיסטיקות של כל המבחנים
export const getAllTestStatistics = (): Record<string, TestStatistics> => {
  const allStats: Record<string, TestStatistics> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("test_stats_")) {
        const testId = key.replace("test_stats_", "");
        const stats = getTestStatistics(testId);
        if (stats) {
          allStats[testId] = stats;
        }
      }
    }
  } catch (error) {
    console.error("Error reading all test statistics:", error);
  }

  return allStats;
};
