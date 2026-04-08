"use client";

import { useLang } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang, isHe } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="h-8 px-2.5 rounded-full border flex items-center justify-center text-[11px] font-mono tracking-[1px] transition-colors duration-300 hover:border-[var(--gold-border)]"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-dim)",
      }}
      aria-label={isHe ? "Switch to English" : "החלף לעברית"}
    >
      {lang === "en" ? "עב" : "EN"}
    </button>
  );
}
