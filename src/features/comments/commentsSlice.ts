import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments as fetchCommentsApi } from "../../services/api";
import type { Comment, CommentsState } from "../../types";

const initialState: CommentsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchAll", async () => {
  const data = await fetchCommentsApi();
  return data;
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.data.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const idx = state.data.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch comments";
      });
  },
});

export const { addComment, removeComment, updateComment } =
  commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;

// Selectors
export const selectCommentsState = (state: { comments: CommentsState }) =>
  state.comments;
export const selectComments = (state: { comments: CommentsState }) =>
  state.comments.data;
export const selectCommentsLoading = (state: { comments: CommentsState }) =>
  state.comments.isLoading;
export const selectCommentsError = (state: { comments: CommentsState }) =>
  state.comments.error;

export default commentsSlice;
