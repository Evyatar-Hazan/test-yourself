import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../../services/authService";
import {
  AuthState,
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  ResetPasswordRequest,
  ResetPasswordConfirmRequest,
  User,
} from "../../types";

const initialState: AuthState = {
  user: AuthService.getUser(),
  token: AuthService.getToken(),
  refreshToken: AuthService.getRefreshToken(),
  isAuthenticated: AuthService.isAuthenticated(),
  isLoading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בהתחברות",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בהרשמה",
      );
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationData: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.verifyEmail(verificationData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה באימות המייל",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.resetPassword(resetData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בבקשת איפוס סיסמה",
      );
    }
  },
);

export const confirmResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async (confirmData: ResetPasswordConfirmRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.confirmResetPassword(confirmData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה באיפוס הסיסמה",
      );
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await AuthService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בטעינת מידע המשתמש",
      );
    }
  },
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.refreshToken();
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה ברענון ה-token",
      );
    }
  },
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (request: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.requestPasswordReset(request);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בבקשת איפוס סיסמה",
      );
    }
  },
);

export const confirmPasswordReset = createAsyncThunk(
  "auth/confirmPasswordReset",
  async (request: ResetPasswordConfirmRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.confirmPasswordReset(request);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה באיפוס הסיסמה",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "שגיאה בהתנתקות",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (state.user) {
        localStorage.setItem(
          AuthService["USER_KEY"],
          JSON.stringify(state.user),
        );
      }
    },
    // עדכון מידע המשתמש מ-localStorage (לשימוש בעת טעינת האפליקציה)
    initializeAuth: (state) => {
      state.user = AuthService.getUser();
      state.token = AuthService.getToken();
      state.refreshToken = AuthService.getRefreshToken();
      state.isAuthenticated = AuthService.isAuthenticated();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Confirm Reset Password
    builder
      .addCase(confirmResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // אם יש שגיאה בטעינת המשתמש, מנקים את ה-auth
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });

    // Refresh Token
    builder
      .addCase(refreshAuthToken.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.error = action.payload as string;
        // אם רענון ה-token נכשל, מנקים את כל ה-auth
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // גם אם יש שגיאה בהתנתקות, מנקים את המצב המקומי
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, updateUser, initializeAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
