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
  AuthActions
} from "./Signup.styled";
import { AppDispatch } from "../../store";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
  clearError
} from "../../features/auth/authSlice";
import { AuthService } from "../../services/authService";



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

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

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
      errors.name = "נדרש שם";
    } else if (!AuthService.isValidName(formData.name)) {
      errors.name = 
        "שם חייב להכיל לפחות 2 תווים ורק אותיות ורווחים";
    }

    if (!formData.email) {
      errors.email = "נדרש מייל";
    } else if (!AuthService.isValidEmail(formData.email)) {
      errors.email = "כתובת מייל לא תקינה";
    }

    if (!formData.password) {
      errors.password = "נדרשת סיסמה";
    } else if (!AuthService.isValidPassword(formData.password)) {
      errors.password = 
        "סיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה ומספר";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "נדרש אישור סיסמה";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "הסיסמאות לא תואמות";
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
          <h1>הרשמה</h1>
          <p>הצטרף לקהילת Test Yourself</p>
        </AuthHeader>

        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">שם מלא</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!validationErrors.name}
              placeholder="הכנס את שמך המלא"
              autoComplete="name"
              disabled={isLoading}
            />
            {validationErrors.name && (
              <ErrorMessage>{validationErrors.name}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">כתובת מייל</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              placeholder="הכנס את כתובת המייל שלך"
              autoComplete="email"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <ErrorMessage>{validationErrors.email}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">סיסמה</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              placeholder="בחר סיסמה חזקה"
              autoComplete="new-password"
              disabled={isLoading}
            />
            {validationErrors.password && (
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="confirmPassword">אמת סיסמה</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!validationErrors.confirmPassword}
              placeholder="הזן את הסיסמה שוב"
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
            {isLoading ? "נרשם..." : "הירשם"}
          </SubmitButton>

          <AuthActions>
            <span>יש לך כבר חשבון? </span>
            <Link to="/login">התחבר כאן</Link>
          </AuthActions>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  );
};

export default Signup;
