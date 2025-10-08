import React from "react";
import TestsFeed from "../../components/TestsFeed/TestsFeed";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";

const Home: React.FC = () => {
  const { t } = useTranslationTyped();
  return (
    <div style={{ padding: 16 }}>
      <h1>{t("home_title")}</h1>
      <TestsFeed />
    </div>
  );
};

export default Home;
