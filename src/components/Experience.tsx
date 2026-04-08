"use client";

import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";

export default function Experience() {
  const { t } = useLang();
  const roles = t.experience.roles;

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

        <div className="space-y-0">
          {roles.map((role, i) => (
            <FadeIn key={i} delay={0.24 + i * 0.1}>
              <div className="py-10" style={i < roles.length - 1 ? { borderBottom: "1px solid var(--gold-border)" } : undefined}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="font-serif text-[22px] font-light" style={{ color: "var(--text-primary)" }}>{role.title}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[2px] mt-1" style={{ color: "var(--gold)" }}>{role.company}</p>
                  </div>
                  <p className="font-mono text-[10px] tracking-[2px] mt-1 sm:mt-2 shrink-0" style={{ color: "var(--text-faint)" }}>{role.period}</p>
                </div>

                <p className="font-sans text-[14px] font-light leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{role.description}</p>

                <div className="ps-4 flex flex-col gap-2" style={{ borderInlineStart: "2px solid var(--gold-border)" }}>
                  {role.highlights.map((item, j) => (
                    <p key={j} className="font-sans text-[13px] font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.56}>
          <div className="mt-10 text-center">
            <a href="#" className="font-mono text-[11px] uppercase tracking-[2px] transition-opacity hover:opacity-70" style={{ color: "var(--gold)" }}>
              {t.experience.downloadCv}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
