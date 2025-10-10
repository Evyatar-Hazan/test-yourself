import { Home, PlusCircle, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { FooterBar } from "./BottomTabs.styles";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const BottomTabs: React.FC = () => {
  const { t } = useTranslationTyped();

  return (
    <FooterBar>
      <Link to="/">
        <Home /> {t("navigation.feed")}
      </Link>
      <Link to="/create">
        <PlusCircle /> {t("navigation.createTest")}
      </Link>
      <Link to="/profile">
        <User /> {t("navigation.profile")}
      </Link>
    </FooterBar>
  );
};

export default BottomTabs;
