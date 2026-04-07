"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Thinking", href: "#thinking" },
  { label: "Systems", href: "#systems" },
  { label: "Creative", href: "#creative" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md"
          : "bg-transparent"
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
        <a
          href="#"
          className="font-serif text-xl font-light tracking-wide"
          style={{ color: "var(--gold)" }}
        >
          LA
        </a>

        {/* Desktop: toggle + links */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
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

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-[5px] p-1"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden backdrop-blur-md"
          style={{
            backgroundColor: "var(--nav-scrolled-bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-[960px] mx-auto px-6 py-6 flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[14px] transition-colors duration-300 hover:!text-[var(--gold)]"
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
