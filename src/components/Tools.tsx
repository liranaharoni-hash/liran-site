"use client";

import FadeIn from "./FadeIn";

const categories = [
  {
    title: "Strategy & Systems",
    items: [
      "Creative Strategy",
      "Product Thinking",
      "User Behavior",
      "Adoption Systems",
      "Messaging & Positioning",
      "GTM Thinking",
      "Creator Economy",
    ],
  },
  {
    title: "Generative AI",
    items: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Midjourney",
      "Runway",
      "Sora",
      "Higgsfield",
    ],
  },
  {
    title: "AI Workflow",
    items: [
      "Claude Code",
      "Base44",
      "Google AI Studio",
      "NotebookLM",
      "Perplexity",
      "Vibe Coding",
    ],
  },
  {
    title: "Platforms",
    items: ["Meta", "TikTok", "YouTube", "LinkedIn", "IMAI Dashboard"],
  },
];

export default function Tools() {
  return (
    <section className="py-[120px]">
      <div className="max-w-[960px] mx-auto px-6">
        <FadeIn>
          <p className="label mb-4">CAPABILITIES</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            className="font-serif text-[36px] font-light mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            Tools & Systems
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <FadeIn key={i} delay={0.16 + i * 0.08}>
              <div>
                <p
                  className="font-mono text-[9px] uppercase tracking-[3px] mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  {cat.title}
                </p>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-[13px] font-light transition-colors cursor-default hover:!text-[var(--text-muted)]"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
