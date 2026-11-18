"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-cream-deep/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="UNIQUE ALL IN ONE"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-xl tracking-wide">UNIQUE</p>
              <p className="text-[0.62rem] tracking-[0.28em] text-gold-deep">
                ALL IN ONE
              </p>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            {t.footer.blurb}
          </p>
          <p className="mt-3 text-sm text-ink">{SITE.owner}</p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            {t.footer.explore}
          </p>
          <div className="flex flex-col gap-2 text-sm text-ink-soft">
            <Link href="/collection" className="hover:text-ink">
              {t.footer.collection}
            </Link>
            <Link href="/about" className="hover:text-ink">
              {t.footer.about}
            </Link>
            <Link href="/contact" className="hover:text-ink">
              {t.footer.contact}
            </Link>
            <Link href="/admin" className="hover:text-ink">
              {t.footer.admin}
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            {t.footer.connect}
          </p>
          <div className="flex flex-col gap-2 text-sm text-ink-soft">
            <a href={SITE.phoneHref} className="hover:text-ink">
              {SITE.phoneDisplay}
            </a>
            <a href={SITE.emailHref} className="hover:text-ink">
              {SITE.email}
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              {SITE.instagramHandle}
            </a>
          </div>
          <p className="mt-6 text-xs text-stone">
            © {new Date().getFullYear()} UNIQUE ALL IN ONE
          </p>
        </div>
      </div>
    </footer>
  );
}
