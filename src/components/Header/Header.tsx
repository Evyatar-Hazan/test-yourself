import React from "react";
import { useNavigate } from "react-router-dom";
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
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#fff",
      }}
    >
      {showBack ? (
        <button onClick={() => navigate(-1)}>←</button>
      ) : (
        <div style={{ width: 24 }} />
      )}
      <h1>{title}</h1>

      <div style={{ display: "flex", gap: 8 }}>
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
      </div>
      {rightAction ? rightAction : <div style={{ width: 24 }} />}
    </header>
  );
};

export default Header;
