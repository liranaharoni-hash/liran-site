"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "./ThemeContext";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, isHe } = useLang();
  const { dark } = useTheme();

  const photoFilter = dark
    ? "grayscale(1) contrast(1.35) brightness(0.85)"
    : "grayscale(1) contrast(1.0) brightness(1.05)";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gold glow */}
      <div
        className="absolute top-0 end-0 w-[500px] h-[500px] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: "var(--glow-opacity)",
        }}
      />

      {/* Desktop photo — clean cutout, no effects */}
      <div
        className={`absolute bottom-0 hidden md:block pointer-events-none ${
          isHe ? "left-0" : "right-0"
        }`}
        style={{
          width: "42vw",
          height: "85vh",
        }}
      >
        <Image
          src="/images/liran-cutout.png"
          alt="Liran Aharoni"
          fill
          className="object-contain object-bottom"
          style={{
            filter: photoFilter,
            transition: "filter 0.8s ease",
          }}
          sizes="42vw"
          priority
        />
      </div>

      {/* Mobile photo — clean cutout, centered */}
      <div className="relative md:hidden flex justify-center pt-24 pb-4">
        <div className="relative w-[300px]" style={{ aspectRatio: "3/4" }}>
          <Image
            src="/images/liran-cutout.png"
            alt="Liran Aharoni"
            fill
            className="object-contain object-bottom"
            style={{
              filter: photoFilter,
              transition: "filter 0.8s ease",
            }}
            sizes="300px"
            priority
          />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-[960px] mx-auto px-6 pt-8 pb-20 md:pt-36 md:pb-28">
        <div className="md:max-w-[55%]">
          <FadeIn>
            <p className="label mb-6">{t.hero.label}</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              className="font-serif font-light leading-[1.2] mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 50px)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>
                {t.hero.headline1}
              </span>
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                {t.hero.headline2}
              </span>
              {t.hero.headline3 && (
                <>
                  <br />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {t.hero.headline3}
                  </span>
                </>
              )}
              <br />
              <span style={{ color: "var(--gold)" }}>
                {t.hero.headline4}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p
              className="font-sans text-[15px] font-light leading-relaxed mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              {t.hero.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p
              className="font-sans text-[13px] font-light leading-relaxed mb-8"
              style={{ color: "var(--text-dim)" }}
            >
              {t.hero.intro}
            </p>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href="#systems"
                className="inline-block px-5 py-2.5 text-[13px] font-sans font-normal rounded-[5px] hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--cta-primary-bg)",
                  color: "var(--cta-primary-text)",
                }}
              >
                {t.hero.ctaSystems}
              </a>
              <a
                href="#creative"
                className="inline-block px-5 py-2.5 border text-[13px] font-sans font-light rounded-[5px] transition-colors"
                style={{
                  borderColor: "var(--cta-secondary-border)",
                  color: "var(--cta-secondary-text)",
                }}
              >
                {t.hero.ctaCreative}
              </a>
              <a
                href="#contact"
                className="inline-block px-5 py-2.5 text-[13px] font-sans font-light transition-colors hover:!text-[var(--gold)]"
                style={{ color: "var(--text-dim)" }}
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.36}>
            <p
              className="font-mono text-[10px] tracking-[2px] mb-5"
              style={{ color: "var(--text-faint)" }}
            >
              {t.hero.microcopy}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <button
              onClick={onOpenModal}
              className="font-mono text-[10px] uppercase tracking-[3px] transition-colors hover:!text-[var(--gold)]"
              style={{ color: "var(--text-faint)" }}
            >
              {t.hero.builtWith}
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
