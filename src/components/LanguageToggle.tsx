"use client";

import { useLang } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { isHe, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-colors duration-300 hover:border-[var(--gold-border)]"
      style={{
        borderColor: "var(--border)",
      }}
      aria-label={isHe ? "Switch to English" : "Switch to Hebrew"}
    >
      {isHe ? "🇺🇸" : "🇮🇱"}
    </button>
  );
}
