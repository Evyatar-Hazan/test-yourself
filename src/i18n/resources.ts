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

// Helper type to create nested dot notation keys
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKeys =
  | keyof Resources["en"]["translation"]
  | NestedKeyOf<Resources["en"]["translation"]>;
