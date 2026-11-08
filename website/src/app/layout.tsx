import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "UNIQUE ALL IN ONE | Crystals & Fine Jewelry",
    template: "%s | UNIQUE ALL IN ONE",
  },
  description:
    "A curated collection of crystals, gemstones, and fine jewelry. Discover rare stones and handcrafted pieces from UNIQUE ALL IN ONE.",
  openGraph: {
    title: "UNIQUE ALL IN ONE",
    description: "Crystals, gemstones, and fine jewelry — curated with care.",
    url: "https://www.instagram.com/unique.all.in.one/",
    siteName: "UNIQUE ALL IN ONE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
