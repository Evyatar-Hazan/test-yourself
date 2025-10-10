import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { requestPasswordReset } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import type { AppDispatch } from "../../store";
// removed duplicate useTranslation import

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      await dispatch(requestPasswordReset({ email })).unwrap();
      setEmailSent(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t("forgotPassword.email_sent_title")}</h1>
            <p>{t("forgotPassword.email_sent_message", { email })}</p>
          </div>

          <div className="auth-actions">
            <Link to="/login" className="auth-link">
              {t("forgotPassword.back_to_login")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t("forgotPassword.title")}</h1>
          <p>{t("forgotPassword.description")}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder={t("forgotPassword.email_placeholder")}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="email"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading || !email.trim()}
          >
            {isLoading
              ? t("forgotPassword.sending")
              : t("forgotPassword.send_link")}
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

export default ForgotPassword;
