// TODO: Centralized i18n resources map. Keep keys consistent and typed.
// Using `as const` to preserve literal types of keys for strong typing.

import enTranslation from "./locales/en/translation.json";
import heTranslation from "./locales/he/translation.json";

export const resources = {
  en: { translation: enTranslation },
  he: { translation: heTranslation },
} as const;

export type Resources = typeof resources;

export type DefaultNamespace = "translation";
