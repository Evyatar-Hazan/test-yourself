import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTests as fetchTestsApi } from "../../services/api";
import type { TestEntity, TestsState } from "../../types";

const initialState: TestsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTests = createAsyncThunk("tests/fetchAll", async () => {
  const data = await fetchTestsApi();
  return data;
});

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    addTest: (state, action: PayloadAction<TestEntity>) => {
      state.data.push(action.payload);
    },
    removeTest: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((t) => t.id !== action.payload);
    },
    updateTest: (state, action: PayloadAction<TestEntity>) => {
      const idx = state.data.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch tests";
      });
  },
});

export const { addTest, removeTest, updateTest } = testsSlice.actions;

export const testsReducer = testsSlice.reducer;

// Selectors
export const selectTestsState = (state: { tests: TestsState }) => state.tests;
export const selectTests = (state: { tests: TestsState }) => state.tests.data;
export const selectTestsLoading = (state: { tests: TestsState }) =>
  state.tests.isLoading;
export const selectTestsError = (state: { tests: TestsState }) =>
  state.tests.error;

export default testsSlice;
