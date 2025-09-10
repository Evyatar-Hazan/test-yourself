import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer } from "../features/comments/commentsSlice";
import { postsReducer } from "../features/posts/postsSlice";
import { testsReducer } from "../features/tests/testsSlice";
import { usersReducer } from "../features/users/usersSlice";

// Root reducer will be extended with feature slices as they are added.
// For now, we initialize with an empty reducer object to allow future injection.
export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    tests: testsReducer,
    comments: commentsReducer,
  },
  // Thunk is included by default in RTK; keeping middleware explicit for clarity/extension.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
