"use client";

import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle, mounted } = useTheme();

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-colors duration-300 hover:border-[var(--gold-border)]"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-dim)",
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
