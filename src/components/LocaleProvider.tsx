"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Locale, type Dict, getDictionary, defaultLocale } from "@/lib/i18n";

type Ctx = { locale: Locale; t: Dict; toggle: () => void };

const LocaleCtx = createContext<Ctx>({
  locale: defaultLocale,
  t: getDictionary(defaultLocale),
  toggle: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const toggle = useCallback(
    () => setLocale((l) => (l === "zh" ? "en" : "zh")),
    [],
  );
  const t = getDictionary(locale);
  return (
    <LocaleCtx.Provider value={{ locale, t, toggle }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleCtx);
}
