import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  verifyEmail,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../features/auth/authSlice";


const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

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
        setMessage(result.payload.message || "המייל אומת בהצלחה!");
        
        // נווט לעמוד הראשי אחרי 3 שניות
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setVerificationStatus("error");
        setMessage(result.payload as string || "שגיאה באימות המייל");
      }
    } catch (error) {
      setVerificationStatus("error");
      setMessage("שגיאה באימות המייל");
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
          <h1>אימות כתובת מייל</h1>
        </div>

        <div className="verify-email-content">
          {verificationStatus === "pending" && !searchParams.get("token") && (
            <>
              <p className="description">
                שלחנו אליך מייל עם קישור לאימות החשבון. לחץ על הקישור במייל או
                הכנס את הקוד שקיבלת להלן:
              </p>

              <form onSubmit={handleManualSubmit} className="manual-verify-form">
                <div className="form-group">
                  <label htmlFor="token">קוד אימות</label>
                  <input
                    id="token"
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="הכנס את קוד האימות"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="verify-button"
                  disabled={isLoading || !manualToken.trim()}
                >
                  {isLoading ? "מאמת..." : "אמת מייל"}
                </button>
              </form>

              <div className="help-section">
                <p>לא קיבלת מייל?</p>
                <ul>
                  <li>בדוק את תיקיית הספאם</li>
                  <li>וודא שכתובת המייל נכונה</li>
                  <li>נסה שוב בעוד כמה דקות</li>
                </ul>
              </div>
            </>
          )}

          {verificationStatus === "pending" && searchParams.get("token") && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>מאמת את כתובת המייל שלך...</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>אימות הושלם בהצלחה!</h2>
              <p>{message}</p>
              <p className="redirect-message">
                אתה מועבר לעמוד הראשי בעוד כמה שניות...
              </p>
              <button
                className="continue-button"
                onClick={() => navigate("/")}
              >
                המשך לאתר
              </button>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="error-state">
              <div className="error-icon">❌</div>
              <h2>שגיאה באימות</h2>
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
                  נסה שוב
                </button>
                <button
                  className="back-button"
                  onClick={() => navigate("/login")}
                >
                  חזור להתחברות
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