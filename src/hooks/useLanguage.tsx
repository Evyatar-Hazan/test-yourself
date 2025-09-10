// TODO: Global language context to allow swapping language from anywhere.
import React from "react";
import i18n from "../i18n";

type LanguageCode = "en" | "he";

type LanguageContextValue = {
  language: LanguageCode;
  changeLanguage: (lng: LanguageCode) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = React.useState<LanguageCode>(
    (i18n.language as LanguageCode) ?? "en",
  );

  const changeLanguage = React.useCallback((lng: LanguageCode) => {
    void i18n.changeLanguage(lng);
    setLanguage(lng);
  }, []);

  const value = React.useMemo(
    () => ({ language, changeLanguage }),
    [language, changeLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
