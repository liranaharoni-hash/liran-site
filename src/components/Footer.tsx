"use client";

import Image from "next/image";
import { useLang } from "@/i18n/LanguageContext";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[960px] mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={80}
            height={20}
            className="h-[18px] w-auto"
            style={{ filter: "var(--logo-filter, none)" }}
          />
          <span className="font-mono text-[9px] tracking-[2px]" style={{ color: "var(--text-faint)" }}>
            {t.footer.copyright}
          </span>
        </div>
        <span className="font-sans text-[11px] italic font-light" style={{ color: "var(--text-faint)" }}>
          {t.footer.builtLine}
        </span>
        <button
          onClick={onOpenModal}
          className="font-mono text-[9px] uppercase tracking-[2px] transition-colors hover:!text-[var(--gold)]"
          style={{ color: "var(--text-faint)" }}
        >
          {t.footer.builtBtn}
        </button>
      </div>
    </footer>
  );
}
