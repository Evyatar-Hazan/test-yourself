import React from "react";
import { useNavigate } from "react-router-dom";
import { Actions, HeaderBar, Spacer } from "./Header.styles";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import i18n from "../../i18n";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, rightAction }) => {
  const navigate = useNavigate();
  const { t } = useTranslationTyped();

  return (
    <HeaderBar>
      {showBack ? <button onClick={() => navigate(-1)}>←</button> : <Spacer />}
      <h1>{title}</h1>

      <Actions>
        <button
          onClick={() => i18n.changeLanguage("en")}
          aria-label={t("change_language")}
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage("he")}
          aria-label={t("change_language")}
        >
          HE
        </button>
      </Actions>
      {rightAction ? rightAction : <Spacer />}
    </HeaderBar>
  );
};

export default Header;
