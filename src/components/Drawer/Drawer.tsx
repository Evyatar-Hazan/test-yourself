import React from "react";
import { Link } from "react-router-dom";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const Drawer: React.FC = () => {
  const { t } = useTranslationTyped();

  return (
    <nav style={{ width: 200, borderRight: "1px solid #ccc", padding: 20 }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">{t("navigation.feed")}</Link>
        </li>
        <li>
          <Link to="/create">{t("navigation.createTest")}</Link>
        </li>
        <li>
          <Link to="/profile">{t("navigation.profile")}</Link>
        </li>
        <li>
          <Link to="/settings">{t("navigation.settings")}</Link>
        </li>
        <li>
          <Link to="/notifications">{t("navigation.notifications")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Drawer;
