"use client";

import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

export default function Experience() {
  const { t } = useLang();
  const { main, earlier, earlierLabel, cvHref, downloadCv } = t.experience;

  return (
    <section id="experience" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn><p className="label mb-4">{t.experience.label}</p></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="font-serif text-[36px] font-light mb-4" style={{ color: "var(--text-primary)" }}>{t.experience.title}</h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="font-sans text-[14px] font-light leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>{t.experience.intro}</p>
        </FadeIn>

        {/* Main LEADERS block */}
        <FadeIn delay={0.24}>
          <div className="py-10" style={{ borderBottom: "1px solid var(--gold-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
              <h3 className="font-serif text-[22px] font-light" style={{ color: "var(--text-primary)" }}>{main.company}</h3>
              <p className="font-mono text-[10px] tracking-[2px] mt-1 sm:mt-2 shrink-0" style={{ color: "var(--text-faint)" }}>{main.period}</p>
            </div>

            <p className="font-sans text-[14px] font-light leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>{main.summary}</p>

            <div className="ps-4 sm:ps-6 flex flex-col gap-8" style={{ borderInlineStart: "2px solid var(--gold-border)" }}>
              {main.subRoles.map((sub, i) => (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                    <h4 className="font-serif text-[18px] font-light" style={{ color: "var(--text-primary)" }}>{sub.title}</h4>
                    <p className="font-mono text-[10px] tracking-[2px] shrink-0" style={{ color: "var(--gold)" }}>{sub.period}</p>
                  </div>
                  <p className="font-sans text-[13px] font-light leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{sub.description}</p>
                  {sub.bullets.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {sub.bullets.map((item, j) => (
                        <li key={j} className="font-sans text-[13px] font-light leading-relaxed ps-4 relative" style={{ color: "var(--text-muted)" }}>
                          <span className="absolute start-0 top-0" style={{ color: "var(--gold)" }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Earlier Experience */}
        <FadeIn delay={0.32}>
          <div className="py-10">
            <h3 className="font-serif text-[22px] font-light mb-5" style={{ color: "var(--text-primary)" }}>{earlierLabel}</h3>
            <ul className="flex flex-col gap-3">
              {earlier.map((item, i) => (
                <li key={i} className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-6 text-center">
            <a
              href={cvHref}
              download
              target="_blank"
              rel="noopener"
              className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)" }}
            >
              {downloadCv}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
