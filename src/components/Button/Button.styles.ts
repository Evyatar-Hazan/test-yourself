import styled, { css } from "styled-components";
import type { AppTheme } from "../../theme/types";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
};

const sizeStyles = (size: ButtonSize, theme: AppTheme) => {
  switch (size) {
    case "sm":
      return css`
        font-size: ${theme.typography.fontSize.sm};
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
      `;
    case "lg":
      return css`
        font-size: ${theme.typography.fontSize.lg};
        padding: ${theme.spacing.md} ${theme.spacing.lg};
      `;
    case "md":
    default:
      return css`
        font-size: ${theme.typography.fontSize.md};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
      `;
  }
};

const variantStyles = (variant: ButtonVariant, theme: AppTheme) => {
  const map = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    danger: theme.colors.danger,
    success: theme.colors.success,
  } as const;
  const color = map[variant];
  return css`
    background: ${color};
    color: ${theme.mode === "dark" ? theme.colors.text : "#ffffff"};
    &:hover {
      filter: brightness(0.95);
    }
  `;
};

export const StyledButton = styled.button<ButtonProps>`
  border: 1px solid ${(p) => p.theme.colors.outline};
  border-radius: ${(p) => p.theme.radius.sm};
  cursor: pointer;
  width: ${(p) => (p.fullWidth ? "100%" : "auto")};
  ${(p) => sizeStyles(p.size ?? "md", p.theme)}
  ${(p) => variantStyles(p.variant ?? "primary", p.theme)}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// TODO: Add focus-visible ring for accessibility.
