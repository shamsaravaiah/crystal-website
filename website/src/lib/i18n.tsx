"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "en" | "nl";

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      collection: "Collection",
      about: "About",
      contact: "Contact",
      instagram: "Instagram",
    },
    home: {
      tagline: "Crystals · Gemstones · Jewelry",
      intro:
        "A refined collection of stones and silver — curated for beauty, presence, and lasting character.",
      viewCollection: "View Collection",
      featured: "Featured pieces",
      featuredTitle: "Stones chosen for their story",
      featuredBody:
        "From Panjshir emerald to Peruvian pyrite — each piece is selected for color, energy, and craft.",
      exploreAll: "Explore all pieces",
      atelier: "The atelier",
      atelierTitle: "Jewelry & crystals with quiet luxury",
      atelierBody:
        "UNIQUE ALL IN ONE gathers rare gemstones, natural crystals, and 925 silver into a single collection — for collectors, gift-givers, and anyone drawn to earth-born beauty.",
      ourStory: "Our story",
    },
    collection: {
      eyebrow: "The collection",
      title: "Crystals & jewelry",
      body: "Browse gemstones, crystals, silver jewelry, and unique natural pieces from the UNIQUE ALL IN ONE atelier.",
      all: "All",
      empty: "No pieces in this category yet.",
    },
    about: {
      eyebrow: "About",
      p1: "We curate crystals, gemstones, fossils, and fine silver jewelry for collectors who appreciate natural form and quiet luxury. From Afghan lapis and Panjshir emerald to druzy pyrite and 925 silver rings — every piece is chosen with intention.",
      p2: "Follow the atelier on Instagram for new arrivals, stone stories, and one-of-a-kind finds.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Inquire about a piece",
      body: "For availability, custom requests, or questions about a stone — message us on Instagram. We respond with care to every inquiry.",
      cta: "Message on Instagram",
    },
    product: {
      back: "← Back to collection",
      inquire: "Inquire on Instagram",
      contact: "Contact",
    },
    footer: {
      blurb:
        "Curated crystals, gemstones, and fine jewelry — chosen for beauty, energy, and lasting character.",
      explore: "Explore",
      connect: "Connect",
      collection: "Collection",
      about: "About",
      contact: "Contact",
      admin: "Admin",
    },
    categories: {
      Crystals: "Crystals",
      Gemstones: "Gemstones",
      Jewelry: "Jewelry",
      Fossils: "Fossils",
      Decor: "Decor",
    },
  },
  nl: {
    nav: {
      home: "Home",
      collection: "Collectie",
      about: "Over ons",
      contact: "Contact",
      instagram: "Instagram",
    },
    home: {
      tagline: "Kristallen · Edelstenen · Sieraden",
      intro:
        "Een verfijnde collectie stenen en zilver — geselecteerd op schoonheid, uitstraling en blijvend karakter.",
      viewCollection: "Bekijk collectie",
      featured: "Uitgelichte stukken",
      featuredTitle: "Stenen gekozen om hun verhaal",
      featuredBody:
        "Van Panjshir-smaragd tot Peruaanse pyriet — elk stuk is geselecteerd op kleur, energie en vakmanschap.",
      exploreAll: "Bekijk alle stukken",
      atelier: "Het atelier",
      atelierTitle: "Sieraden & kristallen met stille luxe",
      atelierBody:
        "UNIQUE ALL IN ONE verzamelt zeldzame edelstenen, natuurlijke kristallen en 925 zilver in één collectie — voor verzamelaars, cadeautips en iedereen die houdt van schoonheid uit de aarde.",
      ourStory: "Ons verhaal",
    },
    collection: {
      eyebrow: "De collectie",
      title: "Kristallen & sieraden",
      body: "Bekijk edelstenen, kristallen, zilveren sieraden en unieke natuurlijke stukken van UNIQUE ALL IN ONE.",
      all: "Alles",
      empty: "Nog geen stukken in deze categorie.",
    },
    about: {
      eyebrow: "Over ons",
      p1: "Wij selecteren kristallen, edelstenen, fossielen en fijn zilveren sieraden voor verzamelaars die natuurlijke vorm en stille luxe waarderen. Van Afghaanse lapis en Panjshir-smaragd tot druzy pyriet en 925 zilveren ringen — elk stuk is met zorg gekozen.",
      p2: "Volg het atelier op Instagram voor nieuwe binnenkomsten, steenverhalen en unieke vondsten.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Vraag naar een stuk",
      body: "Voor beschikbaarheid, maatwerk of vragen over een steen — stuur ons een bericht op Instagram. We reageren zorgvuldig op elke aanvraag.",
      cta: "Bericht via Instagram",
    },
    product: {
      back: "← Terug naar collectie",
      inquire: "Vraag via Instagram",
      contact: "Contact",
    },
    footer: {
      blurb:
        "Geselecteerde kristallen, edelstenen en fijne sieraden — gekozen om schoonheid, energie en blijvend karakter.",
      explore: "Ontdek",
      connect: "Verbind",
      collection: "Collectie",
      about: "Over ons",
      contact: "Contact",
      admin: "Admin",
    },
    categories: {
      Crystals: "Kristallen",
      Gemstones: "Edelstenen",
      Jewelry: "Sieraden",
      Fossils: "Fossielen",
      Decor: "Decoratie",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  categoryLabel: (category: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "unique-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("nl");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "nl") {
      setLocaleState(saved);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = dictionaries[locale];
    return {
      locale,
      setLocale,
      t,
      categoryLabel: (category: string) =>
        t.categories[category as keyof typeof t.categories] || category,
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

/** Dutch product descriptions keyed by slug (original Instagram language). */
export const productDescriptionsNl: Record<string, string> = {
  "lapis-lazuli-silver":
    "Breng je stijl tot leven met de prachtige Lapis Lazuli of kies voor de tijdloze schoonheid van zilver. Handgeselecteerde stukken die diep hemelsblauw combineren met verfijnd metaalwerk.",
  "emerald-radiance":
    "De smaragd schittert niet alleen, maar straalt ook positieve energie en kalmte uit. Een lichtgevende groene edelsteen gekozen om zijn helderheid en serene uitstraling.",
  "afghan-emerald-set-panjshir":
    "Set met zeldzame Afghaanse smaragd uit Panjshir — een van 's werelds meest gevierde vindplaatsen van diepgroene smaragden van goede kwaliteit.",
  "turquoise-stories":
    "Elke turkoois vertelt een eigen verhaal. De steen van bescherming en rust, met zachte hemelsblauwe tinten en unieke natuurlijke patronen.",
  apatite:
    "Apatiet: natuurlijke schoonheid uit de aarde. Staat bekend om energie, motivatie en inspiratie — een steen die je aandacht blijft trekken.",
  celestine:
    "Celestien: rust en schoonheid in één steen. Staat bekend om kalmte, harmonie en een ontspannen gevoel — met een unieke uitstraling.",
  "925-silver-rings":
    "925 zilver. Elke ring heeft zijn eigen karakter. Verfijnde dagelijkse stukken, gemaakt om te blijven en persoonlijk aan te voelen.",
  "panjshir-emerald":
    "Smaragd (Emerald) uit Panjshir, Afghanistan. Een wereldberoemde vindplaats, bekend om zijn diepgroene smaragden van goede kwaliteit. De steen van het hart, liefde en wijsheid.",
  "druzy-pyrite-peru":
    "Deze druzy pyriet uit Peru bestaat uit talloze kleine kristallen, die samen een prachtig sprankelend oppervlak vormen. Pyriet staat bekend om kracht, zelfvertrouwen, bescherming en overvloed.",
  "cabochon-collection":
    "Cabs in verschillende kleuren en patronen. Perfect voor het maken van unieke ringen, hangers of andere mooie creaties.",
  "tiger-eye":
    "Tijgeroog. Met zijn warme uitstraling staat tijgeroog bekend om kracht, balans en focus — een geaarde steen met natuurlijke chatoyance.",
  "afghan-lapis-lazuli-turquoise-rings":
    "Afghaanse lapis lazuli & turkoois. Prachtige stenen, verwerkt in unieke ringen — diepe blues en zachte turquoise tinten in draagbare kunst.",
  amethyst:
    "Naast zijn prachtige uitstraling staat Amethist bekend om zijn rustgevende en beschermende werking — een klassiek kristal met zachte, lichtgevende diepte.",
  "crystal-selection":
    "Welke spreekt jou aan? Een zorgvuldig samengestelde selectie natuurlijke stenen.",
  "ammonite-madagascar":
    "Ammoniet uit Madagaskar. Een bijzonder fossiel uit een wereld van miljoenen jaren geleden, met spiraalvorm en gemineraliseerde schoonheid.",
  "gemstone-trees":
    "Deze prachtige edelstenenboompjes zijn echte eyecatchers voor je interieur en ook superleuk om cadeau te geven.",
};

export function getLocalizedDescription(
  product: { slug: string; description: string },
  locale: Locale,
) {
  if (locale === "nl") {
    return productDescriptionsNl[product.slug] || product.description;
  }
  return product.description;
}
