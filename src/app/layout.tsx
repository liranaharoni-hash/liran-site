import type { Metadata } from "next";
import Script from "next/script";
import {
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
  Heebo,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Liran Aharoni — Creative Strategy, Systems & AI",
  description:
    "Applying creative thinking to user behavior, adoption, and real-world product usage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} ${heebo.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-lang-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('theme-dark');var l=localStorage.getItem('lang');if(l==='he'){document.documentElement.lang='he';document.documentElement.dir='rtl';document.documentElement.classList.add('lang-he');}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
