import { breakpoints } from "./breakpoints";
import type { AppTheme } from "./types";

const base = {
  typography: {
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  spacing: {
    none: "0",
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  radius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "999px",
    round: "50%",
  },
  breakpoints,
  zIndex: {
    base: 1,
    dropdown: 1000,
    modal: 1100,
    toast: 1200,
  },
} as const;

export const lightTheme: AppTheme = {
  ...base,
  mode: "light",
  colors: {
    primary: "#1a73e8",
    secondary: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    text: "#111827",
    background: "#ffffff",
    surface: "#f9fafb",
    outline: "#e5e7eb",
  },
};

export const darkTheme: AppTheme = {
  ...base,
  mode: "dark",
  colors: {
    primary: "#8ab4f8",
    secondary: "#9ca3af",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    text: "#f9fafb",
    background: "#0b1020",
    surface: "#111827",
    outline: "#374151",
  },
};

export type ThemeMode = typeof lightTheme.mode | typeof darkTheme.mode;
