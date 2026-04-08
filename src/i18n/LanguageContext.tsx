"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isHe: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  t: translations.en as Translations,
  toggleLang: () => {},
  isHe: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "he" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";

    if (lang === "he") {
      document.documentElement.classList.add("lang-he");
    } else {
      document.documentElement.classList.remove("lang-he");
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "he" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const value: LanguageContextValue = {
    lang,
    t: translations[lang] as Translations,
    toggleLang,
    isHe: lang === "he",
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
