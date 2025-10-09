import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { requestPasswordReset } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import type { AppDispatch } from "../../store";


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      const result = await dispatch(requestPasswordReset({ email })).unwrap();
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
            <h1>בדוק את המייל שלך</h1>
            <p>שלחנו לך קישור לאיפוס סיסמה לכתובת המייל {email}</p>
          </div>

          <div className="auth-actions">
            <Link to="/login" className="auth-link">
              חזור לדף ההתחברות
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
          <h1>שכחת סיסמה?</h1>
          <p>הזן את כתובת המייל שלך ונשלח לך קישור לאיפוס הסיסמה</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="כתובת מייל"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            {isLoading ? "שולח..." : "שלח קישור לאיפוס"}
          </Button>
        </form>

        <div className="auth-actions">
          <Link to="/login" className="auth-link">
            חזור לדף ההתחברות
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;