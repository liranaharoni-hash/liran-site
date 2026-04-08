"use client";

import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

export default function Thinking() {
  const { t } = useLang();

  return (
    <section id="thinking" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="max-w-[560px]">
          <FadeIn>
            <p className="label mb-10">{t.thinking.label}</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p
              className="font-serif text-[24px] font-light leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              {t.thinking.line1}
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="font-serif text-[24px] font-normal leading-relaxed mt-2"
              style={{ color: "var(--gold)" }}
            >
              {t.thinking.line2}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p
              className="font-sans text-[16px] font-light leading-relaxed mt-7"
              style={{ color: "var(--text-muted)" }}
            >
              {t.thinking.line3}
            </p>
          </FadeIn>

          <FadeIn delay={0.32}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mt-4"
              style={{ color: "var(--text-dim)" }}
            >
              {t.thinking.line4}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mt-4"
              style={{ color: "var(--text-dim)" }}
            >
              {t.thinking.line5}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
