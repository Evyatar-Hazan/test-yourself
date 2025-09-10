import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers as fetchUsersApi } from "../../services/api";
import type { UsersState, User } from "../../types";

const initialState: UsersState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const data = await fetchUsersApi();
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((u) => u.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const idx = state.data.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      });
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

// Selectors
export const selectUsersState = (state: { users: UsersState }) => state.users;
export const selectUsers = (state: { users: UsersState }) => state.users.data;
export const selectUsersLoading = (state: { users: UsersState }) =>
  state.users.isLoading;
export const selectUsersError = (state: { users: UsersState }) =>
  state.users.error;

export default usersSlice;
