import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Test as TestType } from "../../types/test";
import { getPaginatedTests, saveTest } from "../../utils/helpers";

export interface Test {
  id: string;
  ownerId: string;
  subject: string;
  score: number;
  takenAt: string;
  questionsCount: number;
  respondentsCount: number;
  averageScore: number;
  averageCorrect: number;
  likes?: string[];
}

interface TestsState {
  tests: Test[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: TestsState = {
  tests: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchTests = createAsyncThunk(
  "tests/fetchAll",
  async ({ page }: { page: number }) => {
    // שימוש בפונקציה המקומית
    const pageSize = 3;
    const { tests, hasMore } = await getPaginatedTests(page, pageSize);
    return { tests, hasMore };
  },
);

export const createTest = createAsyncThunk(
  "tests/create",
  async (testData: Omit<TestType, "id">) => {
    // שמירת המבחן בקובץ JSON באמצעות השרת
    const savedTest = await saveTest(testData);
    return savedTest;
  },
);

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    resetTests(state) {
      state.tests = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.hasMore = action.payload.hasMore;
        if (action.meta.arg.page === 1) {
          state.tests = action.payload.tests;
        } else {
          state.tests = [...state.tests, ...action.payload.tests];
        }
        state.page = action.meta.arg.page;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בטעינת מבחנים";
      })
      .addCase(createTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.loading = false;
        // הוסף את המבחן החדש לתחילת הרשימה
        state.tests = [action.payload, ...state.tests];
      })
      .addCase(createTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה ביצירת המבחן";
      });
  },
});

export const { resetTests } = testsSlice.actions;
export const testsReducer = testsSlice.reducer;
