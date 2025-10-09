import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TestsFeed from "../../components/TestsFeed/TestsFeed";
import { fetchUsers } from "../../features/users/usersSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { AppDispatch } from "../../store";

const Home: React.FC = () => {
  const { t } = useTranslationTyped();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
