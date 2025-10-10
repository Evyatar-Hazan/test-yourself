// TODO: Typed i18n hook wrapper to prevent free-form string keys.
import type { i18n as I18nType } from "i18next";
import { useTranslation } from "react-i18next";
import type { TranslationKeys } from "../i18n/resources";

type TypedT = (
  key: TranslationKeys,
  options?: Record<string, unknown>,
) => string;

export function useTranslationTyped(): { t: TypedT; i18n: I18nType } {
  // Call without args to avoid overload incompatibilities in older TS
  const { t, i18n } = useTranslation();
  return { t: t as unknown as TypedT, i18n };
}

export type { TranslationKeys };
