import React, { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("קישור לא תקין");
      return;
    }

    if (password !== confirmPassword) {
      alert("הסיסמאות לא תואמות");
      return;
    }

    if (password.length < 8) {
      alert("הסיסמה חייבת להכיל לפחות 8 תווים");
      return;
    }

    try {
      await dispatch(confirmPasswordReset({ token, newPassword: password })).unwrap();
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
            <h1>קישור לא תקין</h1>
            <p>הקישור לאיפוס הסיסמה לא תקין או פג תוקפו</p>
          </div>
          
          <div className="auth-actions">
            <Link to="/forgot-password" className="auth-link">
              בקש קישור חדש
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
            <h1>הסיסמה אופסה בהצלחה!</h1>
            <p>כעת תוכל להתחבר עם הסיסמה החדשה</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>איפוס סיסמה</h1>
          <p>הזן סיסמה חדשה עבור החשבון שלך</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="סיסמה חדשה"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="אמת סיסמה"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "מאפס..." : "אפס סיסמה"}
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

export default ResetPassword;