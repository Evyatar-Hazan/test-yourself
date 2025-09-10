import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts as fetchPostsApi } from "../../services/api";
import type { Post, PostsState } from "../../types";

const initialState: PostsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const data = await fetchPostsApi();
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.data.push(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const idx = state.data.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      });
  },
});

export const { addPost, removePost, updatePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

// Selectors
export const selectPostsState = (state: { posts: PostsState }) => state.posts;
export const selectPosts = (state: { posts: PostsState }) => state.posts.data;
export const selectPostsLoading = (state: { posts: PostsState }) =>
  state.posts.isLoading;
export const selectPostsError = (state: { posts: PostsState }) =>
  state.posts.error;

export default postsSlice;
