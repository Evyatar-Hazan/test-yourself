import React from "react";
import { StyledButton } from "./Button.styles";
import type { ButtonSize, ButtonVariant } from "./Button.styles";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
