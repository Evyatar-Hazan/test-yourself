import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../features/auth/authSlice";
import { AuthService } from "../../services/authService";
import { AppDispatch } from "../../store";

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  direction: rtl;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

const LoginHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
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

const LoginForm = styled.form`
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    font-size: 0.95rem;
  }
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${(props) => (props.error ? "#e74c3c" : "#e1e8ed")};
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#e74c3c" : "#667eea")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error ? "rgba(231, 76, 60, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.1rem;
  padding: 5px;

  &:hover {
    color: #333;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 14px;
  background: ${(props) =>
    props.disabled
      ? "#95a5a6"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-bottom: 20px;

  a {
    color: #667eea;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthActions = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e1e8ed;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation errors when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear general errors
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    if (!formData.email) {
      errors.email = t("login.required_email");
    } else if (!AuthService.isValidEmail(formData.email)) {
      errors.email = t("login.invalid_email");
    }

    if (!formData.password) {
      errors.password = t("login.required_password");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h1>{t("login.title")}</h1>
          <p>{t("login.welcome_back")}</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">{t("login.email_label")}</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              placeholder={t("login.email_placeholder")}
              autoComplete="email"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <ErrorMessage>{validationErrors.email}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">{t("login.password_label")}</label>
            <PasswordInputContainer>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                placeholder={t("login.password_placeholder")}
                autoComplete="current-password"
                disabled={isLoading}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? t("login.hide_password")
                    : t("login.show_password")
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </PasswordToggle>
            </PasswordInputContainer>
            {validationErrors.password && (
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            )}
          </FormGroup>

          {error && (
            <FormGroup>
              <ErrorMessage>{error}</ErrorMessage>
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? t("login.loading") : t("login.submit")}
          </SubmitButton>

          <ForgotPassword>
            <Link to="/forgot-password">{t("login.forgot_password")}</Link>
          </ForgotPassword>

          <AuthActions>
            <span>{t("login.no_account")}</span>
            <Link to="/signup">{t("login.signup_here")}</Link>
          </AuthActions>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
