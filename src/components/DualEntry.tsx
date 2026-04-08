"use client";

import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

export default function DualEntry() {
  const { t } = useLang();

  const cards = [
    {
      title: t.dualEntry.card1Title,
      copy: t.dualEntry.card1Copy,
      cta: t.dualEntry.card1Cta,
      href: "#systems",
    },
    {
      title: t.dualEntry.card2Title,
      copy: t.dualEntry.card2Copy,
      cta: t.dualEntry.card2Cta,
      href: "#creative",
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
                  style={{
                    aspectRatio: "16/9",
                    background: `
                      linear-gradient(135deg, var(--placeholder-gradient-from), var(--placeholder-gradient-to)),
                      linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px)
                    `,
                    backgroundSize: "100% 100%, 32px 32px, 32px 32px",
                  }}
                />
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
