import type { Preview } from "@storybook/react-webpack5";
import React from "react";
import { breakpoints } from "../src/theme/breakpoints";
import { AppThemeProvider, useThemeTyped } from "../src/theme/ThemeProvider";
import type { Breakpoints } from "../src/theme/types";

const makeViewports = (bps: Breakpoints) => {
  return Object.entries(bps).reduce<
    Record<string, { name: string; styles: { width: string; height: string } }>
  >((acc, [key, val]) => {
    acc[key] = {
      name: `${key} (${val}px)`,
      styles: { width: `${val}px`, height: "800px" },
    };
    return acc;
  }, {});
};

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = useThemeTyped();
  return (
    <button
      style={{ position: "fixed", right: 12, bottom: 12, zIndex: 9999 }}
      onClick={toggleTheme}
    >
      Theme: {mode}
    </button>
  );
};

const withProviders: Preview["decorators"] = [
  (Story) => (
    <AppThemeProvider>
      <ThemeSwitcher />
      <Story />
    </AppThemeProvider>
  ),
];

const preview: Preview = {
  decorators: withProviders,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: makeViewports(breakpoints),
    },
    a11y: {
      // TODO: Ensure contrast checks pass for all core components.
      element: "#root",
      config: {},
      options: {},
    },
  },
};

export default preview;
