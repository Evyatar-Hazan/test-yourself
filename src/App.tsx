import React from "react";
import "./App.css";
// TODO: Prefer typed hook to avoid free-form keys
import { useTranslationTyped } from "./hooks/useTranslationTyped";
import logo from "./logo.svg";
import Home from "./screens/Home/Home";

function App() {
  const { t, i18n } = useTranslationTyped();
  const title = t("app_title");
  const welcome = t("welcome");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt={title} aria-label={title} />
        <h1>{title}</h1>
        <p>{welcome}</p>
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
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", textAlign: "left" }}>
        <Home />
      </main>
    </div>
  );
}

export default App;
