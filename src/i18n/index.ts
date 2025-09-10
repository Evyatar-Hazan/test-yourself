// TODO: Initialize i18next with strong TS typing and detector. Namespaces ready for scale.
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources, type Resources, type DefaultNamespace } from "./resources";

declare module "i18next" {
  // Augment default resources to enable key typing in `t()`
  // See: https://react.i18next.com/latest/typescript
  interface CustomTypeOptions {
    defaultNS: DefaultNamespace;
    resources: Resources["en"];
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "he"],
    defaultNS: "translation",
    ns: ["translation"], // TODO: Add more namespaces when scaling modules
    interpolation: { escapeValue: false },
    detection: {
      // TODO: Fine-tune detection order and caches if needed
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    // React options
    react: { useSuspense: false },
    returnNull: false, // Prefer empty string over null to simplify rendering
  });

export default i18n;
