export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type SemanticColors = {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  text: string;
  background: string;
  surface: string;
  outline: string;
};

export type Typography = {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
};

export type SpacingScale = {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type RadiusScale = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  pill: string;
  round: string;
};

export type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type AppTheme = {
  mode: "light" | "dark";
  colors: SemanticColors;
  typography: Typography;
  spacing: SpacingScale;
  radius: RadiusScale;
  breakpoints: Breakpoints;
  zIndex: {
    base: number;
    dropdown: number;
    modal: number;
    toast: number;
  };
};

// TODO: Consider adding elevation/shadows tokens with opacity tuned per mode.
