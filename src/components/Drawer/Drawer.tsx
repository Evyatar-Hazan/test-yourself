import React from "react";
import { Link } from "react-router-dom";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const Drawer: React.FC = () => {
  const { t } = useTranslationTyped();

  return (
    <nav style={{ width: 200, borderRight: "1px solid #ccc", padding: 20 }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">{t("feed")}</Link>
        </li>
        <li>
          <Link to="/create">{t("createTest")}</Link>
        </li>
        <li>
          <Link to="/profile">{t("profile")}</Link>
        </li>
        <li>
          <Link to="/settings">{t("settings")}</Link>
        </li>
        <li>
          <Link to="/notifications">{t("notifications")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Drawer;
