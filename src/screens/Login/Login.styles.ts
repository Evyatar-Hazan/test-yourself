import styled from "styled-components";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.primary} 0%,
    ${(p) => p.theme.colors.secondary} 100%
  );
  padding: 20px;
  direction: rtl;
`;

export const LoginCard = styled.div`
  background: ${(p) => p.theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 10px 30px color-mix(in srgb, black 10%, transparent);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LoginHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.primary} 0%,
    ${(p) => p.theme.colors.secondary} 100%
  );
  color: ${(p) => p.theme.colors.surface};
  padding: 30px 20px;
  text-align: center;

  h1 {
    margin: 0 0 10px 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1rem;
  }
`;

export const LoginForm = styled.form`
  padding: 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: ${(p) => p.theme.colors.text};
    font-size: 0.95rem;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.outline};
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? `color-mix(in srgb, ${props.theme.colors.danger} 10%, transparent)`
          : `color-mix(in srgb, ${props.theme.colors.primary} 10%, transparent)`};
  }

  &:disabled {
    background-color: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.surface} 90%, transparent)`};
    cursor: not-allowed;
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  font-size: 1.1rem;
  padding: 5px;

  &:hover {
    color: ${(p) => p.theme.colors.text};
  }
`;

export const ErrorMessage = styled.span`
  color: ${(p) => p.theme.colors.danger};
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 14px;
  background: ${(props) =>
    props.disabled
      ? `color-mix(in srgb, ${props.theme.colors.text} 35%, transparent)`
      : `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.secondary} 100%)`};
  color: ${(p) => p.theme.colors.surface};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px
      ${(p) => `color-mix(in srgb, ${p.theme.colors.primary} 30%, transparent)`};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ForgotPassword = styled.div`
  text-align: center;
  margin-bottom: 20px;

  a {
    color: ${(p) => p.theme.colors.primary};
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AuthActions = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid ${(p) => p.theme.colors.outline};

  a {
    color: ${(p) => p.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
