import { configureStore } from "@reduxjs/toolkit";
import {
  commentsReducer,
  fetchComments,
} from "../features/comments/commentsSlice";
import { postsReducer, fetchPosts } from "../features/posts/postsSlice";
import { testsReducer, fetchTests } from "../features/tests/testsSlice";
import { usersReducer, fetchUsers } from "../features/users/usersSlice";

describe("slices basic functionality", () => {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      posts: postsReducer,
      tests: testsReducer,
      comments: commentsReducer,
    },
  });

  it("users thunk loads mock data", async () => {
    await store.dispatch(fetchUsers());
    const state = store.getState();
    expect(state.users.data.length).toBeGreaterThan(0);
  });

  it("posts thunk loads mock data", async () => {
    await store.dispatch(fetchPosts());
    const state = store.getState();
    expect(state.posts.data.length).toBeGreaterThan(0);
  });

  it("tests thunk loads mock data", async () => {
    await store.dispatch(fetchTests());
    const state = store.getState();
    expect(state.tests.data.length).toBeGreaterThan(0);
  });

  it("comments thunk loads mock data", async () => {
    await store.dispatch(fetchComments());
    const state = store.getState();
    expect(state.comments.data.length).toBeGreaterThan(0);
  });
});
