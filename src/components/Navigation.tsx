"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

export default function Navigation() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.nav.whatIDo, href: "#dual-entry" },
    { label: t.nav.creative, href: "#creative" },
    { label: t.nav.systems, href: "#systems" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              backgroundColor: "var(--nav-scrolled-bg)",
              borderBottom: "1px solid var(--border)",
            }
          : undefined
      }
    >
      <div className="max-w-[960px] mx-auto px-6 flex items-center justify-between h-14">
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-5">
          <a href="#" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Liran Aharoni"
              width={140}
              height={36}
              className="h-[36px] w-auto theme-dark:invert"
              style={{ filter: "var(--logo-filter, none)" }}
              priority
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] transition-colors duration-300 hover:!text-[var(--gold)]"
                style={{ color: "var(--text-dim)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Toggles */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[1px] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor: "var(--hamburger-color)" }}
            />
            <span
              className={`block w-5 h-[1px] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor: "var(--hamburger-color)" }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 backdrop-blur-md z-40"
          style={{
            backgroundColor: "var(--nav-scrolled-bg)",
          }}
        >
          <div className="max-w-[960px] mx-auto px-6 py-8 flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[18px] transition-colors duration-300 hover:!text-[var(--gold)]"
                style={{ color: "var(--text-dim)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
