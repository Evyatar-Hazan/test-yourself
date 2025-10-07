import { Home, PlusCircle, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const BottomTabs: React.FC = () => {
  const { t } = useTranslationTyped();

  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: 10,
        borderTop: "1px solid #ccc",
      }}
    >
      <Link to="/">
        <Home /> {t("feed")}
      </Link>
      <Link to="/create">
        <PlusCircle /> {t("createTest")}
      </Link>
      <Link to="/profile">
        <User /> {t("profile")}
      </Link>
    </footer>
  );
};

export default BottomTabs;
