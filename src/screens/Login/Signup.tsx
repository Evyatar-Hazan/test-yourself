import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthContainer,
  AuthCard,
  AuthHeader,
  AuthForm,
  FormGroup,
  Input,
  ErrorMessage,
  SubmitButton,
  AuthActions,
} from "./Signup.styled";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../features/auth/authSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { AuthService } from "../../services/authService";
import { AppDispatch } from "../../store";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { t } = useTranslationTyped();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = t("signup.required_name");
    } else if (!AuthService.isValidName(formData.name)) {
      errors.name = t("signup.invalid_name");
    }

    if (!formData.email) {
      errors.email = t("signup.required_email");
    } else if (!AuthService.isValidEmail(formData.email)) {
      errors.email = t("signup.invalid_email");
    }

    if (!formData.password) {
      errors.password = t("signup.required_password");
    } else if (!AuthService.isValidPassword(formData.password)) {
      errors.password = t("signup.weak_password");
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t("signup.required_confirm_password");
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t("signup.passwords_do_not_match");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(
        registerUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      ).unwrap();

      navigate("/verify-email", {
        state: {
          email: formData.email.trim(),
          message: result.message,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <h1>{t("signup.title")}</h1>
          <p>{t("signup.subtitle")}</p>
        </AuthHeader>

        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">{t("signup.name_label")}</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!validationErrors.name}
              placeholder={t("signup.name_placeholder")}
              autoComplete="name"
              disabled={isLoading}
            />
            {validationErrors.name && (
              <ErrorMessage>{validationErrors.name}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">{t("signup.email_label")}</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              placeholder={t("signup.email_placeholder")}
              autoComplete="email"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <ErrorMessage>{validationErrors.email}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">{t("signup.password_label")}</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              placeholder={t("signup.password_placeholder")}
              autoComplete="new-password"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="confirmPassword">
              {t("signup.confirm_password_label")}
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!validationErrors.confirmPassword}
              placeholder={t("signup.confirm_password_placeholder")}
              autoComplete="new-password"
              disabled={isLoading}
            />
            {validationErrors.confirmPassword && (
              <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>

          {error && (
            <FormGroup>
              <ErrorMessage>{error}</ErrorMessage>
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? t("signup.loading") : t("signup.submit")}
          </SubmitButton>

          <AuthActions>
            <span>{t("signup.has_account")}</span>
            <Link to="/login">{t("signup.login_here")}</Link>
          </AuthActions>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  );
};

export default Signup;
