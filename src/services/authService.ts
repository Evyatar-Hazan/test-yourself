import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  VerifyEmailRequest,
  ResetPasswordRequest,
  ResetPasswordConfirmRequest,
  User,
} from "../types";

const API_BASE_URL = "http://localhost:3001/api";

export class AuthService {
  private static readonly TOKEN_KEY = "auth_token";
  private static readonly REFRESH_TOKEN_KEY = "refresh_token";
  private static readonly USER_KEY = "auth_user";

  // Local Storage management
  static saveAuth(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // API calls
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה בהתחברות");
    }

    this.saveAuth(data);
    return data;
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה בהרשמה");
    }

    this.saveAuth(data);
    return data;
  }

  static async verifyEmail(
    verificationData: VerifyEmailRequest,
  ): Promise<{ user: User; message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה באימות המייל");
    }

    // עדכון המשתמש ב-localStorage
    if (data.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
    }

    return data;
  }

  static async resetPassword(
    resetData: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה בבקשת איפוס סיסמה");
    }

    return data;
  }

  static async confirmResetPassword(
    confirmData: ResetPasswordConfirmRequest,
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/auth/reset-password-confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה באיפוס הסיסמה");
    }

    return data;
  }

  static async getCurrentUser(): Promise<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error("לא נמצא token");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // אם ה-token לא תקין, מנקים את ה-auth
      if (response.status === 401 || response.status === 403) {
        this.clearAuth();
      }
      throw new Error(data.message || "שגיאה בטעינת מידע המשתמש");
    }

    // עדכון המשתמש ב-localStorage
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
    return data.user;
  }

  static async refreshToken(): Promise<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("לא נמצא refresh token");
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      // אם ה-refresh token לא תקין, מנקים את כל ה-auth
      this.clearAuth();
      throw new Error(data.message || "שגיאה ברענון ה-token");
    }

    this.saveAuth(data);
    return data;
  }

  static async logout(): Promise<void> {
    const token = this.getToken();

    // שליחה לשרת (אופציונלי)
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }

    // ניקוי מקומי
    this.clearAuth();
  }

  // Validation helpers
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    // לפחות 8 תווים, אות גדולה, אות קטנה, מספר
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static isValidName(name: string): boolean {
    // לפחות 2 תווים, רק אותיות ורווחים
    const nameRegex = /^[a-zA-Zא-ת\s]{2,50}$/;
    return nameRegex.test(name.trim());
  }

  static async requestPasswordReset(
    request: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה בבקשת איפוס סיסמה");
    }

    return data;
  }

  static async confirmPasswordReset(
    request: ResetPasswordConfirmRequest,
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "שגיאה באיפוס הסיסמה");
    }

    return data;
  }

  static getPasswordRequirements(): string[] {
    return [
      "לפחות 8 תווים",
      "אות גדולה אחת לפחות",
      "אות קטנה אחת לפחות",
      "מספר אחד לפחות",
    ];
  }
}
