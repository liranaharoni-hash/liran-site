"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "./ThemeContext";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, isHe } = useLang();
  const { dark } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const heroHeight =
        heroRef.current?.offsetHeight || window.innerHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Mask direction flips for RTL
  const sideFade = isHe
    ? "linear-gradient(to right, black 0%, black 55%, transparent 95%)"
    : "linear-gradient(to left, black 0%, black 55%, transparent 95%)";
  const bottomFade =
    "linear-gradient(to top, transparent 0%, black 10%, black 100%)";
  const desktopMask = `${sideFade}, ${bottomFade}`;

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
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

      {/* Desktop photo container — fixed, blurs on scroll */}
      {!isMobile && (
        <div
          className={`fixed top-0 bottom-0 hidden md:block pointer-events-none ${
            isHe ? "left-0" : "right-0"
          }`}
          style={{
            width: "50vw",
            zIndex: 0,
            maskImage: desktopMask,
            WebkitMaskImage: desktopMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in" as string,
            filter: `blur(${scrollProgress * 12}px)`,
            opacity: 1 - scrollProgress * 0.7,
            transform: `scale(${1 + scrollProgress * 0.05})`,
            transition: "filter 0.1s linear, opacity 0.1s linear",
          }}
        >
          <Image
            src="/images/liran-light.png"
            alt="Liran Aharoni"
            fill
            className="object-cover"
            style={{
              objectPosition: "center 20%",
              opacity: dark ? 0 : 1,
              transition: "opacity 1s ease",
              filter: "contrast(1.02) brightness(1.02)",
            }}
            sizes="50vw"
            priority
          />
          <Image
            src="/images/liran-dark.png"
            alt="Liran Aharoni"
            fill
            className="object-cover"
            style={{
              objectPosition: "center 20%",
              opacity: dark ? 1 : 0,
              transition: "opacity 1s ease",
              filter: "contrast(1.1) brightness(0.95)",
            }}
            sizes="50vw"
            priority
          />
        </div>
      )}

      {/* Mobile photo container — static, no blur */}
      <div
        className="relative md:hidden w-full pointer-events-none"
        style={{
          height: "55vh",
          maxHeight: "400px",
          maskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <Image
          src="/images/liran-light.png"
          alt="Liran Aharoni"
          fill
          className="object-cover"
          style={{
            objectPosition: "center 20%",
            opacity: dark ? 0 : 1,
            transition: "opacity 1s ease",
            filter: "contrast(1.02) brightness(1.02)",
          }}
          sizes="100vw"
          priority
        />
        <Image
          src="/images/liran-dark.png"
          alt="Liran Aharoni"
          fill
          className="object-cover"
          style={{
            objectPosition: "center 20%",
            opacity: dark ? 1 : 0,
            transition: "opacity 1s ease",
            filter: "contrast(1.1) brightness(0.95)",
          }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-[960px] mx-auto px-6 md:px-10 pt-8 pb-20 md:pt-36 md:pb-28">
        <div className="md:max-w-[50%]">
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
