import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginForm,
  FormGroup,
  Input,
  PasswordInputContainer,
  PasswordToggle,
  ErrorMessage,
  SubmitButton,
  ForgotPassword,
  AuthActions,
} from "./Login.styles";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../features/auth/authSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { AuthService } from "../../services/authService";
import { AppDispatch } from "../../store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { t } = useTranslationTyped();

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
