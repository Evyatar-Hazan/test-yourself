import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TestsFeed from "../../components/TestsFeed/TestsFeed";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchUsers } from "../../features/users/usersSlice";
import { useAuth } from "../../hooks/useAuth";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { AppDispatch } from "../../store";

const Home: React.FC = () => {
  const { t } = useTranslationTyped();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>{t("home.title")}</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {t("homeAuth.login")}
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#17a2b8",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {t("homeAuth.signup")}
              </Link>
            </>
          ) : (
            <>
              <span
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  fontSize: "14px",
                  border: "1px solid #dee2e6",
                }}
              >
                {t("homeAuth.hello_name", { name: user?.name ?? "" })}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {t("homeAuth.logout")}
              </button>
            </>
          )}
          <Link
            to="/create-test"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {t("navigation.createTest")}
          </Link>
          <Link
            to="/profile"
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {t("navigation.profile")}
          </Link>
        </div>
      </div>
      <TestsFeed />
    </div>
  );
};

export default Home;
