// מחזיר מבחנים מדורגים מתוך mocks/tests.json
import testsData from "../mocks/tests.json";

export function getPaginatedTests(page = 1, pageSize = 3) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    tests: testsData.slice(start, end),
    hasMore: end < testsData.length,
  };
}

export {};
