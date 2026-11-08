"use client";

import { useLanguage, type Locale } from "@/lib/i18n";

export default function LanguageToggle({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  const { locale, setLocale } = useLanguage();

  const options: { code: Locale; label: string }[] = [
    { code: "nl", label: "NL" },
    { code: "en", label: "EN" },
  ];

  return (
    <div
      className={`inline-flex items-center border text-[0.65rem] uppercase tracking-[0.18em] ${
        onDark ? "border-cream/35 text-cream" : "border-[var(--line)] text-ink"
      }`}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            className={`px-2.5 py-1.5 transition ${
              active
                ? onDark
                  ? "bg-cream text-ink"
                  : "bg-ink text-cream"
                : onDark
                  ? "hover:bg-cream/10"
                  : "hover:bg-ink/5"
            }`}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
