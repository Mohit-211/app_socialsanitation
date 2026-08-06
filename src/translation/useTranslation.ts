import en from "./locales/en.json";
import es from "./locales/es.json";
import type { Language } from "./types";

const dictionaries: Record<Language, Record<string, unknown>> = { en, es };

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object")
      return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Record<string, string>): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    template
  );
}

export function useTranslation(language: Language) {
  const dict = dictionaries[language];

  // Returns a string for scalar keys, using `key` itself as a fallback if missing.
  function t(key: string, vars?: Record<string, string>): string {
    const value = getByPath(dict, key);
    if (typeof value !== "string") return key;
    return interpolate(value, vars);
  }

  // Returns a string[] for list keys (e.g. policyTopLeftLines, employmentType.options).
  function tList(key: string): string[] {
    const value = getByPath(dict, key);
    return Array.isArray(value) ? (value as string[]) : [];
  }

  return { t, tList };
}
