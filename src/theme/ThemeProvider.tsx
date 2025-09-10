import React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import type { AppTheme } from "./types";

type ThemeContextValue = {
  mode: AppTheme["mode"];
  toggleTheme: () => void;
  setMode: (mode: AppTheme["mode"]) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "app_theme_mode" as const;

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${(p) => (p.theme.mode === "dark" ? "dark" : "light")};
  }
  body {
    margin: 0;
    background: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};
    font-family: ${(p) => p.theme.typography.fontFamily};
    line-height: ${(p) => p.theme.typography.lineHeight.normal};
  }
`;

export const AppThemeProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [mode, setModeState] = React.useState<AppTheme["mode"]>(() => {
    const saved =
      (typeof window !== "undefined" &&
        window.localStorage.getItem(STORAGE_KEY)) ||
      "light";
    return (saved === "dark" ? "dark" : "light") as AppTheme["mode"];
  });

  const setMode = React.useCallback((nextMode: AppTheme["mode"]) => {
    setModeState(nextMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  const theme = React.useMemo<AppTheme>(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode],
  );

  const ctx = React.useMemo<ThemeContextValue>(
    () => ({ mode, toggleTheme, setMode }),
    [mode, toggleTheme, setMode],
  );

  return (
    <ThemeContext.Provider value={ctx}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeTyped = (): ThemeContextValue => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    // TODO: Wrap app/stories with AppThemeProvider to ensure theme available.
    throw new Error("useThemeTyped must be used within AppThemeProvider");
  }
  return ctx;
};
