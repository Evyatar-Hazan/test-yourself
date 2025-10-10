import React from "react";
import { Link } from "react-router-dom";
import { List, Nav } from "./Drawer.styles";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const Drawer: React.FC = () => {
  const { t } = useTranslationTyped();

  return (
    <Nav>
      <List>
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
      </List>
    </Nav>
  );
};

export default Drawer;
