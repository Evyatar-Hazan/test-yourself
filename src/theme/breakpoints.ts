import type { Breakpoints } from "./types";

export const breakpoints: Breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const up = (key: keyof Breakpoints): string =>
  `@media (min-width: ${breakpoints[key]}px)`;
export const down = (key: keyof Breakpoints): string =>
  `@media (max-width: ${breakpoints[key]}px)`;

// TODO: Add container widths if a grid system is introduced.
