"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "./ThemeContext";

export default function DualEntry() {
  const { t } = useLang();
  const { dark } = useTheme();

  const cards = [
    {
      title: t.dualEntry.card1Title,
      copy: t.dualEntry.card1Copy,
      cta: t.dualEntry.card1Cta,
      href: "#systems",
      imgLight: "/images/brainlight.jpg",
      imgDark: "/images/brainblack.jpg",
      alt: "Systems & AI",
    },
    {
      title: t.dualEntry.card2Title,
      copy: t.dualEntry.card2Copy,
      cta: t.dualEntry.card2Cta,
      href: "#creative",
      imgLight: "/images/heartlight.jpg",
      imgDark: "/images/heartblack.jpg",
      alt: "Creative & Content",
    },
  ];

  return (
    <section id="dual-entry" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <h2
            className="font-serif text-[32px] font-light mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {t.dualEntry.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p
            className="font-sans text-[14px] font-light leading-relaxed mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            {t.dualEntry.subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={0.16 + i * 0.08}>
              <a
                href={card.href}
                className="block border rounded-lg p-8 transition-all duration-300 hover:-translate-y-[2px] group"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-surface)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--gold-border)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <div
                  className="relative rounded-md overflow-hidden mb-6"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={card.imgLight}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    style={{
                      opacity: dark ? 0 : 1,
                      transition: "opacity 1s ease",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <Image
                    src={card.imgDark}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    style={{
                      opacity: dark ? 1 : 0,
                      transition: "opacity 1s ease",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <h3
                  className="font-serif text-[24px] font-light mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-sans text-[14px] font-light leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {card.copy}
                </p>
                <span
                  className="font-mono text-[11px] uppercase tracking-[2px]"
                  style={{ color: "var(--gold)" }}
                >
                  {card.cta}
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
