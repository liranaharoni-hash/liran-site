"use client";

import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

export default function Tools() {
  const { t } = useLang();

  return (
    <section className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn><p className="label mb-4">{t.tools.label}</p></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="font-serif text-[36px] font-light mb-10" style={{ color: "var(--text-primary)" }}>{t.tools.title}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.tools.categories.map((cat, i) => (
            <FadeIn key={i} delay={0.16 + i * 0.08}>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[3px] mb-4" style={{ color: "var(--gold)" }}>{cat.title}</p>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="font-sans text-[13px] font-light transition-colors cursor-default hover:!text-[var(--text-primary)]" style={{ color: "var(--text-dim)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="font-mono text-[11px] italic font-light mt-10" style={{ color: "var(--text-faint)" }}>{t.tools.footerLine}</p>
        </FadeIn>
      </div>
    </section>
  );
}
