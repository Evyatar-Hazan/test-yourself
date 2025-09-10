// TODO: Typed i18n hook wrapper to prevent free-form string keys.
import type { i18n as I18nType } from "i18next";
import { useTranslation } from "react-i18next";
import type { Resources } from "../i18n/resources";

type TranslationKeys = keyof Resources["en"]["translation"];
type TypedT = (key: TranslationKeys) => string;

export function useTranslationTyped(): { t: TypedT; i18n: I18nType } {
  // Call without args to avoid overload incompatibilities in older TS
  const { t, i18n } = useTranslation();
  return { t: t as unknown as TypedT, i18n };
}

export type { TranslationKeys };
