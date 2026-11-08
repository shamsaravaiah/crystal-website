"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/";
  const { t } = useLanguage();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/collection", label: t.nav.collection },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        onDark ? "text-cream" : "text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="relative z-50 flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="UNIQUE ALL IN ONE"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40"
            priority
          />
          <div className="leading-none">
            <p className="font-display text-lg tracking-[0.08em]">UNIQUE</p>
            <p
              className={`text-[0.62rem] tracking-[0.28em] ${
                onDark ? "text-gold-light" : "text-gold-deep"
              }`}
            >
              ALL IN ONE
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${onDark ? "!text-cream/85 hover:!text-cream" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/unique.all.in.one/"
            target="_blank"
            rel="noreferrer"
            className={`nav-link ${onDark ? "!text-cream/85 hover:!text-cream" : ""}`}
          >
            {t.nav.instagram}
          </a>
          <LanguageToggle onDark={onDark} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle onDark={onDark || open} />
          <button
            type="button"
            aria-label="Menu"
            className="relative z-50"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex w-7 flex-col gap-1.5">
              <span
                className={`h-px w-full transition ${
                  onDark || open ? "bg-cream" : "bg-ink"
                } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full transition ${
                  onDark || open ? "bg-cream" : "bg-ink"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full transition ${
                  onDark || open ? "bg-cream" : "bg-ink"
                } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink/95 px-8 pt-28 md:hidden">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-cream"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/unique.all.in.one/"
              target="_blank"
              rel="noreferrer"
              className="font-display text-3xl text-gold-light"
            >
              {t.nav.instagram}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
