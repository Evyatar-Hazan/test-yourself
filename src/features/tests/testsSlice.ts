import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPaginatedTests } from "../../utils/helpers";

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
    const { tests, hasMore } = getPaginatedTests(page, pageSize);
    return { tests, hasMore };
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
      });
  },
});

export const { resetTests } = testsSlice.actions;
export const testsReducer = testsSlice.reducer;
