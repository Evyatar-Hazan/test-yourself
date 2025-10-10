import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  verifyEmail,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../store";

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { t } = useTranslation();

  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // אימות אוטומטי אם יש token ב-URL
      handleVerification(token);
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    try {
      dispatch(clearError());
      const result = await dispatch(verifyEmail({ token }));

      if (verifyEmail.fulfilled.match(result)) {
        setVerificationStatus("success");
        setMessage(result.payload.message || t("verifyEmail.success_title"));

        // נווט לעמוד הראשי אחרי 3 שניות
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setVerificationStatus("error");
        setMessage((result.payload as string) || t("verifyEmail.error_title"));
      }
    } catch {
      setVerificationStatus("error");
      setMessage(t("verifyEmail.error_title"));
    }
  };

  const [manualToken, setManualToken] = useState("");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken.trim()) {
      handleVerification(manualToken.trim());
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <div className="verify-email-header">
          <div className="email-icon">📧</div>
          <h1>{t("verifyEmail.title")}</h1>
        </div>

        <div className="verify-email-content">
          {verificationStatus === "pending" && !searchParams.get("token") && (
            <>
              <p className="description">{t("verifyEmail.description")}</p>

              <form
                onSubmit={handleManualSubmit}
                className="manual-verify-form"
              >
                <div className="form-group">
                  <label htmlFor="token">{t("verifyEmail.token_label")}</label>
                  <input
                    id="token"
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder={t("verifyEmail.token_placeholder")}
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="verify-button"
                  disabled={isLoading || !manualToken.trim()}
                >
                  {isLoading
                    ? t("verifyEmail.verifying")
                    : t("verifyEmail.verify")}
                </button>
              </form>

              <div className="help-section">
                <p>{t("verifyEmail.not_received")}</p>
                <ul>
                  <li>{t("verifyEmail.help_spam")}</li>
                  <li>{t("verifyEmail.help_check_email")}</li>
                  <li>{t("verifyEmail.help_try_again")}</li>
                </ul>
              </div>
            </>
          )}

          {verificationStatus === "pending" && searchParams.get("token") && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>{t("verifyEmail.loading_message")}</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>{t("verifyEmail.success_title")}</h2>
              <p>{message}</p>
              <p className="redirect-message">
                {t("verifyEmail.redirect_info")}
              </p>
              <button className="continue-button" onClick={() => navigate("/")}>
                {t("verifyEmail.continue")}
              </button>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="error-state">
              <div className="error-icon">❌</div>
              <h2>{t("verifyEmail.error_title")}</h2>
              <p>{message || error}</p>
              <div className="error-actions">
                <button
                  className="retry-button"
                  onClick={() => {
                    setVerificationStatus("pending");
                    setMessage("");
                    dispatch(clearError());
                  }}
                >
                  {t("verifyEmail.retry")}
                </button>
                <button
                  className="back-button"
                  onClick={() => navigate("/login")}
                >
                  {t("verifyEmail.back_to_login")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
