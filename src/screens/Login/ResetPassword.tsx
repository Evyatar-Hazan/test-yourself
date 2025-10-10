import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { confirmPasswordReset } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import type { AppDispatch } from "../../store";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert(t("resetPassword.invalid_link_title"));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("signup.passwords_do_not_match"));
      return;
    }

    if (password.length < 8) {
      alert(t("signup.weak_password"));
      return;
    }

    try {
      await dispatch(
        confirmPasswordReset({ token, newPassword: password }),
      ).unwrap();
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t("resetPassword.invalid_link_title")}</h1>
            <p>{t("resetPassword.invalid_link_desc")}</p>
          </div>

          <div className="auth-actions">
            <Link to="/forgot-password" className="auth-link">
              {t("resetPassword.request_new_link")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t("resetPassword.success_title")}</h1>
            <p>{t("resetPassword.success_desc")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t("resetPassword.title")}</h1>
          <p>{t("resetPassword.description")}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="password"
              placeholder={t("resetPassword.password_placeholder")}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder={t("resetPassword.confirm_placeholder")}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
              autoComplete="new-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading || !password || !confirmPassword}
          >
            {isLoading
              ? t("resetPassword.resetting")
              : t("resetPassword.reset")}
          </Button>
        </form>

        <div className="auth-actions">
          <Link to="/login" className="auth-link">
            {t("forgotPassword.back_to_login")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
