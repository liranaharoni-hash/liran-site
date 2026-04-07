"use client";

import FadeIn from "./FadeIn";

const contacts = [
  {
    label: "EMAIL",
    value: "Liran.aharoni@gmail.com",
    href: "mailto:Liran.aharoni@gmail.com",
  },
  {
    label: "PHONE",
    value: "054-3395020",
    href: "tel:054-3395020",
  },
  {
    label: "LINKEDIN",
    value: "/in/liran-aharoni",
    href: "https://www.linkedin.com/in/liran-aharoni-04809769/",
  },
  {
    label: "INSTAGRAM",
    value: "@liran.aharoni10",
    href: "https://www.instagram.com/liran.aharoni10/",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">CONTACT</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[40px] font-light mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s Talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p
            className="font-sans text-[14px] font-light leading-relaxed mb-10 max-w-[480px]"
            style={{ color: "var(--text-muted)" }}
          >
            Building products, systems, or creator-facing experiences? Let&apos;s
            talk about the human and strategic side of adoption.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {contacts.map((c, i) => (
            <FadeIn key={c.label} delay={0.24 + i * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="flex items-baseline gap-4 group"
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[3px] w-24 shrink-0"
                  style={{ color: "var(--text-dim)" }}
                >
                  {c.label}
                </span>
                <span
                  className="font-sans text-[14px] font-light transition-colors group-hover:!text-[var(--gold)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {c.value}
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
